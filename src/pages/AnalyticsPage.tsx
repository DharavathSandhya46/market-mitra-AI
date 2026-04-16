import { useMemo } from "react";
import { BarChart3, ShoppingCart, TrendingUp } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell } from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProductStore } from "@/stores/productStore";

const COLORS = ["hsl(28,100%,55%)", "hsl(160,60%,45%)", "hsl(250,60%,65%)", "hsl(340,70%,55%)", "hsl(200,60%,50%)"];

const AnalyticsPage = () => {
  const { t, lang } = useLanguage();
  const products = useProductStore((s) => s.products);

  const dailySalesData = useMemo(() => {
    const days = [t("monday"), t("tuesday"), t("wednesday"), t("thursday"), t("friday"), t("saturday"), t("sunday")];
    const values = [1250, 1480, 980, 1650, 2100, 2800, 1900];
    return days.map((day, i) => ({ day, sales: values[i] }));
  }, [lang]);

  const topProducts = useMemo(() => {
    return [...products].sort((a, b) => b.sales - a.sales).slice(0, 8).map((p) => ({
      name: p.name[lang].length > 15 ? p.name[lang].slice(0, 15) + "…" : p.name[lang],
      sales: p.sales,
    }));
  }, [products, lang]);

  const categoryRevenue = useMemo(() => {
    const map = new Map<string, number>();
    products.forEach((p) => {
      const cat = p.category[lang];
      map.set(cat, (map.get(cat) || 0) + p.price * p.sales);
    });
    return Array.from(map.entries()).map(([name, revenue]) => ({ name, revenue }));
  }, [products, lang]);

  const totalWeeklySales = dailySalesData.reduce((s, d) => s + d.sales, 0);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-primary" />
        <h2 className="font-display font-bold text-lg text-foreground">{t("analytics")}</h2>
      </div>

      {/* Weekly summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-display font-bold text-primary">₹{totalWeeklySales.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">{t("dailySalesDesc")}</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-display font-bold text-accent">{products.length}</p>
          <p className="text-xs text-muted-foreground mt-1">{t("totalProducts")}</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-display font-bold text-foreground flex items-center justify-center gap-1">
            <TrendingUp className="w-5 h-5 text-accent" />
            +18%
          </p>
          <p className="text-xs text-muted-foreground mt-1">{t("aiBestSellers")}</p>
        </div>
      </div>

      {/* Daily Sales */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-1">
          <ShoppingCart className="w-4 h-4 text-accent" />
          <h3 className="font-display font-semibold text-sm text-foreground">{t("dailySales")}</h3>
          <span className="ml-auto text-xs text-muted-foreground">
            {t("today")}: <span className="text-foreground font-semibold">₹{dailySalesData[dailySalesData.length - 1]?.sales?.toLocaleString()}</span>
          </span>
        </div>
        <div className="h-56 mt-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailySalesData}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(160,60%,45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(160,60%,45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225,15%,25%)" />
              <XAxis dataKey="day" tick={{ fill: "hsl(215,12%,55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215,12%,55%)", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}`} />
              <Tooltip contentStyle={{ background: "hsl(225,20%,12%)", border: "1px solid hsl(225,15%,25%)", borderRadius: "12px", color: "#fff", fontSize: "13px" }} formatter={(value: number) => [`₹${value.toLocaleString()}`, t("salesAmount")]} />
              <Area type="monotone" dataKey="sales" stroke="hsl(160,60%,45%)" strokeWidth={2.5} fill="url(#salesGrad)" dot={{ fill: "hsl(160,60%,45%)", r: 4, strokeWidth: 0 }} activeDot={{ r: 6, fill: "hsl(160,60%,45%)" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Top Products */}
        <div className="glass-card p-5">
          <h3 className="font-display font-semibold text-sm text-foreground mb-3">{t("aiBestSellers")}</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(225,15%,25%)" horizontal={false} />
                <XAxis type="number" tick={{ fill: "hsl(215,12%,55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: "hsl(215,12%,55%)", fontSize: 11 }} axisLine={false} tickLine={false} width={100} />
                <Tooltip contentStyle={{ background: "hsl(225,20%,12%)", border: "1px solid hsl(225,15%,25%)", borderRadius: "12px", color: "#fff", fontSize: "12px" }} />
                <Bar dataKey="sales" radius={[0, 6, 6, 0]}>
                  {topProducts.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Revenue */}
        <div className="glass-card p-5">
          <h3 className="font-display font-semibold text-sm text-foreground mb-3">{t("categoryDistribution")}</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(225,15%,25%)" />
                <XAxis dataKey="name" tick={{ fill: "hsl(215,12%,55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(215,12%,55%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ background: "hsl(225,20%,12%)", border: "1px solid hsl(225,15%,25%)", borderRadius: "12px", color: "#fff", fontSize: "12px" }} formatter={(v: number) => [`₹${v.toLocaleString()}`, "Revenue"]} />
                <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                  {categoryRevenue.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
