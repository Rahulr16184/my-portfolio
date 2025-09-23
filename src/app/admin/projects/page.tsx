
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
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  desc: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Must be a valid URL"),
  tech: z.array(z.string().min(1)).min(1, "At least one technology is required"),
  github: z.string().url().optional().or(z.literal('')),
  demo: z.string().url().optional().or(z.literal('')),
});

const projectsSchema = z.object({
  projects: z.array(projectSchema),
});

export default function ProjectsPage() {
  const { toast } = useToast();
  const { portfolio, updateProjects } = usePortfolioStore();

  const form = useForm<z.infer<typeof projectsSchema>>({
    resolver: zodResolver(projectsSchema),
    defaultValues: { projects: portfolio.projects },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  const onSubmit = (values: z.infer<typeof projectsSchema>) => {
    updateProjects(values.projects);
    toast({
      title: "Projects Updated",
      description: "Your project information has been saved.",
    });
  };
  
  const addProject = () => {
    append({
      id: `proj-${Date.now()}`,
      title: "",
      desc: "",
      imageUrl: "https://picsum.photos/seed/new/600/400",
      tech: [],
      github: "",
      demo: "",
    });
  };

  form.reset({ projects: portfolio.projects });

  return (
    <AdminLayout>
       <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manage Projects</h1>
            <Button type="button" onClick={addProject}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Project
            </Button>
          </div>

          <div className="space-y-8">
            {fields.map((field, index) => (
              <Card key={field.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Project #{index + 1}</CardTitle>
                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                      <Trash2 className="text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name={`projects.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`projects.${index}.desc`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl><Textarea {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`projects.${index}.imageUrl`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`projects.${index}.github`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub URL</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`projects.${index}.demo`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Live Demo URL</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   {/* TODO: Add better UI for managing tech array */}
                  <FormField
                    control={form.control}
                    name={`projects.${index}.tech`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Technologies (comma-separated)</FormLabel>
                        <FormControl>
                            <Input 
                                {...field} 
                                value={Array.isArray(field.value) ? field.value.join(', ') : ''}
                                onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()))}
                            />
                        </FormControl>
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
            <Button type="submit">Save All Projects</Button>
          </div>
        </form>
      </Form>
    </AdminLayout>
  );
}
