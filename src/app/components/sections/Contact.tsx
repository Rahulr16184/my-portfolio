import React from "react";
import { contact } from "@/lib/data";
import Section from "./Section";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

const socialIcons = {
  linkedin: <Linkedin />,
  github: <Github />,
  twitter: <Twitter />,
};

const Contact = () => {
  return (
    <Section
      id="contact"
      className="text-center bg-secondary/50 dark:bg-card"
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="font-headline text-4xl md:text-5xl font-bold">Get In Touch</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
        <Button asChild size="lg" className="mt-8">
          <a href={`mailto:${contact.email}`}>
            <Mail className="mr-2" /> Say Hello
          </a>
        </Button>
        <div className="flex justify-center gap-6 mt-12">
          {Object.entries(socialIcons).map(([key, icon]) => (
            <Link
              key={key}
              href={contact[key as keyof typeof contact] as string}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {React.cloneElement(icon, { className: "w-6 h-6" })}
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Contact;
