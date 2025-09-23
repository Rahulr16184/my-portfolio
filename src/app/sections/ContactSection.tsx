
import { Contact } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Linkedin, Github, Twitter } from "lucide-react";

interface ContactSectionProps {
    data: Contact;
}

export default function ContactSection({ data }: ContactSectionProps) {
    return (
        <section id="contact" className="text-center py-16 fade-in-up" style={{ animationDelay: '0.7s' }}>
            <h2 className="text-3xl font-bold font-headline mb-4">Get In Touch</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">Have a question, a proposal, or just want to say hello? I'd love to hear from you.</p>
            <Button asChild size="lg">
                <a href={`mailto:${data.email}`}>Contact Me</a>
            </Button>
            <div className="flex justify-center gap-4 mt-8">
                {data.linkedin && (
                    <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors" />
                    </a>
                )}
                {data.github && (
                    <a href={data.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors" />
                    </a>
                )}
                {data.twitter && (
                    <a href={data.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors" />
                    </a>
                )}
            </div>
        </section>
    );
}
