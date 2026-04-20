export type Trait = 'sisterhood' | 'compliance' | 'rebellion' | 'labor';

export interface Choice {
  id: string;
  text: string;
  trait: Trait;
}

export interface Stage {
  id: number;
  title: string;
  description: string;
  choices: Choice[];
}

export interface Ending {
  id: Trait;
  title: string;
  imgSrc: string;
  quote: string;
  fullText: string;
}

export const GAME_STAGES: Stage[] = [
  {
    id: 1,
    title: '第一幕：降生',
    description: '妳降生在湖南江永的一戶普通農家。產婆喊了聲「是個姑娘」，父親便皺起了眉頭，轉身離去。妳逐漸懂事後，發現家中好吃的永遠先留給哥哥。此時的妳會：',
    choices: [
      { id: '1a', text: '主動幫忙生火做飯，默默聽話以換取父母的讚許。', trait: 'compliance' },
      { id: '1b', text: '在夜晚跑去找村裡的女孩們，圍在一起玩著紅線，忘記家中的不快。', trait: 'sisterhood' },
      { id: '1c', text: '跟著母親下田，心裡想著只要自己夠努力，總有一天能不被輕視。', trait: 'labor' },
      { id: '1d', text: '對不平等待遇感到憤怒，偷偷弄壞哥哥的玩具作為報復。', trait: 'rebellion' }
    ]
  },
  {
    id: 2,
    title: '第二幕：女工',
    description: '長到十歲，妳被要求坐在昏暗的堂屋裡練習刺繡。針尖刺破了手指，血珠滲了出來，這是每個女孩必經的「修剪」。妳會：',
    choices: [
      { id: '2a', text: '強忍著痛，將血跡藏起，努力繡出最平滑的牡丹。', trait: 'compliance' },
      { id: '2b', text: '將繡線纏成無意義的亂結，心中充滿被困住的焦躁。', trait: 'rebellion' },
      { id: '2c', text: '日以繼夜地趕工，只為了多換幾文錢補貼家用。', trait: 'labor' },
      { id: '2d', text: '看著旁邊女孩繡下奇特如蚊足的符號，好奇地與她約定互相教導。', trait: 'sisterhood' }
    ]
  },
  {
    id: 3,
    title: '第三幕：結拜',
    description: '某個上巳節，妳與幾個村裡的姑娘在河邊洗髮。其中一人拿出紅紙與毛筆，提議大家結為「老同」，一生相伴。妳的決定是：',
    choices: [
      { id: '3a', text: '滿心歡喜地簽上自己的名字，並承諾一生交換手帕與心事。', trait: 'sisterhood' },
      { id: '3b', text: '拒絕了，因為母親說女子終究是要嫁進別人家，結拜無用。', trait: 'compliance' },
      { id: '3c', text: '看著清澈的河水，只覺得未來的命運如浮木般無可奈何，沒有作聲。', trait: 'rebellion' },
      { id: '3d', text: '笑著答應，但心裡依舊掛念著明天田裡還有一大堆沒做完的農活。', trait: 'labor' }
    ]
  },
  {
    id: 4,
    title: '第四幕：哭嫁',
    description: '紅轎來了。鞭炮聲響徹雲霄，妳的父母正在院子裡接受祝賀。依據傳統，妳必須坐在堂屋裡放聲大哭，這被稱為「哭嫁」。妳在哭聲中想著：',
    choices: [
      { id: '4a', text: '痛斥父母的偏心，將半生的委屈用最尖銳的字句哭喊出來。', trait: 'rebellion' },
      { id: '4b', text: '回憶起與「老同」的時光，為即將斷裂的姊妹情誼流下真實的眼淚。', trait: 'sisterhood' },
      { id: '4c', text: '順著長輩教導的詞句，一字一句完美地唱完，盡完女兒最後的責任。', trait: 'compliance' },
      { id: '4d', text: '害怕前方的婆家會有做不完的苦活，為未知的疲憊感到恐懼。', trait: 'labor' }
    ]
  },
  {
    id: 5,
    title: '第五幕：侍奉',
    description: '婚後，妳成為了屋簷下的影子。婆婆嚴厲，丈夫寡言。某天晚上，妳實在累得直不起腰，卻還要為全家縫補衣裳。此時，妳會：',
    choices: [
      { id: '5a', text: '點上油燈，一針一線繼續縫補，雖然麻木，但這就是女人的命。', trait: 'labor' },
      { id: '5b', text: '將一塊偷偷留下的手帕拿出來，用江永女書寫下今日的苦楚。', trait: 'rebellion' },
      { id: '5c', text: '細心縫補，期盼著公婆和丈夫能在明日給妳一個滿意的眼神。', trait: 'compliance' },
      { id: '5d', text: '看著老同寄來的八角花箋，想像著她在遠方是否也看著同一輪明月。', trait: 'sisterhood' }
    ]
  },
  {
    id: 6,
    title: '第六幕：終章',
    description: '多年過去，妳的雙鬢染霜。妳的一生即將走到盡頭，在臨終的床榻前，妳的膝下有幾個晚輩。關於妳這一生的痕跡，妳的最後交代是：',
    choices: [
      { id: '6a', text: '「我只是一個安分守己的婦道人家，把我葬在家族的角落就好。」', trait: 'compliance' },
      { id: '6b', text: '「把那些陪伴我大半生的繡線和農具燒給我吧，我習慣它們了。」', trait: 'labor' },
      { id: '6c', text: '「記得派人去通知我的老同，讓她為我唱最後一曲輓歌。」', trait: 'sisterhood' },
      { id: '6d', text: '「把我的女書手稿全燒了！帶到地府，我要親自去向閻羅王告那一狀！」', trait: 'rebellion' }
    ]
  }
];

