
import { Contact } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import ConfirmationDialog from "../components/ConfirmationDialog";

interface ContactSectionProps {
    data: Contact;
}

export default function ContactSection({ data }: ContactSectionProps) {
    const handleLinkOpen = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    }
    
    return (
        <section id="contact" className="text-center py-16 fade-in-up section-padding" style={{ animationDelay: '0.7s' }}>
            <h2 className="text-3xl font-headline font-headline mb-4 animated-section-title">Get In Touch</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">Have a question, a proposal, or just want to say hello? I'd love to hear from you.</p>

            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-8">
                <a href={`mailto:${data.email}`} className="flex items-center gap-2 text-lg text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="h-5 w-5" />
                    <span>{data.email}</span>
                </a>
                {data.phone && (
                     <a href={`tel:${data.phone}`} className="flex items-center gap-2 text-lg text-muted-foreground hover:text-primary transition-colors">
                        <Phone className="h-5 w-5" />
                        <span>{data.phone}</span>
                    </a>
                )}
            </div>

            <Button asChild size="lg">
                <a href={`mailto:${data.email}`}>Contact Me</a>
            </Button>

            <div className="flex justify-center gap-6 mt-12">
                {data.socials?.map((social, index) => {
                    if (!social.url) return null;
                    return (
                        <ConfirmationDialog
                            key={social.id}
                            title={`Redirect to ${social.platform}?`}
                            description={`You are about to be redirected to an external site: ${social.url}`}
                            onConfirm={() => handleLinkOpen(social.url)}
                        >
                             <Button 
                                variant="ghost" 
                                size="icon" 
                                className="icon-glow h-auto w-auto p-0 bg-transparent hover:bg-transparent"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                <Image
                                  src={`/icons/${social.platform}.svg`}
                                  alt={`${social.platform} icon`}
                                  width={32}
                                  height={32}
                                  className="text-muted-foreground hover:text-primary transition-colors duration-300 dark:invert"
                                />
                                <span className="sr-only">{social.platform}</span>
                            </Button>
                        </ConfirmationDialog>
                    )
                })}
            </div>
        </section>
    );
}
