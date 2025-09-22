"use client";

import { usePreview } from "@/hooks/use-preview";
import PublicPortfolioPage from "@/app/page";
import Toolbar from "./components/Toolbar";

export default function AdminPage() {
  const { isPreview } = usePreview();

  if (isPreview) {
    return <PublicPortfolioPage />;
  }

  return (
    <div className="flex flex-col">
      <Toolbar />
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Portfolio Content</h2>
          <div className="border-2 border-dashed border-muted rounded-lg min-h-[400px] p-8 flex items-center justify-center">
            <p className="text-muted-foreground">Your portfolio sections will appear here. Click "Add New Section" to get started.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
