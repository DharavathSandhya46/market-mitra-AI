import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import dashboardBg from "@/assets/dashboard-bg.jpg";
import shopBg from "@/assets/shop-bg.jpg";
import wallpaperGrocery from "@/assets/wallpaper-grocery.jpg";
import wallpaperSpices from "@/assets/wallpaper-spices.jpg";
import wallpaperMarket from "@/assets/wallpaper-market.jpg";
import wallpaperFresh from "@/assets/wallpaper-fresh.jpg";

export type Theme = "dark" | "light";

export interface Wallpaper {
  id: string;
  name: string;
  src: string;
  custom?: boolean;
}

export const defaultWallpapers: Wallpaper[] = [
  { id: "default", name: "Grocery Shop", src: dashboardBg },
  { id: "shop", name: "Local Kirana Store", src: shopBg },
  { id: "grocery", name: "Cozy Grocery", src: wallpaperGrocery },
  { id: "spices", name: "Spice Bazaar", src: wallpaperSpices },
  { id: "market", name: "Supermarket", src: wallpaperMarket },
  { id: "fresh", name: "Market Street", src: wallpaperFresh },
];

// kept for backward compatibility with existing imports
export const wallpapers = defaultWallpapers;

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  wallpaper: Wallpaper;
  setWallpaperId: (id: string) => void;
  allWallpapers: Wallpaper[];
  uploadCustomWallpaper: (dataUrl: string, name?: string) => void;
  removeCustomWallpaper: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const CUSTOM_KEY = "mm-custom-wallpaper";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem("mm-theme") as Theme) || "dark";
  });
  const [wallpaperId, setWallpaperIdState] = useState<string>(() => {
    if (typeof window === "undefined") return "default";
    return localStorage.getItem("mm-wallpaper") || "default";
  });
  const [customWallpaper, setCustomWallpaper] = useState<Wallpaper | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(CUSTOM_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored) as Wallpaper;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("mm-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("mm-wallpaper", wallpaperId);
  }, [wallpaperId]);

  const allWallpapers: Wallpaper[] = customWallpaper
    ? [...defaultWallpapers, customWallpaper]
    : defaultWallpapers;

  const wallpaper =
    allWallpapers.find((w) => w.id === wallpaperId) || allWallpapers[0];

  const uploadCustomWallpaper = (dataUrl: string, name = "My Shop") => {
    const custom: Wallpaper = { id: "custom", name, src: dataUrl, custom: true };
    try {
      localStorage.setItem(CUSTOM_KEY, JSON.stringify(custom));
      setCustomWallpaper(custom);
      setWallpaperIdState("custom");
    } catch (e) {
      console.error("Failed to save custom wallpaper", e);
    }
  };

  const removeCustomWallpaper = () => {
    localStorage.removeItem(CUSTOM_KEY);
    setCustomWallpaper(null);
    if (wallpaperId === "custom") setWallpaperIdState("default");
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: setThemeState,
        toggleTheme: () => setThemeState(theme === "dark" ? "light" : "dark"),
        wallpaper,
        setWallpaperId: setWallpaperIdState,
        allWallpapers,
        uploadCustomWallpaper,
        removeCustomWallpaper,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
