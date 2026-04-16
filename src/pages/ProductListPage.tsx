import { useState } from "react";
import { Search, Trash2, Package, PlusCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProductStore } from "@/stores/productStore";
import { searchDictionary } from "@/lib/productDictionary";
import AddProductModal from "@/components/AddProductModal";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const ProductListPage = () => {
  const { t, lang } = useLanguage();
  const products = useProductStore((s) => s.products);
  const removeProduct = useProductStore((s) => s.removeProduct);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);

  const categories = [...new Set(products.map((p) => p.category[lang]))];

  const filtered = products.filter((p) => {
    const matchesCategory = categoryFilter === "all" || p.category[lang] === categoryFilter;
    if (!search.trim()) return matchesCategory;
    const q = search.toLowerCase();
    const matchesName = p.name[lang].toLowerCase().includes(q) || p.name.en.toLowerCase().includes(q);
    const matchesPhonetic = searchDictionary(search).some(
      (d) => d.en.toLowerCase() === p.name.en.toLowerCase()
    );
    return matchesCategory && (matchesName || matchesPhonetic);
  });

  return (
    <div className="space-y-5 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" />
          <h2 className="font-display font-bold text-lg text-foreground">{t("productList")}</h2>
          <span className="text-xs text-muted-foreground">({products.length} {t("items")})</span>
        </div>
        <div className="sm:ml-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                {t("addProduct")}
              </button>
            </TooltipTrigger>
            <TooltipContent>{t("tooltipAdd")}</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("searchProducts")}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-secondary/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="all">{t("allCategories")}</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Product Cards */}
      {filtered.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">{t("noProductsFound")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((p, i) => (
            <div
              key={p.id}
              className="glass-card p-4 flex flex-col gap-3 hover:scale-[1.02] transition-all duration-300 group"
              style={{ animationDelay: `${i * 0.03}s` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{p.name[lang]}</p>
                  <p className="text-xs text-muted-foreground">{p.category[lang]}</p>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => removeProduct(p.id)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>{t("tooltipDelete")}</TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="px-2 py-1 rounded-lg bg-primary/10 text-primary font-semibold">₹{p.price}</span>
                <span className="text-muted-foreground">{t("qty")}: <span className={`font-semibold ${p.qty <= 5 ? "text-destructive" : p.qty <= 10 ? "text-yellow-500" : "text-foreground"}`}>{p.qty}</span></span>
                <span className="text-muted-foreground">{t("salesCount")}: <span className="font-semibold text-accent">{p.sales}</span></span>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddProductModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default ProductListPage;
