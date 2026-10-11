import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, ExternalLink, Bookmark } from 'lucide-react';
import { NUSHU_RESEARCH_DATA, NUSHU_REFERENCES } from '../data/nushuResearchData';

interface NushuDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NushuDetailModal({ isOpen, onClose }: NushuDetailModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-4xl max-h-[88vh] bg-[#FAF9F6] border border-ink/20 shadow-2xl rounded-sm flex flex-col overflow-hidden text-ink z-10"
          style={{ fontFamily: '"Noto Serif TC", serif' }}
        >
          {/* Header */}
          <div className="px-6 sm:px-10 py-5 bg-[#F2EDE4] border-b border-ink/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-cinnabar/10 text-cinnabar rounded-sm">
                <BookOpen className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-widest text-ink">
                  女書的歷史背景與文化研究
                </h3>
                <p className="text-xs font-sans text-ink/60 tracking-wider mt-0.5">
                  文獻考據 · 社會學與文字學深度解讀
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              title="關閉 (Esc)"
              className="p-2 text-ink/50 hover:text-cinnabar hover:bg-black/5 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-12 py-8 space-y-12 leading-relaxed text-justify selection:bg-cinnabar/20 selection:text-ink">
            {NUSHU_RESEARCH_DATA.map((section) => (
              <section key={section.id} className="space-y-4">
                <h4 className="text-lg sm:text-xl font-bold text-ink tracking-wider flex items-center gap-2 border-b border-ink/10 pb-2">
                  <span className="w-1.5 h-4 bg-cinnabar inline-block"></span>
                  {section.title}
                </h4>

                {section.paragraphs && (
                  <div className="space-y-3 text-ink/80 text-base leading-loose font-light">
                    {section.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                )}

                {/* Cultural Table */}
                {section.table && (
                  <div className="my-6 overflow-x-auto border border-ink/15 rounded-sm bg-white/70 shadow-sm">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="bg-[#EFE9DF] border-b border-ink/15 text-ink font-bold tracking-wider">
                          {section.table.headers.map((h, i) => (
                            <th key={i} className={`p-3 sm:p-4 ${i === 0 ? 'w-1/3 sm:w-1/4' : ''}`}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ink/10">
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-cinnabar/5 transition-colors">
                            <td className="p-3 sm:p-4 font-bold text-cinnabar align-top">
                              {row.context}
                            </td>
                            <td className="p-3 sm:p-4 text-ink/80 leading-relaxed font-light">
                              {row.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Guidelines List */}
                {section.list && (
                  <div className="space-y-3 bg-[#F4EFEA] p-5 sm:p-6 rounded-sm border-l-4 border-cinnabar/60 shadow-sm">
                    {section.list.map((item, lIdx) => (
                      <p key={lIdx} className="text-sm sm:text-base text-ink/85 leading-relaxed font-light">
                        {item}
                      </p>
                    ))}
                  </div>
                )}
              </section>
            ))}

            {/* References Section */}
            <section className="pt-6 border-t-2 border-ink/10 space-y-4">
              <h4 className="text-lg font-bold text-ink tracking-wider flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-cinnabar" />
                參考資料
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                {NUSHU_REFERENCES.map((ref) => (
                  <a
                    key={ref.id}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/60 border border-ink/10 rounded hover:border-cinnabar hover:text-cinnabar transition-all flex items-start justify-between gap-2 group"
                  >
                    <span className="leading-relaxed line-clamp-2 text-ink/80 group-hover:text-cinnabar">
                      [{ref.id}] {ref.title}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity mt-0.5" />
                  </a>
                ))}
              </div>
            </section>
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-4 bg-[#F2EDE4] border-t border-ink/10 flex items-center justify-between text-xs font-sans text-ink/60">
            <span>女書歷史背景與文化研究文獻 · 完整典藏</span>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-ink text-white hover:bg-cinnabar transition-colors rounded-sm tracking-widest cursor-pointer font-serif"
            >
              關閉閱讀
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
