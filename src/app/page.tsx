import { portfolioData } from "@/lib/portfolio-data";
import { PortfolioData } from "@/lib/types";

interface PublicPortfolioPageProps {
  data?: PortfolioData;
}

export default function PublicPortfolioPage({ data: dataProp }: PublicPortfolioPageProps) {
  const data = dataProp || portfolioData;

  return (
    <div className="container mx-auto py-24 px-4 md:px-6">
      <div className="space-y-12">
        {/* Profile/Hero Section */}
        <section className="text-center">
          <h1 className="text-5xl font-bold font-headline">{data.profile.name}</h1>
          <p className="mt-2 text-xl text-muted-foreground">{data.profile.role}</p>
          <p className="mt-4 max-w-2xl mx-auto">{data.profile.tagline}</p>
        </section>

        {/* About Section */}
        <section>
          <h2 className="text-3xl font-bold font-headline mb-4">About Me</h2>
          <p className="whitespace-pre-line">{data.about.bio}</p>
          <ul className="mt-4 list-disc list-inside space-y-1">
            {data.about.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </section>

        {/* You can continue to add more sections here based on the new data structure */}
      </div>
       <pre className="mt-12 p-4 bg-muted rounded-md overflow-x-auto text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
    </div>
  );
}
