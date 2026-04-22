export interface StoryPage {
  img: string;
  text: string;
}

export interface Story {
  id: string;
  title: string;
  theme: string;
  cover: string;
  pages: StoryPage[];
}

export const NUSHU_DICTIONARY: Record<string, string> = {
  '姓': '/assets/placeholders/nushu-xing.png',
  '婚': '/assets/placeholders/nushu-hun.png',
  '姻': '/assets/placeholders/nushu-yin.png',
  '嫁': '/assets/placeholders/nushu-jia.png',
  '娶': '/assets/placeholders/nushu-qu.png',
  '妻': '/assets/placeholders/nushu-qi.png',
  '嬌': '/assets/placeholders/nushu-jiao.png',
  '媚': '/assets/placeholders/nushu-mei.png',
  '妒': '/assets/placeholders/nushu-du.png',
  '嫉': '/assets/placeholders/nushu-ji.png',
  '嫌': '/assets/placeholders/nushu-xian.png',
  '奸': '/assets/placeholders/nushu-jian.png',
  '妖': '/assets/placeholders/nushu-yao.png',
  '妾': '/assets/placeholders/nushu-qie.png',
  '婢': '/assets/placeholders/nushu-bei.png',
  '奴': '/assets/placeholders/nushu-nu.png',
  '嫂': '/assets/placeholders/nushu-sao.png',
  '姑': '/assets/placeholders/nushu-gu.png',
  '媽': '/assets/placeholders/nushu-ma.png',
  '婦': '/assets/placeholders/nushu-fu.png',
};

export const MOCK_STORIES: Story[] = [
  {
    id: 'story-1',
    title: '無名之始',
    theme: '命名與標籤',
    cover: '/assets/stories/cover_1.png',
    pages: [
      { img: '/assets/stories/cover_1.png', text: '「女孩，你姓什麼？」這是她聽過最多次的問句。然而在家族的族譜上，她的名字總是被草草帶過。' },
      { img: '/assets/stories/cover_1.png', text: '她看著男丁們擁有華麗的命名，而女性卻只是一個姓氏的附屬。這就是她最初的標籤。' }
    ]
  },
  {
    id: 'story-2',
    title: '紅轎子裡',
    theme: '婚姻與斷裂',
    cover: '/assets/stories/cover_2.png',
    pages: [
      { img: '/assets/stories/cover_2.png', text: '那一日，哭嫁歌響彻了整個村口。紅轎子微微晃動，象徵著她準備遠離母家，踏入另一場未知。' },
      { img: '/assets/stories/cover_2.png', text: '在婚姻的儀式中，她成為了別人的妻，卻彷彿忘記了自己最初的模樣。娶，似乎是一個獲取；嫁，卻是永遠的別離。' }
    ]
  },
  {
    id: 'story-3',
    title: '菱花鏡前',
    theme: '規訓與凝視',
    cover: '/assets/stories/cover_3.png',
    pages: [
      { img: '/assets/stories/cover_3.png', text: '銅鏡裡的自己，被要求端莊、嬌柔、不能有一絲僭越。教女歌在耳邊迴盪，如同一道道無形的枷鎖。' },
      { img: '/assets/stories/cover_3.png', text: '為了迎合外部的凝視，她學會了媚，學會了隱藏真實的笑聲。美的代價，是無止盡地修剪自己。' }
    ]
  },
  {
    id: 'story-4',
    title: '結拜姐妹',
    theme: '關係與庇護',
    cover: '/assets/stories/cover_4.png',
    pages: [
      { img: '/assets/stories/cover_4.png', text: '在這座封閉的庭院裡，唯一的暖意來自於那些同樣被困的姐妹。她們互稱嫂與姑，在深夜裡低語。' },
      { img: '/assets/stories/cover_4.png', text: '彼此的扶持，成為生活裡最穩固的避風港。在沒有話語權的世界，她們的情誼是最後的抵抗。' }
    ]
  },
  {
    id: 'story-5',
    title: '屋簷之下',
    theme: '身分與消失',
    cover: '/assets/stories/cover_5.png',
    pages: [
      { img: '/assets/stories/cover_5.png', text: '她是屋簷下的一抹影子，一個被稱呼為妾的副手。在偌大的家族結構中，她的地位始終搖搖欲墜。' },
      { img: '/assets/stories/cover_5.png', text: '有時，她會聽見別人用嫌與妖來形容那些不受控的女子。她低下頭，告訴自己只要婦德完美，便能求得安穩。' }
    ]
  },
  {
    id: 'story-6',
    title: '河畔洗衣',
    theme: '勞動與消亡',
    cover: '/assets/stories/cover_6.png',
    pages: [
      { img: '/assets/stories/cover_6.png', text: '清晨的河水冰冷徹骨，作為婢女，繁瑣的勞作是她每一天的全部。她的雙手早已粗糙不堪。' },
      { img: '/assets/stories/cover_6.png', text: '日復一日的勞動如同流水般帶走了青春，她像個奴一般被剝奪了時間。水面上的倒影，似乎連自己的名字都不認得了。' }
    ]
  }
];
