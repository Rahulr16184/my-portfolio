
import { Language } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

interface LanguagesSectionProps {
    data: Language[];
}

const proficiencyMap = {
    'Conversational': 1,
    'Professional': 2,
    'Fluent/Native': 3
}

export default function LanguagesSection({ data }: LanguagesSectionProps) {
    if (!data || data.length === 0) return null;

    return (
        <section id="languages" className="fade-in-up section-padding" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-3xl font-headline font-headline mb-12 text-center animated-section-title">Languages</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {data.map((lang) => (
                    <Card key={lang.id} className="bg-card/80 backdrop-blur-sm text-center">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xl font-bold">{lang.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <p className="text-sm text-muted-foreground">{lang.proficiency}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
