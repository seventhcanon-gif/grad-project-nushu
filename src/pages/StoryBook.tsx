import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TWENTY_CHARS_DATA } from '../data/twentyCharsData';

export default function StoryBook() {
  const [currentIndex, setCurrentIndex] = useState(-1); // -1 is start screen, 20 is end screen
  const [phase, setPhase] = useState<'event' | 'emotion' | 'semantic'>('event');

  const startGame = () => {
    setCurrentIndex(0);
    setPhase('event');
  };

  const nextPhase = () => {
    if (phase === 'event') setPhase('emotion');
    else if (phase === 'emotion') setPhase('semantic');
  };

  const nextCharacter = () => {
    if (currentIndex < TWENTY_CHARS_DATA.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setPhase('event');
    } else {
      setCurrentIndex(TWENTY_CHARS_DATA.length); // End screen
    }
  };

  // Start Screen
  if (currentIndex === -1) {
    return (
      <div className="flex flex-col h-[calc(100vh-73px)] w-full overflow-hidden bg-[#F4EFEA] relative">
        <motion.div 
          key="start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center h-full w-full p-8 text-center"
        >
          <div className="text-sm font-sans tracking-[0.5em] text-ink/50 mb-4 uppercase">故事繪本</div>
          <h1 className="text-5xl md:text-6xl font-serif text-ink tracking-[0.5em] mb-8">浮生廿字</h1>
          <p className="text-ink/60 font-sans tracking-widest max-w-md leading-relaxed mb-16">
            以 20 個「女」字旁漢字為引，<br/>走入女性成長與自我認同的生命軌跡。<br/><br/>
            透過事件、情緒與語義的轉化，<br/>體驗語言符號背後的文化覺醒。
          </p>
          <button 
            onClick={startGame}
            className="px-10 py-4 border border-ink text-ink hover:bg-ink hover:text-white transition-all font-serif tracking-[0.3em] text-lg"
          >
            翻開繪本
          </button>
        </motion.div>
      </div>
    );
  }

  // End Screen
  if (currentIndex === TWENTY_CHARS_DATA.length) {
    return (
      <div className="flex flex-col h-[calc(100vh-73px)] w-full overflow-hidden bg-[#F4EFEA] relative">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="flex flex-col items-center justify-center h-full w-full p-8 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-cinnabar mb-8 tracking-widest">
            完滿
          </h2>
          <div className="text-lg md:text-xl font-serif text-ink italic leading-loose tracking-widest mb-10 border-b border-ink/10 pb-10">
            「不再是傳統的女與子，而是生命本身的完整與和解。」
          </div>
          <button 
            onClick={startGame}
            className="px-8 py-3 bg-ink text-white hover:bg-cinnabar focus:outline-none transition-colors font-sans tracking-widest text-sm"
          >
            重新閱讀
          </button>
        </motion.div>
      </div>
    );
  }

  const currentData = TWENTY_CHARS_DATA[currentIndex];

  // Calculate visual styles based on phase
  const getBackgroundColor = () => {
    if (phase === 'event') return 'bg-[#F9F7F5]'; // Light background for events
    if (phase === 'emotion') return 'bg-[#1A1A1A]'; // Dark/intense for emotion
    return 'bg-[#F4EFEA]'; // Return to paper color for semantic
  };

  const getTextColor = () => {
    if (phase === 'emotion') return 'text-[#F0F0F0]';
    return 'text-[#2C2C2C]';
  };

  const getCharacterStyle = () => {
    if (phase === 'event') return { scale: 1, opacity: 0.9, letterSpacing: 'normal' };
    if (phase === 'emotion') return { scale: 1.1, opacity: 0.3, filter: 'blur(2px)' }; // Distorted
    return { scale: 1.2, opacity: 1, textShadow: '0 0 20px rgba(200,160,120,0.5)' }; // Radiant
  };

  return (
    <div className={`flex flex-col h-[calc(100vh-73px)] w-full overflow-hidden transition-colors duration-1000 ${getBackgroundColor()} relative`}>
      
      {/* Background Gradient overlay corresponding to stage */}
      <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${currentData.colorClass} mix-blend-multiply transition-opacity duration-1000`} />
      <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 p-8 md:p-16">
        
        {/* Stage Indicator */}
        <motion.div 
          key={`stage-${currentData.stage}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`absolute top-8 left-8 md:top-12 md:left-12 text-sm font-sans tracking-[0.3em] ${getTextColor()} opacity-50`}
        >
          階段 {currentData.stage}：{currentData.stageTitle}
        </motion.div>

        {/* Progress */}
        <div className={`absolute top-8 right-8 md:top-12 md:right-12 text-sm font-serif ${getTextColor()} opacity-50 tracking-widest`}>
          {currentIndex + 1} / 20
        </div>

        {/* Main Character Display */}
        <div className="relative mb-16 flex flex-col items-center">
          <motion.div
            key={`char-${currentData.id}-${phase}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={getCharacterStyle()}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className={`text-8xl md:text-[10rem] font-serif ${phase === 'emotion' ? 'text-cinnabar' : getTextColor()}`}
            style={{ fontFamily: '"Noto Serif TC", serif' }}
          >
            {currentData.char}
          </motion.div>
          <motion.div 
            className={`text-sm tracking-[0.5em] mt-4 opacity-40 font-sans ${getTextColor()}`}
            animate={{ opacity: phase === 'emotion' ? 0 : 0.4 }}
          >
            {currentData.pinyin}
          </motion.div>
        </div>

        {/* Text Content Layer */}
        <div className="h-48 flex items-center justify-center max-w-2xl w-full text-center">
          <AnimatePresence mode="wait">
            {phase === 'event' && (
              <motion.div
                key="event"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className={`text-xl md:text-2xl font-serif leading-loose tracking-[0.1em] ${getTextColor()}`}
              >
                {currentData.eventText}
              </motion.div>
            )}

            {phase === 'emotion' && (
              <motion.div
                key="emotion"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className={`text-xl md:text-2xl font-serif italic leading-loose tracking-[0.2em] text-white`}
              >
                {currentData.emotionText}
              </motion.div>
            )}

            {phase === 'semantic' && (
              <motion.div
                key="semantic"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1 }}
                className={`text-xl md:text-2xl font-serif leading-loose tracking-[0.1em] text-[#C8A078]`}
              >
                {currentData.semanticConversionText}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Interaction Controls */}
        <div className="mt-16 flex flex-col items-center h-20">
          <AnimatePresence mode="wait">
            {phase === 'event' && (
              <motion.button
                key="btn-event"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={nextPhase}
                className="group flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full border border-ink/30 flex items-center justify-center group-hover:border-ink transition-colors cursor-pointer">
                  <div className="w-2 h-2 rounded-full bg-ink/30 group-hover:bg-ink transition-colors" />
                </div>
                <span className="text-xs font-sans tracking-[0.3em] text-ink/50 mt-4 group-hover:text-ink transition-colors">深入內在</span>
              </motion.button>
            )}

            {phase === 'emotion' && (
              <motion.button
                key="btn-emotion"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={nextPhase}
                className="group flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white transition-colors cursor-pointer">
                  <div className="w-3 h-3 bg-white/30 group-hover:bg-white rotate-45 transition-colors" />
                </div>
                <span className="text-xs font-sans tracking-[0.3em] text-white/50 mt-4 group-hover:text-white transition-colors">覺醒</span>
              </motion.button>
            )}

            {phase === 'semantic' && (
              <motion.button
                key="btn-semantic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={nextCharacter}
                className="group flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full border border-[#C8A078]/50 flex items-center justify-center group-hover:border-[#C8A078] transition-colors cursor-pointer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#C8A078] opacity-50 group-hover:opacity-100 transition-opacity">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-xs font-sans tracking-[0.3em] text-[#C8A078]/70 mt-4 group-hover:text-[#C8A078] transition-colors">
                  {currentIndex < TWENTY_CHARS_DATA.length - 1 ? '下一字' : '完結'}
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
