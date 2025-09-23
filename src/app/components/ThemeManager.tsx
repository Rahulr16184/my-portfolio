
"use client";

import { usePortfolioStore } from "@/hooks/use-portfolio-store";
import { useEffect } from "react";

export function ThemeManager() {
  const accentHsl = usePortfolioStore((state) => state.portfolio.theme?.accent);

  useEffect(() => {
    if (accentHsl) {
      const [h, s, l] = accentHsl.split(" ");
      const root = document.documentElement;
      
      // For light theme
      root.style.setProperty('--accent', accentHsl);
      root.style.setProperty('--ring', accentHsl);

      // For dark theme (slightly desaturated and brighter)
      const darkHsl = `${h} ${parseInt(s, 10) - 10}% ${parseInt(l, 10) + 10}%`;
      root.style.setProperty('--accent-dark', darkHsl);

    }
  }, [accentHsl]);

  return null;
}
