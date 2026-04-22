import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages to be implemented
import Home from './pages/Home';
import Archive from './pages/Archive';
import PictureBook from './pages/PictureBook';
import Puzzle from './pages/Puzzle';
import StoryBook from './pages/StoryBook';

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-rice-paper">
      <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-sm border-b border-ink/10">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-serif font-bold text-ink hover:text-cinnabar transition-colors">
            女書與文字演變
          </Link>
          <div className="flex gap-8 text-sm font-sans tracking-widest text-ink/70">
            <Link to="/archive" className="hover:text-cinnabar transition-colors">圖錄考據</Link>
            <Link to="/story-book" className="hover:text-cinnabar transition-colors">故事繪本</Link>
            <Link to="/puzzle" className="hover:text-cinnabar transition-colors">互動拼圖</Link>
            <Link to="/story" className="hover:text-cinnabar transition-colors">文字互動</Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 flex flex-col relative w-full h-full">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/story-book" element={<StoryBook />} />
            <Route path="/story" element={<PictureBook />} />
            <Route path="/puzzle" element={<Puzzle />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}
