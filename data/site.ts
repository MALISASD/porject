export type NavItem = {
  label: string;
  href: string;
};

export type ContentItem = {
  title: string;
  description: string;
  meta: string;
  href: string;
  cta: string;
  external?: boolean;
};

export type ContactMethod = {
  title: string;
  value: string;
  note: string;
  href?: string;
  external?: boolean;
};

export type HomeMemory = {
  title: string;
  description: string;
  meta: string;
  featured?: boolean;
  image?: string;
  note?: string;
};

export type HomeTimelineItem = {
  date: string;
  text: string;
  title?: string;
};

export type StoryTimelineItem = {
  time: string;
  title: string;
  description: string;
};

export type StoryOrbitNode = {
  id: string;
  time: string;
  title: string;
  summary: string;
  detail: string;
  tone: "violet" | "gold" | "blue" | "rose" | "mint";
};

export type SnapshotMemory = {
  title: string;
  description: string;
};

export type DailyCoupon = {
  title: string;
  description: string;
  actionLabel: string;
  message: string;
  meta: string;
};

export type MysteryPrize = {
  title: string;
  description: string;
};

export type MemoryMedia = {
  id: string;
  type: "image" | "video";
  title: string;
  date: string;
  description: string;
  src: string;
  poster?: string;
  category: string;
};

export type BirthDayData = {
  title: string;
  lunarDate: string;
  solarDate: string;
  weekday: string;
  zodiac: string;
  constellation: string;
  intro: string;
  mainCopy: string[];
  ending: string;
  cards: Array<{
    title: string;
    body: string;
  }>;
};

export type GiftExperienceCopy = {
  intro: {
    eyebrow: string;
    title: string;
    description: string;
    actionLabel: string;
  };
  beijing: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  memories: {
    eyebrow: string;
    title: string;
    description: string;
    note: string;
    reveal: string;
  };
  lottery: {
    eyebrow: string;
    title: string;
    description: string;
    actionLabel: string;
    resultPrefix: string;
  };
  coupons: {
    eyebrow: string;
    title: string;
    description: string;
    packLabel: string;
    closeLabel: string;
  };
  mystery: {
    eyebrow: string;
    title: string;
    description: string;
    actionLabel: string;
  };
  final: {
    eyebrow: string;
    title: string;
    description: string;
    signature: string;
    buttonLabel: string;
    revealText: string;
  };
};

export const siteConfig = {
  brand: "琳宝",
  studio: "from Long",
  url: "https://www.fdaicar.top",
  subtitle: "沉浸式互动礼物站",
  heroTitle: "今年的生日礼物，先送你一半",
  heroDescription: "今天先把一半心意送到你面前，剩下的一半，等六月底你来北京时亲手给你。",
  email: "linbao@fdaicar.top",
  meta: {
    title: "琳宝的沉浸式互动礼物站",
    description:
      "这是 Long 给琳宝准备的沉浸式互动礼物站，里面有好运、小券、神秘礼物和认真记住的心动瞬间。"
  }
};

export const navigation: NavItem[] = [
  { label: "礼物星球", href: "/" },
  { label: "旧时光星", href: "/memory" },
  { label: "惊喜仓星", href: "/gifts" },
  { label: "蘑菇汤星", href: "/food" },
  { label: "抱抱引力星", href: "/hug" },
  { label: "银河影院星", href: "/movie" },
  { label: "下一站星", href: "/beijing" },
  { label: "胶片星", href: "/moments" },
  { label: "看海星", href: "/travel" },
  { label: "那一天星", href: "/birth-day" },
  { label: "悄悄话星", href: "/message" }
];

