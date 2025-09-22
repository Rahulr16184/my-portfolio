import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import AITaglineGenerator from "./components/AITaglineGenerator";

export default function AdminPage() {
  return (
    <div className="container mx-auto py-24 sm:py-32">
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-6xl">Admin Dashboard</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">Manage your portfolio content here.</p>
        </div>
        
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>AI Tagline Generator</CardTitle>
            <CardDescription>Generate a catchy tagline for your profile based on your role and skills.</CardDescription>
          </CardHeader>
          <CardContent>
            <AITaglineGenerator />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
