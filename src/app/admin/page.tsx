"use client";

import { usePreview } from "@/hooks/use-preview";
import PublicPortfolioPage from "@/app/page";

export default function AdminPage() {
  const { isPreview } = usePreview();

  if (isPreview) {
    return <PublicPortfolioPage />;
  }

  return (
    <>
      
    </>
  );
}
