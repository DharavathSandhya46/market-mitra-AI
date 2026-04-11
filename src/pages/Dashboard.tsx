import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Brain, TrendingUp, Mic, MicOff, Plus, Trash2, LogOut, Store, BarChart3 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage, Language } from "@/contexts/LanguageContext";

const CHART_DATA = [
  { name: "Grocery", value: 40 },
  { name: "Snacks", value: 25 },
  { name: "Beverages", value: 20 },
  { name: "Personal Care", value: 15 },
];
const CHART_COLORS = ["hsl(28,100%,55%)", "hsl(160,60%,45%)", "hsl(250,60%,65%)", "hsl(340,70%,55%)"];

interface Product {
  id: number;
  name: Record<Language, string>;
  category: Record<Language, string>;
  qty: number;
  price: number;
}

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: { en: "Tata Salt (1kg)", te: "టాటా ఉప్పు (1kg)", hi: "टाटा नमक (1kg)" }, category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, qty: 24, price: 28 },
  { id: 2, name: { en: "Amul Butter (500g)", te: "అముల్ వెన్న (500g)", hi: "अमूल मक्खन (500g)" }, category: { en: "Dairy", te: "డెయిరీ", hi: "डेयरी" }, qty: 12, price: 270 },
  { id: 3, name: { en: "Maggi Noodles (4-pack)", te: "మ్యాగీ నూడుల్స్ (4-ప్యాక్)", hi: "मैगी नूडल्स (4-पैक)" }, category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, qty: 48, price: 56 },
  { id: 4, name: { en: "Surf Excel (1kg)", te: "సర్ఫ్ ఎక్సెల్ (1kg)", hi: "सर्फ एक्सेल (1kg)" }, category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, qty: 15, price: 199 },
  { id: 5, name: { en: "Aashirvaad Atta (5kg)", te: "ఆశీర్వాద్ ఆటా (5kg)", hi: "आशीर्वाद आटा (5kg)" }, category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, qty: 20, price: 295 },
  { id: 6, name: { en: "Parle-G Biscuits", te: "పార్లే-జి బిస్కెట్లు", hi: "पार्ले-जी बिस्कुट" }, category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, qty: 60, price: 10 },
  { id: 7, name: { en: "Brooke Bond Tea (250g)", te: "బ్రూక్ బాండ్ టీ (250g)", hi: "ब्रुक बॉन्ड चाय (250g)" }, category: { en: "Beverages", te: "పానీయాలు", hi: "पेय पदार्थ" }, qty: 30, price: 110 },
  { id: 8, name: { en: "Fortune Oil (1L)", te: "ఫార్చ్యూన్ ఆయిల్ (1L)", hi: "फॉर्च्यून तेल (1L)" }, category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, qty: 18, price: 155 },
  { id: 9, name: { en: "Amul Milk (500ml)", te: "అముల్ పాలు (500ml)", hi: "अमूल दूध (500ml)" }, category: { en: "Dairy", te: "డెయిరీ", hi: "डेयरी" }, qty: 40, price: 30 },
  { id: 10, name: { en: "Colgate MaxFresh", te: "కోల్‌గేట్ మ్యాక్స్‌ఫ్రెష్", hi: "कोलगेट मैक्सफ्रेश" }, category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, qty: 22, price: 85 },
  { id: 11, name: { en: "Haldiram Namkeen (200g)", te: "హల్దీరామ్ నమ్‌కీన్ (200g)", hi: "हल्दीराम नमकीन (200g)" }, category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, qty: 35, price: 45 },
  { id: 12, name: { en: "Coca-Cola (750ml)", te: "కోకా-కోలా (750ml)", hi: "कोका-कोला (750ml)" }, category: { en: "Beverages", te: "పానీయాలు", hi: "पेय पदार्थ" }, qty: 25, price: 40 },
  { id: 13, name: { en: "India Gate Basmati (1kg)", te: "ఇండియా గేట్ బాస్మతి (1kg)", hi: "इंडिया गेट बासमती (1kg)" }, category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, qty: 16, price: 180 },
  { id: 14, name: { en: "Dettol Soap (75g)", te: "డెట్టాల్ సబ్బు (75g)", hi: "डेटॉल साबुन (75g)" }, category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, qty: 50, price: 42 },
  { id: 15, name: { en: "Nescafe Classic (50g)", te: "నెస్కేఫ్ క్లాసిక్ (50g)", hi: "नेस्कैफे क्लासिक (50g)" }, category: { en: "Beverages", te: "పానీయాలు", hi: "पेय पदार्थ" }, qty: 14, price: 160 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [newProduct, setNewProduct] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const addProduct = () => {
    if (!newProduct.trim()) return;
    const name = { en: newProduct, te: newProduct, hi: newProduct };
    const category = { en: "General", te: "సాధారణ", hi: "सामान्य" };
    setProducts((prev) => [...prev, { id: Date.now(), name, category, qty: 1, price: 10 }]);
    setNewProduct("");
  };

  const deleteProduct = (id: number) => setProducts((prev) => prev.filter((p) => p.id !== id));

  const toggleVoice = () => {
    if (isListening) { recognitionRef.current?.stop(); setIsListening(false); return; }
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const recognition = new SR();
    recognition.lang = lang === "te" ? "te-IN" : lang === "hi" ? "hi-IN" : "en-IN";
    recognition.onresult = (e: any) => { setNewProduct(e.results[0][0].transcript); setIsListening(false); };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const suggestions = [
    { text: t("suggestion1"), icon: "🌧️" },
    { text: t("suggestion2"), icon: "📈" },
    { text: t("suggestion3"), icon: "🥛" },
  ];

  const stats = [
    { label: t("totalProducts"), value: products.length, icon: Package, color: "text-primary" },
    { label: t("aiSuggestions"), value: suggestions.length, icon: Brain, color: "text-accent" },
    { label: t("categories"), value: [...new Set(products.map((p) => p.category[lang]))].length, icon: TrendingUp, color: "text-primary" },
  ];

  return (
    <div className="min-h-screen gradient-bg">
      <header className="sticky top-0 z-30 glass-card rounded-none border-x-0 border-t-0 px-4 sm:px-6 py-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
            <Store className="w-5 h-5 text-primary" />
          </div>
          <h1 className="font-display font-bold text-lg gradient-text hidden sm:block">{t("appName")}</h1>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">{t("logout")}</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <div key={s.label} className="glass-card p-5 flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <s.icon className={`w-6 h-6 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Chart + Suggestions */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-primary" />
              <h2 className="font-display font-semibold text-foreground">{t("categoryDistribution")}</h2>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={CHART_DATA} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value" stroke="none">
                    {CHART_DATA.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(225,20%,12%)", border: "1px solid hsl(225,15%,25%)", borderRadius: "12px", color: "#fff", fontSize: "13px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              {CHART_DATA.map((d, i) => (
                <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: CHART_COLORS[i] }} />
                  {d.name}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-4 h-4 text-accent" />
              <h2 className="font-display font-semibold text-foreground">{t("aiInsights")}</h2>
            </div>
            <div className="space-y-3">
              {suggestions.map((s, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/40 border border-border hover:border-accent/30 transition-colors duration-300">
                  <span className="text-lg mt-0.5">{s.icon}</span>
                  <p className="text-sm text-secondary-foreground leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <div className="flex items-center gap-2 mb-5">
            <Package className="w-4 h-4 text-primary" />
            <h2 className="font-display font-semibold text-foreground">{t("productManagement")}</h2>
            <span className="ml-auto text-xs text-muted-foreground">{products.length} {t("totalProducts").toLowerCase()}</span>
          </div>

          <div className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <input type="text" value={newProduct} onChange={(e) => setNewProduct(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addProduct()} placeholder={t("addProductPlaceholder")}
                className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 pr-12 text-sm" />
              <button onClick={toggleVoice} className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${isListening ? "bg-destructive/20 text-destructive animate-pulse" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>
            <button onClick={addProduct} className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm flex items-center gap-1.5 hover:brightness-110 active:scale-[0.97] transition-all duration-200">
              <Plus className="w-4 h-4" /> {t("add")}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-3 px-2 font-medium">#</th>
                  <th className="text-left py-3 px-2 font-medium">{t("product")}</th>
                  <th className="text-left py-3 px-2 font-medium">{t("category")}</th>
                  <th className="text-center py-3 px-2 font-medium">{t("qty")}</th>
                  <th className="text-right py-3 px-2 font-medium">{t("price")}</th>
                  <th className="text-right py-3 px-2 font-medium">{t("action")}</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, idx) => (
                  <tr
                    key={p.id}
                    className="border-b border-border/50 hover:bg-secondary/30 hover:scale-[1.005] transition-all duration-200 origin-left"
                    style={{ animation: `fadeSlideIn 0.35s ease-out ${idx * 0.04}s both` }}
                  >
                    <td className="py-3 px-2 text-muted-foreground text-xs">{idx + 1}</td>
                    <td className="py-3 px-2 text-foreground font-medium">{p.name[lang]}</td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-0.5 rounded-md bg-secondary text-xs text-secondary-foreground">{p.category[lang]}</span>
                    </td>
                    <td className="py-3 px-2 text-center text-muted-foreground">{p.qty}</td>
                    <td className="py-3 px-2 text-right text-foreground font-medium">₹{p.price}</td>
                    <td className="py-3 px-2 text-right">
                      <button onClick={() => deleteProduct(p.id)} className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:scale-110 transition-all duration-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">{t("noProducts")}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
