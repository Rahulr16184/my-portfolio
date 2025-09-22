
"use client";

import { useState } from "react";
import { usePreview } from "@/hooks/use-preview";
import PublicPortfolioPage from "@/app/page";
import Toolbar from "./components/Toolbar";
import { portfolioData as initialPortfolioData } from "@/lib/portfolio-data";
import { PortfolioSection } from "@/lib/types";
import SectionEditorCard from "./components/SectionEditorCard";

export default function AdminPage() {
  const { isPreview } = usePreview();
  const [sections, setSections] = useState<PortfolioSection[]>(initialPortfolioData);

  const handleAddSection = () => {
    const newSection: PortfolioSection = {
      id: `section-${Date.now()}`,
      type: "hero",
      name: `New Section`,
      content: {
        title: "New Section Title",
        description: "You can edit this content."
      },
    };
    setSections((prevSections) => [...prevSections, newSection]);
  };

  const handleUpdateSection = (updatedSection: PortfolioSection) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === updatedSection.id ? updatedSection : section
      )
    );
  };
  
  const handleDeleteSection = (sectionId: string) => {
    setSections((prevSections) =>
      prevSections.filter((section) => section.id !== sectionId)
    );
  };

  if (isPreview) {
    return <PublicPortfolioPage sections={sections} />;
  }

  return (
    <div className="flex flex-col">
      <Toolbar onAddSection={handleAddSection} />
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="container mx-auto">
          {sections.length === 0 ? (
            <div className="border-2 border-dashed border-muted rounded-lg min-h-[400px] p-8 flex items-center justify-center">
              <p className="text-muted-foreground">Your portfolio is empty. Click "Add New Section" to get started.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {sections.map((section) => (
                <SectionEditorCard
                  key={section.id}
                  section={section}
                  onUpdate={handleUpdateSection}
                  onDelete={handleDeleteSection}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