export const GAME_ENDINGS: Ending[] = [
  {
    id: 'sisterhood',
    title: '結局：金蘭之契',
    imgSrc: '/assets/story/jiemei.png',
    quote: '「君發言來妾記錄，扇面手帕皆文章。不求達官貴人懂，只留心事與紅顏。」',
    fullText: '妳的一生，雖在父權體系中流轉，但從未真正孤單。從三朝書到八角花箋，妳與那些同樣被邊緣化的女性們，用細密的菱形文字編織成了一張溫柔的網。\n\n這些只有女人能懂的密語，穿越了厚重的磚牆與森嚴的規矩，成為你們彼此的精神避風港。當妳閉上眼時，耳邊響起的是老同溫柔的歌聲。妳的名字或許不會留在族譜上，但卻永遠活在姊妹們傳唱的歌謠裡。',
  },
  {
    id: 'compliance',
    title: '結局：無聲的磨礪',
    imgSrc: '/assets/story/jiaonu.png',
    quote: '「行步需輕聲要細，低頭順目是閨儀。千針萬線不叫苦，只盼郎君莫嫌棄。」',
    fullText: '妳選擇了成為「完美」的女人。妳將自己打磨、修剪，去適應每一個規訓的模具。從懂事聽話的女兒，到低眉順眼的新妻，再到嚴厲持家的婆婆，妳的一生無懈可擊。\n\n然而，代價是巨大的。在漫長的歲月中，那個曾經有著自己喜怒哀樂的小女孩，早已被層層疊疊的「婦德」所掩蓋。妳成為了宗族體制中最堅固的一塊磚，卻也把自己困在了無聲的高牆之內。',
  },
  {
    id: 'rebellion',
    title: '結局：化紙為蝶',
    imgSrc: '/assets/story/suku.png',
    quote: '「日夜操勞不得歇，婆母挑剔夫君冷。欲向高天問公道，唯有化墨寫菱文。」',
    fullText: '妳的心中始終燃燒著一把不甘的火。儘管身體遭到禁錮，儘管不得不屈服於傳統，但妳找到了屬於自己的武器——女書。妳將所有的憤恨、冤屈與控訴，化作紙上的黑墨。\n\n這些被視為「蚊足文字」的偏旁符號，是妳劃破時代黑夜的匕首。臨終前，妳讓那些載滿辛酸的手稿隨火化作灰燼。雖然肉體消亡，但妳的靈魂如同涅槃的黑蝶，帶著最真實、最不屈的情緒，傲然離去。',
  },
  {
    id: 'labor',
    title: '結局：織痕與塵埃',
    imgSrc: '/assets/story/zuogong.png',
    quote: '「晨起劈柴夜打水，粗布麻衣汗難乾。雙手磨出層層繭，只求換得一口飯。」',
    fullText: '這是一個充滿汗水與疲憊的寫實人生。妳沒有太多時間去感春悲秋，也沒有餘力去寫詩結拜。妳的雙手長滿了老繭，每一天都在與生計和繁雜的家務搏鬥。\n\n織布機的經緯線、灶台的柴火、田間的泥土，構成了妳殘酷的生命史。當歲月將妳榨乾，妳就像一抹塵埃般平靜地隱沒在黃土之中。雖然無名，但正是無數個像妳這樣彎著腰的女性，用血汗撐起了那個時代的根基。',
  }
];
