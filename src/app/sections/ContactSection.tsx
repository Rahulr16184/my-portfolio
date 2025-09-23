
import { Contact } from "@/lib/types";
import { Button } from "@/components/ui/button";

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
        </section>
    );
}
