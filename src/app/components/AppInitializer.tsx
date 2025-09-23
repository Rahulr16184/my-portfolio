
"use client";

import { useEffect } from "react";
import { usePortfolioStore } from "@/hooks/use-portfolio-store";

export function AppInitializer() {
  const initializePortfolio = usePortfolioStore((state) => state.initializePortfolio);

  useEffect(() => {
    initializePortfolio();
  }, [initializePortfolio]);

  return null;
}
