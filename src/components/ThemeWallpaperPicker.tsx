import { useState } from "react";
import { Palette, Sun, Moon, Check, X } from "lucide-react";
import { useTheme, wallpapers } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

const ThemeWallpaperPicker = () => {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme, wallpaper, setWallpaperId } = useTheme();
  const { t } = useLanguage();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-xl bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
        title={t("appearance" as any) || "Appearance"}
      >
        <Palette className="w-5 h-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
          <div className="glass-card-strong w-full max-w-2xl p-6 max-h-[85vh] overflow-y-auto relative">
            {/* Sticky close button - always visible */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-destructive/90 hover:bg-destructive text-destructive-foreground shadow-lg hover:scale-110 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between mb-5 pr-12">
              <h2 className="font-display text-xl font-bold gradient-text">
                {t("appearance" as any) || "Appearance"}
              </h2>
            </div>

            {/* Theme toggle */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                {t("theme" as any) || "Theme"}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => theme !== "dark" && toggleTheme()}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                    theme === "dark"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Moon className="w-5 h-5" />
                  <span className="font-medium">{t("darkMode" as any) || "Dark"}</span>
                  {theme === "dark" && <Check className="w-4 h-4 ml-auto" />}
                </button>
                <button
                  onClick={() => theme !== "light" && toggleTheme()}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                    theme === "light"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Sun className="w-5 h-5" />
                  <span className="font-medium">{t("lightMode" as any) || "Light"}</span>
                  {theme === "light" && <Check className="w-4 h-4 ml-auto" />}
                </button>
              </div>
            </div>

            {/* Wallpapers */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                {t("wallpaper" as any) || "Wallpaper"}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {wallpapers.map((w) => {
                  const active = wallpaper.id === w.id;
                  return (
                    <button
                      key={w.id}
                      onClick={() => setWallpaperId(w.id)}
                      className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all group ${
                        active ? "border-primary glow-primary" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <img
                        src={w.src}
                        alt={w.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between">
                        <span className="text-xs font-medium text-white truncate">{w.name}</span>
                        {active && (
                          <span className="bg-primary rounded-full p-0.5">
                            <Check className="w-3 h-3 text-primary-foreground" />
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ThemeWallpaperPicker;
