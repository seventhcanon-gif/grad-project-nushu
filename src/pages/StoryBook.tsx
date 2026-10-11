import { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  BookOpen, 
  Download, 
  Maximize2,
  FileText
} from 'lucide-react';

export default function StoryBook() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(48); // Total pages of the PDF picture book
  const [scale, setScale] = useState(1);
  const [isDualPage, setIsDualPage] = useState(false);
  const [pageInput, setPageInput] = useState('1');
  const [useIframeFallback, setUseIframeFallback] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const pdfUrl = '/assets/pdf/chuanxie-fanmian-nyushu.pdf';

  // Handle page navigation
  const goToNextPage = () => {
    const step = isDualPage ? 2 : 1;
    setCurrentPage(prev => Math.min(prev + step, totalPages));
  };

  const goToPrevPage = () => {
    const step = isDualPage ? 2 : 1;
    setCurrentPage(prev => Math.max(prev - step, 1));
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

  useEffect(() => {
    setPageInput(currentPage.toString());
  }, [currentPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrevPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages, isDualPage]);

  return (
    <div className="flex flex-col h-[calc(100vh-73px)] w-full bg-[#181818] select-none overflow-hidden relative font-serif">
      {/* Top Header / Control Toolbar */}
      <header className="h-14 bg-[#222222]/95 border-b border-white/10 px-4 md:px-8 flex items-center justify-between text-white/90 z-20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-cinnabar" />
          <h1 className="text-base md:text-lg tracking-widest font-serif font-bold truncate max-w-[200px] md:max-w-md">
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
            disabled={currentPage <= 1}
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
            <span className="text-white/60 min-w-6">{totalPages || '…'}</span>
          </form>

          <button
            onClick={goToNextPage}
            disabled={currentPage >= totalPages}
            title="下一頁 (→)"
            className="p-1.5 md:p-2 rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        {/* Right: View & Zoom Tools */}
        <div className="flex items-center gap-1 md:gap-2">
          <button
            onClick={() => setScale(s => Math.max(0.7, s - 0.15))}
            title="縮小"
            className="p-1.5 md:p-2 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <span className="text-xs font-sans text-white/50 hidden sm:inline-block w-12 text-center">
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={() => setScale(s => Math.min(2.0, s + 0.15))}
            title="放大"
            className="p-1.5 md:p-2 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={() => setScale(1)}
            title="重設大小"
            className="p-1.5 md:p-2 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsDualPage(prev => !prev)}
            title={isDualPage ? "切換至單頁閱讀" : "切換至雙頁展開閱讀"}
            className={`p-1.5 md:p-2 rounded transition-colors hidden sm:flex items-center gap-1 text-xs cursor-pointer ${
              isDualPage ? 'bg-cinnabar/20 text-cinnabar border border-cinnabar/40' : 'hover:bg-white/10 text-white/70 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span className="text-[11px]">{isDualPage ? '雙頁' : '單頁'}</span>
          </button>

          <button
            onClick={() => setUseIframeFallback(prev => !prev)}
            title="切換內建閱讀模式 / 瀏覽器原生效能模式"
            className={`p-1.5 md:p-2 rounded text-xs transition-colors hidden lg:flex items-center gap-1 cursor-pointer ${
              useIframeFallback ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/50 hover:text-white'
            }`}
          >
            <Maximize2 className="w-4 h-4" />
            <span className="text-[11px]">{useIframeFallback ? '繪本頁' : '原生預覽'}</span>
          </button>

          <a
            href={pdfUrl}
            download="《穿越扇面：遇見女書》.pdf"
            title="下載繪本 PDF"
            className="p-1.5 md:p-2 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer ml-1"
          >
            <Download className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Main Content Viewer Area */}
      <main 
        ref={containerRef}
        className="flex-1 w-full h-full overflow-auto flex items-center justify-center p-2 md:p-6 relative bg-[#121212]"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #1e1e1e 0%, #111111 100%)'
        }}
      >
        {useIframeFallback ? (
          /* Browser Native PDF Engine mode */
          <div className="w-full h-full max-w-6xl shadow-2xl rounded-sm overflow-hidden border border-white/10">
            <iframe
              src={`${pdfUrl}#page=${currentPage}&toolbar=1&navpanes=0`}
              className="w-full h-full border-0"
              title="《穿越扇面：遇見女書》"
            />
          </div>
        ) : (
          /* Interactive PictureBook Canvas with Left/Right Click Nav */
          <div 
            className="relative flex items-center justify-center transition-transform duration-200 ease-out shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10 rounded-sm overflow-hidden bg-black/40"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
              maxWidth: isDualPage ? '96%' : '88%',
              maxHeight: '92%'
            }}
          >
            {/* Embedded Native Interactive PDF Viewer with Page Anchor */}
            <div className="w-[85vw] max-w-[1000px] h-[75vh] md:h-[82vh] relative">
              <object
                data={`${pdfUrl}#page=${currentPage}&view=FitH&toolbar=0&navpanes=0`}
                type="application/pdf"
                className="w-full h-full rounded-sm"
              >
                <div className="flex flex-col items-center justify-center h-full p-8 text-center text-white/80">
                  <p className="text-lg mb-4">無法直接在預覽框渲染 PDF</p>
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-cinnabar text-white rounded font-sans text-sm tracking-widest hover:opacity-90"
                  >
                    在獨立視窗開啟《穿越扇面：遇見女書》
                  </a>
                </div>
              </object>
            </div>

            {/* Click hotspots on left & right margins for intuitive page turning */}
            <button
              onClick={goToPrevPage}
              disabled={currentPage <= 1}
              aria-label="點擊翻上一頁"
              className="absolute left-0 top-0 bottom-0 w-16 md:w-24 group hover:bg-black/30 transition-all flex items-center justify-start pl-4 cursor-pointer disabled:pointer-events-none"
            >
              <span className="p-3 rounded-full bg-black/60 text-white/70 group-hover:text-white group-hover:scale-110 transition-all opacity-0 group-hover:opacity-100 shadow-lg">
                <ChevronLeft className="w-6 h-6" />
              </span>
            </button>

            <button
              onClick={goToNextPage}
              disabled={currentPage >= totalPages}
              aria-label="點擊翻下一頁"
              className="absolute right-0 top-0 bottom-0 w-16 md:w-24 group hover:bg-black/30 transition-all flex items-center justify-end pr-4 cursor-pointer disabled:pointer-events-none"
            >
              <span className="p-3 rounded-full bg-black/60 text-white/70 group-hover:text-white group-hover:scale-110 transition-all opacity-0 group-hover:opacity-100 shadow-lg">
                <ChevronRight className="w-6 h-6" />
              </span>
            </button>
          </div>
        )}
      </main>

      {/* Subtle bottom info bar */}
      <footer className="h-8 bg-[#181818] border-t border-white/5 px-6 flex items-center justify-between text-[11px] font-sans text-white/40 tracking-wider">
        <span>鍵盤 ← / → 或滑鼠點擊左右兩側可翻頁</span>
        <span>女書文化繪本 · 數位展示藏書</span>
      </footer>
    </div>
  );
}
