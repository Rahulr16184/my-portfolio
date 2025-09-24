
import { SoftSkill } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface SoftSkillsSectionProps {
    data: SoftSkill[];
}

export default function SoftSkillsSection({ data }: SoftSkillsSectionProps) {
    if (!data || data.length === 0) return null;

    return (
        <section id="soft-skills" className="fade-in-up section-padding" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-3xl font-headline font-headline mb-8 text-center animated-section-title">Soft Skills</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
                {data.map((item) => (
                    <Badge key={item.id} variant="default" className="text-base px-4 py-2 rounded-full">{item.skill}</Badge>
                ))}
            </div>
        </section>
    );
}
