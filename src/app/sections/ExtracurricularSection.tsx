
import { Extracurricular } from "@/lib/types";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ExtracurricularSectionProps {
    data: Extracurricular[];
}

export default function ExtracurricularSection({ data }: ExtracurricularSectionProps) {
    if (!data || data.length === 0) return null;

    return (
        <section id="extracurricular" className="fade-in-up section-padding" style={{ animationDelay: '0.7s' }}>
            <h2 className="text-3xl font-headline font-headline mb-12 text-center animated-section-title">Extra-Curricular Activities</h2>
            <div className="relative max-w-4xl mx-auto border-l-2 border-primary/20 pl-8 space-y-12">
                {data.map((activity) => (
                    <div key={activity.id} className="relative">
                        <div className="absolute -left-[41px] h-6 w-6 rounded-full bg-accent ring-8 ring-background top-1"></div>
                        <h3 className="text-2xl font-bold">{activity.title}</h3>
                        <p className="font-semibold text-xl text-primary/80">{activity.role}</p>
                        <p className="mt-3 text-muted-foreground leading-relaxed">{activity.desc}</p>
                        
                        {activity.imageUrls && activity.imageUrls.length > 0 && (
                            <div className="mt-4">
                                <ScrollArea className="w-full whitespace-nowrap rounded-md">
                                    <div className="flex w-max space-x-4 pb-4">
                                        {activity.imageUrls.map((url, index) => (
                                            <a href={url} target="_blank" rel="noopener noreferrer" key={index}>
                                                <Image
                                                    src={url}
                                                    alt={`Activity image ${index + 1}`}
                                                    width={200}
                                                    height={150}
                                                    className="h-32 w-auto object-contain rounded-md border p-1"
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
