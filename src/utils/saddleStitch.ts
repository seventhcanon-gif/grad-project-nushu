import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';

/**
 * 騎馬釘（Saddle Stitch）輔助函式庫
 */

// 1. 單頁拼版 (Single-Page Imposed)
// 印刷紙張正反面：[N, 1], [2, N-1], [N-2, 3], [4, N-3], ...
export function getSingleSaddleOrder(totalPages: number): number[] {
  const logicalToPhysical: number[] = new Array(totalPages + 1);
  let physicalIndex = 1;
  const sheets = Math.ceil(totalPages / 4);

  for (let s = 0; s < sheets; s++) {
    const pN = totalPages - 2 * s;
    const p1 = 1 + 2 * s;
    const p2 = 2 + 2 * s;
    const pNminus1 = totalPages - 1 - 2 * s;

    logicalToPhysical[pN] = physicalIndex++;
    logicalToPhysical[p1] = physicalIndex++;
    logicalToPhysical[p2] = physicalIndex++;
    logicalToPhysical[pNminus1] = physicalIndex++;
  }

  const order: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    order.push(logicalToPhysical[i] || i);
  }
  return order;
}

// 2. 雙頁跨頁拼版 (Spread-Page Imposed, 2-up)
// 每個 PDF 頁面包含左右兩半，PDF 總頁數 M，書籍總頁數 N = M * 2
export interface SpreadSlice {
  pdfPage: number;     // 對應的 PDF 頁碼 (1-based)
  side: 'left' | 'right'; // 顯示左半邊還是右半邊
}

export function getSpreadSaddleOrder(totalPdfPages: number): Record<number, SpreadSlice> {
  const totalBookPages = totalPdfPages * 2;
  const mapping: Record<number, SpreadSlice> = {};

  for (let k = 1; k <= totalPdfPages; k++) {
    const isOdd = k % 2 === 1;
    let leftLogical: number;
    let rightLogical: number;

    if (isOdd) {
      // 奇數頁面（外側面）：左邊是 N - (k - 1)，右邊是 k
      leftLogical = totalBookPages - (k - 1);
      rightLogical = k;
    } else {
      // 偶數頁面（內側面）：左邊是 k，右邊是 N - (k - 1)
      leftLogical = k;
      rightLogical = totalBookPages - (k - 1);
    }

    mapping[leftLogical] = { pdfPage: k, side: 'left' };
    mapping[rightLogical] = { pdfPage: k, side: 'right' };
  }

  return mapping;
}

/**
 * 自動從 PDF 文字層辨識頁面中的頁碼數字
 */
export async function detectPageNumbersFromText(pdfBuffer: Uint8Array): Promise<{
  pdfPage: number;
  detectedNumbers: number[];
}[]> {
  const doc = await pdfjsLib.getDocument(pdfBuffer).promise;
  const results: { pdfPage: number; detectedNumbers: number[] }[] = [];

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const text = content.items.map((item: any) => item.str).join(' ');
    
    const matches: RegExpMatchArray = text.match(/(?:-|\b|第|\/|\s)?(\d{1,3})(?:-|\b|頁|\/|\s)?/g) || [];
    const numbers: number[] = matches
      .map((m: string) => parseInt(m.replace(/\D/g, ''), 10))
      .filter((n: number) => !isNaN(n) && n > 0 && n <= doc.numPages * 2);

    results.push({
      pdfPage: i,
      detectedNumbers: Array.from(new Set(numbers))
    });
  }

  return results;
}
