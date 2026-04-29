export type StagePhase = 1 | 2 | 3 | 4;

export interface CharacterStory {
  id: number;
  char: string;
  pinyin: string;
  stage: StagePhase;
  stageTitle: string;
  eventText: string;
  emotionText: string;
  semanticConversionText: string;
  colorClass: string;
}

export const TWENTY_CHARS_DATA: CharacterStory[] = [
  {
    id: 1,
    char: '始',
    pinyin: 'shǐ',
    stage: 1,
    stageTitle: '懵懂與規訓',
    eventText: '出生被期待為男嬰卻是女嬰，伴隨著家族的嘆息。',
    emotionText: '潛意識裡埋藏著失落與被忽視的陰影。',
    semanticConversionText: '生命韌性的最初萌芽，在邊緣中野蠻生長。',
    colorClass: 'from-[#D2C5B5] to-[#E3D3C2]'
  },
  {
    id: 2,
    char: '姓',
    pinyin: 'xìng',
    stage: 1,
    stageTitle: '懵懂與規訓',
    eventText: '意識到自己僅是過客，終將「冠夫姓」或被移出族譜。',
    emotionText: '內心充滿漂泊無依與虛無感。',
    semanticConversionText: '從血緣的放逐中，尋找基於自我意志的認同。',
    colorClass: 'from-[#C4B7A6] to-[#D5C8B7]'
  },
  {
    id: 3,
    char: '妹',
    pinyin: 'mèi',
    stage: 1,
    stageTitle: '懵懂與規訓',
    eventText: '與村裡年紀相仿的女孩結為「老同」。',
    emotionText: '感受到前所未有的溫暖與深深的共鳴。',
    semanticConversionText: '將「女性情誼」轉化為抵禦外界風雨的精神避風港。',
    colorClass: 'from-[#D1A7A7] to-[#E1B6B6]'
  },
  {
    id: 4,
    char: '妙',
    pinyin: 'miào',
    stage: 1,
    stageTitle: '懵懂與規訓',
    eventText: '少女時期的短暫自由與勞作間隙的幻想。',
    emotionText: '靈魂感到輕盈，對未來充滿憧憬。',
    semanticConversionText: '覺察自身潛能，體驗生命原初的創造力。',
    colorClass: 'from-[#B5C2B7] to-[#C7D4C9]'
  },
  {
    id: 5,
    char: '嬌',
    pinyin: 'jiāo',
    stage: 1,
    stageTitle: '懵懂與規訓',
    eventText: '被要求纏足或學習女工，以符合社會對「柔弱美」的期待。',
    emotionText: '肉體與精神雙重壓抑下的疼痛。',
    semanticConversionText: '反思「美」的暴力本質，看穿社會建構的審美標準。',
    colorClass: 'from-[#A89898] to-[#B8A7A7]'
  },
  {
    id: 6,
    char: '妝',
    pinyin: 'zhuāng',
    stage: 2,
    stageTitle: '過渡與枷鎖',
    eventText: '出嫁前的開臉、絞面與盛裝打扮。',
    emotionText: '告別過去的焦慮與自我割裂感。',
    semanticConversionText: '不再視化妝為取悅，而是面對殘酷外界的「武裝」與面具。',
    colorClass: 'from-[#8C3A3A] to-[#A04545]'
  },
  {
    id: 7,
    char: '嫁',
    pinyin: 'jià',
    stage: 2,
    stageTitle: '過渡與枷鎖',
    eventText: '坐上紅轎，離開原生家庭的送親儀式。',
    emotionText: '對未知的恐懼與身不由己的無奈。',
    semanticConversionText: '象徵女性在人生階段中的選擇與被選擇，反映婚姻制度下的社會期待與個體抉擇之間的張力。',
    colorClass: 'from-[#732C2C] to-[#8A3737]'
  },
  {
    id: 8,
    char: '婦',
    pinyin: 'fù',
    stage: 2,
    stageTitle: '過渡與枷鎖',
    eventText: '日復一日繁重且無償的家務與農活。',
    emotionText: '身體極度疲憊，精神逐漸麻木。',
    semanticConversionText: '在極度勞動中，感知到自身承載整個家族生存的強大力量。',
    colorClass: 'from-[#5E4A3D] to-[#705A4B]'
  },
  {
    id: 9,
    char: '姻',
    pinyin: 'yīn',
    stage: 2,
    stageTitle: '過渡與枷鎖',
    eventText: '深刻體會到婚姻的本質是家族契約與傳宗接代。',
    emotionText: '如墜牢籠，充滿被困與窒息感。',
    semanticConversionText: '看透制度的本質，內心開始從傳統的「賢妻」角色中抽離。',
    colorClass: 'from-[#4A4D54] to-[#595D65]'
  },
  {
    id: 10,
    char: '妥',
    pinyin: 'tuǒ',
    stage: 2,
    stageTitle: '過渡與枷鎖',
    eventText: '在新家庭中面對婆媳或夫妻衝突，被迫低頭認錯。',
    emotionText: '委屈、憋悶與無聲的落淚。',
    semanticConversionText: '將妥協重新定義為一種「隱忍的生存策略」，而非真正的屈服。',
    colorClass: 'from-[#3A3836] to-[#4A4846]'
  },
  {
    id: 11,
    char: '妒',
    pinyin: 'dù',
    stage: 3,
    stageTitle: '衝突與覺醒',
    eventText: '與其他女性在家族中的資源競爭。',
    emotionText: '交織著嫉妒、自卑與怨恨的複雜情緒。',
    semanticConversionText: '轉化為自我認同的焦慮，表現女性在比較與社會壓力下的內在情緒，看清敵人其實是體制而非其他女性。',
    colorClass: 'from-[#1A2518] to-[#253523]'
  },
  {
    id: 12,
    char: '婉',
    pinyin: 'wǎn',
    stage: 3,
    stageTitle: '衝突與覺醒',
    eventText: '被要求輕聲細語，禁止表達憤怒與真實主張。',
    emotionText: '失語的痛苦與深深的壓抑。',
    semanticConversionText: '在沈默與陰影中，發展出「女書」等專屬的私密抗爭語言。',
    colorClass: 'from-[#181825] to-[#232335]'
  },
  {
    id: 13,
    char: '妖',
    pinyin: 'yāo',
    stage: 3,
    stageTitle: '衝突與覺醒',
    eventText: '展現出不符合傳統的才華或慾望，被斥責為不守婦道。',
    emotionText: '初期的羞恥感逐漸轉為狂烈的憤怒。',
    semanticConversionText: '擁抱「異端」的標籤，將污名轉化為顛覆主流的強大力量。',
    colorClass: 'from-[#3D143D] to-[#4F1A4F]'
  },
  {
    id: 14,
    char: '妄',
    pinyin: 'wàng',
    stage: 3,
    stageTitle: '衝突與覺醒',
    eventText: '在深夜裡偷學文字，或渴望走出村落的邊界。',
    emotionText: '內心湧動著熱烈而危險的渴望。',
    semanticConversionText: '打破思想禁錮，將「妄想」化為敢於想像另一種生存可能的勇氣。',
    colorClass: 'from-[#4D1A1A] to-[#632222]'
  },
  {
    id: 15,
    char: '奴',
    pinyin: 'nú',
    stage: 3,
    stageTitle: '衝突與覺醒',
    eventText: '體認到自己在家中僅作為生育工具或附屬品的底層地位。',
    emotionText: '絕望與極致的痛苦。',
    semanticConversionText: '重新詮釋為自我解放的起點，透過反轉語義，使原本帶有壓迫意味的字詞轉化為覺醒與反思的契機。',
    colorClass: 'from-[#0A0A0A] to-[#141414]'
  },
  {
    id: 16,
    char: '妨',
    pinyin: 'fáng',
    stage: 4,
    stageTitle: '釋放與重塑',
    eventText: '首次明確拒絕配合某項不合理的家族規定。',
    emotionText: '衝突帶來的恐懼與隨之而來的堅定。',
    semanticConversionText: '從體制的「順從者」驕傲地轉變為父權秩序的「妨礙者」。',
    colorClass: 'from-[#2C4A5A] to-[#395D71]'
  },
  {
    id: 17,
    char: '媼',
    pinyin: 'ǎo',
    stage: 4,
    stageTitle: '釋放與重塑',
    eventText: '歲月流逝，容顏老去，但也隨之擺脫了生育要求與男性凝視。',
    emotionText: '內心感到前所未有的平靜、豁達與釋然。',
    semanticConversionText: '不再被外貌定義，獲得身體與精神最終的自主權。',
    colorClass: 'from-[#5E6A75] to-[#768591]'
  },
  {
    id: 18,
    char: '孀',
    pinyin: 'shuāng',
    stage: 4,
    stageTitle: '釋放與重塑',
    eventText: '伴侶過世，獨自面對社會的邊緣化與閒言碎語。',
    emotionText: '孤獨，但伴隨著徹底的自由。',
    semanticConversionText: '在失去中，獲得不被任何人（父親、丈夫、兒子）定義的絕對獨立狀態。',
    colorClass: 'from-[#A1AAB3] to-[#B8C0C8]'
  },
  {
    id: 19,
    char: '婆',
    pinyin: 'pó',
    stage: 4,
    stageTitle: '釋放與重塑',
    eventText: '看著新一代的女孩降生，面對是否要將傳統枷鎖套在她身上的抉擇。',
    emotionText: '悲憫與決斷。',
    semanticConversionText: '斬斷痛苦的循環，將女書與反抗的智慧傳承給下一代。',
    colorClass: 'from-[#D0CACA] to-[#E3DDDD]'
  },
  {
    id: 20,
    char: '好',
    pinyin: 'hǎo',
    stage: 4,
    stageTitle: '釋放與重塑',
    eventText: '臨終初回顧一生，在紙上寫下最後一個女書字符。',
    emotionText: '圓滿、和解與無上的自豪。',
    semanticConversionText: '重新定義「好」。不再是傳統的「女+子」，而是女性生命本身的完整、自足與最終的和解。',
    colorClass: 'from-[#EBEBEB] to-[#FFFFFF]'
  }
];
