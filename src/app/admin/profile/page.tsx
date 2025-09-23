
"use client";

import * as React from 'react';
import { useForm } from "react-hook-form";
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
import { Loader2 } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  tagline: z.string().min(1, "Tagline is required"),
  resumeUrl: z.string().url().or(z.literal("")).optional(),
  profilePhoto: z.string().url().or(z.literal("")).optional(),
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

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const imageUrl = await uploadToCloudinary(file);
        if (imageUrl) {
          form.setValue("profilePhoto", imageUrl);
          updateProfile(form.getValues());
          toast({
            title: "Image Uploaded",
            description: "Your new profile photo has been saved.",
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
              onChange={() => updateProfile(form.getValues())}
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
               <FormField
                control={form.control}
                name="resumeUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resume URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/resume.pdf" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