export const giftExperienceCopy: GiftExperienceCopy = {
  intro: {
    eyebrow: "a birthday surprise, half now, half in beijing",
    title: "先送你一半生日惊喜",
    description: "另一半，等你来北京的时候，我想亲手给你。",
    actionLabel: "轻轻打开"
  },
  beijing: {
    eyebrow: "the other half · beijing, late june",
    title: "留给北京的那部分惊喜",
    description:
      "今年的生日礼物，不想只停在一个网页里。所以今天先把一半心意送到你面前，剩下更完整的礼物、陪伴和兑现，想留到六月底，等你来北京的时候，站在你面前亲手给你。",
    items: [
      {
        title: "今天，先收下这一半",
        description: "这个小网站先把生日惊喜送到你眼前，是一些我想让你今天就知道的心意。"
      },
      {
        title: "六月底，北京见",
        description: "等你来北京，剩下的一半礼物、没说完的话、想带你去的地方，我们慢慢兑现。"
      },
      {
        title: "亲手给你，才完整",
        description: "有些话想当面说，有些礼物想看你亲手拆，有些陪伴隔着屏幕给不了。这些，都留给见面那天。"
      }
    ]
  },
  memories: {
    eyebrow: "memory book",
    title: "我记得的心动瞬间",
    description:
      "不是因为某一天特别盛大，而是和你在一起的很多小瞬间，我都想好好记住。",
    note: "北京下雪的那晚，我一直记得。",
    reveal: "那天不是普通的一段路，是我后来反复想起的一场雪。"
  },
  lottery: {
    eyebrow: "a little luck for today",
    title: "今日份的小确幸",
    description: "轻轻点一下，看看今天的小好运是多少。100 元以内 Long 负责兑现，也可以攒到六月底来北京，变成见面小基金。",
    actionLabel: "点一下看看",
    resultPrefix: "琳宝今天的小好运："
  },
  coupons: {
    eyebrow: "daily rights",
    title: "一些随时可以使用的小权利",
    description: "打开卡包，收下几张只给琳宝的小券。",
    packLabel: "琳宝专属卡包",
    closeLabel: "知道啦"
  },
  mystery: {
    eyebrow: "mystery box",
    title: "请选择一个神秘礼物盒",
    description: "每个盒子里都有一份不同的惊喜。",
    actionLabel: "打开看看"
  },
  final: {
    eyebrow: "closing note",
    title: "这个生日，先把一半礼物送到你面前。",
    description: "剩下的一半，等六月底你来北京，我们慢慢兑现。",
    signature: "Long\n写给我的老婆琳宝",
    buttonLabel: "点亮这一刻",
    revealText: "礼物先送到了，北京见面的期待也开始了。"
  }
};

export const homeLetter =
  "我把一些想对你说的话，还有一些我偷偷记住的小心思，做成了这个只送给你的小网站。";

export const homeMemories: HomeMemory[] = [
  {
    title: "初三那天，见到你",
    description:
      "2024 年大年初三，本来只是一次相亲见面。可那天之后，我开始觉得，有些相遇不是刚刚好，是后来想起来，才知道它很重要。",
    meta: "chapter 01"
  },
  {
    title: "那场北京的大雪",
    description:
      "那天我们一起从北京去上海。出发去机场的时候，外面下着很大的雪。我坐在出租车里，拉着你的手，看着窗外的雪一点点落下来。飞机晚点，我们凌晨三点才到上海。可我现在想起来，记住的不是等待有多晚，是那一路上，你在我身边。",
    meta: "chapter 02",
    featured: true,
    image: "/snow-night-taxi-memory.jpg",
    note: "北京下雪的那晚，我记得很清楚。"
  },
  {
    title: "凌晨三点的上海",
    description:
      "那天到上海已经很晚很晚了。但我一点都不觉得那只是一次赶路。因为从那以后，很多普通的路，好像只要和你一起走，就会变得很特别。",
    meta: "chapter 03"
  },
  {
    title: "从初三，到初十",
    description:
      "2024 年大年初三，我们第一次见面。2025 年大年初十，我们结婚了。中间隔着一整年的春夏秋冬，最后你真的成了我的家人。",
    meta: "chapter 04"
  },
  {
    title: "以后也想继续记录你",
    description:
      "我不一定每次都说得很好，但我想把和你有关的开心、心动、普通日子，都慢慢记下来。因为你本身，就是我觉得很好的礼物。",
    meta: "chapter 05"
  }
];

export const homeTimeline = {
  title: "从初三，到初十",
  items: [
    {
      date: "2024 年大年初三",
      text: "我们第一次相亲见面。"
    },
    {
      date: "那场北京的大雪",
      text: "从北京去上海的那晚，出租车里，我拉着你的手，外面下着很大的雪，飞机晚点，我们凌晨三点才到上海。"
    },
    {
      date: "2025 年大年初十",
      text: "我们结婚了。"
    }
  ] satisfies HomeTimelineItem[],
  ending: "中间隔着一整年的春夏秋冬，最后你真的成了我的家人。"
};

