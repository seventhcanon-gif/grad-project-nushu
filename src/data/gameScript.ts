export interface WordOption {
  char: string;
  isCorrect: boolean;
  feedback: string;
}

export interface TRPGStage {
  id: number;
  title: string;
  perspective: string;
  scenario: string;
  question: string;
  options: WordOption[];
  successSemantic: string;
  colorClass: string;
}

export const MATCHING_GAME_STAGES: TRPGStage[] = [
  {
    id: 1,
    title: '第一幕：閨閣之影',
    perspective: '未出嫁的女性',
    scenario: '長輩拿走了妳的書本，遞給妳針線。他們告訴妳，女孩不需要滿腹經綸，只需要收起活潑的性子，學習展現柔弱、惹人憐愛的美感，這才是妳未來生存的資本。',
    question: '在這種被社會建構的「美」與規訓下，妳的狀態最符合哪個字？',
    colorClass: 'from-[#D2C5B5] to-[#E3D3C2]',
    options: [
      { char: '妙', isCorrect: false, feedback: '「妙」代表青春美好的潛能（女+少）。長輩要的不是妳綻放生命力，而是要求妳收斂鋒芒。' },
      { char: '婉', isCorrect: false, feedback: '「婉」是言辭上的退讓。妳現在面臨的是對身體與氣質的全面規訓。' },
      { char: '嬌', isCorrect: true, feedback: '「嬌」帶有柔弱、易碎之意。這份看似讚美的字眼，實則是父權社會對女性身體與意志的雙重束縛。' }
    ],
    successSemantic: '「嬌」：不再是惹人憐愛，而是認清這份柔弱是被社會刻意建構的枷鎖。'
  },
  {
    id: 2,
    title: '第二幕：紅妝之縛',
    perspective: '出嫁後的妻子',
    scenario: '鞭炮聲中，妳坐上紅轎，被移交給另一個家族。從今以後，妳個人的名字被隱去，妳的身份將與一把掃帚綁在一起，承擔起這個家族無盡的家務勞動與繁衍責任。',
    question: '哪一個字最能揭示妳在這個新家庭中作為「勞動者」的本質？',
    colorClass: 'from-[#8C3A3A] to-[#A04545]',
    options: [
      { char: '妻', isCorrect: false, feedback: '「妻」代表妳的名份，但卻掩蓋了妳在這個家中最真實的勞動處境。' },
      { char: '姻', isCorrect: false, feedback: '「姻」是兩個家族的契約（女+因）。妳現在感受到的不是契約，而是沈重的勞役。' },
      { char: '婦', isCorrect: true, feedback: '「婦」字由「女」與「帚」組成。造字之初便殘酷地揭示了：成為別人的妻子，即是成為手持掃帚、終日勞作的從屬者。' }
    ],
    successSemantic: '「婦」：不再只是名份，而是看透婚姻背後無償勞動與從屬關係的本質。'
  },
  {
    id: 3,
    title: '第三幕：深院之嘆',
    perspective: '情感壓抑狀態的女性',
    scenario: '深宅大院中，資源永遠稀缺。看著丈夫迎娶新人，妳內心充滿了焦慮與不甘，但《女誡》不允許妳對丈夫發脾氣。為了生存，妳只能將矛頭與惡意轉向另一個和妳一樣的女人。',
    question: '這種在社會壓力與比較下扭曲的心理狀態，是哪個字？',
    colorClass: 'from-[#1A2518] to-[#253523]',
    options: [
      { char: '怨', isCorrect: false, feedback: '「怨」是對命運的哀嘆，但妳現在的情緒具有更強烈的攻擊性與競爭意識。' },
      { char: '嫌', isCorrect: false, feedback: '「嫌」是嫌棄與排斥。妳不僅排斥她，妳還在比較中失去了自我。' },
      { char: '妒', isCorrect: true, feedback: '「妒」字將女性（女）與門戶（戶）結合。這象徵著被困在父權高牆內的女人們，為了生存資源而相互傾軋的悲哀。妳的敵人其實是體制，而非其他女性。' }
    ],
    successSemantic: '「妒」：不再是女性原罪，而是體制壓迫下無處宣洩的焦慮與悲哀。'
  },
  {
    id: 4,
    title: '第四幕：無名之役',
    perspective: '勞動中的婢女 / 底層覺醒',
    scenario: '妳沒有名字，日夜勞作，被視為可以買賣的財產。妳的雙手長滿了繭，但在最深的絕望與壓迫中，妳突然意識到，承認這份被剝削的處境，正是反抗與自我解放的第一步。',
    question: '哪一個充滿壓迫意味的字詞，在此刻被妳反轉為覺醒的契機？',
    colorClass: 'from-[#0A0A0A] to-[#141414]',
    options: [
      { char: '婢', isCorrect: false, feedback: '「婢」代表妳的階級身份，但它缺乏那種帶有屈辱卻又渴望掙脫的力量感。' },
      { char: '妥', isCorrect: false, feedback: '「妥」是妥協與退讓。但妳現在內心正在醞釀的，是絕不妥協的反叛。' },
      { char: '奴', isCorrect: true, feedback: '「奴」字（女+又/手），象徵被受制、被奴役的女性。然而，當妳直視這個字，它便不再只是壓迫的印記，而是妳認清現實、決定奪回自我主導權的覺醒起點。' }
    ],
    successSemantic: '「奴」：不再是屈辱的印記，而是剝離幻想、認清現實後的自我覺醒。'
  }
];

export const GAME_CONCLUSION = "妳完成了這趟文字的旅程。這些「女」字旁的漢字，曾是束縛妳的枷鎖、定義妳的標籤。但當妳主動去辨識、去剖析它們時，便將被動的規訓轉化為主動的覺醒。語言不再是單一的鐵律，而是妳重塑自我認同的起點。";
