
"use client";

import AdminLayout from "../layout";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePortfolioStore } from "@/hooks/use-portfolio-store";
import { PlusCircle, Trash2 } from "lucide-react";

const experienceSchema = z.object({
  id: z.string(),
  role: z.string().min(1, "Role is required"),
  company: z.string().min(1, "Company is required"),
  duration: z.string().min(1, "Duration is required"),
  desc: z.string().min(1, "Description is required"),
});

const experiencesSchema = z.object({
  experience: z.array(experienceSchema),
});

export default function ExperiencePage() {
  const { portfolio, updateExperience } = usePortfolioStore();

  const form = useForm<z.infer<typeof experiencesSchema>>({
    resolver: zodResolver(experiencesSchema),
    values: { experience: portfolio.experience },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experience",
  });
  
  const addExperience = () => {
    const newEntry = {
      id: `exp-${Date.now()}`,
      role: "",
      company: "",
      duration: "",
      desc: "",
    };
    append(newEntry);
    updateExperience([...portfolio.experience, newEntry]);
  };

  const removeExperience = (index: number) => {
    remove(index);
    const currentValues = form.getValues().experience;
    currentValues.splice(index, 1);
    updateExperience(currentValues);
  }

  return (
    <AdminLayout>
       <Form {...form}>
        <form onChange={() => updateExperience(form.getValues().experience)} className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manage Experience</h1>
            <Button type="button" onClick={addExperience}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
            </Button>
          </div>

          <div className="space-y-8">
            {fields.map((field, index) => (
              <Card key={field.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Experience #{index + 1}</CardTitle>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeExperience(index)}>
                      <Trash2 className="text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name={`experience.${index}.role`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`experience.${index}.company`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`experience.${index}.duration`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl><Input placeholder="e.g., 2022 - Present" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`experience.${index}.desc`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl><Textarea {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </form>
      </Form>
    </AdminLayout>
  );
}
