
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

const aboutSchema = z.object({
  bio: z.string().min(1, "Bio is required"),
  highlights: z.array(z.string().min(1, "Highlight cannot be empty")).min(1, "At least one highlight is required"),
});

export default function AboutPage() {
  const { portfolio, updateAbout } = usePortfolioStore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof aboutSchema>>({
    resolver: zodResolver(aboutSchema),
    values: portfolio.about,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "highlights",
  });

  const onSubmit = (data: z.infer<typeof aboutSchema>) => {
    updateAbout(data);
    toast({
      title: "Success",
      description: "About section updated successfully.",
    });
  };

  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <CardTitle>About Me</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biography</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell your story..."
                        {...field}
                        rows={5}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Key Highlights</FormLabel>
                <div className="space-y-2 mt-2">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <FormField
                        control={form.control}
                        name={`highlights.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-grow">
                             <FormControl>
                                <Input {...field} placeholder={`Highlight #${index + 1}`} />
                             </FormControl>
                             <FormMessage/>
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
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append("")}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Highlight
                  </Button>
                </div>
                 <FormMessage>{form.formState.errors.highlights?.message}</FormMessage>
              </div>

              <div className="flex justify-end">
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
