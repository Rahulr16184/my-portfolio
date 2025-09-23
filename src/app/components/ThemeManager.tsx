
"use client";

import { usePortfolioStore } from "@/hooks/use-portfolio-store";
import { useEffect } from "react";

const backgroundGradients: Record<string, { light: string, dark: string }> = {
  Default: { light: 'linear-gradient(to bottom right, hsl(180, 55%, 95%), hsl(200, 60%, 95%))', dark: 'linear-gradient(to bottom right, hsl(180, 40%, 15%), hsl(220, 40%, 15%))' },
  Twilight: { light: 'linear-gradient(to bottom right, #f3e7e9, #e3eeff)', dark: 'linear-gradient(to bottom right, #2c3e50, #4ca1af)' },
  Sunrise: { light: 'linear-gradient(to bottom right, #ffecd2, #fcb69f)', dark: 'linear-gradient(to bottom right, #20002c, #cbb4d4)' },
  Ocean: { light: 'linear-gradient(to bottom right, #a8c0ff, #3f2b96)', dark: 'linear-gradient(to bottom right, #0f2027, #203a43, #2c5364)' },
  Rose: { light: 'linear-gradient(to bottom right, #ffc3a0, #ffafbd)', dark: 'linear-gradient(to bottom right, #41295a, #2F0743)' },
};

export function ThemeManager() {
  const theme = usePortfolioStore((state) => state.portfolio.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (!theme) return;

    // Handle Accent Color
    if (theme.accent) {
      const [h, s, l] = theme.accent.split(" ");
      root.style.setProperty('--accent', theme.accent);
      root.style.setProperty('--ring', theme.accent);
      const darkHsl = `${h} ${parseInt(s, 10) - 10}% ${parseInt(l, 10) + 10}%`;
      root.style.setProperty('--accent-dark', darkHsl);
    }
    
    // Handle Background Gradient
    if (theme.backgroundTheme) {
      const selectedGradient = backgroundGradients[theme.backgroundTheme] || backgroundGradients.Default;
      root.style.setProperty('--background-gradient-light', selectedGradient.light);
      root.style.setProperty('--background-gradient-dark', selectedGradient.dark);
    }

  }, [theme]);

  return null;
}
