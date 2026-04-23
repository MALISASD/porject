# Long Personal Brand Site

一个基于 Next.js App Router + TypeScript 的个人品牌站示例，面向 `fdaicar.top`，包含分享、学习、小商店、支付成功页和联系页。

## 本地运行

```bash
npm install
npm run dev
```

默认访问地址：

```text
http://localhost:3000
```

## 构建生产版本

```bash
npm run build
npm run start
```

## 后续替换支付链接

商店页和首页商品卡片里的按钮当前都使用占位地址。后续只需要在 `data/site.ts` 里替换对应商品的 `href` 为你的 Stripe Payment Link 即可。
