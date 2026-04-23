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
  brand: "Long",
  studio: "by Long Studio",
  url: "https://fdaicar.top",
  subtitle: "个人分享 / 学习笔记 / 小商店",
  heroTitle: "Long 的分享、学习与作品，在这里慢慢长成自己的样子。",
  heroDescription:
    "这是一个为个人内容、长期学习与轻量成交准备的品牌站首版。它先把页面、访问与托管支付的链路跑通，后续再逐步扩展内容和商品。",
  email: "hello@fdaicar.top",
  meta: {
    title: "Long | by Long Studio",
    description:
      "Long 的个人品牌站，聚合个人分享、学习笔记与轻量小商店，支持后续接入 Stripe 托管支付。"
  }
};

export const navigation: NavItem[] = [
  { label: "关于我", href: "/#about" },
  { label: "流程", href: "/#workflow" },
  { label: "分享", href: "/posts" },
  { label: "学习", href: "/learn" },
  { label: "商店", href: "/shop" },
  { label: "联系", href: "/contact" }
];

export const workflowSteps = [
  {
    title: "1. 发布页面",
    description: "把内容、服务或商品整理成清楚的一页，让用户能快速理解你提供的价值。"
  },
  {
    title: "2. 用户访问",
    description: "通过分享链接、社交平台或自然搜索，把访问者稳定引导到站点与对应的内容页。"
  },
  {
    title: "3. 跳转支付",
    description: "点击商品按钮后进入第三方托管支付页，完成支付，再返回成功页继续后续沟通。"
  }
];

export const posts: ContentItem[] = [
  {
    title: "为什么个人网站值得长期维护",
    description: "从内容资产、品牌沉淀到转化效率，整理一套适合个人经营的站点思路。",
    meta: "个人分享 · 品牌思考",
    href: "/posts",
    cta: "查看分享"
  },
  {
    title: "我如何把零散输出整理成稳定栏目",
    description: "把灵感、案例、经验和服务拆成可复用模块，降低后续维护成本。",
    meta: "内容体系 · 输出流程",
    href: "/posts",
    cta: "进入列表"
  },
  {
    title: "一个小而稳的个人站首页应该讲清什么",
    description: "先讲你是谁、做什么、如何合作，再讲更复杂的产品细节。",
    meta: "网站结构 · 首版策略",
    href: "/posts",
    cta: "继续阅读"
  }
];

export const learnItems: ContentItem[] = [
  {
    title: "Next.js App Router 搭站笔记",
    description: "记录从项目初始化、路由设计到页面结构拆分的一套轻量实践。",
    meta: "学习笔记 · Web 开发",
    href: "/learn",
    cta: "查看笔记"
  },
  {
    title: "如何为个人站预留 Stripe Payment Link",
    description: "不做重后端，也能先把支付通路留出来，先验证需求再加复杂度。",
    meta: "支付流程 · 站点扩展",
    href: "/learn",
    cta: "查看方法"
  },
  {
    title: "把教程、资源和复盘放进一个学习页",
    description: "通过统一结构整理知识沉淀，让内容更容易被自己和他人重新使用。",
    meta: "知识整理 · 学习系统",
    href: "/learn",
    cta: "打开学习区"
  }
];

export const products: ContentItem[] = [
  {
    title: "个人品牌页诊断",
    description: "适合想梳理定位、文案与页面结构的人，帮助你先把展示与转化链路理顺。",
    meta: "轻咨询 · 45 分钟",
    href: "https://example.com/replace-with-stripe-payment-link/brand-review",
    cta: "立即购买",
    external: true
  },
  {
    title: "落地页文案框架",
    description: "一份可以直接复用的页面信息结构模板，帮助你更快搭好个人或服务页面。",
    meta: "数字产品 · 模板",
    href: "https://example.com/replace-with-stripe-payment-link/landing-copy",
    cta: "立即查看",
    external: true
  },
  {
    title: "内容发布流程清单",
    description: "把选题、整理、发布、复盘和转化动作串成一条更稳定的个人工作流。",
    meta: "数字产品 · 清单",
    href: "https://example.com/replace-with-stripe-payment-link/content-playbook",
    cta: "立即购买",
    external: true
  }
];

export const contactMethods: ContactMethod[] = [
  {
    title: "邮箱",
    value: siteConfig.email,
    note: "适合商务合作、项目咨询与支付后续沟通。",
    href: `mailto:${siteConfig.email}`
  },
  {
    title: "微信",
    value: "LongStudio",
    note: "这里先放占位微信号，后续可以替换成你的实际联系方式。"
  },
  {
    title: "社交主页",
    value: "github.com/replace-this-with-your-handle",
    note: "建议替换成你的 GitHub、X 或其他主要社交主页。",
    href: "https://github.com/replace-this-with-your-handle",
    external: true
  }
];
