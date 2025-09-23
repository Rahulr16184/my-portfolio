
import { Experience } from "@/lib/types";

interface ExperienceSectionProps {
    data: Experience[];
}

export default function ExperienceSection({ data }: ExperienceSectionProps) {
    return (
        <section id="experience">
            <h2 className="text-3xl font-bold font-headline mb-12 text-center">Work Experience</h2>
            <div className="relative border-l-2 border-primary/20 pl-8 space-y-12">
                {data.map((exp) => (
                    <div key={exp.id} className="relative">
                        <div className="absolute -left-[38px] h-6 w-6 rounded-full bg-accent ring-8 ring-background top-1"></div>
                        <p className="text-sm text-muted-foreground mb-1">{exp.duration}</p>
                        <h3 className="text-2xl font-bold">{exp.role}</h3>
                        <p className="font-semibold text-xl text-primary/80">{exp.company}</p>
                        <p className="mt-3 text-muted-foreground leading-relaxed">{exp.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
