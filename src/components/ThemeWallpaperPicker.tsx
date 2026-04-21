import { useRef, useState } from "react";
import { Palette, Sun, Moon, Check, X, Upload, Trash2 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

const ThemeWallpaperPicker = () => {
  const [open, setOpen] = useState(false);
  const {
    theme,
    toggleTheme,
    wallpaper,
    setWallpaperId,
    allWallpapers,
    uploadCustomWallpaper,
    removeCustomWallpaper,
  } = useTheme();
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image too large (max 4MB)");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      uploadCustomWallpaper(dataUrl, file.name.replace(/\.[^.]+$/, ""));
      toast.success("Custom wallpaper applied");
    };
    reader.onerror = () => toast.error("Failed to read image");
    reader.readAsDataURL(file);
    e.target.value = "";
  };

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
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">
                  {t("wallpaper" as any) || "Wallpaper"}
                </h3>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFile}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/15 text-primary hover:bg-primary/25 transition-all text-xs font-medium"
                >
                  <Upload className="w-4 h-4" />
                  Upload Your Shop Image
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {allWallpapers.map((w) => {
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
                      <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between gap-2">
                        <span className="text-xs font-medium text-white truncate">
                          {w.name}
                          {w.custom && " ★"}
                        </span>
                        {active && (
                          <span className="bg-primary rounded-full p-0.5 shrink-0">
                            <Check className="w-3 h-3 text-primary-foreground" />
                          </span>
                        )}
                      </div>
                      {w.custom && (
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(e) => {
                            e.stopPropagation();
                            removeCustomWallpaper();
                            toast.success("Custom wallpaper removed");
                          }}
                          className="absolute top-1.5 right-1.5 p-1 rounded-md bg-destructive/90 text-destructive-foreground hover:scale-110 transition-transform"
                        >
                          <Trash2 className="w-3 h-3" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Tip: Upload a photo of your own shop to personalize your dashboard. Saved on this device only.
              </p>
            </div>

            {/* Apply / Done */}
            <div className="mt-6 pt-4 border-t border-border flex justify-end gap-3 sticky bottom-0 bg-background/80 backdrop-blur-sm -mx-6 px-6 pb-1">
              <button
                onClick={() => setOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all glow-primary"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ThemeWallpaperPicker;
