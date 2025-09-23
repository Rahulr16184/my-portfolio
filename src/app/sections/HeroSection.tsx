
import { Profile } from "@/lib/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
    data: Profile;
}

export default function HeroSection({ data }: HeroSectionProps) {
    return (
        <section id="home" className="text-center flex flex-col items-center">
            {data.profilePhoto && (
                <div className="fade-in-up">
                    <Image
                        src={data.profilePhoto}
                        alt={data.name}
                        width={150}
                        height={150}
                        className="rounded-full mb-4 shadow-lg"
                        priority
                    />
                </div>
            )}
            <h1 className="text-5xl md:text-6xl font-bold font-headline mt-4 fade-in-up" style={{ animationDelay: '0.2s' }}>{data.name}</h1>
            <p className="mt-2 text-xl md:text-2xl text-muted-foreground fade-in-up" style={{ animationDelay: '0.3s' }}>{data.role}</p>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl fade-in-up" style={{ animationDelay: '0.4s' }}>{data.tagline}</p>
            {data.resumes && data.resumes.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4 mt-8 fade-in-up" style={{ animationDelay: '0.5s' }}>
                    {data.resumes.map((resume) => (
                        <Button asChild size="lg" key={resume.id}>
                            <a href={resume.url} target="_blank" rel="noopener noreferrer">
                                {resume.name}
                            </a>
                        </Button>
                    ))}
                </div>
            )}
        </section>
    );
}
