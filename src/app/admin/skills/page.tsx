
"use client";

import { useState } from "react";
import AdminLayout from "../layout";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { portfolioData as initialData } from "@/lib/portfolio-data";
import { Skills } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Trash2 } from "lucide-react";

const skillsSchema = z.object({
  frontend: z.array(z.string().min(1)),
  backend: z.array(z.string().min(1)),
  databases: z.array(z.string().min(1)),
  tools: z.array(z.string().min(1)),
});

type SkillCategory = "frontend" | "backend" | "databases" | "tools";


export default function SkillsPage() {
  const { toast } = useToast();
  const [portfolioData, setPortfolioData] = useState(initialData);
  const [newSkills, setNewSkills] = useState({
    frontend: "",
    backend: "",
    databases: "",
    tools: "",
  });

  const form = useForm<z.infer<typeof skillsSchema>>({
    resolver: zodResolver(skillsSchema),
    defaultValues: portfolioData.skills,
  });

  const { control } = form;

  const { fields: frontendFields, append: appendFrontend, remove: removeFrontend } = useFieldArray({ control, name: "frontend" });
  const { fields: backendFields, append: appendBackend, remove: removeBackend } = useFieldArray({ control, name: "backend" });
  const { fields: databasesFields, append: appendDatabases, remove: removeDatabases } = useFieldArray({ control, name: "databases" });
  const { fields: toolsFields, append: appendTools, remove: removeTools } = useFieldArray({ control, name: "tools" });

  const fieldConfig = {
    frontend: { fields: frontendFields, append: appendFrontend, remove: removeFrontend, label: "Frontend" },
    backend: { fields: backendFields, append: appendBackend, remove: removeBackend, label: "Backend" },
    databases: { fields: databasesFields, append: appendDatabases, remove: removeDatabases, label: "Databases" },
    tools: { fields: toolsFields, append: appendTools, remove: removeTools, label: "Tools & Platforms" },
  };

  const handleAddNewSkill = (category: SkillCategory) => {
    const skillValue = newSkills[category].trim();
    if (skillValue) {
      fieldConfig[category].append(skillValue);
      setNewSkills(prev => ({ ...prev, [category]: "" }));
    }
  };

  const onSubmit = (values: z.infer<typeof skillsSchema>) => {
    setPortfolioData((prev) => ({
      ...prev,
      skills: values as Skills,
    }));
    toast({
      title: "Skills Updated",
      description: "Your skills have been saved.",
    });
    console.log("Updated portfolio data:", { ...portfolioData, skills: values });
  };

  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(Object.keys(fieldConfig) as SkillCategory[]).map((category) => (
                  <div key={category} className="space-y-4">
                    <h3 className="text-lg font-medium">{fieldConfig[category].label}</h3>
                    <div className="space-y-2">
                      {fieldConfig[category].fields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2">
                           <Input {...form.register(`${category}.${index}` as const)} className="bg-transparent"/>
                           <Button type="button" variant="ghost" size="icon" onClick={() => fieldConfig[category].remove(index)}>
                              <Trash2 className="text-destructive" />
                           </Button>
                        </div>
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

              <div className="flex justify-end pt-4">
                <Button type="submit">Save All Skills</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
