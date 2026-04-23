import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, PlusCircle, Package, BarChart3, LogOut, Store, Menu, X, HelpCircle } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import HelpBox from "@/components/HelpBox";
import { useTheme } from "@/contexts/ThemeContext";
import SettingsModal from "@/components/SettingsModal";

const navItems = [
  { key: "dashboard", path: "/dashboard", icon: LayoutDashboard },
  { key: "addProduct", path: "/dashboard/add", icon: PlusCircle },
  { key: "productList", path: "/dashboard/products", icon: Package },
  { key: "analytics", path: "/dashboard/analytics", icon: BarChart3 },
] as const;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const { wallpaper, theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className="min-h-screen relative">
      {/* Background image — always visible, cover/center */}
      <div
        aria-hidden
        className="fixed inset-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${wallpaper.src})` }}
      />
      {/* Subtle dark contrast layer (both modes) */}
      <div aria-hidden className="fixed inset-0 bg-black/20" />
      {/* Theme-aware tint + light blur so wallpaper stays visible */}
      <div
        aria-hidden
        className={`fixed inset-0 backdrop-blur-[4px] ${
          isLight ? "bg-white/60" : "bg-background/70"
        }`}
      />

      <div className="relative z-10 flex min-h-screen">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 z-40 glass-card-strong rounded-none border-r border-border flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="p-5 flex items-center gap-3 border-b border-border">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center glow-primary">
              <Store className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-display font-bold text-sm gradient-text truncate">{t("appName")}</h1>
              <p className="text-[10px] text-muted-foreground truncate">{t("tagline")}</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.key}
                  onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? "bg-primary/15 text-primary border border-primary/30 shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <item.icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-primary" : ""}`} />
                  {t(item.key as any)}
                </button>
              );
            })}
          </nav>

          <div className="p-3 border-t border-border space-y-2">
            <LanguageSwitcher />
            <button
              onClick={() => navigate("/")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              {t("logout")}
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Top bar */}
          <header className="sticky top-0 z-20 glass-card rounded-none border-x-0 border-t-0 px-4 py-3 flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex-1" />
            <SettingsModal />
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-200"
              title={t("helpTitle")}
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </header>

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
            {children}
          </main>
        </div>
      </div>

      {/* Floating Help Box */}
      {showHelp && <HelpBox onClose={() => setShowHelp(false)} />}
    </div>
  );
};

export default DashboardLayout;
