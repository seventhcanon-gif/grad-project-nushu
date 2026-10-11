import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Configure worker from CDN (compatible with Vite)
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfViewerProps {
  /** Relative path inside /public */
  file: string;
}

export default function PdfViewer({ file }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goPrev = () => setPageNumber((p) => Math.max(p - 1, 1));
  const goNext = () => setPageNumber((p) => Math.min(p + 1, numPages));

  return (
    <div className="flex flex-col items-center py-4 bg-[#1E1E1E] text-white pdf-viewer-container">
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess} loading="載入中…">
        <Page pageNumber={pageNumber} width={800} />
      </Document>
      <div className="mt-4 flex items-center gap-4">
        <button
          onClick={goPrev}
          disabled={pageNumber <= 1}
          className="px-4 py-2 bg-ink text-white disabled:opacity-50"
        >
          上一頁
        </button>
        <span>{pageNumber} / {numPages}</span>
        <button
          onClick={goNext}
          disabled={pageNumber >= numPages}
          className="px-4 py-2 bg-ink text-white disabled:opacity-50"
        >
          下一頁
        </button>
      </div>
    </div>
  );
}
