import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import AddProductModal from "@/components/AddProductModal";

const AddProductPage = () => {
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="glass-card p-8 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center glow-primary">
          <PlusCircle className="w-8 h-8 text-primary" />
        </div>
        <h2 className="font-display font-bold text-xl text-foreground">{t("addNewProduct")}</h2>
        <p className="text-sm text-muted-foreground max-w-md">{t("productNamePlaceholder")}</p>
        <button
          onClick={() => setModalOpen(true)}
          className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all glow-primary text-sm"
        >
          <PlusCircle className="w-5 h-5" />
          {t("addProduct")}
        </button>
      </div>

      <AddProductModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default AddProductPage;
