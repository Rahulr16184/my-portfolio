
import { Contact } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Linkedin, Github, Twitter, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactSectionProps {
    data: Contact;
}

const socialIcons = {
    linkedin: Linkedin,
    github: Github,
    twitter: Twitter,
}

export default function ContactSection({ data }: ContactSectionProps) {
    return (
        <section id="contact" className="text-center py-16 fade-in-up section-padding" style={{ animationDelay: '0.7s' }}>
            <h2 className="text-3xl font-bold font-headline mb-4 animated-section-title">Get In Touch</h2>
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
                    const Icon = socialIcons[social.platform];
                    if (!Icon || !social.url) return null;
                    return (
                        <a 
                            key={social.id} 
                            href={social.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="icon-glow"
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <Icon className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors duration-300" />
                            <span className="sr-only">{social.platform}</span>
                        </a>
                    )
                })}
            </div>
        </section>
    );
}
