import { useState, useRef } from "react";
import { X, Mic, MicOff, Plus, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { searchDictionary, DictionaryItem } from "@/lib/productDictionary";
import { useProductStore } from "@/stores/productStore";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const AddProductModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { t, lang } = useLanguage();
  const addProduct = useProductStore((s) => s.addProduct);
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [sales, setSales] = useState("");
  const [suggestions, setSuggestions] = useState<DictionaryItem[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [selectedDict, setSelectedDict] = useState<DictionaryItem | null>(null);
  const recognitionRef = useRef<any>(null);

  if (!open) return null;

  const handleNameChange = (value: string) => {
    setName(value);
    setSelectedDict(null);
    if (value.trim().length >= 1) {
      setSuggestions(searchDictionary(value).slice(0, 6));
    } else {
      setSuggestions([]);
    }
  };

  const pickSuggestion = (item: DictionaryItem) => {
    setSelectedDict(item);
    setName(item[lang]);
    if (!price) setPrice(String(item.price));
    setSuggestions([]);
  };

  const toggleVoice = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      alert(t("voiceNotSupported"));
      return;
    }
    const recognition = new SR();
    recognition.lang = lang === "te" ? "te-IN" : lang === "hi" ? "hi-IN" : "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setName(transcript);
      handleNameChange(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const handleSave = () => {
    if (!name.trim()) return;
    const id = Date.now();
    const matches = selectedDict ? [selectedDict] : searchDictionary(name);
    const match = matches.length > 0 ? matches[0] : null;

    const productName = match
      ? { en: match.en, te: match.te, hi: match.hi }
      : { en: name, te: name, hi: name };
    const category = match
      ? match.category
      : { en: "Other", te: "ఇతరాలు", hi: "अन्य" };

    addProduct({
      id,
      name: productName,
      category,
      qty: parseInt(qty) || 1,
      price: parseInt(price) || (match ? match.price : 0),
      sales: parseInt(sales) || 0,
    });

    setName("");
    setQty("");
    setPrice("");
    setSales("");
    setSuggestions([]);
    setSelectedDict(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass-card-strong p-6 w-full max-w-md animate-scale-in space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-lg text-foreground">{t("addNewProduct")}</h2>
          <button onClick={onClose} className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Name + Voice */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t("productName")}</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              placeholder={t("productNamePlaceholder")}
              className="w-full pl-10 pr-12 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleVoice}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    isListening
                      ? "bg-destructive/20 text-destructive animate-pulse"
                      : "bg-primary/15 text-primary hover:bg-primary/25"
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </TooltipTrigger>
              <TooltipContent>{t("tooltipMic")}</TooltipContent>
            </Tooltip>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 z-20 glass-card-strong p-2 space-y-1 max-h-48 overflow-y-auto">
                {suggestions.map((item) => (
                  <button
                    key={item.en}
                    onClick={() => pickSuggestion(item)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 transition-all text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{item[lang]}</p>
                      {lang !== "en" && <p className="text-xs text-muted-foreground">{item.en}</p>}
                    </div>
                    <span className="text-xs text-muted-foreground">₹{item.price}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {isListening && (
            <p className="text-xs text-primary animate-pulse flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              {t("voiceListening")}
            </p>
          )}
        </div>

        {/* Price, Qty, Sales row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t("price")}</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="₹"
              min="0"
              className="w-full px-3 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm text-center"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t("qty")}</label>
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              placeholder="1"
              min="1"
              className="w-full px-3 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm text-center"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t("salesCount")}</label>
            <input
              type="number"
              value={sales}
              onChange={(e) => setSales(e.target.value)}
              placeholder="0"
              min="0"
              className="w-full px-3 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm text-center"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-secondary/50 border border-border text-muted-foreground text-sm font-medium hover:bg-secondary/80 transition-all"
          >
            {t("cancel")}
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all glow-primary"
          >
            <Plus className="w-4 h-4" />
            {t("save")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
