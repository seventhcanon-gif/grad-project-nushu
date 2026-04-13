import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORKS_POOL = [
  { id: '1', imageTitle: '三朝書', imgSrc: '/assets/story/sanchao.png', text: '結交姊妹情意長，如同繡花針引線。\n未嫁之時同歡樂，出嫁之後各一方。' },
  { id: '2', imageTitle: '哭嫁歌', imgSrc: '/assets/story/kujia.png', text: '紅綢蓋頭淚雙垂，辭別爹娘恩似海。\n今日走出青磚門，不知何日再相逢。' },
  { id: '3', imageTitle: '姊妹盟', imgSrc: '/assets/story/jiemei.png', text: '我輩情投意又合，剪紙為盟誓不忘。\n縱然夫家千斤擔，有信傳來暖心腸。' },
  { id: '4', imageTitle: '教女歌', imgSrc: '/assets/story/jiaonu.png', text: '行步需輕聲要細，低頭順目是閨儀。\n千針萬線不叫苦，只盼郎君莫嫌棄。' },
  { id: '5', imageTitle: '訴苦歌', imgSrc: '/assets/story/suku.png', text: '日夜操勞不得歇，婆母挑剔夫君冷。\n欲向高天問公道，唯有化墨寫菱文。' },
  { id: '6', imageTitle: '做工歌', imgSrc: '/assets/story/zuogong.png', text: '晨起劈柴夜打水，粗布麻衣汗難乾。\n雙手磨出層層繭，只求換得一口飯。' },
  { id: '7', imageTitle: '薄命嘆', imgSrc: '/assets/story/boming.png', text: '霜降孤燈寒透骨，半生心血隨風散。\n無人問我命中苦，只有冷月伴空房。' },
  { id: '8', imageTitle: '自述歌', imgSrc: '/assets/story/zishu.png', text: '君發言來妾記錄，扇面手帕皆文章。\n不求達官貴人懂，只留心事與紅顏。' },
];

export default function PictureBook() {
  const [pages, setPages] = useState<typeof WORKS_POOL>([]);

  // Function to generate a random 4-page book
  const setRandomBook = () => {
    const shuffled = [...WORKS_POOL].sort(() => 0.5 - Math.random());
    setPages(shuffled.slice(0, 4));
  };

  useEffect(() => {
    setRandomBook(); // Initialize on mount
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex flex-col h-[calc(100vh-73px)] w-full overflow-hidden bg-paper relative"
    >
      {/* User Controls Panel */}
      <div className="absolute top-6 left-6 md:top-12 md:left-12 z-20 flex flex-col gap-2 bg-white/70 backdrop-blur-md p-4 border border-ink/10 shadow-sm">
        <h3 className="text-sm font-serif text-ink tracking-widest mb-2 border-b border-ink/20 pb-2">典籍重組系統</h3>
        <p className="text-xs text-ink/60 font-sans mb-4 w-48 leading-relaxed">
          每次點擊將從女書歷史碎片中，隨機抽取四首歌謠殘篇重組成新的繪本文本。
        </p>
        <button 
          onClick={setRandomBook}
          className="px-4 py-2 bg-ink text-white hover:bg-cinnabar focus:outline-none transition-colors font-sans tracking-widest text-xs flex items-center justify-center gap-2"
        >
          <span>↻ 重新編織繪本</span>
        </button>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex custom-scrollbar relative z-10 pt-24 md:pt-0">
        <AnimatePresence mode="popLayout">
          {pages.map((page, i) => (
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              key={page.id} 
              className="snap-center shrink-0 w-full md:w-[80vw] h-full flex flex-col md:flex-row items-center justify-center p-8 md:p-24 gap-12"
            >
              {/* Image Visual */}
              <div className="flex-1 w-full aspect-square md:aspect-auto md:h-[60vh] bg-ink/5 border border-ink/10 flex items-center justify-center relative overflow-hidden group shadow-inner">
                <img src={page.imgSrc} alt={page.imageTitle} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000 mix-blend-multiply drop-shadow-md" />
                <div className="absolute inset-4 border border-ink/10 group-hover:scale-95 transition-transform duration-700 pointer-events-none"></div>
                <div className="absolute top-6 left-6 font-serif tracking-[1em] text-white bg-ink/80 px-4 py-2 text-sm pointer-events-none shadow-sm writing-vertical-rl">
                  {page.imageTitle}
                </div>
              </div>
              
              {/* Text Content */}
              <div className="flex-1 flex flex-col items-start md:items-center">
                <div className="writing-horizontal-tb md:writing-vertical-rl h-auto md:h-[50vh] text-lg md:text-3xl font-serif leading-loose tracking-[0.2em] text-ink text-shadow-ink whitespace-pre-wrap">
                  {page.text}
                </div>
                <div className="md:hidden mt-8 text-cinnabar text-sm">
                  ← 左右滑動翻閱 →
                </div>
              </div>
              
              {/* Separator for desktop */}
              {i !== pages.length - 1 && (
                <div className="hidden md:flex h-[20vh] w-px bg-ink/20 shrink-0"></div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Indicator */}
      <div className="h-16 flex items-center justify-center gap-4 border-t border-ink/5 shrink-0 bg-white/30 backdrop-blur-sm relative z-20">
        {pages.map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-ink/20"></div>
        ))}
        <span className="text-xs text-ink/50 ml-4 font-sans tracking-widest uppercase">Scroll to read</span>
      </div>
    </motion.div>
  );
}
