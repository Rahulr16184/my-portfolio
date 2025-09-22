"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Wand2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  prompt: z.string().min(10, {
    message: "Please enter at least 10 characters.",
  }),
});

export default function AITaglineGenerator() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setSuggestions([]);

    // Simulate AI call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real app, you would call your Genkit flow here
    // e.g., const result = await generateTagline(values.prompt);
    const mockSuggestions = [
      "Crafting digital experiences with modern web technologies.",
      "Full-stack developer turning ideas into high-performance web applications.",
      "Specializing in React, Next.js, and scalable cloud infrastructure.",
      "Building the future of the web, one component at a time.",
    ];
    setSuggestions(mockSuggestions);

    setLoading(false);
  }

  const handleSuggestionClick = (suggestion: string) => {
    navigator.clipboard.writeText(suggestion);
    toast({
      title: "Copied to clipboard!",
      description: "The tagline has been copied to your clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Role & Key Skills</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Full Stack Developer with experience in React, Next.js, and Firebase."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading} className="w-full sm:w-auto">
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Wand2 className="mr-2" />
            )}
            Generate Taglines
          </Button>
        </form>
      </Form>

      {loading && (
        <div className="space-y-4">
            <div className="w-full h-10 bg-muted rounded-lg animate-pulse" />
            <div className="w-full h-10 bg-muted rounded-lg animate-pulse delay-75" />
            <div className="w-full h-10 bg-muted rounded-lg animate-pulse delay-150" />
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-medium">Suggestions</h3>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:bg-muted"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <CardContent className="p-4 text-sm">
                  {suggestion}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
