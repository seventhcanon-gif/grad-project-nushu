import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_ARCHIVE, FILTER_CATEGORIES } from '../data/archive';

function SocialFloatingBar() {
  const socialLinks = [
    {
      name: "Facebook",
      url: "https://facebook.com",
      color: "hover:bg-[#1877F2]/10 hover:border-[#1877F2]/30",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#1877F2]" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: "Instagram",
      url: "https://instagram.com",
      color: "hover:bg-[#E4405F]/10 hover:border-[#E4405F]/30",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="ig-grad" cx="30%" cy="107%" r="130%" fx="30%" fy="107%">
              <stop offset="0%" stopColor="#fdf497" />
              <stop offset="5%" stopColor="#fdf497" />
              <stop offset="45%" stopColor="#fd5949" />
              <stop offset="60%" stopColor="#d6249f" />
              <stop offset="90%" stopColor="#285AEB" />
            </radialGradient>
          </defs>
          <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      )
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
      color: "hover:bg-black/5 hover:border-black/30",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: "YouTube",
      url: "https://youtube.com",
      color: "hover:bg-[#FF0000]/10 hover:border-[#FF0000]/30",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#FF0000]" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.519 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.519 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    }
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-6 p-4 bg-white/90 border border-ink/10 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md"
    >
      <div className="text-[10px] tracking-[0.2em] font-sans text-ink/30 writing-vertical-rl mb-2 uppercase select-none">
        社群分享
      </div>
      <div className="w-full h-[1px] bg-ink/10 mb-2"></div>
      {socialLinks.map((social, idx) => (
        <a
          key={idx}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`分享至 ${social.name}`}
          className={`w-10 h-10 rounded-full border border-ink/10 bg-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm ${social.color}`}
        >
          {social.icon}
        </a>
      ))}
    </motion.div>
  );
}

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
      <SocialFloatingBar />
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
