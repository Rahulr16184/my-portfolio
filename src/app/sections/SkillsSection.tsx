
import { Skills } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SkillsSectionProps {
    data: Skills;
}

export default function SkillsSection({ data }: SkillsSectionProps) {
    return (
        <section id="skills" className="fade-in-up section-padding" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-3xl font-bold font-headline mb-12 text-center">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {Object.entries(data).map(([category, skills], categoryIndex) => (
                    skills.length > 0 && (
                        <Card key={category} className="bg-card/80 backdrop-blur-sm fade-in-up" style={{ animationDelay: `${0.4 + categoryIndex * 0.1}s` }}>
                            <CardHeader>
                                <CardTitle className="text-xl font-bold capitalize text-center">{category}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {skills.map((skill, index) => (
                                        <Badge key={index} variant="default" className="px-3 py-1 text-base">{skill}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )
                ))}
            </div>
        </section>
    );
}
