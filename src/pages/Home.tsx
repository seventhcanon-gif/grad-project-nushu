import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

function IntroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section 
      ref={ref}
      className="min-h-screen relative z-20 w-full bg-paper py-24 px-6 md:px-24 flex items-center justify-center pt-32"
    >
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-5xl w-full flex flex-col md:flex-row gap-16 items-center"
      >
        <div className="flex-1 space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif text-ink tracking-widest relative inline-block">
            什麼是女書？
            <span className="absolute -bottom-4 left-0 w-12 h-1 bg-cinnabar"></span>
          </h2>
          <div className="space-y-6 pt-4">
            <p className="text-lg leading-loose text-ink/80 font-serif text-justify font-light">
              女書，又名「女字」，是流傳於中國湖南省江永縣一帶的獨特女性專用文字。
              在過去「男尊女卑」的傳統社會中，女性由於被剝奪了學習主流漢字的權利，
              為了在閨蜜間交流心事、締結情誼，江永的女性們因而創造了這種只有女性能懂的密碼。
            </p>
            <p className="text-lg leading-loose text-ink/80 font-serif text-justify font-light">
              女書的外觀呈長菱形，筆畫纖細修長，如同女性優美的身姿。
              它通常被寫在紙扇、手帕或是繡在布面上，承載著女性的喜怒哀樂與生活點滴。
              作為世界上唯一已知的女性專屬文字，女書不僅是語言學上的奇蹟，更是研究古代女性社會關係與情感的重要文化遺產。
            </p>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center w-full">
          <div className="w-72 md:w-80 h-[28rem] relative bg-[#FAF9F6] border border-ink/10 shadow-xl flex flex-col items-center justify-center p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-ink/30 m-2"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-ink/30 m-2"></div>
            <div className="writing-vertical-rl text-4xl md:text-5xl font-serif tracking-[0.5em] text-ink/80 drop-shadow-sm h-full flex items-center justify-center">
              獨特的女字
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="w-full bg-paper">
      <div ref={containerRef} className="relative h-[150vh] w-full">
        <motion.div 
          className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden"
          style={{ y: heroY, opacity: textOpacity }}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            {/* subtle decorative background glyph placeholder */}
            <span className="font-serif text-[40vw]">女</span>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="z-10 flex flex-col items-center gap-6"
          >
            <div className="writing-vertical-rl h-[60vh] max-h-[800px] items-center justify-center flex">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-ink tracking-[0.2em] text-shadow-ink leading-relaxed">
                字裡行間的女性<br />
                <span className="text-3xl md:text-4xl lg:text-5xl mt-8 block">女字旁漢字字源與女書文化研究</span>
              </h1>
            </div>
            <p className="mt-8 text-ink/70 max-w-lg text-center font-sans font-light leading-loose">
              探索被遺忘的女性文字，追溯千年漢字的輪廓與生命力。這是一個關於尋根、傳承與重生的數位考據之旅。
            </p>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="mt-16 text-cinnabar"
            >
              ↓ 向下滑動探索
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Intro section that appears after scrolling past the sticky hero */}
      <div className="-mt-[30vh] md:-mt-[50vh] relative z-20 bg-paper">
        <IntroSection />
      </div>
    </div>
  );
}
