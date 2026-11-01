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
  /** 是否為即將推出或未完成狀態 */
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
    id: 'gumu-tangjuxian',
    title: '《谷母溪唐舉仙》',
    category: '騎馬釘排版',
    description: '以谷母溪與唐舉仙傳說為背景，揭開女書文化的神秘篇章。系統已自動套用騎馬釘跨頁對切與順序還原。',
    pdfUrl: '/assets/pdf/〈谷母溪唐舉仙〉騎馬釘排版2.pdf',
    coverImage: '/assets/stories/cover_2.png',
    layoutMode: 'saddle_stitch_spread' // 10頁跨頁 PDF，自動分割並以 20 頁騎馬釘順序呈現
  },
  {
    id: 'story-three-upcoming',
    title: '《第三部繪本故事》',
    category: '即將推出',
    description: '第三份繪本故事正在緊鑼密鼓繪製製作中，敬請期待後續更新！',
    pdfUrl: '',
    coverImage: '/assets/stories/cover_3.png',
    isUpcoming: true
  }
];
