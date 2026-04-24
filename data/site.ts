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

export const siteConfig = {
  brand: "琳宝",
  studio: "from Long",
  url: "https://www.fdaicar.top",
  subtitle: "写给你的一封线上情书",
  heroTitle: "琳宝，我把想对你说的话，认真做成了一个只送给你的网站。",
  heroDescription:
    "本来只是想给你准备一个小惊喜，后来发现最想放进去的，不是页面，不是按钮，而是我每一次想起你时心里那种很笃定的喜欢。",
  email: "linbao@fdaicar.top",
  meta: {
    title: "琳宝，我喜欢你",
    description:
      "这是 Long 写给琳宝的一封线上情书，里面有心动、想念、小惊喜，还有想陪你走很久很久的认真。"
  }
};

export const navigation: NavItem[] = [
  { label: "写给你", href: "/#about" },
  { label: "心动瞬间", href: "/#moments" },
  { label: "想说的话", href: "/posts" },
  { label: "未来计划", href: "/learn" },
  { label: "小惊喜", href: "/shop" },
  { label: "最后落款", href: "/contact" }
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
