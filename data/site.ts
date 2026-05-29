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

export const siteConfig = {
  brand: "琳宝",
  studio: "from Long",
  url: "https://www.fdaicar.top",
  subtitle: "专属互动礼物盒",
  heroTitle: "琳宝的专属礼物盒",
  heroDescription: "里面有一点好运，一点偏爱，还有很多我想给你的开心。",
  email: "linbao@fdaicar.top",
  meta: {
    title: "琳宝的专属礼物盒",
    description:
      "这是 Long 给琳宝准备的专属互动礼物盒，里面有好运、小券、神秘礼物和认真记住的时间线。"
  }
};

export const navigation: NavItem[] = [
  { label: "封面", href: "/#cover" },
  { label: "彩票", href: "/#lottery" },
  { label: "小券", href: "/#coupons" },
  { label: "礼盒", href: "/#mystery" },
  { label: "时间线", href: "/#timeline" },
  { label: "落款", href: "/#signature" }
];

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
      "那天从北京去上海，出发去机场的时候，外面下着很大的雪。我坐在出租车里，拉着你的手，看着窗外的雪一点点落下来。飞机晚点，我们凌晨三点才到上海。可我现在想起来，记住的不是等待有多晚，是那一路上，你在我身边。",
    meta: "chapter 02",
    featured: true,
    image: "/snow-night-taxi-memory.jpg",
    note: "北京下雪的那晚，我记得很清楚。"
  },
  {
    title: "后来开始觉得，有你真好",
    description:
      "后来有很多普通的小瞬间，不一定多热烈，却让我慢慢确定：如果以后的很多路，都能和你一起走，那应该会是一件很好的事。",
    meta: "chapter 03"
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

export const dailyCoupons: DailyCoupon[] = [
  {
    title: "抱抱兑换券",
    description:
      "可在想撒娇、想耍赖、想被哄、想被抱住的时候使用。长期有效，不限次数。",
    actionLabel: "立即使用",
    message: "抱抱申请已提交，请 Long 立刻执行。",
    meta: "daily coupon"
  },
  {
    title: "好吃的预约单",
    description:
      "火锅、烤肉、甜品、夜宵、想吃什么都可以。琳宝负责点菜，Long 负责安排。",
    actionLabel: "预约一顿好吃的",
    message: "预约成功，请告诉 Long：时间、地点、想吃什么。",
    meta: "dinner note"
  },
  {
    title: "陪你做小事券",
    description: "可以用于逛街、散步、看电影、发呆、聊天、一起浪费时间。",
    actionLabel: "领取这张",
    message: "这张已经属于你了，随时可以找 Long 兑现。",
    meta: "quiet time"
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
    title: "火锅一顿",
    description: "你负责想吃哪家，我负责安排。"
  },
  {
    title: "奶茶和甜品",
    description: "甜的给你，开心也给你。"
  },
  {
    title: "电影约会一次",
    description: "选一部你想看的电影，我们一起去。"
  },
  {
    title: "抱抱无限次",
    description: "不限时间，不限次数，长期有效。"
  },
  {
    title: "今天你最大",
    description: "今天所有小脾气都优先被照顾。"
  },
  {
    title: "神秘礼物预约权",
    description: "礼物内容暂不公开，但 Long 会认真准备。"
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
