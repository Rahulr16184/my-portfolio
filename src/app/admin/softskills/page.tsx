
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
import { SoftSkill } from "@/lib/types";
import ConfirmationDialog from "@/app/components/ConfirmationDialog";

export default function SoftSkillsPage() {
  const { portfolio, updateSoftSkills } = usePortfolioStore();
  const { toast } = useToast();
  
  const [softSkills, setSoftSkills] = useState<SoftSkill[]>(JSON.parse(JSON.stringify(portfolio.softSkills)));
  const [newSkill, setNewSkill] = useState("");

  const handleAddNewSkill = () => {
    const skillValue = newSkill.trim();
    if (skillValue && !softSkills.some(s => s.skill === skillValue)) {
      const newSkillItem = { id: `ss-${Date.now()}`, skill: skillValue };
      setSoftSkills(prev => [...prev, newSkillItem]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (id: string) => {
    setSoftSkills(prev => prev.filter(s => s.id !== id));
  };

  const handleSaveChanges = () => {
    updateSoftSkills(softSkills);
    toast({
      title: "Success",
      description: "Your soft skills have been updated.",
    });
  }

  return (
    <AdminLayout>
      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle>Soft Skills</CardTitle>
                 <ConfirmationDialog
                    title="Save Soft Skills?"
                    description="Are you sure you want to save your soft skills?"
                    onConfirm={handleSaveChanges}
                >
                    <Button type="button">
                        <Save className="mr-2 h-4 w-4" />
                        Save Soft Skills
                    </Button>
                </ConfirmationDialog>
            </div>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div className="flex flex-wrap gap-2 min-h-[40px]">
                    {softSkills.map((item) => (
                    <Badge key={item.id} variant="secondary" className="text-base flex items-center gap-2">
                        {item.skill}
                        <button type="button" onClick={() => handleRemoveSkill(item.id)} className="hover:text-destructive">
                        <Trash2 className="h-3 w-3" />
                        </button>
                    </Badge>
                    ))}
                </div>
                <div className="flex items-center gap-2 pt-2">
                    <Input
                        placeholder="Add new soft skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); handleAddNewSkill();}}}
                    />
                    <Button type="button" variant="outline" size="icon" onClick={handleAddNewSkill}>
                        <PlusCircle/>
                    </Button>
                </div>
            </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
