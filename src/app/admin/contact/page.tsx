
"use client";

import AdminLayout from "../layout";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

const socialLinkSchema = z.object({
  id: z.string(),
  platform: z.enum(["linkedin", "github", "twitter"]),
  url: z.string().url("Invalid URL format"),
});

const contactSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  socials: z.array(socialLinkSchema),
});

export default function ContactPage() {
  const { portfolio, updateContact } = usePortfolioStore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    values: portfolio.contact,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "socials",
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    updateContact(data);
    toast({
      title: "Success",
      description: "Contact information updated successfully.",
    });
  };

  const addSocialLink = () => {
    append({
      id: `social-${Date.now()}`,
      platform: "linkedin",
      url: "",
    });
  };

  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 123 456 7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Social Links</FormLabel>
                <div className="space-y-4 mt-2">
                  {fields.map((field, index) => (
                    <Card key={field.id} className="p-4 bg-muted/50">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <FormField
                          control={form.control}
                          name={`socials.${index}.platform`}
                          render={({ field }) => (
                            <FormItem className="w-full sm:w-1/3">
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a platform" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                                  <SelectItem value="github">GitHub</SelectItem>
                                  <SelectItem value="twitter">Twitter/X</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`socials.${index}.url`}
                          render={({ field }) => (
                            <FormItem className="flex-grow">
                              <FormControl>
                                <Input placeholder="https://..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
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
                    onClick={addSocialLink}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Social Link
                  </Button>
                </div>
              </div>

               <div className="flex justify-end pt-4">
                 <ConfirmationDialog
                    title="Save Contact Info?"
                    description="Are you sure you want to save these contact details?"
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