export const storyOrbitNodes: StoryOrbitNode[] = [
  {
    id: "first-meet",
    time: "2024 大年初三",
    title: "短发的你，轻轻低着头",
    summary: "上午十一点多，我第一次见到你。故事从那个有点害羞的瞬间慢慢开始。",
    detail:
      "那天上午十一点多，我第一次见到你。见你之前，我还专门洗了个头。你站在家人后面，有点害羞，轻轻低着头，那个时候你还是短发。后来我们第一次见面就聊了一个小时。现在想想，故事就是从那一刻慢慢开始的。",
    tone: "violet"
  },
  {
    id: "first-hold-hands",
    time: "2024 大年初六",
    title: "第一次牵手",
    summary: "烤肉、电影、彩票、金豆，还有我第一次主动牵起你的手。",
    detail:
      "我们第一次约出来，在万达吃了烤肉，看了电影，买了彩票，我还给你买了金豆。最重要的是，那天我第一次主动牵起你的手。那时候的你很纯真，也很真实。",
    tone: "gold"
  },
  {
    id: "pujiu-lock",
    time: "2024 大年初八",
    title: "普救寺和同心锁",
    summary: "后备箱里藏着花，普救寺里藏着一把后来很重要的同心锁。",
    detail:
      "我专门请了假，后备箱里藏着花，带你去了永济普救寺。我们看了西厢记，听了舍利塔敲击时像蝉鸣又像蛙叫的声音，还买了四根烤肠垫肚子。后来我们刻了那把同心锁。你本来想刻平平安安、健健康康，可锁上最后有了永远在一起、永结同心，还有我们的名字。那一刻我觉得，好像老天都在帮我。",
    tone: "mint"
  },
  {
    id: "parking-flowers",
    time: "2024 大年初八",
    title: "停车场里的花",
    summary: "你坐在副驾，我从后备箱拿出花，认真问你要不要做我女朋友。",
    detail:
      "出了寺院，你已经坐到副驾。我从后备箱拿出准备好的花，绕到你那边，单膝跪地，问你要不要做我女朋友。你答应了。",
    tone: "rose"
  },
  {
    id: "beijing-snow-flight",
    time: "2024 北京雪夜",
    title: "你第一次坐飞机",
    summary: "北京下着很大的雪，出租车里我拉着你的手，凌晨三点我们到上海。",
    detail:
      "那天我们一起从北京去上海。那是你第一次坐飞机。出发去机场的时候，北京下着很大的雪。我坐在出租车里拉着你的手，窗外的雪一直落，飞机也晚点了。等我们到上海，已经是凌晨三点。那不是一次轻松的赶路，可我一直记得，那一路上你在我身边。",
    tone: "blue"
  },
  {
    id: "shanghai-noisy-sweet",
    time: "2024 上海",
    title: "吵闹也甜蜜的日子",
    summary: "外滩、汤圆、手机和眼泪，那些日子不总浪漫，但很真实。",
    detail:
      "在上海的日子，有甜蜜，也有吵闹。我们去过外滩，也一起处理过很多生活里的小麻烦。你的手机掉进洗衣机，我给你换了手机。我们也吵得很凶过，我哭了，你说你第一次见男生流泪。后来我们下去吃了汤圆。那些日子不总是浪漫，但很真实。",
    tone: "violet"
  },
  {
    id: "xiwan-life",
    time: "2024 喜湾",
    title: "一起住过的日子",
    summary: "生活不是每天都像电影，但一起住过的日子后来都成了我们的一部分。",
    detail:
      "5 月 1 日，我们换到了喜湾。后来的日子里，我们有很多分分合合，也有很多说不清的小事。生活不是每天都像电影，但那些一起住过、一起吃饭、一起吵闹又和好的日子，后来都成了我们的一部分。",
    tone: "rose"
  },
  {
    id: "engagement",
    time: "2024.10.07",
    title: "我们定亲了",
    summary: "从喜欢走向更具体的未来，也开始面对生活里更真实的部分。",
    detail:
      "2024 年 10 月 7 日，我们定亲了。那以后，我们开始更真切地面对两个家庭、钱、生活和未来。那段时间也有很多不容易，但它也是我们一步步走向婚姻的路。",
    tone: "gold"
  },
  {
    id: "nikon",
    time: "2024.10.17",
    title: "我买了尼康 Z6II",
    summary: "它不只是一台相机，也像是我开始认真记录生活的一个起点。",
    detail:
      "后来我买了自己的尼康 Z6II。那不只是一台相机，也像是我开始认真记录生活的一个起点。买完相机不久，我第一次带你去了杭州。",
    tone: "blue"
  },
  {
    id: "hangzhou-trip",
    time: "2024 杭州",
    title: "第一次为了旅行去一座城",
    summary: "西湖醉虾、西湖、茶山和寺庙，后来都变成我记得的画面。",
    detail:
      "那是我人生中第一次为了旅游专门去一座城市。我们吃了西湖醉虾，去了西湖，爬了茶山，也去了寺庙。那些路、那些风景，后来都变成我记得的画面。",
    tone: "mint"
  },
  {
    id: "married",
    time: "2025 大年初十",
    title: "我们结婚了",
    summary: "从第一次见面到成为夫妻，中间隔着一整年的春夏秋冬。",
    detail:
      "从 2024 年大年初三第一次见面，到 2025 年大年初十真的成为夫妻，中间隔着一整年的春夏秋冬。最后，你真的成了我的家人。",
    tone: "gold"
  },
  {
    id: "shengsi-sea",
    time: "2025 三月",
    title: "带家人去看海",
    summary: "跨过长江大桥，坐船去嵊泗岛，那是一段很赶也很热闹的日子。",
    detail:
      "结婚后，我们很快又回到上海。三月份，你姑姑、姐姐和妹妹来了上海，我安排住宿，也租车带你们出去。我们跨过长江大桥，坐船去了嵊泗岛。那天很赶，你姑姑还感冒了，但也是我们一起经历过的一段热闹日子。",
    tone: "blue"
  },
  {
    id: "shantang-letter",
    time: "2025.06.21",
    title: "七里山塘那封信",
    summary: "你在信里说爱我，这句话我一直记得。",
    detail:
      "6 月 21 日，我们去了苏州七里山塘。那天你给我和你朋友写了信。你在信里说爱我。这句话我一直记得。",
    tone: "violet"
  },
  {
    id: "huawei-tablet",
    time: "2025.10.26",
    title: "给你买了华为平板",
    summary: "只是想着你看小说、看视频的时候，可以窝得舒服一点。",
    detail:
      "2025 年 10 月 26 日，我给你买了华为平板。不是因为它有多贵重，而是想着你平时喜欢看小说、看视频，有一个大一点的屏幕，窝着看的时候应该会舒服一点。有些礼物不是为了显摆，只是想让你的日子轻松一点。",
    tone: "mint"
  },
  {
    id: "guangzhou-online",
    time: "2025.12",
    title: "开车去广州，你在线上陪我",
    summary: "我在路上，你每天问我到了哪里、安不安全，像一直在身边。",
    detail:
      "12 月我开车从上海去广州出差，本来想带你一起去，后来因为你身体不方便，路也太远，就没让你跟着。那几天你基本每天都在线上陪着我，问我到了哪里，安不安全。那时候我在路上，也一直觉得你在身边。",
    tone: "blue"
  },
  {
    id: "jiujiang-meet",
    time: "2025.12",
    title: "九江相约",
    summary: "我从赣州开到九江，晚上骑共享电驴去车站接你。",
    detail:
      "返程到江西时，因为周末休息，也因为很想你，我们约好在九江见。我从赣州开了 700 公里到九江，你晚上十点多到。我停好车，放好东西，骑共享电驴去九江站接你。出站后，我们没有打车，我用共享电驴载着你和行李。后来你说，那晚坐在电驴上的你觉得很幸福、很浪漫。那一刻我也记得。",
    tone: "rose"
  },
  {
    id: "lushan",
    time: "2025.12",
    title: "浔阳楼和庐山",
    summary: "浔阳楼、枇杷亭、浔阳江、庐山，然后又回到甜甜闹闹的上海生活。",
    detail:
      "在九江，我们去了浔阳楼、枇杷亭、浔阳江。第二天又报团去了庐山。12 月 15 日，我们从九江回到上海，又回到那种吵吵闹闹、甜甜蜜蜜的生活里。",
    tone: "mint"
  },
  {
    id: "my-birthday-card-game",
    time: "我的生日",
    title: "你给我做抽卡游戏",
    summary: "你给我买了海鲜水饺，还做了小抽卡互动游戏，我是真的开心。",
    detail:
      "我生日的时候，你给我买了海鲜水饺，还给我做了一套小抽卡互动游戏。那天我是真的开心。也许正是因为你给过我这样的惊喜，所以这次我也想认真给你做一个属于你的生日礼物星球。",
    tone: "gold"
  },
  {
    id: "christmas-stall",
    time: "2025.12.25",
    title: "第一次陪你摆摊",
    summary: "地铁口、平安果、电话和偷偷陪着你，那也是很有生活味的一天。",
    detail:
      "平安夜那天，我陪你第一次摆摊卖平安果。你在地铁口有点害怕，给我打电话。其实我就在旁边偷偷观察你。当天我们卖出去一部分，剩下的我给了同事。现在想起来，那也是很有生活味的一天。",
    tone: "rose"
  },
  {
    id: "saizeriya-soup",
    time: "上海日常",
    title: "萨莉亚和蘑菇汤",
    summary: "真正的浪漫可能也包括，记得你每次都要点蘑菇汤。",
    detail:
      "要说在上海陪你最有意思的事，好像总绕不开吃饭。你最爱吃萨莉亚，而且每次必须点蘑菇汤。后来我想，真正的浪漫可能不只是大事，也包括记得你爱吃什么。",
    tone: "gold"
  },
  {
    id: "new-year-2026",
    time: "2026 过年",
    title: "一起玩雪、吃饭、转亲戚",
    summary: "有雪、有饭、有亲戚，也有不容易，但我们还在继续往前走。",
    detail:
      "2026 年过年，你提前回家，我后来请假也回去了。我们一起玩雪，一起吃美食，一起去转亲戚。也发生过一些争吵和观念上的问题，但我们都没有刻意再提。日子不是永远顺，但我们还在继续往前走。",
    tone: "blue"
  },
  {
    id: "distance-after-march",
    time: "2026 三月以后",
    title: "分开一段距离",
    summary: "我们隔着一段距离，各自处理生活，也约好六月底北京见。",
    detail:
      "后来你爷爷出事，你回了家。我退了上海租的房子，回到公司酒店。5 月 1 日我回去看了爷爷，也和你在家里相处了一段时间。后来我去了北京，我们约好 6 月底见面。",
    tone: "violet"
  },
  {
    id: "waiting-beijing",
    time: "现在",
    title: "等你来北京",
    summary: "这份生日礼物先送你一半，剩下那一半等你来北京时亲手兑现。",
    detail:
      "所以今年这份生日礼物，我想先送你一半。网页里的这一半，是先送到你面前的心意。剩下那一半，我想等你来北京的时候，亲手给你。到时候带你吃好吃的，陪你看电影，也慢慢把后面的惊喜兑现。",
    tone: "mint"
  }
];

