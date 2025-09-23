
"use client";

import { useState } from "react";
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
import { portfolioData as initialData } from "@/lib/portfolio-data";
import { Experience } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
  const { toast } = useToast();
  const [portfolioData, setPortfolioData] = useState(initialData);

  const form = useForm<z.infer<typeof experiencesSchema>>({
    resolver: zodResolver(experiencesSchema),
    defaultValues: { experience: portfolioData.experience },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experience",
  });

  const onSubmit = (values: z.infer<typeof experiencesSchema>) => {
    setPortfolioData((prev) => ({
      ...prev,
      experience: values.experience as Experience[],
    }));
    toast({
      title: "Experience Updated",
      description: "Your work experience has been saved.",
    });
    console.log("Updated portfolio data:", { ...portfolioData, experience: values.experience });
  };
  
  const addExperience = () => {
    append({
      id: `exp-${Date.now()}`,
      role: "",
      company: "",
      duration: "",
      desc: "",
    });
  }

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
          </div>
          
          <Separator />
          
          <div className="flex justify-end">
            <Button type="submit">Save All Experience</Button>
          </div>
        </form>
      </Form>
    </AdminLayout>
  );
}
