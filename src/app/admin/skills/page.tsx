
"use client";

import { useState } from "react";
import AdminLayout from "../layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePortfolioStore } from "@/hooks/use-portfolio-store";
import { PlusCircle, Trash2, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Skills } from "@/lib/types";
import ConfirmationDialog from "@/app/components/ConfirmationDialog";

type SkillCategory = keyof Skills;

export default function SkillsPage() {
  const { portfolio, updateSkills } = usePortfolioStore();
  const { toast } = useToast();
  
  const [skills, setSkills] = useState<Skills>(JSON.parse(JSON.stringify(portfolio.skills)));
  const [newSkills, setNewSkills] = useState({
    frontend: "",
    backend: "",
    databases: "",
    tools: "",
  });

  const handleAddNewSkill = (category: SkillCategory) => {
    const skillValue = newSkills[category].trim();
    if (skillValue && !skills[category].includes(skillValue)) {
      const updatedCategory = [...skills[category], skillValue];
      setSkills(prev => ({ ...prev, [category]: updatedCategory }));
      setNewSkills(prev => ({ ...prev, [category]: "" }));
    }
  };

  const handleRemoveSkill = (category: SkillCategory, index: number) => {
    const updatedCategory = skills[category].filter((_, i) => i !== index);
    setSkills(prev => ({ ...prev, [category]: updatedCategory }));
  };

  const handleSaveChanges = () => {
    updateSkills(skills);
    toast({
      title: "Success",
      description: "Your technical skills have been updated.",
    });
  }

  return (
    <AdminLayout>
      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle>Technical Skills</CardTitle>
                 <ConfirmationDialog
                    title="Save Skills?"
                    description="Are you sure you want to save your technical skills?"
                    onConfirm={handleSaveChanges}
                >
                    <Button type="button">
                        <Save className="mr-2 h-4 w-4" />
                        Save Skills
                    </Button>
                </ConfirmationDialog>
            </div>
        </CardHeader>
        <CardContent>
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(Object.keys(skills) as SkillCategory[]).map((category) => (
                  <div key={category} className="space-y-4">
                    <h3 className="text-lg font-medium capitalize">{category === 'tools' ? 'Tools & Platforms' : category}</h3>
                     <div className="flex flex-wrap gap-2 min-h-[40px]">
                      {skills[category].map((skill, index) => (
                        <Badge key={`${category}-${index}`} variant="secondary" className="text-base flex items-center gap-2">
                          {skill}
                          <button type="button" onClick={() => handleRemoveSkill(category, index)} className="hover:text-destructive">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                     <div className="flex items-center gap-2 pt-2">
                       <Input
                         placeholder={`Add new ${category} skill`}
                         value={newSkills[category]}
                         onChange={(e) => setNewSkills(prev => ({ ...prev, [category]: e.target.value }))}
                         onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); handleAddNewSkill(category);}}}
                       />
                       <Button type="button" variant="outline" size="icon" onClick={() => handleAddNewSkill(category)}>
                         <PlusCircle/>
                       </Button>
                     </div>
                  </div>
                ))}
              </div>
            </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
