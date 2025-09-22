import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, Send } from "lucide-react";
import { profile } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

const Hero = () => {
  const profileImage = PlaceHolderImages.find(p => p.id === 'profile-photo');

  return (
    <section className="relative w-full h-screen flex items-center justify-center text-center bg-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background"></div>
      <div className="relative z-10 flex flex-col items-center px-4">
        {profileImage && (
          <Image
            src={profileImage.imageUrl}
            alt="Profile Photo"
            width={128}
            height={128}
            className="rounded-full border-4 border-background shadow-lg mb-6"
            priority
            data-ai-hint={profileImage.imageHint}
          />
        )}
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight">
          {profile.name}
        </h1>
        <p className="mt-3 text-xl md:text-2xl text-muted-foreground font-medium">
          {profile.role}
        </p>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground/80">
          {profile.tagline}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
              <Download className="mr-2" />
              Download Resume
            </a>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="#contact">
              <Send className="mr-2" />
              Contact Me
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
