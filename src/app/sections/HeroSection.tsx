
import { Profile } from "@/lib/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ConfirmationDialog from "../components/ConfirmationDialog";

interface HeroSectionProps {
    data: Profile;
}

export default function HeroSection({ data }: HeroSectionProps) {

    const handleResumeOpen = (url: string) => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    }

    return (
        <section id="home" className="text-center flex flex-col items-center section-padding">
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
                        <ConfirmationDialog
                            key={resume.id}
                            title="Open Resume?"
                            description={`You are about to open a new tab to view the resume file. Continue?`}
                            onConfirm={() => handleResumeOpen(resume.url)}
                        >
                             <Button size="lg" disabled={!resume.url}>
                                {resume.name}
                            </Button>
                        </ConfirmationDialog>
                    ))}
                </div>
            )}
        </section>
    );
}
