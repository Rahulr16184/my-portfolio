
import { Certification } from "@/lib/types";
import { Award } from 'lucide-react';
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CertificationsSectionProps {
    data: Certification[];
}

export default function CertificationsSection({ data }: CertificationsSectionProps) {
    if (!data || data.length === 0) return null;

    return (
        <section id="certifications" className="fade-in-up section-padding" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-3xl font-headline font-headline mb-12 text-center animated-section-title">Certifications</h2>
            <div className="max-w-4xl mx-auto space-y-12">
                {data.map((cert) => (
                    <div key={cert.id} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
                        <div className="md:col-span-2 flex items-start gap-4">
                            <div className="p-2 bg-accent/20 text-accent rounded-full mt-1">
                               <Award className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{cert.name}</h3>
                                <p className="font-semibold text-muted-foreground">{cert.authority}</p>
                                <p className="text-sm text-muted-foreground/80">{cert.date}</p>
                            </div>
                        </div>
                        {cert.imageUrls && cert.imageUrls.length > 0 && (
                            <div className="md:col-span-1">
                                <ScrollArea className="w-full whitespace-nowrap rounded-md">
                                    <div className="flex w-max space-x-4 pb-4">
                                        {cert.imageUrls.map((url, index) => (
                                            <a href={url} target="_blank" rel="noopener noreferrer" key={index}>
                                                <Image
                                                    src={url}
                                                    alt={`Certification image ${index + 1}`}
                                                    width={150}
                                                    height={100}
                                                    className="h-24 w-auto object-contain rounded-md border p-1"
                                                />
                                            </a>
                                        ))}
                                    </div>
                                    <ScrollBar orientation="horizontal" />
                                </ScrollArea>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
