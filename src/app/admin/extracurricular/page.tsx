
"use client";

import React, { useState } from "react";
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
import { PlusCircle, Trash2, Save, Loader2, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ConfirmationDialog from "@/app/components/ConfirmationDialog";
import Image from "next/image";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Separator } from "@/components/ui/separator";

const extracurricularItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title/Organization is required"),
  role: z.string().min(1, "Your role is required"),
  desc: z.string().min(1, "Description is required"),
  imageUrls: z.array(z.string().url()),
});

const extracurricularSchema = z.object({
  extracurricular: z.array(extracurricularItemSchema),
});

export default function ExtracurricularPage() {
  const { portfolio, updateExtracurricular } = usePortfolioStore();
  const { toast } = useToast();
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const form = useForm<z.infer<typeof extracurricularSchema>>({
    resolver: zodResolver(extracurricularSchema),
    defaultValues: { extracurricular: portfolio.extracurricular },
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "extracurricular",
  });
  
  const addActivity = () => {
    append({
      id: `extra-${Date.now()}`,
      title: "",
      role: "",
      desc: "",
      imageUrls: [],
    });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadingIndex(index);
      try {
        const imageUrl = await uploadToCloudinary(file);
        if (imageUrl) {
          const currentActivity = form.getValues().extracurricular[index];
          const updatedImages = [...currentActivity.imageUrls, imageUrl];
          update(index, { ...currentActivity, imageUrls: updatedImages });
          toast({
            title: "Image Ready",
            description: "New image is ready to be saved.",
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

  const removeImage = (activityIndex: number, imgIndex: number) => {
    const currentActivity = form.getValues().extracurricular[activityIndex];
    const updatedImages = currentActivity.imageUrls.filter((_, i) => i !== imgIndex);
    update(activityIndex, { ...currentActivity, imageUrls: updatedImages });
  };
  
  const fileInputRefs = fields.map(() => React.createRef<HTMLInputElement>());

  const onSubmit = (data: z.infer<typeof extracurricularSchema>) => {
    updateExtracurricular(data.extracurricular);
    toast({
      title: "Success!",
      description: "Your extra-curricular activities have been saved.",
    });
  };
  
  return (
    <AdminLayout>
       <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manage Activities</h1>
            <Button type="button" onClick={addActivity}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Activity
            </Button>
          </div>

          <div className="space-y-8">
            {fields.map((field, index) => (
              <Card key={field.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Activity #{index + 1}</CardTitle>
                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                      <Trash2 className="text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name={`extracurricular.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title / Organization</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`extracurricular.${index}.role`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Role</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`extracurricular.${index}.desc`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl><Textarea {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator />
                   <div className="space-y-2">
                     <FormLabel>Associated Images</FormLabel>
                      <div className="flex flex-wrap gap-4">
                        {field.imageUrls.map((url, imgIndex) => (
                          <div key={imgIndex} className="relative group">
                            <Image src={url} alt={`Activity image ${imgIndex + 1}`} width={100} height={100} className="rounded-md object-cover w-24 h-24 border-2 border-muted" />
                             <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeImage(index, imgIndex)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                          </div>
                        ))}
                      </div>
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
                          Upload Image
                        </Button>
                   </div>
                </CardContent>
              </Card>
            ))}
             {fields.length > 0 && (
                <div className="flex justify-end">
                    <ConfirmationDialog
                      title="Save Activities?"
                      description="Are you sure you want to save all changes to your activities?"
                      onConfirm={form.handleSubmit(onSubmit)}
                    >
                      <Button type="button">
                          <Save className="mr-2 h-4 w-4" />
                          Save Activities
                      </Button>
                    </ConfirmationDialog>
                </div>
            )}
          </div>
        </form>
      </Form>
    </AdminLayout>
  );
}