export const storyTimeline: StoryTimelineItem[] = storyOrbitNodes.map((item) => ({
  time: item.time,
  title: item.title,
  description: item.detail
}));

export const rememberedSnapshots: SnapshotMemory[] = [
  {
    title: "短发的你，轻轻低着头",
    description: "那天你站在家人后面，有点害羞，也很真实。"
  },
  {
    title: "第一次见面，我们聊了一个小时",
    description: "本来只是见一面，后来却成了故事的开头。"
  },
  {
    title: "万达那天，我主动牵了你的手",
    description: "烤肉、电影、彩票和金豆，都变成了那天的注脚。"
  },
  {
    title: "普救寺里，那把同心锁",
    description: "锁上的字，后来慢慢照进了我们的日子里。"
  },
  {
    title: "停车场里，我拿着花单膝跪地",
    description: "那一刻很认真，也很紧张。"
  },
  {
    title: "北京下雪那晚，出租车里我拉着你的手",
    description: "雪很大，路很晚，但你在我身边。"
  },
  {
    title: "凌晨三点到上海",
    description: "那不是轻松的赶路，却是我一直记得的一晚。"
  },
  {
    title: "你说第一次见男生流泪",
    description: "那不是完美的一天，却是真实的我们。"
  },
  {
    title: "杭州的西湖、茶山和醉虾",
    description: "第一次为了旅行去一座城，后来都成了画面。"
  },
  {
    title: "七里山塘那封写着爱的信",
    description: "你写下的那句话，我一直记得。"
  },
  {
    title: "给你买平板那天",
    description: "想着你看小说、看视频能舒服一点，所以那天给你买了华为平板。"
  }
];

