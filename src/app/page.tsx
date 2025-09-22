import { portfolioData } from "@/lib/portfolio-data";
import { PortfolioSection } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PublicPortfolioPageProps {
  sections?: PortfolioSection[];
}

const SectionComponent = ({ section }: { section: PortfolioSection }) => {
  // In the future, we will replace this with specific components
  // for each section type (e.g., Hero, About, Projects).
  return (
    <Card className="w-full my-8 animate-fade-in">
      <CardHeader>
        <CardTitle className="capitalize">{section.name || section.type}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is a placeholder for the '{section.type}' section.</p>
        <pre className="mt-4 p-4 bg-muted rounded-md overflow-x-auto text-sm">
          {JSON.stringify(section.content, null, 2)}
        </pre>
      </CardContent>
    </Card>
  );
};


export default function PublicPortfolioPage({ sections: sectionsProp }: PublicPortfolioPageProps) {
  const sections = sectionsProp || portfolioData;

  if (sections.length === 0) {
    return (
       <div className="container mx-auto min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-6xl font-headline font-bold">Your Portfolio is Empty</h1>
          <p className="mt-4 text-xl text-muted-foreground">Add sections in the admin panel to build your page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-24 px-4 md:px-6">
      {sections.map((section, index) => (
        <div key={section.id} style={{ animationDelay: `${index * 150}ms` }} className="fade-in">
          <SectionComponent section={section} />
        </div>
      ))}
    </div>
  );
}