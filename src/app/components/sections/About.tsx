import { about, profile } from "@/lib/data";
import Section from "./Section";
import { CheckCircle2 } from "lucide-react";

const About = () => {
  return (
    <Section id="about" title="About Me">
      <div className="grid md:grid-cols-5 gap-8 md:gap-12">
        <div className="md:col-span-3">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {about.bio}
          </p>
        </div>
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-2xl font-bold font-headline">Highlights</h3>
          <ul className="space-y-3">
            {about.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-muted-foreground">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};

export default About;
