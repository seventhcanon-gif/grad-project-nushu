import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MATCHING_GAME_STAGES, GAME_CONCLUSION, WordOption } from '../data/gameScript';

// Typewriter hook for narrative immersion
const useTypewriter = (text: string, speed: number = 50) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, speed]);
  
  return displayedText;
};

export default function PictureBook() {
  const [currentStageIndex, setCurrentStageIndex] = useState(-1); // -1 = start, 4 = end
  const [selectedOption, setSelectedOption] = useState<WordOption | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const startGame = () => {
    setCurrentStageIndex(0);
    setSelectedOption(null);
    setShowQuestion(false);
  };

  const handleOptionClick = (option: WordOption) => {
    setSelectedOption(option);
    if (!option.isCorrect) {
      // Trigger shake animation
      setShakeKey(prev => prev + 1);
    }
  };

  const nextStage = () => {
    if (currentStageIndex < MATCHING_GAME_STAGES.length - 1) {
      setCurrentStageIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowQuestion(false);
    } else {
      setCurrentStageIndex(MATCHING_GAME_STAGES.length);
    }
  };

  // Start Screen
  if (currentStageIndex === -1) {
    return (
      <div className="flex flex-col h-[calc(100vh-73px)] w-full bg-[#1A1A1A] relative items-center justify-center text-center p-8">
        <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10 max-w-2xl"
        >
          <div className="text-sm font-sans tracking-[0.5em] text-white/50 mb-4 uppercase">TRPG 角色扮演</div>
          <h1 className="text-5xl md:text-6xl font-serif text-white tracking-[0.3em] mb-8">文字配對</h1>
          <p className="text-white/70 font-serif tracking-widest leading-loose mb-12 text-justify">
            這是一場結合「文字學習」與「情境演繹」的互動體驗。妳將進入不同女性角色的生命視角，透過閱讀她們的處境，選出最符合該情境的「女」字旁漢字。
            <br/><br/>
            在錯誤與修正中，逐步解開語言符號背後的文化枷鎖。
          </p>
          <button 
            onClick={startGame}
            className="px-12 py-4 border border-white/50 text-white hover:bg-white hover:text-black transition-all font-serif tracking-[0.3em] text-lg"
          >
            進入視角
          </button>
        </motion.div>
      </div>
    );
  }

  // End Screen
  if (currentStageIndex === MATCHING_GAME_STAGES.length) {
    return (
      <div className="flex flex-col h-[calc(100vh-73px)] w-full bg-[#F4EFEA] relative items-center justify-center text-center p-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="max-w-3xl z-10"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-cinnabar mb-12 tracking-widest">
            語義的重塑
          </h2>
          <div className="text-lg md:text-xl font-serif text-ink leading-loose tracking-widest mb-16 border-t border-b border-ink/10 py-10 text-justify">
            {GAME_CONCLUSION}
          </div>
          <button 
            onClick={startGame}
            className="px-8 py-3 bg-ink text-white hover:bg-cinnabar focus:outline-none transition-colors font-sans tracking-widest text-sm"
          >
            重新體驗
          </button>
        </motion.div>
      </div>
    );
  }

  const currentStage = MATCHING_GAME_STAGES[currentStageIndex];

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-73px)] w-full overflow-hidden bg-[#1E1E1E] relative">
      <div className={`absolute inset-0 opacity-30 bg-gradient-to-br ${currentStage.colorClass} transition-opacity duration-1000`} />
      <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      {/* Left: Narrative Area */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative z-10 border-b md:border-b-0 md:border-r border-white/10 overflow-y-auto">
        <motion.div 
          key={`header-${currentStage.id}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <div className="text-cinnabar font-serif tracking-[0.3em] text-sm mb-2">
            {currentStage.title}
          </div>
          <div className="text-3xl font-serif text-white tracking-widest">
            視角：{currentStage.perspective}
          </div>
        </motion.div>

        <div className="min-h-[200px]">
          <TypewriterText 
            text={currentStage.scenario} 
            onComplete={() => setShowQuestion(true)} 
          />
          
          <AnimatePresence>
            {showQuestion && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-8 text-xl font-serif text-white/90 italic tracking-widest leading-loose"
              >
                {currentStage.question}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right: Interaction Area */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center items-center relative z-10 bg-black/20">
        <AnimatePresence>
          {showQuestion && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-full max-w-md"
            >
              <div className="text-center text-white/40 tracking-[0.5em] text-xs mb-8 uppercase">請選擇符號</div>
              
              <motion.div 
                key={shakeKey} // change key to trigger shake animation on wrong choice
                animate={shakeKey > 0 ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-3 gap-4 mb-12"
              >
                {currentStage.options.map((opt, idx) => {
                  const isSelected = selectedOption?.char === opt.char;
                  const isSuccess = isSelected && opt.isCorrect;
                  const isFail = isSelected && !opt.isCorrect;
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => !selectedOption?.isCorrect && handleOptionClick(opt)}
                      disabled={selectedOption?.isCorrect}
                      className={`
                        aspect-square flex items-center justify-center text-4xl md:text-5xl font-serif border transition-all duration-300
                        ${isSuccess ? 'bg-[#C8A078] border-[#C8A078] text-white shadow-[0_0_30px_rgba(200,160,120,0.6)] scale-110' : 
                          isFail ? 'bg-red-900/30 border-red-500/50 text-red-200' : 
                          'bg-transparent border-white/20 text-white hover:border-white/60 hover:bg-white/5'}
                      `}
                    >
                      {opt.char}
                    </button>
                  );
                })}
              </motion.div>

              {/* Feedback Area */}
              <div className="min-h-[120px] w-full">
                <AnimatePresence mode="wait">
                  {selectedOption && !selectedOption.isCorrect && (
                    <motion.div
                      key="fail"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 border border-red-500/30 bg-red-900/10 text-red-200/90 font-sans tracking-widest text-sm leading-relaxed"
                    >
                      <span className="text-red-500 mr-2">✗</span> {selectedOption.feedback}
                    </motion.div>
                  )}

                  {selectedOption && selectedOption.isCorrect && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center"
                    >
                      <div className="p-6 border border-[#C8A078]/50 bg-[#C8A078]/10 text-[#E8C098] font-serif tracking-widest leading-loose text-center mb-8">
                        {currentStage.successSemantic}
                      </div>
                      <button 
                        onClick={nextStage}
                        className="px-8 py-3 border border-[#C8A078] text-[#C8A078] hover:bg-[#C8A078] hover:text-white transition-all tracking-[0.3em] font-sans text-sm"
                      >
                        {currentStageIndex < MATCHING_GAME_STAGES.length - 1 ? '進入下一幕' : '完成體驗'}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Helper component for typewriter effect to avoid re-rendering whole parent
function TypewriterText({ text, onComplete }: { text: string, onComplete: () => void }) {
  const displayedText = useTypewriter(text, 40);
  
  useEffect(() => {
    if (displayedText.length === text.length) {
      const timeout = setTimeout(onComplete, 500);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, text.length, onComplete]);

  return (
    <div className="text-xl md:text-2xl font-serif text-white/80 leading-loose tracking-widest text-justify">
      {displayedText}
      {displayedText.length < text.length && <span className="animate-pulse">|</span>}
    </div>
  );
}
