
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

const educationItemSchema = z.object({
  id: z.string(),
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  duration: z.string().min(1, "Duration is required"),
  desc: z.string().min(1, "Description is required"),
});

const educationSchema = z.object({
  education: z.array(educationItemSchema),
});

export default function EducationPage() {
  const { portfolio, updateEducation } = usePortfolioStore();

  const form = useForm<z.infer<typeof educationSchema>>({
    resolver: zodResolver(educationSchema),
    values: { education: portfolio.education },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });
  
  const addEducation = () => {
    const newEntry = {
      id: `edu-${Date.now()}`,
      degree: "",
      institution: "",
      duration: "",
      desc: "",
    };
    append(newEntry);
    updateEducation([...portfolio.education, newEntry]);
  };
  
  const removeEducation = (index: number) => {
    remove(index);
    const currentValues = form.getValues().education;
    currentValues.splice(index, 1);
    updateEducation(currentValues);
  }

  return (
    <AdminLayout>
       <Form {...form}>
        <form onChange={() => updateEducation(form.getValues().education)} className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manage Education</h1>
            <Button type="button" onClick={addEducation}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Education
            </Button>
          </div>

          <div className="space-y-8">
            {fields.map((field, index) => (
              <Card key={field.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Education #{index + 1}</CardTitle>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeEducation(index)}>
                      <Trash2 className="text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name={`education.${index}.degree`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Degree</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`education.${index}.institution`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`education.${index}.duration`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl><Input placeholder="e.g., 2018 - 2022" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`education.${index}.desc`}
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
