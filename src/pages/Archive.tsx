import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_ARCHIVE, FILTER_CATEGORIES } from '../data/archive';

export default function Archive() {
  const [filter, setFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<typeof MOCK_ARCHIVE[0] | null>(null);

  const filteredData = filter === 'all' 
    ? MOCK_ARCHIVE 
    : MOCK_ARCHIVE.filter(d => d.category === filter);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 py-12 w-full"
    >
      <h2 className="text-4xl font-serif text-ink mb-8 border-b border-ink/20 pb-4">圖錄考據</h2>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-12">
        {FILTER_CATEGORIES.map(cat => (
          <button 
            key={cat.id}
            onClick={() => setFilter(cat.id)} 
            className={`px-4 py-2 border text-sm font-sans tracking-widest ${filter === cat.id ? 'border-cinnabar text-cinnabar bg-cinnabar/5' : 'border-ink/10 text-ink/70'} hover:border-cinnabar hover:text-cinnabar transition-all shadow-sm`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <AnimatePresence>
          {filteredData.map(item => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white/50 border border-ink/10 p-8 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg hover:border- cinnabar/50 transition-all aspect-square relative group"
            >
              <div className="flex items-center justify-center gap-6 mb-4">
                <div className="text-6xl font-serif group-hover:text-cinnabar transition-colors">{item.char}</div>
                {/* Image Placeholder representing the Nüshu script */}
                <div className="w-12 h-24 border border-ink/10 bg-ink/5 relative flex items-center justify-center overflow-hidden group-hover:border-cinnabar/30 transition-colors">
                  {/* <span className="text-[10px] text-ink/30 writing-vertical-rl tracking-widest">圖片佔位</span> */}
                  <img src={item.nushuImg} alt="女書圖片" className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </div>
              <div className="text-xs text-ink/50 tracking-widest">{item.era}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-paper/95 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-ink/20 max-w-2xl w-full p-12 flex flex-col items-center shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 text-2xl text-ink/50 hover:text-cinnabar"
              >
                ×
              </button>
              <div className="flex gap-16 mb-8 items-center justify-center">
                <div className="text-[120px] font-serif leading-none text-ink">{selectedItem.char}</div>
                <div className="w-24 h-48 border border-ink/10 bg-ink/5 relative flex items-center justify-center">
                   <img src={selectedItem.nushuImg} alt="女書對應字" className="absolute inset-0 w-full h-full object-contain" />
                </div>
              </div>
              <div className="w-full border-t border-ink/10 pt-8 flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h3 className="text-sm tracking-widest text-cinnabar mb-2 font-bold select-none text-opacity-80">文本來源</h3>
                  <p className="text-xl font-serif">{selectedItem.era}</p>
                </div>
                <div className="flex-[2]">
                  <h3 className="text-sm tracking-widest text-cinnabar mb-2 font-bold select-none text-opacity-80">考據意義</h3>
                  <p className="text-lg leading-relaxed text-ink/80">{selectedItem.meaning}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