export const dailyCoupons: DailyCoupon[] = [
  {
    title: "抱抱兑换券",
    description:
      "可在想撒娇、想耍赖、想被哄、想被抱住的时候使用。六月底来北京后优先兑现，长期有效，不限次数。",
    actionLabel: "收入卡包",
    message: "抱抱申请已加入六月底北京见面清单，请 Long 见面后立刻执行。",
    meta: "daily coupon"
  },
  {
    title: "北京火锅兑现券",
    description:
      "六月底来北京，想吃火锅、烤肉、甜品、夜宵都可以。琳宝负责点菜，Long 负责安排。",
    actionLabel: "预约北京好吃的",
    message: "预约成功，请告诉 Long：来北京后第一顿想吃什么。",
    meta: "beijing dinner"
  },
  {
    title: "北京夜景散步券",
    description: "可以用于逛街、散步、看电影、发呆、聊天，或者在北京的晚上一起慢慢走一段路。",
    actionLabel: "领取这张",
    message: "这张已经属于你了，六月底来北京后随时可以找 Long 兑现。",
    meta: "beijing night"
  }
];

export const mysteryBoxes = ["暖暖盒", "好运盒", "好吃盒", "快乐盒", "神秘盒"];

export const mysteryPrizes: MysteryPrize[] = [
  {
    title: "52 元红包",
    description: "一份小小心意，今天就可以找 Long 领取。"
  },
  {
    title: "66 元红包",
    description: "愿今天的开心顺顺利利。"
  },
  {
    title: "88 元红包",
    description: "好运和偏爱都给你。"
  },
  {
    title: "北京火锅兑现券",
    description: "六月底来北京，你负责选口味，我负责安排。"
  },
  {
    title: "奶茶和甜品",
    description: "来北京后的第一份甜，Long 负责买给你。"
  },
  {
    title: "北京电影院包场券",
    description: "选一部你想看的电影，我们一起窝在最后一排，牵着手慢慢看完。"
  },
  {
    title: "北京夜景散步券",
    description: "晚一点出门，慢慢走一段只属于我们的路。"
  },
  {
    title: "来北京后的第一份惊喜",
    description: "具体内容先保密，Long 会放在见面那天认真给你。"
  },
  {
    title: "六月底见面礼预约权",
    description: "这份先保密，等你来北京时亲手给你。"
  },
  {
    title: "游戏机愿望基金",
    description: "Long 会认真评估预算，并优先纳入家庭快乐计划。"
  },
  {
    title: "笔记本电脑愿望基金",
    description: "这是一份高级愿望卡，我们可以一起认真规划。"
  },
  {
    title: "Long 的爱永久有效",
    description: "这个不用抽，本来就是你的。"
  }
];

