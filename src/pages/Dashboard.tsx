import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Brain, TrendingUp, Mic, MicOff, Plus, Trash2, LogOut, Store, BarChart3, Check, Search, X } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { transliterate } from "@/lib/transliterate";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage, Language } from "@/contexts/LanguageContext";

const CHART_DATA_NAMES: Record<Language, string[]> = {
  en: ["Grocery", "Snacks", "Beverages", "Personal Care"],
  te: ["కిరాణా", "స్నాక్స్", "పానీయాలు", "పర్సనల్ కేర్"],
  hi: ["किराना", "स्नैक्स", "पेय पदार्थ", "पर्सनल केयर"],
};
const CHART_VALUES = [40, 25, 20, 15];
const CHART_COLORS = ["hsl(28,100%,55%)", "hsl(160,60%,45%)", "hsl(250,60%,65%)", "hsl(340,70%,55%)"];

interface CatalogProduct {
  id: number;
  name: Record<Language, string>;
  category: Record<Language, string>;
  qty: number;
  price: number;
}

const FULL_CATALOG: CatalogProduct[] = [
  { id: 1, name: { en: "Tata Salt (1kg)", te: "టాటా ఉప్పు (1kg)", hi: "टाटा नमक (1kg)" }, category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 28 },
  { id: 2, name: { en: "Amul Butter (500g)", te: "అముల్ వెన్న (500g)", hi: "अमूल मक्खन (500g)" }, category: { en: "Dairy", te: "డెయిరీ", hi: "डेयरी" }, price: 270 },
  { id: 3, name: { en: "Maggi Noodles (4-pack)", te: "మ్యాగీ నూడుల్స్ (4-ప్యాక్)", hi: "मैगी नूडल्स (4-पैक)" }, category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, price: 56 },
  { id: 4, name: { en: "Surf Excel (1kg)", te: "సర్ఫ్ ఎక్సెల్ (1kg)", hi: "सर्फ एक्सेल (1kg)" }, category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 199 },
  { id: 5, name: { en: "Aashirvaad Atta (5kg)", te: "ఆశీర్వాద్ ఆటా (5kg)", hi: "आशीर्वाद आटा (5kg)" }, category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 295 },
  { id: 6, name: { en: "Parle-G Biscuits", te: "పార్లే-జి బిస్కెట్లు", hi: "पार्ले-जी बिस्कुट" }, category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, price: 10 },
  { id: 7, name: { en: "Brooke Bond Tea (250g)", te: "బ్రూక్ బాండ్ టీ (250g)", hi: "ब्रुक बॉन्ड चाय (250g)" }, category: { en: "Beverages", te: "పానీయాలు", hi: "पेय पदार्थ" }, price: 110 },
  { id: 8, name: { en: "Fortune Oil (1L)", te: "ఫార్చ్యూన్ ఆయిల్ (1L)", hi: "फॉर्च्यून तेल (1L)" }, category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 155 },
  { id: 9, name: { en: "Amul Milk (500ml)", te: "అముల్ పాలు (500ml)", hi: "अमूल दूध (500ml)" }, category: { en: "Dairy", te: "డెయిరీ", hi: "डेयरी" }, price: 30 },
  { id: 10, name: { en: "Colgate MaxFresh", te: "కోల్‌గేట్ మ్యాక్స్‌ఫ్రెష్", hi: "कोलगेट मैक्सफ्रेश" }, category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 85 },
  { id: 11, name: { en: "Haldiram Namkeen (200g)", te: "హల్దీరామ్ నమ్‌కీన్ (200g)", hi: "हल्दीराम नमकीन (200g)" }, category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, price: 45 },
  { id: 12, name: { en: "Coca-Cola (750ml)", te: "కోకా-కోలా (750ml)", hi: "कोका-कोला (750ml)" }, category: { en: "Beverages", te: "పానీయాలు", hi: "पेय पदार्थ" }, price: 40 },
  { id: 13, name: { en: "India Gate Basmati (1kg)", te: "ఇండియా గేట్ బాస్మతి (1kg)", hi: "इंडिया गेट बासमती (1kg)" }, category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 180 },
  { id: 14, name: { en: "Dettol Soap (75g)", te: "డెట్టాల్ సబ్బు (75g)", hi: "डेटॉल साबुन (75g)" }, category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 42 },
  { id: 15, name: { en: "Nescafe Classic (50g)", te: "నెస్కేఫ్ క్లాసిక్ (50g)", hi: "नेस्कैफे क्लासिक (50g)" }, category: { en: "Beverages", te: "పానీయాలు", hi: "पेय पदार्थ" }, price: 160 },
  { id: 16, name: { en: "Sugar (1kg)", te: "చక్కెర (1kg)", hi: "चीनी (1kg)" }, category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 45 },
  { id: 17, name: { en: "Toor Dal (1kg)", te: "కందిపప్పు (1kg)", hi: "तूर दाल (1kg)" }, category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 140 },
  { id: 18, name: { en: "Rice (5kg)", te: "బియ్యం (5kg)", hi: "चावल (5kg)" }, category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 320 },
  { id: 19, name: { en: "Lays Chips", te: "లేస్ చిప్స్", hi: "लेज चिप्स" }, category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, price: 20 },
  { id: 20, name: { en: "Vim Dishwash (500ml)", te: "విమ్ డిష్‌వాష్ (500ml)", hi: "विम डिशवॉश (500ml)" }, category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 55 },
  { id: 21, name: { en: "Kurkure (100g)", te: "కుర్కురే (100g)", hi: "कुरकुरे (100g)" }, category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, price: 20 },
  { id: 22, name: { en: "Curd (500ml)", te: "పెరుగు (500ml)", hi: "दही (500ml)" }, category: { en: "Dairy", te: "డెయిరీ", hi: "डेयरी" }, price: 30 },
  { id: 23, name: { en: "Paneer (200g)", te: "పన్నీర్ (200g)", hi: "पनीर (200g)" }, category: { en: "Dairy", te: "డెయిరీ", hi: "डेयरी" }, price: 80 },
  { id: 24, name: { en: "Chana Dal (1kg)", te: "శనగపప్పు (1kg)", hi: "चना दाल (1kg)" }, category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 120 },
  { id: 25, name: { en: "Thumbs Up (750ml)", te: "థమ్స్ అప్ (750ml)", hi: "थम्स अप (750ml)" }, category: { en: "Beverages", te: "పానీయాలు", hi: "पेय पदार्थ" }, price: 40 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set([1, 2, 3, 5, 7, 9]));
  const [customProducts, setCustomProducts] = useState<CatalogProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [customName, setCustomName] = useState("");
  const [customQty, setCustomQty] = useState("");
  const [customPrice, setCustomPrice] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const allProducts = [...FULL_CATALOG, ...customProducts];

  const toggleProduct = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const removeCustom = (id: number) => {
    setCustomProducts((prev) => prev.filter((p) => p.id !== id));
    setSelectedIds((prev) => { const n = new Set(prev); n.delete(id); return n; });
  };

  const addCustomProduct = () => {
    if (!customName.trim()) return;
    const id = Date.now();
    const enName = customName;
    const teName = transliterate(customName, "te");
    const hiName = transliterate(customName, "hi");
    const name = { en: enName, te: teName, hi: hiName };
    const category = { en: "Other", te: "ఇతరాలు", hi: "अन्य" };
    const qty = parseInt(customQty) || 1;
    const price = parseInt(customPrice) || 0;
    setCustomProducts((prev) => [...prev, { id, name, category, qty, price }]);
    setSelectedIds((prev) => new Set(prev).add(id));
    setCustomName("");
    setCustomQty("");
    setCustomPrice("");
  };

  const toggleVoice = () => {
    if (isListening) { recognitionRef.current?.stop(); setIsListening(false); return; }
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const recognition = new SR();
    recognition.lang = lang === "te" ? "te-IN" : lang === "hi" ? "hi-IN" : "en-IN";
    recognition.onresult = (e: any) => { setCustomName(e.results[0][0].transcript); setIsListening(false); };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const filteredCatalog = allProducts.filter((p) =>
    p.name[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category[lang].toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group by category
  const grouped = filteredCatalog.reduce<Record<string, CatalogProduct[]>>((acc, p) => {
    const cat = p.category[lang];
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

  const myProducts = allProducts.filter((p) => selectedIds.has(p.id));

  const suggestions = [
    { text: t("suggestion1"), icon: "🌧️" },
    { text: t("suggestion2"), icon: "📈" },
    { text: t("suggestion3"), icon: "🥛" },
  ];

  const stats = [
    { label: t("totalProducts"), value: myProducts.length, icon: Package, color: "text-primary" },
    { label: t("aiSuggestions"), value: suggestions.length, icon: Brain, color: "text-accent" },
    { label: t("categories"), value: [...new Set(myProducts.map((p) => p.category[lang]))].length, icon: TrendingUp, color: "text-primary" },
  ];

  const selectAllLabel: Record<Language, string> = { en: "Select All", te: "అన్నీ ఎంచుకోండి", hi: "सभी चुनें" };
  const clearAllLabel: Record<Language, string> = { en: "Clear All", te: "అన్నీ తీసివేయండి", hi: "सभी हटाएं" };
  const myShopLabel: Record<Language, string> = { en: "My Shop Products", te: "నా దుకాణ ఉత్పత్తులు", hi: "मेरी दुकान के प्रोडक्ट" };
  const catalogLabel: Record<Language, string> = { en: "Product Catalog — Select what's in your shop", te: "ఉత్పత్తి జాబితా — మీ దుకాణంలో ఉన్నవి ఎంచుకోండి", hi: "प्रोडक्ट कैटलॉग — अपनी दुकान में जो है वो चुनें" };
  const otherLabel: Record<Language, string> = { en: "Product not listed? Add it here:", te: "ఉత్పత్తి జాబితాలో లేదా? ఇక్కడ జోడించండి:", hi: "प्रोडक्ट लिस्ट में नहीं है? यहाँ जोड़ें:" };
  const searchLabel: Record<Language, string> = { en: "Search products...", te: "ఉత్పత్తులు వెతకండి...", hi: "प्रोडक्ट खोजें..." };
  const customPlaceholder: Record<Language, string> = { en: "Type product name...", te: "ఉత్పత్తి పేరు టైప్ చేయండి...", hi: "प्रोडक्ट का नाम लिखें..." };

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
            {(() => {
              const chartData = CHART_DATA_NAMES[lang].map((name, i) => ({ name, value: CHART_VALUES[i] }));
              return (
                <>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={chartData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value" stroke="none">
                          {chartData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
                        </Pie>
                        <Tooltip contentStyle={{ background: "hsl(225,20%,12%)", border: "1px solid hsl(225,15%,25%)", borderRadius: "12px", color: "#fff", fontSize: "13px" }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center mt-2">
                    {chartData.map((d, i) => (
                      <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: CHART_COLORS[i] }} />
                        {d.name}
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
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

        {/* Product Catalog — pick what's in your shop */}
        <section className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-primary" />
              <h2 className="font-display font-semibold text-foreground">{t("productManagement")}</h2>
            </div>
            <p className="text-xs text-muted-foreground sm:ml-2">{catalogLabel[lang]}</p>
          </div>

          {/* Search + actions */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchLabel[lang]}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 text-sm"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={() => setSelectedIds(new Set(allProducts.map((p) => p.id)))} className="px-3 py-2 rounded-xl bg-accent/15 text-accent text-xs font-medium hover:bg-accent/25 transition-colors">
                {selectAllLabel[lang]}
              </button>
              <button onClick={() => setSelectedIds(new Set())} className="px-3 py-2 rounded-xl bg-destructive/15 text-destructive text-xs font-medium hover:bg-destructive/25 transition-colors">
                {clearAllLabel[lang]}
              </button>
            </div>
          </div>

          {/* Grouped product grid */}
          <div className="space-y-5 mb-6">
            {Object.entries(grouped).map(([cat, items]) => (
              <div key={cat}>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{cat}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {items.map((p, idx) => {
                    const isSelected = selectedIds.has(p.id);
                    const isCustom = customProducts.some((c) => c.id === p.id);
                    return (
                      <button
                        key={p.id}
                        onClick={() => toggleProduct(p.id)}
                        className={`group flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 hover:scale-[1.01] ${
                          isSelected
                            ? "bg-primary/10 border-primary/40 shadow-sm"
                            : "bg-secondary/30 border-border hover:border-muted-foreground/30"
                        }`}
                        style={{ animation: `fadeSlideIn 0.3s ease-out ${idx * 0.03}s both` }}
                      >
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all duration-200 ${
                          isSelected ? "bg-primary" : "bg-secondary border border-border"
                        }`}>
                          {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate transition-colors ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                            {p.name[lang]}
                          </p>
                          {p.price > 0 && (
                            <p className="text-xs text-muted-foreground">₹{p.price}</p>
                          )}
                        </div>
                        {isCustom && (
                          <button
                            onClick={(e) => { e.stopPropagation(); removeCustom(p.id); }}
                            className="p-1 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all opacity-0 group-hover:opacity-100"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Add custom / "Other" product */}
          <div className="border-t border-border pt-5">
            <p className="text-xs text-muted-foreground mb-3">{otherLabel[lang]}</p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addCustomProduct()}
                  placeholder={customPlaceholder[lang]}
                  className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 pr-12 text-sm"
                />
                <button onClick={toggleVoice} className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${isListening ? "bg-destructive/20 text-destructive animate-pulse" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                  {isListening ? <Mic className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>
              <button onClick={addCustomProduct} className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm flex items-center gap-1.5 hover:brightness-110 active:scale-[0.97] transition-all duration-200">
                <Plus className="w-4 h-4" /> {t("add")}
              </button>
            </div>
          </div>
        </section>

        {/* My Shop Products summary */}
        {myProducts.length > 0 && (
          <section className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <div className="flex items-center gap-2 mb-4">
              <Store className="w-4 h-4 text-accent" />
              <h2 className="font-display font-semibold text-foreground">{myShopLabel[lang]}</h2>
              <span className="ml-auto text-xs text-muted-foreground">{myProducts.length} items</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {myProducts.map((p, idx) => (
                <span
                  key={p.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-sm text-foreground transition-all duration-200 hover:bg-primary/20"
                  style={{ animation: `fadeSlideIn 0.25s ease-out ${idx * 0.03}s both` }}
                >
                  {p.name[lang]}
                  {p.price > 0 && <span className="text-xs text-muted-foreground">₹{p.price}</span>}
                  <button
                    onClick={() => toggleProduct(p.id)}
                    className="ml-0.5 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </section>
        )}
      </main>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(6px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
