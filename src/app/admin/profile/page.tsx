
"use client";

import * as React from 'react';
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
import AdminLayout from "../layout";
import Image from "next/image";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { useState } from "react";
import { Loader2, Save, PlusCircle, Trash2 } from "lucide-react";
import ConfirmationDialog from '@/app/components/ConfirmationDialog';

const resumeSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Resume name is required"),
  url: z.string().url("Must be a valid URL").min(1, "URL is required"),
});

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  tagline: z.string().min(1, "Tagline is required"),
  profilePhoto: z.string().url().or(z.literal("")).optional(),
  resumes: z.array(resumeSchema),
});

export default function ProfilePage() {
  const { toast } = useToast();
  const { portfolio, updateProfile } = usePortfolioStore();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    values: portfolio.profile,
  });

  const { fields: resumeFields, append: appendResume, remove: removeResume } = useFieldArray({
    control: form.control,
    name: "resumes",
  });

  const onSubmit = (data: z.infer<typeof profileSchema>) => {
    updateProfile(data);
    toast({
      title: "Success",
      description: "Your profile has been updated.",
    });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const imageUrl = await uploadToCloudinary(file);
        if (imageUrl) {
          form.setValue("profilePhoto", imageUrl);
          toast({
            title: "Image Ready",
            description: "New profile photo is ready. Click 'Save Changes' to apply.",
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
        setIsUploading(false);
      }
    }
  };

  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
               <FormField
                control={form.control}
                name="profilePhoto"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center text-center">
                    <FormLabel>Profile Photo</FormLabel>
                    <FormControl>
                      <div>
                        <Image
                          src={field.value || "https://picsum.photos/seed/1/300/300"}
                          alt="Profile Photo"
                          width={128}
                          height={128}
                          className="rounded-full object-cover w-32 h-32 border-4 border-muted cursor-pointer"
                          onClick={() => fileInputRef.current?.click()}
                        />
                         <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          className="hidden"
                          accept="image/*"
                          disabled={isUploading}
                        />
                      </div>
                    </FormControl>
                    {isUploading ? (
                        <div className="flex items-center text-muted-foreground">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            <span>Uploading...</span>
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground pt-1">Click image to upload a new one</p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Full Stack Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tagline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tagline</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A short, catchy tagline about what you do" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <FormLabel>Resume Links</FormLabel>
                <div className="space-y-4 mt-2">
                  {resumeFields.map((field, index) => (
                    <Card key={field.id} className="p-4 bg-muted/50">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <FormField
                          control={form.control}
                          name={`resumes.${index}.name`}
                          render={({ field }) => (
                            <FormItem className="flex-grow">
                              <FormLabel className="text-xs">Button Label</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Official Resume" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`resumes.${index}.url`}
                          render={({ field }) => (
                            <FormItem className="flex-grow">
                              <FormLabel className="text-xs">File URL</FormLabel>
                              <FormControl>
                                <Input placeholder="https://example.com/resume.pdf" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeResume(index)}
                          className="self-end"
                        >
                          <Trash2 className="text-destructive" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendResume({ id: `resume-${Date.now()}`, name: "New Resume", url: "" })}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Resume
                  </Button>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <ConfirmationDialog
                  title="Save Profile?"
                  description="Are you sure you want to save these profile changes?"
                  onConfirm={form.handleSubmit(onSubmit)}
                >
                  <Button type="button">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </ConfirmationDialog>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