export const memoriesMedia: MemoryMedia[] = [
  {
    id: "hangzhou-placeholder",
    type: "image",
    title: "杭州旅行",
    date: "2024",
    description: "西湖、茶山、醉虾，之后可以把旅行照片慢慢放进来。",
    src: "/images/memories/hangzhou-2024-placeholder.jpg",
    category: "杭州"
  },
  {
    id: "shengsi-placeholder",
    type: "video",
    title: "嵊泗岛看海",
    date: "2025-03",
    description: "跨过长江大桥，坐船去看海，这里以后可以放那段热闹日子的照片和视频。",
    src: "/videos/shengsi-2025-placeholder.mp4",
    poster: "/images/memories/shengsi-2025-poster.jpg",
    category: "嵊泗岛"
  },
  {
    id: "suzhou-shantang-placeholder",
    type: "image",
    title: "苏州七里山塘",
    date: "2025-06-21",
    description: "那天你写下爱我，这里以后可以放那封信或那天的照片。",
    src: "/images/memories/shantang-letter-2025-placeholder.jpg",
    category: "苏州"
  },
  {
    id: "jiujiang-placeholder",
    type: "video",
    title: "九江和庐山",
    date: "2025-12",
    description: "浔阳楼、浔阳江、庐山，还有那晚共享电驴上的幸福感。",
    src: "/videos/jiujiang-lushan-2025-placeholder.mp4",
    poster: "/images/memories/jiujiang-lushan-2025-poster.jpg",
    category: "九江"
  },
  {
    id: "snow-new-year-placeholder",
    type: "image",
    title: "过年玩雪",
    date: "2026",
    description: "一起玩雪、吃饭、转亲戚，那些不总顺但继续往前走的日子。",
    src: "/images/memories/new-year-snow-2026-placeholder.jpg",
    category: "过年"
  },
  {
    id: "wedding-placeholder",
    type: "image",
    title: "婚礼和成为家人",
    date: "2025",
    description: "从初三到初十，中间隔着一整年春夏秋冬，最后你成了我的家人。",
    src: "/images/memories/wedding-2025-placeholder.jpg",
    category: "婚礼"
  },
  {
    id: "shanghai-daily-placeholder",
    type: "video",
    title: "上海日常",
    date: "2024-2026",
    description: "萨莉亚、蘑菇汤、外滩、汤圆和很多吵吵闹闹又甜甜蜜蜜的日常。",
    src: "/videos/shanghai-daily-placeholder.mp4",
    poster: "/images/memories/shanghai-daily-poster.jpg",
    category: "上海"
  }
];

