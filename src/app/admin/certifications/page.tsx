
"use client";

import React, { useState } from "react";
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
import { usePortfolioStore } from "@/hooks/use-portfolio-store";
import { PlusCircle, Trash2, Save, Loader2, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ConfirmationDialog from "@/app/components/ConfirmationDialog";
import Image from "next/image";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Separator } from "@/components/ui/separator";

const certificationItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Certification name is required"),
  authority: z.string().min(1, "Issuing authority is required"),
  date: z.string().min(1, "Date is required"),
  imageUrls: z.array(z.string().url()),
});

const certificationsSchema = z.object({
  certifications: z.array(certificationItemSchema),
});

export default function CertificationsPage() {
  const { portfolio, updateCertifications } = usePortfolioStore();
  const { toast } = useToast();
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const form = useForm<z.infer<typeof certificationsSchema>>({
    resolver: zodResolver(certificationsSchema),
    defaultValues: { certifications: portfolio.certifications },
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "certifications",
  });
  
  const addCertification = () => {
    append({
      id: `cert-${Date.now()}`,
      name: "",
      authority: "",
      date: "",
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
          const currentCert = form.getValues().certifications[index];
          const updatedImages = [...currentCert.imageUrls, imageUrl];
          update(index, { ...currentCert, imageUrls: updatedImages });
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

  const removeImage = (certIndex: number, imgIndex: number) => {
    const currentCert = form.getValues().certifications[certIndex];
    const updatedImages = currentCert.imageUrls.filter((_, i) => i !== imgIndex);
    update(certIndex, { ...currentCert, imageUrls: updatedImages });
  };
  
  const fileInputRefs = fields.map(() => React.createRef<HTMLInputElement>());

  const onSubmit = (data: z.infer<typeof certificationsSchema>) => {
    updateCertifications(data.certifications);
    toast({
      title: "Success!",
      description: "Your certifications have been saved.",
    });
  };
  
  return (
    <AdminLayout>
       <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manage Certifications</h1>
            <Button type="button" onClick={addCertification}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Certification
            </Button>
          </div>

          <div className="space-y-8">
            {fields.map((field, index) => (
              <Card key={field.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Certification #{index + 1}</CardTitle>
                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                      <Trash2 className="text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name={`certifications.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Certification Name</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`certifications.${index}.authority`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issuing Authority</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`certifications.${index}.date`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date Issued</FormLabel>
                        <FormControl><Input placeholder="e.g., 2023" {...field} /></FormControl>
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
                            <Image src={url} alt={`Cert image ${imgIndex + 1}`} width={100} height={100} className="rounded-md object-cover w-24 h-24 border-2 border-muted" />
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
                      title="Save Certifications?"
                      description="Are you sure you want to save all changes to your certifications?"
                      onConfirm={form.handleSubmit(onSubmit)}
                    >
                      <Button type="button">
                          <Save className="mr-2 h-4 w-4" />
                          Save Certifications
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
