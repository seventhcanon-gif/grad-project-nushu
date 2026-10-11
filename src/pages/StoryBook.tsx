import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  BookOpen, 
  Download,
  Loader2,
  Maximize,
  Minimize
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';

// Set worker to local public copy
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
}

export default function StoryBook() {
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(12);
  const [zoomMultiplier, setZoomMultiplier] = useState(1); // 1 = fit container perfectly
  const [isLoading, setIsLoading] = useState(true);
  const [pageInput, setPageInput] = useState('1');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderTaskRef = useRef<any>(null);

  const pdfUrl = '/assets/pdf/chuanxie-fanmian-nyushu.pdf';

  // Load the PDF document
  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);
    setErrorMsg(null);

    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    loadingTask.promise
      .then((doc: any) => {
        if (isCancelled) return;
        setPdfDoc(doc);
        setTotalPages(doc.numPages);
        setIsLoading(false);
      })
      .catch((err: any) => {
        if (isCancelled) return;
        console.error('Failed to load PDF:', err);
        setErrorMsg('繪本載入失敗，請確認檔案或重新整理。');
        setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [pdfUrl]);

  // Render current page onto canvas with strict Fit-Contain logic
  const renderCurrentPage = useCallback(() => {
    if (!pdfDoc || !canvasRef.current || !containerRef.current) return;

    // Cancel existing rendering task if any
    if (renderTaskRef.current) {
      try {
        renderTaskRef.current.cancel();
      } catch (e) {
        // ignore cancellation errors
      }
    }

    pdfDoc.getPage(currentPage).then((page: any) => {
      if (!canvasRef.current || !containerRef.current) return;

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (!context) return;

      const baseViewport = page.getViewport({ scale: 1 });
      const container = containerRef.current;
      
      // Available viewable space inside container with comfortable padding
      const availableWidth = Math.max(container.clientWidth - 48, 300);
      const availableHeight = Math.max(container.clientHeight - 48, 200);

      // Best fit: contain BOTH width and height so entire page text is always visible
      const scaleX = availableWidth / baseViewport.width;
      const scaleY = availableHeight / baseViewport.height;
      const fitScale = Math.min(scaleX, scaleY) * zoomMultiplier;

      const viewport = page.getViewport({ scale: fitScale });
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(viewport.width * dpr);
      canvas.height = Math.floor(viewport.height * dpr);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      const task = page.render(renderContext);
      renderTaskRef.current = task;

      task.promise.catch((err: any) => {
        if (err?.name !== 'RenderingCancelledException') {
          console.error('Page render error:', err);
        }
      });
    });
  }, [pdfDoc, currentPage, zoomMultiplier]);

  useEffect(() => {
    renderCurrentPage();

    // Re-render smoothly when window resizes
    const handleResize = () => {
      renderCurrentPage();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch (e) {
          // ignore
        }
      }
    };
  }, [renderCurrentPage]);

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handlePageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(pageInput, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    } else {
      setPageInput(currentPage.toString());
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    setPageInput(currentPage.toString());
  }, [currentPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrevPage();
      } else if (e.key === '+' || e.key === '=') {
        setZoomMultiplier(s => Math.min(2.5, s + 0.15));
      } else if (e.key === '-') {
        setZoomMultiplier(s => Math.max(0.5, s - 0.15));
      } else if (e.key === '0') {
        setZoomMultiplier(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages]);

  return (
    <div className="flex flex-col h-[calc(100vh-73px)] w-full bg-[#121212] select-none overflow-hidden relative font-serif">
      {/* Top Header / Control Toolbar */}
      <header className="h-14 bg-[#1C1C1C]/95 border-b border-white/10 px-4 md:px-8 flex items-center justify-between text-white/90 z-20 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-cinnabar" />
          <h1 className="text-base md:text-lg tracking-widest font-serif font-bold truncate max-w-[180px] sm:max-w-xs md:max-w-md">
            《穿越扇面：遇見女書》
          </h1>
          <span className="hidden md:inline-block text-xs font-sans px-2 py-0.5 rounded bg-white/10 text-white/60 tracking-wider">
            原創繪本
          </span>
        </div>

        {/* Center: Page Controls */}
        <div className="flex items-center gap-2 font-sans text-xs md:text-sm">
          <button
            onClick={goToPrevPage}
            disabled={currentPage <= 1 || isLoading}
            title="上一頁 (←)"
            className="p-1.5 md:p-2 rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          <form onSubmit={handlePageSubmit} className="flex items-center gap-1.5">
            <input
              type="text"
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              className="w-10 md:w-12 text-center py-1 bg-black/40 border border-white/20 rounded text-xs md:text-sm text-white focus:outline-none focus:border-cinnabar"
            />
            <span className="text-white/40">/</span>
            <span className="text-white/60 min-w-4">{totalPages}</span>
          </form>

          <button
            onClick={goToNextPage}
            disabled={currentPage >= totalPages || isLoading}
            title="下一頁 (→)"
            className="p-1.5 md:p-2 rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        {/* Right: View & Zoom Tools */}
        <div className="flex items-center gap-1 md:gap-2">
          <button
            onClick={() => setZoomMultiplier(s => Math.max(0.5, s - 0.15))}
            title="縮小 (-)"
            className="p-1.5 md:p-2 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <span className="text-xs font-sans text-white/50 hidden sm:inline-block w-12 text-center">
            {Math.round(zoomMultiplier * 100)}%
          </span>

          <button
            onClick={() => setZoomMultiplier(s => Math.min(2.5, s + 0.15))}
            title="放大 (+)"
            className="p-1.5 md:p-2 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={() => setZoomMultiplier(1)}
            title="適合頁面大小 (0)"
            className="p-1.5 md:p-2 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "結束全螢幕" : "全螢幕檢視"}
            className="p-1.5 md:p-2 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer hidden sm:block"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          <a
            href={pdfUrl}
            download="《穿越扇面：遇見女書》.pdf"
            title="下載原創繪本 PDF"
            className="p-1.5 md:p-2 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer ml-1"
          >
            <Download className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Main Content Viewer Area */}
      <main 
        ref={containerRef}
        className="flex-1 w-full h-full overflow-auto flex items-center justify-center p-3 sm:p-6 relative"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #202020 0%, #0d0d0d 100%)'
        }}
      >
        {isLoading && (
          <div className="flex flex-col items-center gap-3 text-white/70">
            <Loader2 className="w-8 h-8 animate-spin text-cinnabar" />
            <span className="text-sm font-sans tracking-widest">繪本載入中，請稍候…</span>
          </div>
        )}

        {errorMsg && (
          <div className="flex flex-col items-center gap-4 text-center max-w-md p-6 bg-red-950/20 border border-red-500/30 rounded-sm">
            <p className="text-red-300 font-sans text-sm">{errorMsg}</p>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-cinnabar text-white rounded font-sans text-xs tracking-widest hover:opacity-90"
            >
              直接在獨立分頁檢視 PDF
            </a>
          </div>
        )}

        {/* Canvas PictureBook Container */}
        <div 
          className={`relative flex items-center justify-center transition-opacity duration-300 my-auto ${
            isLoading ? 'opacity-0 h-0' : 'opacity-100'
          }`}
        >
          <div className="relative shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-white/10 rounded-sm overflow-hidden bg-white">
            <canvas ref={canvasRef} className="block" />
            
            {/* Click hotspot on Left for turning back (semi-transparent hover indicator) */}
            <button
              onClick={goToPrevPage}
              disabled={currentPage <= 1}
              aria-label="點擊翻上一頁"
              className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 group hover:bg-gradient-to-r hover:from-black/40 hover:to-transparent transition-all flex items-center justify-start pl-4 cursor-pointer disabled:pointer-events-none"
            >
              <span className="p-3 rounded-full bg-black/60 text-white/80 group-hover:text-white group-hover:scale-110 transition-all opacity-0 group-hover:opacity-100 shadow-xl">
                <ChevronLeft className="w-6 h-6" />
              </span>
            </button>

            {/* Click hotspot on Right for turning forward (semi-transparent hover indicator) */}
            <button
              onClick={goToNextPage}
              disabled={currentPage >= totalPages}
              aria-label="點擊翻下一頁"
              className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 group hover:bg-gradient-to-l hover:from-black/40 hover:to-transparent transition-all flex items-center justify-end pr-4 cursor-pointer disabled:pointer-events-none"
            >
              <span className="p-3 rounded-full bg-black/60 text-white/80 group-hover:text-white group-hover:scale-110 transition-all opacity-0 group-hover:opacity-100 shadow-xl">
                <ChevronRight className="w-6 h-6" />
              </span>
            </button>
          </div>
        </div>
      </main>

      {/* Subtle bottom info bar */}
      <footer className="h-8 bg-[#181818] border-t border-white/5 px-6 flex items-center justify-between text-[11px] font-sans text-white/40 tracking-wider shrink-0">
        <span>滑鼠點擊畫面左右兩側或鍵盤 ← / → 翻頁</span>
        <span>第 {currentPage} 頁 / 共 {totalPages} 頁 · 女書繪本</span>
      </footer>
    </div>
  );
}
