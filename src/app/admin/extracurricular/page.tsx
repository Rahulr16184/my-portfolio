
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
import ConfirmationDialog from "@/app/components/ConfirmationDialog";

const extracurricularItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title/Organization is required"),
  role: z.string().min(1, "Your role is required"),
  desc: z.string().min(1, "Description is required"),
});

const extracurricularSchema = z.object({
  extracurricular: z.array(extracurricularItemSchema),
});

export default function ExtracurricularPage() {
  const { portfolio, updateExtracurricular } = usePortfolioStore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof extracurricularSchema>>({
    resolver: zodResolver(extracurricularSchema),
    defaultValues: { extracurricular: portfolio.extracurricular },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "extracurricular",
  });
  
  const addActivity = () => {
    append({
      id: `extra-${Date.now()}`,
      title: "",
      role: "",
      desc: "",
    });
  };

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
