import { useState } from "react";
import { PlusCircle, Camera, Lightbulb, Mic, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import AddProductModal from "@/components/AddProductModal";
import illustration from "@/assets/add-product-illustration.jpg";

const AddProductPage = () => {
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Hero card */}
      <div className="glass-card p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center gap-5">
        <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-lg ring-1 ring-border/50">
          <img
            src={illustration}
            alt="Grocery shop illustration"
            loading="lazy"
            width={768}
            height={512}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="space-y-2 max-w-lg">
          <h2 className="font-display font-bold text-2xl text-foreground">
            Start by adding your first product
          </h2>
          <p className="text-sm text-muted-foreground">
            Track your inventory smartly. Add product details below or speak the name using voice.
          </p>
        </div>

        {/* Sample placeholders preview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl">
          <div className="glass-card p-3 rounded-xl text-left">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">
              {t("productName")}
            </p>
            <p className="text-sm font-medium text-foreground mt-1">Rice (1kg)</p>
          </div>
          <div className="glass-card p-3 rounded-xl text-left">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">
              {t("price")}
            </p>
            <p className="text-sm font-medium text-foreground mt-1">₹50</p>
          </div>
          <div className="glass-card p-3 rounded-xl text-left">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">
              {t("qty")}
            </p>
            <p className="text-sm font-medium text-foreground mt-1">10</p>
          </div>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-8 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold flex items-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all glow-primary text-sm shadow-xl"
        >
          <PlusCircle className="w-5 h-5" />
          {t("addProduct")}
        </button>
      </div>

      {/* Tips + Scan grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Tips */}
        <div className="glass-card p-5 rounded-2xl shadow-lg border-l-4 border-l-primary">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-primary" />
            <h3 className="font-display font-semibold text-sm text-foreground">Quick Tips</h3>
          </div>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span>💡</span>
              <span>Add frequently sold items first</span>
            </li>
            <li className="flex items-start gap-2">
              <Mic className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Use the mic to speak product names instead of typing</span>
            </li>
            <li className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>AI auto-suggests categories and prices as you type</span>
            </li>
          </ul>
        </div>

        {/* Scan Product (future ready) */}
        <div className="glass-card p-5 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-accent/15 text-accent text-[10px] font-semibold uppercase tracking-wide">
            Coming Soon
          </div>
          <div className="flex items-center gap-2 mb-3">
            <Camera className="w-4 h-4 text-primary" />
            <h3 className="font-display font-semibold text-sm text-foreground">📷 Scan Product</h3>
          </div>

          {/* Camera placeholder */}
          <div className="aspect-video w-full rounded-xl border-2 border-dashed border-border bg-secondary/30 flex flex-col items-center justify-center gap-2 mb-3">
            <Camera className="w-10 h-10 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Camera preview</p>
          </div>

          <button
            disabled
            className="w-full px-4 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-medium text-sm flex items-center justify-center gap-2 opacity-70 cursor-not-allowed"
          >
            <Camera className="w-4 h-4" />
            Scan using camera
          </button>
          <p className="text-[11px] text-muted-foreground text-center mt-2">
            Coming soon: Scan barcode to auto-add product
          </p>
        </div>
      </div>

      <AddProductModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default AddProductPage;
