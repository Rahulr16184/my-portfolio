
import { Education } from "@/lib/types";

interface EducationSectionProps {
    data: Education[];
}

export default function EducationSection({ data }: EducationSectionProps) {
    return (
        <section id="education" className="fade-in-up" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-3xl font-bold font-headline mb-12 text-center">Education</h2>
            <div className="relative border-l-2 border-primary/20 pl-8 space-y-12">
                {data.map((edu) => (
                    <div key={edu.id} className="relative">
                        <div className="absolute -left-[41px] h-6 w-6 rounded-full bg-accent ring-8 ring-background top-1"></div>
                        <p className="text-sm text-muted-foreground mb-1">{edu.duration}</p>
                        <h3 className="text-2xl font-bold">{edu.degree}</h3>
                        <p className="font-semibold text-xl text-primary/80">{edu.institution}</p>
                        <p className="mt-3 text-muted-foreground leading-relaxed">{edu.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