export const birthDayData: BirthDayData = {
  title: "那一天星",
  solarDate: "1999年6月8日",
  lunarDate: "己卯年四月廿五",
  weekday: "星期二",
  zodiac: "兔",
  constellation: "双子座",
  intro: "那一天，你来到这个世界。很多年后，我才终于在大年初三见到你。",
  mainCopy: [
    "1999 年 6 月 8 日，星期二。农历己卯年四月廿五，你来到这个世界。",
    "那一天，对很多人来说只是普通的一天。报纸照常印刷，城市照常醒来，世界也照常往前走。可对我来说，后来才知道，那一天很重要。",
    "因为那一天，世界上多了一个你。很多年后，我才会在大年初三见到短发的你，才会和你一起去万达、去普救寺、去上海、去杭州、去九江，才会在后来叫你一声：我的老婆。"
  ],
  ending: "那一天，你来到世界。很多年后，我遇见你。再后来，我们有了属于我们的礼物星球。",
  cards: [
    {
      title: "你的日期",
      body: "公历：1999 年 6 月 8 日\n农历：己卯年四月廿五\n星期：星期二\n生肖：兔\n星座：双子座"
    },
    {
      title: "那天的世界",
      body: "那一天，世界并不安静。有些地方还在经历冲突，也有人在为和平奔走。也有一些关于平等、保护和尊重的公约被写下。世界很大，事情很多。而你就在那一天，悄悄来了。"
    },
    {
      title: "那年的中国",
      body: "1999 年的中国正在跨向新的世纪。那一天的报纸上，有扶贫、国企、社会保障、市场变化，也有远方世界的新闻。人们忙着生活，时代继续往前。而你也开始了属于自己的第一天。"
    },
    {
      title: "那年的电影和未来",
      body: "1999 年，也是很多科幻想象被点亮的一年。《黑客帝国》和《星球大战前传 1》都在那一年走进电影院。很多人在电影里想象未来、宇宙、命运和选择。很多年后，我才知道，我也会遇见一个喜欢科幻电影的你。"
    },
    {
      title: "写给那一天",
      body: "如果可以回到 1999 年 6 月 8 日，我想远远看一眼那天的天空。不用做什么，也不用说什么。只要知道：那天来到世界的这个女孩，后来会成为我很重要很重要的人。"
    }
  ]
};

