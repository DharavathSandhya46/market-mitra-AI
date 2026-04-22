import { useEffect, useRef, useState } from "react";
import {
  Settings, X, Sun, Moon, Check, Upload, Trash2, Globe, Mic,
  HelpCircle, Palette, Languages, Save, Sparkles,
} from "lucide-react";
import { useTheme, Theme } from "@/contexts/ThemeContext";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { toast } from "sonner";

const langLabels: Record<Language, string> = {
  en: "English",
  te: "తెలుగు (Telugu)",
  hi: "हिन्दी (Hindi)",
};

const panelStyle = {
  backgroundColor: "hsl(222 47% 11%)",
  border: "1px solid hsl(0 0% 100% / 0.1)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
};

const sectionStyle = {
  backgroundColor: "hsl(215 28% 17%)",
};

const secondaryTextStyle = {
  color: "hsl(225 73% 89%)",
};

const SettingsModal = () => {
  const [open, setOpen] = useState(false);
  const {
    theme, setTheme, wallpaper, setWallpaperId,
    allWallpapers, uploadCustomWallpaper, removeCustomWallpaper,
  } = useTheme();
  const { lang, setLang } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [draftTheme, setDraftTheme] = useState<Theme>(theme);
  const [draftLang, setDraftLang] = useState<Language>(lang);
  const [draftWallpaperId, setDraftWallpaperId] = useState(wallpaper.id);
  const [voiceEnabled, setVoiceEnabled] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("mm-voice-enabled") !== "false";
  });

  const voiceSupported =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  useEffect(() => {
    if (open) {
      setDraftTheme(theme);
      setDraftLang(lang);
      setDraftWallpaperId(wallpaper.id);
    }
  }, [open, theme, lang, wallpaper.id]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

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
      uploadCustomWallpaper(reader.result as string, file.name.replace(/\.[^.]+$/, ""));
      setDraftWallpaperId("custom");
      toast.success("Custom wallpaper uploaded");
    };
    reader.onerror = () => toast.error("Failed to read image");
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const applySettings = () => {
    setTheme(draftTheme);
    setLang(draftLang);
    setWallpaperId(draftWallpaperId);
    localStorage.setItem("mm-voice-enabled", String(voiceEnabled));
    toast.success("Settings applied");
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Settings"
        title="Settings"
        className="p-2 rounded-xl bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-secondary transition-all duration-200 hover:rotate-45"
      >
        <Settings className="w-5 h-5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[9998] flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto backdrop-blur-md animate-fade-in-up"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div
            className="w-full max-w-[500px] my-auto max-h-[calc(100vh-1rem)] sm:max-h-[90vh] flex flex-col relative rounded-2xl z-[9999] overflow-hidden"
            style={{
              ...panelStyle,
              animation: "scale-in 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="flex items-center justify-between p-5 border-b border-white/10 rounded-t-2xl shrink-0">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "hsl(var(--primary) / 0.15)" }}
                >
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-white">Settings</h2>
                  <p className="text-xs" style={secondaryTextStyle}>Personalize your dashboard</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="p-2 rounded-full text-white shadow-lg hover:scale-110 transition-all"
                style={{ backgroundColor: "hsl(var(--destructive))" }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <section className="rounded-xl p-3" style={sectionStyle}>
                <div className="flex items-center gap-2 mb-3">
                  <Palette className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold text-white">🎨 Theme</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setDraftTheme("dark")}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-white ${
                      draftTheme === "dark"
                        ? "border-primary text-primary glow-primary"
                        : "border-white/10 hover:border-primary/40"
                    }`}
                    style={{ backgroundColor: "hsl(215 28% 17%)" }}
                  >
                    <Moon className="w-5 h-5" />
                    <span className="font-medium">Dark Mode</span>
                    {draftTheme === "dark" && <Check className="w-4 h-4 ml-auto" />}
                  </button>
                  <button
                    onClick={() => setDraftTheme("light")}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-white ${
                      draftTheme === "light"
                        ? "border-primary text-primary glow-primary"
                        : "border-white/10 hover:border-primary/40"
                    }`}
                    style={{ backgroundColor: "hsl(215 28% 17%)" }}
                  >
                    <Sun className="w-5 h-5" />
                    <span className="font-medium">Light Mode</span>
                    {draftTheme === "light" && <Check className="w-4 h-4 ml-auto" />}
                  </button>
                </div>
              </section>

              <section className="rounded-xl p-3" style={sectionStyle}>
                <div className="flex items-center justify-between mb-3 gap-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-semibold text-white">🖼️ Shop Background</h3>
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all"
                    style={{ backgroundColor: "hsl(var(--primary))" }}
                  >
                    <Upload className="w-4 h-4" />
                    Upload Your Shop
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {allWallpapers.map((w) => {
                    const active = draftWallpaperId === w.id;
                    return (
                      <button
                        key={w.id}
                        onClick={() => setDraftWallpaperId(w.id)}
                        className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all group ${
                          active ? "border-primary glow-primary scale-[1.02]" : "border-white/10 hover:border-primary/50"
                        }`}
                        style={{ backgroundColor: "hsl(215 28% 17%)" }}
                      >
                        <img
                          src={w.src}
                          alt={w.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between gap-2">
                          <span className="text-xs font-medium text-white truncate">
                            {w.name}{w.custom && " ★"}
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
                              if (draftWallpaperId === "custom") setDraftWallpaperId("default");
                              toast.success("Custom wallpaper removed");
                            }}
                            className="absolute top-1.5 right-1.5 p-1 rounded-md text-white hover:scale-110 transition-transform"
                            style={{ backgroundColor: "hsl(var(--destructive))" }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="rounded-xl p-3" style={sectionStyle}>
                <div className="flex items-center gap-2 mb-3">
                  <Languages className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold text-white">🌐 Language</h3>
                </div>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={secondaryTextStyle} />
                  <select
                    value={draftLang}
                    onChange={(e) => setDraftLang(e.target.value as Language)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border text-white font-medium focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer"
                    style={{
                      backgroundColor: "hsl(215 28% 17%)",
                      borderColor: "hsl(0 0% 100% / 0.1)",
                    }}
                  >
                    {(Object.keys(langLabels) as Language[]).map((l) => (
                      <option key={l} value={l} style={{ backgroundColor: "hsl(215 28% 17%)", color: "white" }}>
                        {langLabels[l]}
                      </option>
                    ))}
                  </select>
                </div>
              </section>

              <section className="rounded-xl p-3" style={sectionStyle}>
                <div className="flex items-center gap-2 mb-3">
                  <Mic className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold text-white">🎤 Voice Input</h3>
                </div>
                <div
                  className="flex items-center justify-between p-4 rounded-xl border"
                  style={{
                    backgroundColor: "hsl(215 28% 17%)",
                    borderColor: "hsl(0 0% 100% / 0.1)",
                  }}
                >
                  <div>
                    <p className="font-medium text-sm text-white">Enable voice for product entry</p>
                    <p className="text-xs mt-1" style={secondaryTextStyle}>
                      Status:{" "}
                      <span className={voiceSupported ? "text-accent font-semibold" : "text-destructive font-semibold"}>
                        {voiceSupported ? "Active ✓" : "Not Supported ✕"}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => voiceSupported && setVoiceEnabled(!voiceEnabled)}
                    disabled={!voiceSupported}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      voiceEnabled && voiceSupported ? "bg-primary" : "bg-muted"
                    } ${!voiceSupported ? "opacity-50 cursor-not-allowed" : ""}`}
                    aria-label="Toggle voice"
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                        voiceEnabled && voiceSupported ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              </section>

              <section className="rounded-xl p-3" style={sectionStyle}>
                <div className="flex items-center gap-2 mb-3">
                  <HelpCircle className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold text-white">🔔 Quick Help</h3>
                </div>
                <div className="space-y-2">
                  {[
                    "🎤 Click the mic icon to add products by voice",
                    "📦 Go to Products to manage your inventory",
                    "📊 Check Dashboard for AI insights & sales trends",
                    "🖼️ Upload your shop image as a personal background",
                  ].map((tip, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-3 rounded-xl border text-xs text-white"
                      style={{
                        backgroundColor: "hsl(215 28% 17%)",
                        borderColor: "hsl(0 0% 100% / 0.1)",
                      }}
                    >
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="p-4 border-t border-white/10 flex justify-end gap-3 rounded-b-2xl shrink-0" style={panelStyle}>
              <button
                onClick={() => setOpen(false)}
                className="px-5 py-2.5 rounded-xl font-medium transition-all text-white"
                style={{ backgroundColor: "hsl(215 25% 27%)" }}
              >
                Cancel
              </button>
              <button
                onClick={applySettings}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all text-white"
                style={{ backgroundColor: "hsl(24 95% 53%)" }}
              >
                <Save className="w-4 h-4" />
                Apply Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsModal;
