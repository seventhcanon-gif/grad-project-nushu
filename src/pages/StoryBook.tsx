import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_STORIES, NUSHU_DICTIONARY, Story } from '../data/storyData';

export default function StoryBook() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isNushuMode, setIsNushuMode] = useState(false);

  // Parse text function to replace keywords with Nushu SVG placeholders
  const renderText = (text: string) => {
    if (!isNushuMode) return text;

    // A simple regex to find keywords from our dictionary
    const keywords = Object.keys(NUSHU_DICTIONARY);
    const regex = new RegExp(`(${keywords.join('|')})`, 'g');
    
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      if (NUSHU_DICTIONARY[part]) {
        return (
          <span key={index} className="inline-flex flex-col items-center mx-1 align-bottom">
            <span className="text-xs text-ink/40 mb-0.5">{part}</span>
            <img 
              src={NUSHU_DICTIONARY[part]} 
              alt={part} 
              title={`女書的「${part}」`}
              className="h-8 object-contain opacity-80 mix-blend-multiply" 
            />
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const handleNextPage = () => {
    if (selectedStory && currentPage < selectedStory.pages.length - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const closeStory = () => {
    setSelectedStory(null);
    setCurrentPage(0);
    setIsNushuMode(false);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 lg:p-12">
      <AnimatePresence mode="wait">
        {!selectedStory ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-7xl"
          >
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-serif text-ink mb-4">故事繪本</h1>
              <p className="text-ink/60 font-sans tracking-widest text-sm">點擊進入互動敘事，解構父權符號下的女性樣貌</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MOCK_STORIES.map((story) => (
                <motion.div
                  key={story.id}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  onClick={() => setSelectedStory(story)}
                >
                  <div className="aspect-[4/3] w-full relative overflow-hidden bg-white/50">
                    <img 
                      src={story.cover} 
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-paper to-transparent opacity-60"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-6 text-left">
                    <span className="text-xs font-sans tracking-widest text-cinnabar mb-2 block">{story.theme}</span>
                    <h2 className="text-2xl font-serif text-ink">{story.title}</h2>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="book"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full max-w-6xl bg-paper shadow-2xl rounded-sm overflow-hidden flex flex-col md:flex-row relative min-h-[60vh]"
          >
            <button 
              onClick={closeStory}
              className="absolute top-4 right-4 z-10 text-ink/50 hover:text-ink transition-colors font-sans text-sm tracking-widest"
            >
              [ 返回目錄 ]
            </button>

            {/* Left Page (Image) */}
            <div className="w-full md:w-1/2 relative bg-ink/5 border-r border-ink/10 flex items-center justify-center p-8">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentPage}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  src={selectedStory.pages[currentPage].img}
                  alt={selectedStory.title}
                  className="max-w-full max-h-full object-contain drop-shadow-md mix-blend-multiply"
                />
              </AnimatePresence>
            </div>

            {/* Right Page (Text) */}
            <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-rice-paper">
              <span className="text-sm font-sans tracking-widest text-cinnabar mb-4 opacity-70">
                {selectedStory.title} — {currentPage + 1} / {selectedStory.pages.length}
              </span>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage + (isNushuMode ? '-nushu' : '-regular')}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="font-serif text-xl md:text-2xl leading-loose text-ink mb-12 min-h-[160px]"
                >
                  {renderText(selectedStory.pages[currentPage].text)}
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <div className="mt-auto flex flex-col gap-6">
                <button 
                  onClick={() => setIsNushuMode(!isNushuMode)}
                  className={`self-start px-6 py-2 border rounded-full font-sans text-sm tracking-widest transition-all duration-300 ${
                    isNushuMode 
                      ? 'border-cinnabar bg-cinnabar/5 text-cinnabar' 
                      : 'border-ink/20 text-ink/60 hover:border-ink/50 hover:text-ink'
                  }`}
                >
                  {isNushuMode ? '◎ 還原文本' : '◎ 轉換為女書'}
                </button>

                <div className="flex gap-4 border-t border-ink/10 pt-6">
                  <button 
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                    className="flex-1 py-3 text-center border border-ink/10 text-ink/70 hover:bg-ink/5 disabled:opacity-30 disabled:hover:bg-transparent transition-all font-sans tracking-widest text-sm"
                  >
                    上一頁
                  </button>
                  <button 
                    onClick={handleNextPage}
                    disabled={currentPage === selectedStory.pages.length - 1}
                    className="flex-1 py-3 text-center bg-ink text-paper hover:bg-ink/80 disabled:opacity-30 disabled:hover:bg-ink transition-all font-sans tracking-widest text-sm"
                  >
                    下一頁
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
