
"use client";

import { usePortfolioStore } from "@/hooks/use-portfolio-store";
import { useEffect } from "react";

const backgroundGradients: Record<string, { light: string, dark: string }> = {
  Default: { light: 'linear-gradient(to bottom right, hsl(180, 55%, 95%), hsl(200, 60%, 95%))', dark: 'linear-gradient(to bottom right, hsl(180, 40%, 15%), hsl(220, 40%, 15%))' },
  Twilight: { light: 'linear-gradient(to bottom right, #f3e7e9, #e3eeff)', dark: 'linear-gradient(to bottom right, #2c3e50, #4ca1af)' },
  Sunrise: { light: 'linear-gradient(to bottom right, #ffecd2, #fcb69f)', dark: 'linear-gradient(to bottom right, #20002c, #cbb4d4)' },
  Ocean: { light: 'linear-gradient(to bottom right, #a8c0ff, #3f2b96)', dark: 'linear-gradient(to bottom right, #0f2027, #203a43, #2c5364)' },
  Rose: { light: 'linear-gradient(to bottom right, #ffc3a0, #ffafbd)', dark: 'linear-gradient(to bottom right, #41295a, #2F0743)' },
  Cosmic: { light: 'linear-gradient(to bottom right, #d4fc79, #96e6a1)', dark: 'linear-gradient(to bottom right, #000000, #434343)' },
  Minty: { light: 'linear-gradient(to bottom right, #E0EFC6, #A7D3A6)', dark: 'linear-gradient(to bottom right, #1E3A3A, #0F1F1F)' },
  Crimson: { light: 'linear-gradient(to bottom right, #F5F7FA, #B8C6DB)', dark: 'linear-gradient(to bottom right, #33080a, #6e1014)' },
};

export function ThemeManager() {
  const theme = usePortfolioStore((state) => state.portfolio.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (!theme) return;

    // Handle Accent Color
    if (theme.accent) {
      root.style.setProperty('--accent', theme.accent);
      root.style.setProperty('--ring', theme.accent);
      
      const [h, s, l] = theme.accent.split(" ").map(val => parseInt(val.replace('%', '')));
      const darkAccent = `${h} ${s - 5}% ${l + 10 > 100 ? 100 : l + 10}%`;
      root.style.setProperty('--accent-dark', darkAccent);
    }
    
    // Handle Background Gradient
    if (theme.backgroundTheme) {
      const selectedGradient = backgroundGradients[theme.backgroundTheme] || backgroundGradients.Default;
      root.style.setProperty('--background-gradient-light', selectedGradient.light);
      root.style.setProperty('--background-gradient-dark', selectedGradient.dark);
    }

    // Handle Fonts
    if (theme.headlineFont) {
        root.style.setProperty('--font-headline', theme.headlineFont);
    }
    if (theme.bodyFont) {
        root.style.setProperty('--font-body', theme.bodyFont);
    }

  }, [theme]);

  return null;
}
