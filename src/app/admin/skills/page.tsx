
"use client";

import { useState } from "react";
import AdminLayout from "../layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePortfolioStore } from "@/hooks/use-portfolio-store";
import { PlusCircle, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const skillsSchema = z.object({
  frontend: z.array(z.string().min(1)),
  backend: z.array(z.string().min(1)),
  databases: z.array(z.string().min(1)),
  tools: z.array(z.string().min(1)),
});

type SkillCategory = keyof z.infer<typeof skillsSchema>;

export default function SkillsPage() {
  const { portfolio, updateSkills } = usePortfolioStore();
  const [newSkills, setNewSkills] = useState({
    frontend: "",
    backend: "",
    databases: "",
    tools: "",
  });

  const form = useForm<z.infer<typeof skillsSchema>>({
    resolver: zodResolver(skillsSchema),
    values: portfolio.skills,
  });

  const handleAddNewSkill = (category: SkillCategory) => {
    const skillValue = newSkills[category].trim();
    if (skillValue) {
      const currentSkills = form.getValues();
      const updatedCategory = [...currentSkills[category], skillValue];
      const newSkillsState = { ...currentSkills, [category]: updatedCategory };
      updateSkills(newSkillsState);
      setNewSkills(prev => ({ ...prev, [category]: "" }));
    }
  };

  const handleRemoveSkill = (category: SkillCategory, index: number) => {
    const currentSkills = form.getValues();
    const updatedCategory = currentSkills[category].filter((_, i) => i !== index);
    const newSkillsState = { ...currentSkills, [category]: updatedCategory };
    updateSkills(newSkillsState);
  };


  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(Object.keys(portfolio.skills) as SkillCategory[]).map((category) => (
                  <div key={category} className="space-y-4">
                    <h3 className="text-lg font-medium capitalize">{category === 'tools' ? 'Tools & Platforms' : category}</h3>
                     <div className="flex flex-wrap gap-2">
                      {portfolio.skills[category].map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-base flex items-center gap-2">
                          {skill}
                          <button onClick={() => handleRemoveSkill(category, index)} className="hover:text-destructive">
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
            </form>
          </Form>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
