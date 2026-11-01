import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
  Minimize,
  ChevronDown,
  Check,
  Library,
  X,
  Layers
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';
import { STORY_BOOKS, StoryBookItem, LayoutMode } from '../data/storyBooks';
import { getSingleSaddleOrder, getSpreadSaddleOrder, SpreadSlice } from '../utils/saddleStitch';

// Set worker to local public copy
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
}

export default function StoryBook() {
  const [selectedBookId, setSelectedBookId] = useState<string>(STORY_BOOKS[0].id);
  const [isBookMenuOpen, setIsBookMenuOpen] = useState(false);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [zoomMultiplier, setZoomMultiplier] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [pageInput, setPageInput] = useState('1');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderTaskRef = useRef<any>(null);

  const currentBook: StoryBookItem = STORY_BOOKS.find(b => b.id === selectedBookId) || STORY_BOOKS[0];
  const layoutMode: LayoutMode = currentBook.layoutMode || 'normal';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Calculate order mappings based on layout mode
  const singleSaddleOrder = useMemo(() => {
    if (!pdfDoc || layoutMode !== 'saddle_stitch_single') return null;
    return getSingleSaddleOrder(pdfDoc.numPages);
  }, [pdfDoc, layoutMode]);

  const spreadSaddleMapping = useMemo(() => {
    if (!pdfDoc || layoutMode !== 'saddle_stitch_spread') return null;
    return getSpreadSaddleOrder(pdfDoc.numPages);
  }, [pdfDoc, layoutMode]);

  // Select a new story book
  const handleSelectBook = (book: StoryBookItem) => {
    if (book.isUpcoming) {
      showToast(`《${book.title}》正在創作整理中，敬請期待！`);
      return;
    }
    if (book.id === selectedBookId) {
      setIsBookMenuOpen(false);
      return;
    }
    setSelectedBookId(book.id);
    setCurrentPage(1);
    setPageInput('1');
    setZoomMultiplier(1);
    setIsBookMenuOpen(false);
  };

  // Load the PDF document whenever the current book changes
  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);
    setErrorMsg(null);

    const loadingTask = pdfjsLib.getDocument(currentBook.pdfUrl);
    loadingTask.promise
      .then((doc: any) => {
        if (isCancelled) return;
        setPdfDoc(doc);

        // Determine logical total pages
        if (currentBook.layoutMode === 'saddle_stitch_spread') {
          setTotalPages(doc.numPages * 2);
        } else if (currentBook.customOrder && currentBook.customOrder.length > 0) {
          setTotalPages(currentBook.customOrder.length);
        } else {
          setTotalPages(doc.numPages);
        }

        setCurrentPage(1);
        setPageInput('1');
        setIsLoading(false);
      })
      .catch((err: any) => {
        if (isCancelled) return;
        console.error('Failed to load PDF:', err);
        setErrorMsg(`《${currentBook.title}》載入失敗，請確認檔案路徑或重新整理。`);
        setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [currentBook.pdfUrl, currentBook.title, currentBook.layoutMode, currentBook.customOrder]);

  // Render current logical page onto canvas
  const renderCurrentPage = useCallback(() => {
    if (!pdfDoc || !canvasRef.current || !containerRef.current) return;

    if (renderTaskRef.current) {
      try {
        renderTaskRef.current.cancel();
      } catch (e) {
        // ignore
      }
    }

    // Determine which physical PDF page and side to fetch
    let physicalPage = currentPage;
    let spreadSide: 'left' | 'right' | null = null;

    if (layoutMode === 'saddle_stitch_single' && singleSaddleOrder) {
      physicalPage = singleSaddleOrder[currentPage - 1] || currentPage;
    } else if (layoutMode === 'saddle_stitch_spread' && spreadSaddleMapping) {
      const slice: SpreadSlice = spreadSaddleMapping[currentPage] || { pdfPage: 1, side: 'left' };
      physicalPage = slice.pdfPage;
      spreadSide = slice.side;
    } else if (layoutMode === 'custom_order' && currentBook.customOrder) {
      physicalPage = currentBook.customOrder[currentPage - 1] || currentPage;
    }

    // Bounds safety
    physicalPage = Math.max(1, Math.min(physicalPage, pdfDoc.numPages));

    pdfDoc.getPage(physicalPage).then((page: any) => {
      if (!canvasRef.current || !containerRef.current) return;

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (!context) return;

      const baseViewport = page.getViewport({ scale: 1 });
      const container = containerRef.current;
      
      const availableWidth = Math.max(container.clientWidth - 48, 300);
      const availableHeight = Math.max(container.clientHeight - 48, 200);

      const isSpread = spreadSide !== null;
      // If spread, single page visual width is half of the sheet
      const logicalWidth = isSpread ? (baseViewport.width / 2) : baseViewport.width;
      const logicalHeight = baseViewport.height;

      const scaleX = availableWidth / logicalWidth;
      const scaleY = availableHeight / logicalHeight;
      const fitScale = Math.min(scaleX, scaleY) * zoomMultiplier;

      const fullViewport = page.getViewport({ scale: fitScale });
      const dpr = window.devicePixelRatio || 1;

      const targetCanvasWidth = Math.floor(logicalWidth * fitScale);
      const targetCanvasHeight = Math.floor(logicalHeight * fitScale);

      canvas.width = Math.floor(targetCanvasWidth * dpr);
      canvas.height = Math.floor(targetCanvasHeight * dpr);
      canvas.style.width = `${targetCanvasWidth}px`;
      canvas.style.height = `${targetCanvasHeight}px`;

      context.save();
      context.scale(dpr, dpr);

      // If viewing right half of spread, translate context to the left by halfWidth
      if (spreadSide === 'right') {
        context.translate(-Math.floor(logicalWidth * fitScale), 0);
      }

      const renderContext = {
        canvasContext: context,
        viewport: fullViewport
      };

      const task = page.render(renderContext);
      renderTaskRef.current = task;

      task.promise
        .then(() => {
          context.restore();
        })
        .catch((err: any) => {
          context.restore();
          if (err?.name !== 'RenderingCancelledException') {
            console.error('Page render error:', err);
          }
        });
    });
  }, [pdfDoc, currentPage, zoomMultiplier, layoutMode, singleSaddleOrder, spreadSaddleMapping, currentBook.customOrder]);

  useEffect(() => {
    renderCurrentPage();

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
      } else if (e.key === 'Escape') {
        setIsBookMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages]);

  return (
    <div className="flex flex-col h-[calc(100vh-73px)] w-full bg-[#121212] select-none overflow-hidden relative font-serif">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-[#222]/95 border border-amber-500/40 text-amber-200 px-4 py-2 rounded-lg shadow-2xl text-xs font-sans tracking-wider backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Top Header / Control Toolbar */}
      <header className="h-14 bg-[#1C1C1C]/95 border-b border-white/10 px-4 md:px-8 flex items-center justify-between text-white/90 z-20 backdrop-blur-md shrink-0">
        
        {/* Left: Book Title & Book Selection Dropdown Trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsBookMenuOpen(prev => !prev)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-left group cursor-pointer"
            title="點擊切換繪本故事"
          >
            <BookOpen className="w-4 h-4 text-cinnabar shrink-0 group-hover:scale-110 transition-transform" />
            <h1 className="text-sm md:text-base tracking-widest font-serif font-bold text-white/90 group-hover:text-white truncate max-w-[140px] sm:max-w-xs md:max-w-md">
              {currentBook.title}
            </h1>
            <span className="hidden lg:inline-flex items-center gap-1 text-[11px] font-sans px-2 py-0.5 rounded bg-white/10 text-white/60 tracking-wider">
              {layoutMode.includes('saddle') && <Layers className="w-3 h-3 text-cinnabar" />}
              {currentBook.category}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-white/50 group-hover:text-white transition-transform ${isBookMenuOpen ? 'rotate-180' : ''}`} />
          </button>
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
            href={currentBook.pdfUrl}
            download={`${currentBook.title}.pdf`}
            title={`下載 ${currentBook.title} PDF`}
            className="p-1.5 md:p-2 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer ml-1"
          >
            <Download className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Book Selection Drawer / Modal Panel */}
      {isBookMenuOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div 
            onClick={() => setIsBookMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
          />

          <div className="relative z-50 w-full max-w-md bg-[#181818] border-r border-white/10 h-full flex flex-col shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="h-14 px-6 border-b border-white/10 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Library className="w-5 h-5 text-cinnabar" />
                <h2 className="text-base font-serif font-bold tracking-widest">繪本書架選單</h2>
              </div>
              <button
                onClick={() => setIsBookMenuOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <p className="text-xs font-sans text-white/50 tracking-wider">
                選擇想要閱讀的女書繪本故事（共 {STORY_BOOKS.length} 部）：
              </p>

              <div className="grid gap-3.5">
                {STORY_BOOKS.map((book) => {
                  const isSelected = book.id === selectedBookId;
                  const isUpcoming = book.isUpcoming;
                  return (
                    <div
                      key={book.id}
                      onClick={() => handleSelectBook(book)}
                      className={`relative p-4 rounded-xl border transition-all cursor-pointer flex gap-4 ${
                        isSelected 
                          ? 'bg-cinnabar/10 border-cinnabar/60 shadow-[0_0_15px_rgba(184,51,42,0.15)]' 
                          : isUpcoming
                          ? 'bg-white/[0.02] border-white/5 opacity-70 hover:opacity-100'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      {book.coverImage && (
                        <div className="w-16 h-20 rounded overflow-hidden bg-black/30 shrink-0 border border-white/10 relative">
                          <img 
                            src={book.coverImage} 
                            alt={book.title} 
                            className={`w-full h-full object-cover ${isUpcoming ? 'filter grayscale contrast-75' : ''}`} 
                          />
                          {isUpcoming && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-1 text-center">
                              <span className="text-[10px] text-white/80 font-sans tracking-tight">籌備中</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className={`text-[10px] font-sans px-2 py-0.5 rounded ${isUpcoming ? 'bg-amber-500/10 text-amber-300' : 'bg-white/10 text-white/70'}`}>
                              {book.category}
                            </span>
                            {isSelected && (
                              <span className="flex items-center gap-1 text-[11px] font-sans text-cinnabar font-bold">
                                <Check className="w-3.5 h-3.5" /> 正在閱讀
                              </span>
                            )}
                            {isUpcoming && (
                              <span className="text-[10px] font-sans text-amber-400/80">
                                即將推出
                              </span>
                            )}
                          </div>
                          <h3 className={`text-base font-serif font-bold tracking-wide truncate ${isSelected ? 'text-cinnabar' : 'text-white'}`}>
                            {book.title}
                          </h3>
                        </div>
                        <p className="text-xs font-serif text-white/60 line-clamp-2 mt-1 leading-relaxed">
                          {book.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 border-t border-white/10 bg-[#121212]/80 text-[11px] font-sans text-white/40 tracking-wider">
              提示：支援騎馬釘雙頁分割及順序自動解算
            </div>
          </div>
        </div>
      )}

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
            <span className="text-sm font-sans tracking-widest">{currentBook.title} 載入中，請稍候…</span>
          </div>
        )}

        {errorMsg && (
          <div className="flex flex-col items-center gap-4 text-center max-w-md p-6 bg-red-950/20 border border-red-500/30 rounded-sm">
            <p className="text-red-300 font-sans text-sm">{errorMsg}</p>
            <a
              href={currentBook.pdfUrl}
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
            
            {/* Click hotspot on Left for turning back */}
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

            {/* Click hotspot on Right for turning forward */}
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
        <span>滑鼠點擊畫面左右兩側或鍵盤 ← / → 翻頁 · 點擊左上方標題可切換繪本</span>
        <span className="flex items-center gap-2">
          {layoutMode.includes('saddle') && (
            <span className="text-cinnabar/90 bg-cinnabar/10 px-1.5 py-0.2 rounded text-[10px]">
              騎馬釘順序還原中
            </span>
          )}
          <span>第 {currentPage} 頁 / 共 {totalPages} 頁</span>
        </span>
      </footer>
    </div>
  );
}
