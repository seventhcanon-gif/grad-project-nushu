import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GAME_STAGES, GAME_ENDINGS, Trait } from '../data/gameScript';

export default function PictureBook() {
  const [currentStep, setCurrentStep] = useState<number>(-1); // -1 is the start screen
  const [scores, setScores] = useState<Record<Trait, number>>({
    compliance: 0,
    sisterhood: 0,
    labor: 0,
    rebellion: 0,
  });

  const startGame = () => {
    setScores({ compliance: 0, sisterhood: 0, labor: 0, rebellion: 0 });
    setCurrentStep(0);
  };

  const selectChoice = (trait: Trait) => {
    setScores(prev => ({ ...prev, [trait]: prev[trait] + 1 }));
    setCurrentStep(prev => prev + 1);
  };

  const getEnding = () => {
    // Find highest score
    let highestTrait: Trait = 'compliance';
    let maxScore = -1;
    (Object.keys(scores) as Trait[]).forEach((trait) => {
      if (scores[trait] > maxScore) {
        maxScore = scores[trait];
        highestTrait = trait;
      }
    });
    return GAME_ENDINGS.find(e => e.id === highestTrait)!;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-73px)] w-full overflow-hidden bg-paper relative">
      <AnimatePresence mode="wait">
        
        {/* Start Screen */}
        {currentStep === -1 && (
          <motion.div 
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center h-full w-full p-8 text-center"
          >
            <h1 className="text-5xl font-serif text-ink tracking-[0.5em] mb-6">生命史迴圈</h1>
            <p className="text-ink/60 font-sans tracking-widest max-w-md leading-relaxed mb-12">
              透過六個生命切片的選擇，妳將決定自己在這個時代的命運走向。<br/>將會成為哪首女書歌謠的主角？
            </p>
            <button 
              onClick={startGame}
              className="px-10 py-4 border border-ink text-ink hover:bg-ink hover:text-white transition-all font-serif tracking-[0.3em] text-lg"
            >
              開啟命運
            </button>
          </motion.div>
        )}

        {/* Game Stages */}
        {currentStep >= 0 && currentStep < GAME_STAGES.length && (
          <motion.div 
            key={`stage-${currentStep}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center h-full w-full p-8 md:p-24 overflow-y-auto custom-scrollbar"
          >
            <div className="max-w-2xl w-full">
              <div className="text-cinnabar font-serif tracking-[0.5em] text-sm mb-4 border-l-2 border-cinnabar pl-4">
                {GAME_STAGES[currentStep].title}
              </div>
              <p className="text-xl md:text-2xl font-serif leading-loose tracking-[0.1em] text-ink mb-12 text-justify">
                {GAME_STAGES[currentStep].description}
              </p>

              <div className="flex flex-col gap-4 w-full">
                {GAME_STAGES[currentStep].choices.map((choice, index) => (
                  <motion.button
                    key={choice.id}
                    whileHover={{ scale: 1.01, backgroundColor: 'rgba(44, 44, 44, 0.05)' }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => selectChoice(choice.trait)}
                    className="w-full text-left p-6 border border-ink/20 text-ink/80 font-sans tracking-widest leading-relaxed hover:border-cinnabar transition-colors relative group"
                  >
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-cinnabar opacity-0 group-hover:opacity-100 transition-opacity">
                      ❖
                    </span>
                    <span className="group-hover:ml-6 transition-all duration-300 block">
                      {choice.text}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Ending Screen */}
        {currentStep === GAME_STAGES.length && (() => {
          const ending = getEnding();
          return (
            <motion.div 
              key="ending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="flex flex-col md:flex-row h-full w-full"
            >
              {/* Ending Image */}
              <div className="flex-1 w-full h-[40vh] md:h-full relative overflow-hidden bg-ink/10 flex items-center justify-center">
                <motion.img 
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 5, ease: "easeOut" }}
                  src={ending.imgSrc} 
                  alt={ending.title} 
                  className="w-full h-full object-cover opacity-90 mix-blend-multiply" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-paper/80 to-transparent md:bg-gradient-to-r md:from-transparent md:to-paper"></div>
              </div>
              
              {/* Ending Text */}
              <div className="flex-1 flex flex-col justify-center p-8 md:p-16 lg:p-24 overflow-y-auto custom-scrollbar bg-paper">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <div className="text-sm font-sans tracking-[0.5em] text-ink/50 mb-2 uppercase">FINAL DESTINATION</div>
                  <h2 className="text-4xl md:text-5xl font-serif text-cinnabar mb-8 tracking-widest">
                    {ending.title}
                  </h2>
                  <div className="text-lg md:text-xl font-serif text-ink italic leading-loose tracking-widest mb-10 border-b border-ink/10 pb-10">
                    {ending.quote}
                  </div>
                  <div className="text-base font-serif text-ink/80 leading-[2.5em] tracking-widest whitespace-pre-wrap text-justify mb-16">
                    {ending.fullText}
                  </div>
                  
                  <button 
                    onClick={startGame}
                    className="px-8 py-3 bg-ink text-white hover:bg-cinnabar focus:outline-none transition-colors font-sans tracking-widest text-sm"
                  >
                    重啟迴圈
                  </button>
                </motion.div>
              </div>
            </motion.div>
          );
        })()}

      </AnimatePresence>
    </div>
  );
}
