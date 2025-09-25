
"use client";

import AdminLayout from "../layout";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Save, PlusCircle, Trash2 } from "lucide-react";
import ConfirmationDialog from "@/app/components/ConfirmationDialog";
import { LanguageProficiency } from "@/lib/types";

const languageSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Language name is required"),
  proficiency: z.enum(["Conversational", "Professional", "Fluent/Native"]),
});

const languagesSchema = z.object({
  languages: z.array(languageSchema),
});

const proficiencyLevels: LanguageProficiency[] = ["Conversational", "Professional", "Fluent/Native"];

export default function LanguagesPage() {
  const { portfolio, updateLanguages } = usePortfolioStore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof languagesSchema>>({
    resolver: zodResolver(languagesSchema),
    defaultValues: { languages: portfolio.languages || [] },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "languages",
  });

  const onSubmit = (data: z.infer<typeof languagesSchema>) => {
    updateLanguages(data.languages);
    toast({
      title: "Success",
      description: "Language skills updated successfully.",
    });
  };

  const addLanguage = () => {
    append({
      id: `lang-${Date.now()}`,
      name: "",
      proficiency: "Professional",
    });
  };

  return (
    <AdminLayout>
       <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Languages</h1>
                 <Button type="button" onClick={addLanguage}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Language
                </Button>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <Card key={field.id} className="p-4 bg-muted/50">
                  <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <FormField
                      control={form.control}
                      name={`languages.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="flex-grow">
                          <FormLabel>Language</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., French" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`languages.${index}.proficiency`}
                      render={({ field }) => (
                        <FormItem className="w-full sm:w-1/3">
                          <FormLabel>Proficiency</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select proficiency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {proficiencyLevels.map(level => (
                                <SelectItem key={level} value={level}>{level}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="text-destructive" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {fields.length > 0 && (
                <div className="flex justify-end pt-4">
                 <ConfirmationDialog
                    title="Save Languages?"
                    description="Are you sure you want to save these language skills?"
                    onConfirm={form.handleSubmit(onSubmit)}
                  >
                    <Button type="button">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                 </ConfirmationDialog>
              </div>
            )}
        </form>
      </Form>
    </AdminLayout>
  );
}
