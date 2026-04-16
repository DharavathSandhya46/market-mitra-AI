import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Brain, TrendingUp, Mic, Bell, Star, AlertTriangle, IndianRupee } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { useProductStore } from "@/stores/productStore";

const CHART_COLORS = ["hsl(28,100%,55%)", "hsl(160,60%,45%)", "hsl(250,60%,65%)", "hsl(340,70%,55%)", "hsl(200,60%,50%)"];

const DashboardHome = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const products = useProductStore((s) => s.products);

  const categoryData = useMemo(() => {
    const map = new Map<string, number>();
    products.forEach((p) => {
      const cat = p.category[lang];
      map.set(cat, (map.get(cat) || 0) + 1);
    });
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [products, lang]);

  const lowStock = useMemo(() => products.filter((p) => p.qty <= 10).sort((a, b) => a.qty - b.qty), [products]);

  const totalValue = useMemo(() => products.reduce((sum, p) => sum + p.price * p.qty, 0), [products]);

  const suggestions = [
    { text: t("suggestion1"), icon: "🌧️" },
    { text: t("suggestion2"), icon: "📈" },
    { text: t("suggestion3"), icon: "🥛" },
  ];

  const bestSellers = useMemo(() => [
    { name: t("bestSeller1"), reason: t("bestSellerReason1"), trend: "+45%", icon: "🔥" },
    { name: t("bestSeller2"), reason: t("bestSellerReason2"), trend: "+32%", icon: "⭐" },
    { name: t("bestSeller3"), reason: t("bestSellerReason3"), trend: "+40%", icon: "📈" },
    { name: t("bestSeller4"), reason: t("bestSellerReason4"), trend: "+30%", icon: "🚀" },
    { name: t("bestSeller5"), reason: t("bestSellerReason5"), trend: "+22%", icon: "☕" },
  ], [lang]);

  const stats = [
    { label: t("totalProducts"), value: products.length, icon: Package, color: "text-primary" },
    { label: t("aiSuggestions"), value: suggestions.length, icon: Brain, color: "text-accent" },
    { label: t("categories"), value: categoryData.length, icon: TrendingUp, color: "text-primary" },
    { label: t("totalValue"), value: `₹${totalValue.toLocaleString()}`, icon: IndianRupee, color: "text-accent" },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Voice hint */}
      <div className="glass-card p-3 flex items-center gap-3 border-l-4 border-l-primary cursor-pointer hover:bg-primary/5 transition-colors" onClick={() => navigate("/dashboard/add")}>
        <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center animate-pulse">
          <Mic className="w-4 h-4 text-primary" />
        </div>
        <p className="text-sm font-medium text-foreground">{t("voiceHint")}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <div key={s.label} className="glass-card p-4 flex items-center gap-3 hover:scale-[1.02] transition-transform duration-300" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-xl font-display font-bold text-foreground">{s.value}</p>
              <p className="text-[11px] text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Category Chart */}
        <div className="glass-card p-5">
          <h2 className="font-display font-semibold text-sm text-foreground mb-3">{t("categoryDistribution")}</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={4} dataKey="value" stroke="none">
                  {categoryData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(225,20%,12%)", border: "1px solid hsl(225,15%,25%)", borderRadius: "12px", color: "#fff", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {categoryData.map((d, i) => (
              <span key={d.name} className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <span className="w-2 h-2 rounded-full" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                {d.name}
              </span>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="glass-card p-5">
          <h2 className="font-display font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
            <Brain className="w-4 h-4 text-accent" />
            {t("aiInsights")}
          </h2>
          <div className="space-y-2.5">
            {suggestions.map((s, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/40 border border-border hover:border-accent/30 transition-all duration-300 hover:scale-[1.01]">
                <span className="text-lg mt-0.5">{s.icon}</span>
                <p className="text-sm text-secondary-foreground leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Best Sellers */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-1">
          <Star className="w-4 h-4 text-primary" />
          <h2 className="font-display font-semibold text-sm text-foreground">{t("aiBestSellers")}</h2>
        </div>
        <p className="text-xs text-muted-foreground mb-3">{t("aiBestDesc")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {bestSellers.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 hover:scale-[1.02]">
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground truncate">{item.reason}</p>
              </div>
              <span className="text-xs font-semibold text-accent">{item.trend}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Low Stock */}
      {lowStock.length > 0 && (
        <div className="glass-card p-5 border-l-4 border-l-destructive">
          <div className="flex items-center gap-2 mb-3">
            <Bell className="w-4 h-4 text-destructive" />
            <h2 className="font-display font-semibold text-sm text-foreground">{t("lowStockAlerts")}</h2>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-destructive/15 text-destructive text-xs font-semibold">{lowStock.length}</span>
          </div>
          <div className="space-y-2">
            {lowStock.map((p) => {
              const isCritical = p.qty <= 5;
              return (
                <div key={p.id} className={`flex items-center gap-3 p-3 rounded-xl border ${isCritical ? "bg-destructive/10 border-destructive/30" : "bg-yellow-500/10 border-yellow-500/30"}`}>
                  <AlertTriangle className={`w-4 h-4 shrink-0 ${isCritical ? "text-destructive" : "text-yellow-500"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{p.name[lang]}</p>
                    <p className="text-xs text-muted-foreground">{p.category[lang]}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${isCritical ? "text-destructive" : "text-yellow-500"}`}>{p.qty} {t("lowStockUnit")}</p>
                    <span className={`text-[10px] font-semibold uppercase ${isCritical ? "text-destructive" : "text-yellow-500"}`}>
                      {isCritical ? t("lowStockCritical") : t("lowStockWarning")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
