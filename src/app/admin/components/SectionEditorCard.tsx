
"use client";

import { useState } from "react";
import { PortfolioSection, SectionType } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2, GripVertical } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SectionEditorCardProps {
  section: PortfolioSection;
  onUpdate: (updatedSection: PortfolioSection) => void;
  onDelete: (sectionId: string) => void;
}

export default function SectionEditorCard({
  section,
  onUpdate,
  onDelete,
}: SectionEditorCardProps) {
  const [editedSection, setEditedSection] = useState<PortfolioSection>(section);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name in editedSection.content) {
      setEditedSection((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          [name]: value,
        },
      }));
    } else {
       setEditedSection((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleTypeChange = (value: SectionType) => {
     setEditedSection((prev) => ({
        ...prev,
        type: value,
      }));
  };

  const handleSave = () => {
    onUpdate(editedSection);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between bg-muted/50 p-4">
        <div className="flex items-center gap-2">
            <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
            <CardTitle className="text-lg">{section.name || "New Section"}</CardTitle>
        </div>
        <Button variant="ghost" size="icon" onClick={() => onDelete(section.id)}>
            <Trash2 className="h-4 w-4 text-destructive" />
            <span className="sr-only">Delete Section</span>
        </Button>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor={`name-${section.id}`}>Section Name</Label>
                <Input
                    id={`name-${section.id}`}
                    name="name"
                    value={editedSection.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Hero, About Me"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor={`type-${section.id}`}>Section Type</Label>
                 <Select onValueChange={handleTypeChange} value={editedSection.type}>
                    <SelectTrigger id={`type-${section.id}`}>
                        <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="hero">Hero</SelectItem>
                        <SelectItem value="about">About</SelectItem>
                        <SelectItem value="projects">Projects</SelectItem>
                        <SelectItem value="contact">Contact</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div className="space-y-2">
            <Label htmlFor={`title-${section.id}`}>Title</Label>
            <Input
                id={`title-${section.id}`}
                name="title"
                value={editedSection.content.title || ""}
                onChange={handleInputChange}
                placeholder="e.g., Welcome to my Portfolio"
            />
        </div>

        <div className="space-y-2">
            <Label htmlFor={`description-${section.id}`}>Description</Label>
            <Textarea
                id={`description-${section.id}`}
                name="description"
                value={editedSection.content.description || ""}
                onChange={handleInputChange}
                placeholder="e.g., I'm a passionate developer..."
            />
        </div>

        <div className="flex justify-end">
            <Button onClick={handleSave}>Save Section</Button>
        </div>
      </CardContent>
    </Card>
  );
}
