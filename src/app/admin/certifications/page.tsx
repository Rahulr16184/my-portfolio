
"use client";

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
import { PlusCircle, Trash2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ConfirmationDialog from "@/app/components/ConfirmationDialog";

const certificationItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Certification name is required"),
  authority: z.string().min(1, "Issuing authority is required"),
  date: z.string().min(1, "Date is required"),
});

const certificationsSchema = z.object({
  certifications: z.array(certificationItemSchema),
});

export default function CertificationsPage() {
  const { portfolio, updateCertifications } = usePortfolioStore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof certificationsSchema>>({
    resolver: zodResolver(certificationsSchema),
    defaultValues: { certifications: portfolio.certifications },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "certifications",
  });
  
  const addCertification = () => {
    append({
      id: `cert-${Date.now()}`,
      name: "",
      authority: "",
      date: "",
    });
  };

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
