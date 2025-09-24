
import { Certification } from "@/lib/types";
import { Award } from 'lucide-react';

interface CertificationsSectionProps {
    data: Certification[];
}

export default function CertificationsSection({ data }: CertificationsSectionProps) {
    if (!data || data.length === 0) return null;

    return (
        <section id="certifications" className="fade-in-up section-padding" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-3xl font-headline font-headline mb-12 text-center animated-section-title">Certifications</h2>
            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.map((cert) => (
                    <div key={cert.id} className="flex items-start gap-4">
                        <div className="p-2 bg-accent/20 text-accent rounded-full mt-1">
                           <Award className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">{cert.name}</h3>
                            <p className="font-semibold text-muted-foreground">{cert.authority}</p>
                            <p className="text-sm text-muted-foreground/80">{cert.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
