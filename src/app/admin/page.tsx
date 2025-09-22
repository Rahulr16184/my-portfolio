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
      <div className="container mx-auto py-24 sm:py-32">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-6xl">Admin Dashboard</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">Welcome to the admin dashboard! This is where you edit your portfolio.</p>
          </div>
        </div>
      </div>
    </>
  );
}
