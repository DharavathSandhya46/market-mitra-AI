import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lightbulb, Store, ArrowRight } from "lucide-react";
import shopBg from "@/assets/shop-bg.jpg";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showTips, setShowTips] = useState(true);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const tips = [t("tip1"), t("tip2"), t("tip3"), t("tip4")];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img src={shopBg} alt="Shop background" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Language Switcher */}
      <div className="absolute top-6 left-6 z-20">
        <LanguageSwitcher />
      </div>

      {/* Floating Tips */}
      {showTips && (
        <div className="absolute top-6 right-6 z-20 glass-card p-4 max-w-xs animate-slide-in-left">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-primary" />
            <span className="text-sm font-display font-semibold text-foreground">{t("quickTips")}</span>
            <button onClick={() => setShowTips(false)} className="ml-auto text-muted-foreground hover:text-foreground text-xs transition-colors">✕</button>
          </div>
          <ul className="space-y-2">
            {tips.map((tip, i) => (
              <li key={i} className="text-xs text-secondary-foreground/80 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-scale-in">
        <div className="glass-card-strong p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/15 glow-primary mb-2">
              <Store className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-display font-bold gradient-text">{t("appName")}</h1>
            <p className="text-sm text-muted-foreground">{t("tagline")}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t("username")}</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder={t("usernamePlaceholder")}
                className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t("password")}</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("passwordPlaceholder")}
                  className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 pr-12" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold font-display flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all duration-200 glow-primary">
              {t("signIn")} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          <p className="text-center text-xs text-muted-foreground">{t("demoNote")}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
