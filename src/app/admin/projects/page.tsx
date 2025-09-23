
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
import { PlusCircle, Trash2, Loader2, Upload } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { uploadToCloudinary } from "@/lib/firebase";
import { useState } from "react";

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
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const form = useForm<z.infer<typeof projectsSchema>>({
    resolver: zodResolver(projectsSchema),
    values: { projects: portfolio.projects },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "projects",
  });
  
  const addProject = () => {
    const newProject = {
      id: `proj-${Date.now()}`,
      title: "New Project",
      desc: "A brief description of your awesome project.",
      imageUrl: "https://picsum.photos/seed/new/600/400",
      tech: ["Next.js"],
      github: "",
      demo: "",
    };
    append(newProject);
    updateProjects([...portfolio.projects, newProject]);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadingIndex(index);
      try {
        const imageUrl = await uploadToCloudinary(file);
        if (imageUrl) {
          const updatedProjects = [...form.getValues().projects];
          updatedProjects[index].imageUrl = imageUrl;
          updateProjects(updatedProjects);
          toast({
            title: "Image Uploaded",
            description: "The project image has been saved.",
          });
        } else {
          throw new Error("Upload returned null");
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Upload Failed",
          description: "Could not upload the image. Please try again.",
        });
      } finally {
        setUploadingIndex(null);
      }
    }
  };

  const fileInputRefs = portfolio.projects.map(() => React.createRef<HTMLInputElement>());

  return (
    <AdminLayout>
       <Form {...form}>
        <form onChange={() => updateProjects(form.getValues().projects)} className="space-y-6">
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
                    render={({ field: imageField }) => (
                      <FormItem>
                        <FormLabel>Project Image</FormLabel>
                        <div className="flex items-center gap-4">
                          <Image src={imageField.value} alt={`Project ${index+1} Image`} width={120} height={80} className="rounded-md object-cover w-30 h-20 border-2 border-muted" />
                          <input
                            type="file"
                            ref={fileInputRefs[index]}
                            onChange={(e) => handleImageUpload(e, index)}
                            className="hidden"
                            accept="image/*"
                            disabled={uploadingIndex === index}
                          />
                          <Button type="button" variant="outline" size="sm" onClick={() => fileInputRefs[index].current?.click()} disabled={uploadingIndex === index}>
                            {uploadingIndex === index ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Upload className="mr-2 h-4 w-4" />
                            )}
                            Change Image
                          </Button>
                        </div>
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
                                onChange={(e) => field.onChange(e.target.value.split(/,\s*/))}
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
        </form>
      </Form>
    </AdminLayout>
  );
}
