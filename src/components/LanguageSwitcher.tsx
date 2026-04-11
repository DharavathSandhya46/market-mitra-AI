import { useLanguage, Language } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

const flags: Record<Language, string> = { en: "EN", te: "తె", hi: "हि" };

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();
  const langs: Language[] = ["en", "te", "hi"];

  return (
    <div className="flex items-center gap-1.5">
      <Globe className="w-4 h-4 text-muted-foreground" />
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
            lang === l
              ? "bg-primary text-primary-foreground"
              : "bg-secondary/50 text-muted-foreground hover:text-foreground"
          }`}
        >
          {flags[l]}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
