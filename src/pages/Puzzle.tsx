import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, useDraggable, useDroppable, DragEndEvent } from '@dnd-kit/core';
import { MOCK_ARCHIVE, FILTER_CATEGORIES } from '../data/archive';

// Exclude 'all' from categories for the game
const GAME_CATEGORIES = FILTER_CATEGORIES.filter(c => c.id !== 'all');

// --- Subcomponents ---

function DraggableCard({ item, isPlaced }: { item: any, isPlaced: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `card-${item.id}`,
    data: item,
    disabled: isPlaced,
  });
  
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: isDragging ? 50 : 1,
  } : undefined;

  if (isPlaced) return null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`relative w-24 h-32 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing bg-white/90 border border-ink/20 shadow-md transform-gpu hover:-translate-y-2 transition-transform ${isDragging ? 'shadow-2xl scale-110 !border-cinnabar rotate-3' : ''}`}
    >
      <div className="absolute inset-1 border border-ink/5 pointer-events-none"></div>
      <div className={`text-5xl font-serif ${isDragging ? 'text-cinnabar' : 'text-ink'}`}>{item.char}</div>
      <div className="mt-4 w-6 h-12 border border-ink/10 bg-ink/5 flex items-center justify-center opacity-70">
        <img src={item.nushuImg} alt="nushu" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

function CategoryDropZone({ category, placedItem }: { category: any, placedItem: any | null }) {
  const { isOver, setNodeRef } = useDroppable({ 
    id: category.id,
    data: category
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-32 h-48 flex flex-col items-center justify-center relative border-2 border-dashed transition-all ${
        isOver && !placedItem ? 'border-cinnabar bg-cinnabar/5 scale-105' : 
        placedItem ? 'border-ink bg-white/50 border-solid drop-shadow-sm' : 
        'border-ink/20 bg-ink/5'
      }`}
    >
      {!placedItem && (
        <span className="text-lg font-serif tracking-widest text-ink/40 pointer-events-none select-none writing-vertical-rl">
          【{category.label}】
        </span>
      )}
      {placedItem && (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center w-full h-full justify-center text-ink gap-4"
        >
          <span className="text-sm font-sans text-cinnabar/80 tracking-widest border-b border-cinnabar/20 pb-2">
            {category.label}
          </span>
          <span className="text-6xl font-serif">{placedItem.char}</span>
        </motion.div>
      )}
    </div>
  );
}

// --- Main Page Component ---

export default function Puzzle() {
  const [roundCategories, setRoundCategories] = useState<any[]>([]);
  const [roundItems, setRoundItems] = useState<any[]>([]);
  const [placedMatches, setPlacedMatches] = useState<Record<string, any>>({});
  const [isWin, setIsWin] = useState(false);

  // Generate a new round
  const startNewRound = () => {
    // 1. Pick 3 random categories that actually have items in MOCK_ARCHIVE
    const validCats = GAME_CATEGORIES.filter(cat => MOCK_ARCHIVE.some(item => item.category === cat.id));
    const shuffledCats = [...validCats].sort(() => 0.5 - Math.random()).slice(0, 3);
    
    // 2. Pick 1 random item for each selected category
    const selectedItems = shuffledCats.map(cat => {
      const itemsInCat = MOCK_ARCHIVE.filter(item => item.category === cat.id);
      return itemsInCat[Math.floor(Math.random() * itemsInCat.length)];
    });

    // 3. Shuffle the draggable items so their order isn't obvious
    const shuffledItems = [...selectedItems].sort(() => 0.5 - Math.random());

    setRoundCategories(shuffledCats);
    setRoundItems(shuffledItems);
    setPlacedMatches({});
    setIsWin(false);
  };

  // Initialize first round purely on mount
  useEffect(() => {
    startNewRound();
  }, []);

  // Check win condition
  useEffect(() => {
    if (roundCategories.length > 0 && Object.keys(placedMatches).length === 3) {
      setTimeout(() => setIsWin(true), 500);
    }
  }, [placedMatches, roundCategories]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      const draggedItem = active.data.current;
      const targetCategoryId = over.id;

      // Validate exactly matching category
      if (draggedItem?.category === targetCategoryId) {
        setPlacedMatches(prev => ({
          ...prev,
          [targetCategoryId]: draggedItem
        }));
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-8 md:p-12 min-h-[calc(100vh-73px)] relative overflow-hidden bg-paper">
      <h2 className="text-3xl md:text-4xl font-serif text-ink mb-2">文化溯源配對</h2>
      <p className="text-ink/60 font-sans tracking-widest mb-12 text-center text-sm md:text-base">
        請將下方的散落字元，拖曳至其所屬的生命史分類中。
      </p>

      <DndContext onDragEnd={handleDragEnd}>
        {/* Category Drop Zones */}
        <div className="flex flex-wrap justify-center bg-white/30 p-8 border border-ink/10 shadow-inner mb-16 gap-8 w-full max-w-3xl rounded-sm">
          {roundCategories.map(cat => (
            <CategoryDropZone 
              key={cat.id} 
              category={cat} 
              placedItem={placedMatches[cat.id] || null} 
            />
          ))}
        </div>

        {/* Draggable Cards Pool */}
        <div className="flex flex-wrap gap-8 pt-8 w-full max-w-lg justify-center min-h-[160px]">
          {roundItems.map(item => (
            <DraggableCard 
              key={item.id} 
              item={item} 
              isPlaced={Object.values(placedMatches).some(placed => placed.id === item.id)}
            />
          ))}
        </div>
      </DndContext>

      {/* Success Modal */}
      <AnimatePresence>
        {isWin && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-paper/95 backdrop-blur-md p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white border border-ink/20 p-8 md:p-12 max-w-2xl w-full flex flex-col items-center text-center relative shadow-2xl"
            >
              <div className="absolute -top-4 bg-cinnabar text-white px-6 py-1 font-serif tracking-widest text-sm">
                考據成功
              </div>
              
              <h3 className="text-2xl font-serif text-ink mb-8 mt-6">生命史片段組合完成</h3>
              
              <div className="w-full flex flex-col gap-6 mb-10 text-left bg-ink/5 p-6 rounded-sm border border-ink/5">
                {roundCategories.map(cat => {
                  const item = placedMatches[cat.id];
                  return (
                    <div key={cat.id} className="flex flex-col md:flex-row gap-4 md:items-center border-b border-ink/10 pb-4 last:border-0 last:pb-0">
                      <div className="text-4xl font-serif text-cinnabar shrink-0 w-16 text-center">{item.char}</div>
                      <div>
                        <div className="text-xs tracking-widest text-ink/50 mb-1">【{cat.label}】源自：{item.era}</div>
                        <div className="text-sm leading-relaxed text-ink/80">{item.meaning}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button 
                onClick={startNewRound}
                className="px-10 py-3 bg-ink text-white hover:bg-cinnabar focus:outline-none transition-colors font-sans tracking-widest text-sm"
              >
                探索下一組
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
