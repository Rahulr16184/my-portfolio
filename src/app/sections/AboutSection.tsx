
import { About } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface AboutSectionProps {
    data: About;
}

export default function AboutSection({ data }: AboutSectionProps) {
    return (
        <section id="about" className="fade-in-up section-padding" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-3xl font-bold font-headline mb-8 text-center">About Me</h2>
            <p className="whitespace-pre-line text-lg text-center max-w-3xl mx-auto leading-relaxed">{data.bio}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
                {data.highlights.map((highlight, index) => (
                    <Badge key={index} variant="secondary" className="text-sm px-4 py-2 rounded-full">{highlight}</Badge>
                ))}
            </div>
        </section>
    );
}
