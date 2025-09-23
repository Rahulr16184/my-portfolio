
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
import { PlusCircle, Trash2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const form = useForm<z.infer<typeof experiencesSchema>>({
    resolver: zodResolver(experiencesSchema),
    defaultValues: { experience: portfolio.experience },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experience",
  });
  
  const addExperience = () => {
    append({
      id: `exp-${Date.now()}`,
      role: "",
      company: "",
      duration: "",
      desc: "",
    });
  };

  const onSubmit = (data: z.infer<typeof experiencesSchema>) => {
    updateExperience(data.experience);
    toast({
        title: "Success!",
        description: "Your work experience has been saved.",
    });
  };

  return (
    <AdminLayout>
       <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
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
             {fields.length > 0 && (
                <div className="flex justify-end">
                    <Button type="submit">
                        <Save className="mr-2 h-4 w-4" />
                        Save Experience
                    </Button>
                </div>
            )}
          </div>
        </form>
      </Form>
    </AdminLayout>
  );
}
