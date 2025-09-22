"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface ToolbarProps {
  onAddSection: () => void;
}

export default function Toolbar({ onAddSection }: ToolbarProps) {
  return (
    <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto flex h-14 items-center px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Button onClick={onAddSection}>
            <PlusCircle />
            Add New Section
          </Button>
        </div>
      </div>
    </div>
  );
}
