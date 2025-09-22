"use client";

import { useState } from "react";
import { usePreview } from "@/hooks/use-preview";
import PublicPortfolioPage from "@/app/page";
import Toolbar from "./components/Toolbar";
import { portfolioData as initialPortfolioData } from "@/lib/portfolio-data";
import { PortfolioSection, SectionType } from "@/lib/types";

export default function AdminPage() {
  const { isPreview } = usePreview();
  const [sections, setSections] = useState<PortfolioSection[]>(initialPortfolioData);

  const handleAddSection = () => {
    const newSection: PortfolioSection = {
      id: `section-${Date.now()}`,
      type: "hero", // Default to 'hero', we can make this selectable later
      name: `New Section ${sections.length + 1}`,
      content: {
        title: "Welcome to your new section!",
        description: "You can edit this content."
      },
    };
    setSections((prevSections) => [...prevSections, newSection]);
  };

  if (isPreview) {
    return <PublicPortfolioPage sections={sections} />;
  }

  return (
    <div className="flex flex-col">
      <Toolbar onAddSection={handleAddSection} />
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Portfolio Content</h2>
          {sections.length === 0 ? (
            <div className="border-2 border-dashed border-muted rounded-lg min-h-[400px] p-8 flex items-center justify-center">
              <p className="text-muted-foreground">Your portfolio is empty. Click "Add New Section" to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sections.map((section) => (
                <div key={section.id} className="border rounded-lg p-4 bg-card text-card-foreground">
                  <h3 className="font-bold">{section.name}</h3>
                  <p className="text-sm text-muted-foreground">Type: {section.type}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
