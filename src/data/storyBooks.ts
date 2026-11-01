export type LayoutMode = 'normal' | 'saddle_stitch_single' | 'saddle_stitch_spread' | 'custom_order';

export interface StoryBookItem {
  id: string;
  title: string;
  category: string;
  description: string;
  pdfUrl: string;
  coverImage?: string;
  layoutMode?: LayoutMode;
  customOrder?: number[];
  isUpcoming?: boolean;
}

export const STORY_BOOKS: StoryBookItem[] = [
  {
    id: 'fanmian-nyushu',
    title: '《穿越扇面：遇見女書》',
    category: '原創繪本',
    description: '從一把古老的絹扇出發，走進女書的發源地，揭開深藏於針線與折扇間的心事與密碼。',
    pdfUrl: '/assets/pdf/chuanxie-fanmian-nyushu.pdf',
    coverImage: '/assets/stories/cover_1.png',
    layoutMode: 'normal'
  },
  {
    id: 'nvshu-intro',
    title: '《女書：寫給女性的文字》',
    category: '文化特色',
    description: '在江永的山水之間，細數女書字形菱形細長、筆畫斜向等美感特徵，認識寫給女性的文化記憶。',
    pdfUrl: '/assets/pdf/女書介紹.pdf',
    coverImage: '/assets/stories/cover_nvshu.jpg',
    layoutMode: 'normal'
  },
  {
    id: 'gumu-tangjuxian',
    title: '《谷母溪唐舉仙》',
    category: '人物傳奇',
    description: '以大木頭村唐家女出嫁後的命運為題，字裡行間深情訴說女性的心思與生活悲歡。',
    pdfUrl: '/assets/pdf/谷母溪唐舉仙.pdf',
    coverImage: '/assets/stories/cover_gumu.jpg',
    layoutMode: 'normal'
  },
  {
    id: 'sanchao-shu',
    title: '《紅箋寄情：三朝書的故事》',
    category: '民俗經典',
    description: '被世人遺忘的女性文字，記錄結拜姊妹在出嫁三朝時親手織就的祝福與世代深厚情誼。',
    pdfUrl: '/assets/pdf/三朝書.pdf',
    coverImage: '/assets/stories/cover_sanchao.jpg',
    layoutMode: 'normal'
  }
];
