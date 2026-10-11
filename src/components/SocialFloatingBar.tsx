import { motion } from 'framer-motion';

export default function SocialFloatingBar() {
  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/herword_herline?xtok=Z3pzY2xpb25lc2Zl",
      color: "hover:bg-[#E4405F]/10 hover:border-[#E4405F]/30",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="ig-grad-bar" cx="30%" cy="107%" r="130%" fx="30%" fy="107%">
              <stop offset="0%" stopColor="#fdf497" />
              <stop offset="5%" stopColor="#fdf497" />
              <stop offset="45%" stopColor="#fd5949" />
              <stop offset="60%" stopColor="#d6249f" />
              <stop offset="90%" stopColor="#285AEB" />
            </radialGradient>
          </defs>
          <path fill="url(#ig-grad-bar)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      )
    },
    {
      name: "YouTube",
      url: "https://youtube.com",
      color: "hover:bg-[#FF0000]/10 hover:border-[#FF0000]/30",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#FF0000]" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.519 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.519 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    }
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
      className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-4 py-4 px-2.5 sm:px-3 bg-white/90 border border-ink/10 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-md"
    >
      <div className="text-[10px] tracking-[0.25em] font-sans text-ink/40 writing-vertical-rl mb-1 select-none">
        社群分享
      </div>
      <div className="w-4 h-[1px] bg-ink/15 mb-1"></div>
      {socialLinks.map((social, idx) => (
        <a
          key={idx}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`前往 ${social.name}`}
          className={`w-9 h-9 rounded-full border border-ink/10 bg-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm ${social.color}`}
        >
          {social.icon}
        </a>
      ))}
    </motion.div>
  );
}
