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
}

export const wallpapers: Wallpaper[] = [
  { id: "default", name: "Default", src: dashboardBg },
  { id: "shop", name: "Corner Shop", src: shopBg },
  { id: "grocery", name: "Cozy Grocery", src: wallpaperGrocery },
  { id: "spices", name: "Spice Bazaar", src: wallpaperSpices },
  { id: "market", name: "Supermarket", src: wallpaperMarket },
  { id: "fresh", name: "Fresh Market", src: wallpaperFresh },
];

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  wallpaper: Wallpaper;
  setWallpaperId: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem("mm-theme") as Theme) || "dark";
  });
  const [wallpaperId, setWallpaperIdState] = useState<string>(() => {
    if (typeof window === "undefined") return "default";
    return localStorage.getItem("mm-wallpaper") || "default";
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

  const wallpaper = wallpapers.find((w) => w.id === wallpaperId) || wallpapers[0];

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: setThemeState,
        toggleTheme: () => setThemeState(theme === "dark" ? "light" : "dark"),
        wallpaper,
        setWallpaperId: setWallpaperIdState,
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
