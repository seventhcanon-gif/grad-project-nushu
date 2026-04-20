import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_ARCHIVE } from '../data/archive';

type CardType = 'char' | 'meaning';

interface GameCard {
  uid: string;
  refId: number;
  type: CardType;
  item: typeof MOCK_ARCHIVE[0];
}

export default function Puzzle() {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [roundItems, setRoundItems] = useState<typeof MOCK_ARCHIVE>([]);
  const [flippedUids, setFlippedUids] = useState<string[]>([]);
  const [matchedIds, setMatchedIds] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [shakeUids, setShakeUids] = useState<string[]>([]);
  const [isWin, setIsWin] = useState(false);

  const startNewRound = () => {
    const shuffledItems = [...MOCK_ARCHIVE].sort(() => 0.5 - Math.random()).slice(0, 5);
    setRoundItems(shuffledItems);
    
    let newCards: GameCard[] = [];
    shuffledItems.forEach(item => {
      newCards.push({ uid: `char-${item.id}`, refId: item.id, type: 'char', item });
      newCards.push({ uid: `mean-${item.id}`, refId: item.id, type: 'meaning', item });
    });
    
    setCards(newCards.sort(() => 0.5 - Math.random()));
    setFlippedUids([]);
    setMatchedIds([]);
    setShakeUids([]);
    setIsLocked(false);
    setIsWin(false);
  };

  useEffect(() => {
    startNewRound();
  }, []);

  useEffect(() => {
    if (cards.length > 0 && matchedIds.length === 5) {
      setTimeout(() => setIsWin(true), 800);
    }
  }, [matchedIds, cards]);

  const handleCardClick = (card: GameCard) => {
    if (isLocked) return;
    if (flippedUids.includes(card.uid)) return;
    if (matchedIds.includes(card.refId)) return;

    const newFlipped = [...flippedUids, card.uid];
    setFlippedUids(newFlipped);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      const card1 = cards.find(c => c.uid === newFlipped[0])!;
      const card2 = card;

      if (card1.refId === card2.refId) {
        // Match condition
        setTimeout(() => {
          setMatchedIds(prev => [...prev, card1.refId]);
          setFlippedUids([]);
          setIsLocked(false);
        }, 500);
      } else {
        // Incorrect condition
        setShakeUids(newFlipped);
        setTimeout(() => {
          setShakeUids([]);
          setFlippedUids([]);
          setIsLocked(false);
        }, 1200);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-6 md:p-12 min-h-[calc(100vh-73px)] relative overflow-hidden bg-paper w-full">
      <h2 className="text-3xl md:text-4xl font-serif text-ink mb-2">字義消消樂</h2>
      <p className="text-ink/60 font-sans tracking-widest mb-10 text-center text-sm md:text-base max-w-lg">
        在十張混亂的記憶碎片中，翻開牌面並找出「女書字元」與其「背後意義」的唯美配對。
      </p>

      {/* Grid container */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 md:gap-6 w-full max-w-4xl perspective-[1000px]">
        {cards.map(card => {
          const isFlipped = flippedUids.includes(card.uid) || matchedIds.includes(card.refId);
          const isMatched = matchedIds.includes(card.refId);
          const isShaking = shakeUids.includes(card.uid);

          return (
            <motion.div
              key={card.uid}
              className="relative w-full aspect-[3/4] cursor-pointer transform-style-3d"
              onClick={() => handleCardClick(card)}
              animate={
                isShaking ? { x: [-10, 10, -10, 10, 0] } : 
                isMatched ? { scale: 0.95, opacity: 0.3 } : 
                {}
              }
              transition={{ duration: isShaking ? 0.4 : 0.6 }}
              whileHover={!isFlipped && !isLocked ? { scale: 1.05 } : {}}
            >
              <motion.div 
                className="w-full h-full absolute top-0 left-0 preserve-3d transition-transform duration-500"
                style={{ rotateY: isFlipped ? 180 : 0 }}
              >
                {/* Back of card (Texture) */}
                <div className="absolute w-full h-full bg-ink/5 border-2 border-ink/10 flex items-center justify-center backface-hidden shadow-sm">
                  <div className="w-10 h-10 border border-ink/20 rotate-45 flex items-center justify-center opacity-30">
                    <div className="w-6 h-6 border border-ink/20"></div>
                  </div>
                </div>

                {/* Front of card (Content) */}
                <div 
                  className="absolute w-full h-full bg-white border border-cinnabar/30 flex items-center justify-center backface-hidden shadow-md flex-col p-4 text-center overflow-hidden"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <div className="absolute inset-1 border border-ink/5 pointer-events-none"></div>
                  {card.type === 'char' ? (
                    <>
                      <span className="text-4xl md:text-5xl font-serif text-cinnabar mb-3">{card.item.char}</span>
                      <img src={card.item.nushuImg} alt="nushu" className="h-10 md:h-12 object-contain opacity-70" />
                    </>
                  ) : (
                    <span className="text-sm md:text-base font-serif leading-relaxed text-ink/80 tracking-widest px-2">
                      {card.item.meaning}
                    </span>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {isWin && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-paper/95 backdrop-blur-sm p-4 overflow-y-auto custom-scrollbar"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white border md:my-auto my-8 border-ink/20 p-8 md:p-12 max-w-3xl w-full flex flex-col items-center relative shadow-2xl"
            >
              <div className="absolute -top-4 bg-cinnabar text-white px-8 py-1 font-serif tracking-widest text-sm">
                結算：文化收攏
              </div>
              
              <h3 className="text-2xl font-serif text-ink mb-2 mt-4">記憶重組成功</h3>
              <p className="text-sm text-ink/50 tracking-widest mb-10 font-sans">以下為本次尋回的 5 個女書文化涵義</p>
              
              <div className="w-full flex flex-col gap-4 mb-10 text-left bg-ink/5 p-4 md:p-8 rounded-sm">
                {roundItems.map(item => (
                  <div key={item.id} className="flex flex-col md:flex-row gap-6 md:items-center py-4 border-b border-ink/10 last:border-0 hover:bg-white/50 transition-colors px-4 -mx-4">
                    <div className="flex gap-4 items-center shrink-0 w-32 border-r border-ink/10 pr-4">
                      <div className="text-4xl font-serif text-cinnabar">{item.char}</div>
                      <img src={item.nushuImg} alt="nushu" className="h-12 object-contain mix-blend-multiply opacity-80" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-sans tracking-widest text-ink/40 mb-1">【{item.era}】</div>
                      <div className="text-base font-serif leading-loose text-ink/90 tracking-widest max-w-lg">
                        {item.meaning}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={startNewRound}
                className="px-10 py-3 bg-ink text-white hover:bg-cinnabar focus:outline-none transition-colors font-sans tracking-widest text-sm"
              >
                探索下一局
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .perspective-[1000px] { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
}
