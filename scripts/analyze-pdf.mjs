import fs from 'fs';
import path from 'path';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';

async function analyzePdf(filePath) {
  const resolvedPath = path.resolve(filePath);
  if (!fs.existsSync(resolvedPath)) {
    console.error(`❌ 找不到檔案：${resolvedPath}`);
    process.exit(1);
  }

  console.log(`\n========================================`);
  console.log(`📄 正在分析 PDF 繪本：${path.basename(resolvedPath)}`);
  console.log(`========================================\n`);

  const buffer = new Uint8Array(fs.readFileSync(resolvedPath));
  const doc = await pdfjsLib.getDocument(buffer).promise;
  const numPages = doc.numPages;

  console.log(`📌 PDF 總頁數：${numPages} 頁\n`);

  const pageDetails = [];
  let isWideSpread = false; // 是否為跨頁 (寬度顯著大於高度)

  for (let i = 1; i <= numPages; i++) {
    const page = await doc.getPage(i);
    const vp = page.getViewport({ scale: 1 });
    const content = await page.getTextContent();
    const text = content.items.map(item => item.str).join(' ');

    if (vp.width > vp.height * 1.2) {
      isWideSpread = true;
    }

    // 尋找文字中的數字（特別是角隅或邊界的頁碼）
    const matches = text.match(/(?:^|\s|-|[^\d])(\d{1,3})(?:$|\s|-|[^\d])/g) || [];
    const numbers = matches
      .map(m => parseInt(m.replace(/\D/g, ''), 10))
      .filter(n => !isNaN(n) && n > 0 && n <= numPages * 2);

    pageDetails.push({
      page: i,
      width: Math.round(vp.width),
      height: Math.round(vp.height),
      aspectRatio: (vp.width / vp.height).toFixed(2),
      detectedNumbers: Array.from(new Set(numbers)),
      textPreview: text.replace(/\s+/g, ' ').trim().slice(0, 60)
    });
  }

  // 輸出每頁資訊
  console.log(`【各頁分析結果】`);
  pageDetails.forEach(p => {
    const numbersStr = p.detectedNumbers.length > 0 ? p.detectedNumbers.join(', ') : '(未偵測到明顯頁碼文字)';
    console.log(
      `第 ${String(p.page).padStart(2, '0')} 頁 | 尺寸: ${p.width}x${p.height} (寬高比 ${p.aspectRatio}) | 頁面數字: [${numbersStr}]`
    );
  });

  console.log(`\n----------------------------------------`);
  console.log(`🔍 【排版分析與建議模式】:`);

  if (isWideSpread) {
    console.log(`👉 判定類型：【雙頁跨頁騎馬釘 (Spread-Page Imposed)】`);
    console.log(`   - 說明：每個 PDF 頁面寬度大於高度，通常為一張紙同時印刷了「左、右兩頁」。`);
    console.log(`   - 裝訂後真實閱讀總頁數：${numPages * 2} 頁。`);
    console.log(`   - 建議配置：設定 layoutMode: 'saddle_stitch_spread'`);
  } else {
    console.log(`👉 判定類型：【單頁騎馬釘 (Single-Page Imposed) 或 連續頁面】`);
    console.log(`   - 若該 PDF 是單頁順序打亂的裝訂拼版，建議配置：layoutMode: 'saddle_stitch_single'`);
    console.log(`   - 若頁面已是 1, 2, 3... 正常順序，建議配置：layoutMode: 'normal'`);
  }

  console.log(`\n【可直接複製到 src/data/storyBooks.ts 的配置範例】：`);
  console.log(`----------------------------------------`);
  const bookConfig = {
    id: path.basename(resolvedPath, path.extname(resolvedPath)).toLowerCase().replace(/[^a-z0-9]/g, '-'),
    title: `《${path.basename(resolvedPath, path.extname(resolvedPath))}》`,
    category: isWideSpread ? '跨頁騎馬釘' : '原創繪本',
    description: '自動分析排版繪本。',
    pdfUrl: `/assets/pdf/${path.basename(resolvedPath)}`,
    layoutMode: isWideSpread ? 'saddle_stitch_spread' : 'saddle_stitch_single',
    coverImage: '/assets/stories/cover_2.png'
  };
  console.log(JSON.stringify(bookConfig, null, 2));
  console.log(`----------------------------------------\n`);
}

const targetFile = process.argv[2] || 'public/assets/pdf/chuanxie-fanmian-nyushu.pdf';
analyzePdf(targetFile).catch(console.error);