export const homeGiftCards: ContentItem[] = [
  {
    title: "抱抱兑换券",
    description: "可在你想撒娇、想耍赖、想被哄的时候使用。长期有效，不限次数。",
    meta: "gift ticket",
    href: "/success",
    cta: "收下这张"
  },
  {
    title: "一起去吃好吃的预约单",
    description:
      "适用于想吃火锅、烤肉、甜品、夜宵以及突然嘴馋的时候。我负责陪你去，也负责陪你开心。",
    meta: "dinner pass",
    href: "/success",
    cta: "预约一下"
  },
  {
    title: "长期陪伴使用权",
    description: "这一张不是限时体验卡，是我认真想给你的长期版本。",
    meta: "long-term",
    href: "/success",
    cta: "确认收下"
  }
];

export const workflowSteps = [
  {
    title: "第一次心动",
    description: "从第一次认真看向你开始，我就知道，你和别人是不一样的。"
  },
  {
    title: "越来越确定",
    description: "和你相处越久，我越确定自己想把温柔、偏爱和耐心都给你。"
  },
  {
    title: "想走很久",
    description: "我不只想短暂地喜欢你，我想陪你把许多平凡日子都过成小小纪念日。"
  }
];

export const posts: ContentItem[] = [
  {
    title: "我最喜欢你笑起来的样子",
    description: "那种轻轻一笑就能把一天的疲惫都赶走的魔法，我每次都心甘情愿中招。",
    meta: "想对你说的话",
    href: "/posts",
    cta: "继续看下去"
  },
  {
    title: "你出现以后，很多事情都变得柔软了",
    description: "原来真的会因为一个人，开始期待清晨、晚风、散步和每一次普通的见面。",
    meta: "认真喜欢",
    href: "/posts",
    cta: "我还想说"
  },
  {
    title: "我想把偏爱写得很明确",
    description: "不是随口一说的喜欢，而是想一次次站到你这边、哄你、护着你、陪着你的那种喜欢。",
    meta: "偏爱声明",
    href: "/posts",
    cta: "收下这句"
  }
];

export const learnItems: ContentItem[] = [
  {
    title: "想和你一起学会把日子过得更浪漫",
    description: "一起看展、散步、拍照、去吃喜欢的东西，把平常的一天过成值得记住的一天。",
    meta: "未来计划",
    href: "/learn",
    cta: "看看计划"
  },
  {
    title: "想和你一起把小日常过成长长的故事",
    description: "从今天想吃什么，到明年去哪里看海，我都想把你放进我的以后里。",
    meta: "关于以后",
    href: "/learn",
    cta: "继续往后看"
  },
  {
    title: "想慢慢学会更好地爱你",
    description: "学会更耐心一点，更细心一点，更坚定一点，让你被喜欢这件事感受得清清楚楚。",
    meta: "认真爱你",
    href: "/learn",
    cta: "这是我的答案"
  }
];

export const products: ContentItem[] = [
  {
    title: "给琳宝的抱抱券",
    description: "无限次使用，不限时间，不限场景，只要你想要，我就张开手等你过来。",
    meta: "小惊喜",
    href: "/success",
    cta: "收下抱抱券"
  },
  {
    title: "一起去吃好吃的预约单",
    description: "你点地方，我负责出现。火锅、烧烤、甜品还是夜宵，我都陪你去。",
    meta: "约会计划",
    href: "/success",
    cta: "确认这份惊喜"
  },
  {
    title: "长期陪伴使用权",
    description: "这份礼物没有截止日期，我想给你的，是很长很长时间里的偏爱和陪伴。",
    meta: "终身有效",
    href: "/success",
    cta: "我愿意收下"
  }
];

export const contactMethods: ContactMethod[] = [
  {
    title: "第一句落款",
    value: "琳宝，我真的很喜欢你。",
    note: "不是一时兴起，也不是随口说说，是认真、郑重、想让你知道的那种喜欢。"
  },
  {
    title: "第二句落款",
    value: "如果你愿意，我想继续一直对你好。",
    note: "想在你开心的时候陪你更开心，也想在你累的时候第一个抱抱你。"
  },
  {
    title: "第三句落款",
    value: "看完这页以后，能不能让我亲口再说一遍给你听。",
    note: "这次网站先替我开口，下一次我想站在你面前，认真叫你一声琳宝。"
  }
];
