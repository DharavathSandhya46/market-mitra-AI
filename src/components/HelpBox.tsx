import { X, Lightbulb } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HelpBox = ({ onClose }: { onClose: () => void }) => {
  const { t } = useLanguage();

  const tips = [
    t("helpAdd"),
    t("helpVoice"),
    t("helpSearch"),
    t("helpDelete"),
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 glass-card-strong p-5 max-w-xs animate-scale-in shadow-2xl">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
          <Lightbulb className="w-4 h-4 text-primary" />
        </div>
        <span className="text-sm font-display font-semibold text-foreground">{t("helpTitle")}</span>
        <button onClick={onClose} className="ml-auto text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
      <ul className="space-y-2.5">
        {tips.map((tip, i) => (
          <li
            key={i}
            className="text-xs text-secondary-foreground/90 flex items-start gap-2 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              {i + 1}
            </span>
            {tip}
          </li>
        ))}
      </ul>
      <button
        onClick={onClose}
        className="mt-4 w-full py-2 rounded-xl bg-primary/15 text-primary text-xs font-semibold hover:bg-primary/25 transition-colors"
      >
        {t("gotIt")} ✓
      </button>
    </div>
  );
};

export default HelpBox;
