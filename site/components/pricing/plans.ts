// 付费版价格（人民币）。价格页和首页的 SoftwareApplication 结构化数据都从这里读，
// 改价只改这一处；数字要和 pushy-admin / pushy-go 的实际计费保持一致。
// aiBonus 是年付赠送的 Token（美元计价额度），要和 pushy-go internal/order/ai_bonus.go 一致。
export const PAID_PLANS = {
  standard: { name: '标准版', annualPrice: 960, monthlyPrice: 120, aiBonus: 30 },
  premium: { name: '高级版', annualPrice: 2400, monthlyPrice: 300, aiBonus: 100 },
  pro: { name: '专业版', annualPrice: 7200, monthlyPrice: 900, aiBonus: 360 },
} as const;
