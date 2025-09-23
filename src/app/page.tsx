
"use client";

import React from 'react';
import { portfolioData as initialData } from "@/lib/portfolio-data";
import { PortfolioData } from "@/lib/types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { usePreview } from '@/hooks/use-preview';
import { usePortfolioStore } from '@/hooks/use-portfolio-store';

interface PublicPortfolioPageProps {
  data?: PortfolioData;
}

export default function PublicPortfolioPage({ data: dataProp }: PublicPortfolioPageProps) {
  const { isPreview } = usePreview();
  const { portfolio: previewData } = usePortfolioStore();

  const [data, setData] = React.useState(dataProp || initialData);

  React.useEffect(() => {
    if (isPreview) {
      // In a real app, you might fetch this from a different source
      // or receive it through a more robust state management solution.
      // For now, we rely on the hook which uses localStorage.
      const storedData = localStorage.getItem('portfolio-store');
      if (storedData) {
        setData(JSON.parse(storedData).portfolio);
      } else {
        setData(previewData);
      }
    } else {
      setData(dataProp || initialData);
    }
  }, [isPreview, dataProp, previewData]);
  
    React.useEffect(() => {
    const handleStorageChange = () => {
      if (isPreview) {
        const storedData = localStorage.getItem('portfolio-store');
        if (storedData) {
          setData(JSON.parse(storedData).portfolio);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isPreview]);


  return (
    <div className="container mx-auto py-24 px-4 md:px-6">
      <div className="space-y-16">
        {/* Profile/Hero Section */}
        <section id="home" className="text-center flex flex-col items-center pt-12">
            {data.profile.profilePhoto && (
                <Image 
                    src={data.profile.profilePhoto} 
                    alt={data.profile.name}
                    width={150}
                    height={150}
                    className="rounded-full mb-4"
                />
            )}
          <h1 className="text-5xl font-bold font-headline">{data.profile.name}</h1>
          <p className="mt-2 text-xl text-muted-foreground">{data.profile.role}</p>
          <p className="mt-4 max-w-2xl mx-auto text-lg">{data.profile.tagline}</p>
          {data.profile.resumeUrl && (
            <Button asChild className="mt-6">
              <a href={data.profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                Download Resume
              </a>
            </Button>
          )}
        </section>

        {/* About Section */}
        <section id="about">
          <h2 className="text-3xl font-bold font-headline mb-6 text-center">About Me</h2>
          <p className="whitespace-pre-line text-lg text-center max-w-3xl mx-auto">{data.about.bio}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {data.about.highlights.map((highlight, index) => (
              <Badge key={index} variant="secondary" className="text-sm px-3 py-1">{highlight}</Badge>
            ))}
          </div>
        </section>
        
        {/* Skills Section */}
        <section id="skills">
            <h2 className="text-3xl font-bold font-headline mb-8 text-center">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {Object.entries(data.skills).map(([category, skills]) => (
                  skills.length > 0 && (
                    <div key={category} className="bg-card p-6 rounded-lg shadow-sm">
                        <h3 className="text-xl font-bold mb-4 capitalize">{category}</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <Badge key={index}>{skill}</Badge>
                            ))}
                        </div>
                    </div>
                  )
                ))}
            </div>
        </section>

        {/* Projects Section */}
        <section id="projects">
            <h2 className="text-3xl font-bold font-headline mb-8 text-center">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.projects.map((project) => (
                    <div key={project.id} className="bg-card rounded-lg shadow-sm overflow-hidden">
                        <Image src={project.imageUrl} alt={project.title} width={600} height={400} className="w-full h-48 object-cover"/>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                            <p className="text-muted-foreground mb-4">{project.desc}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tech.map((tech, i) => <Badge key={i} variant="secondary">{tech}</Badge>)}
                            </div>
                            <div className="flex items-center gap-4">
                                {project.github && (
                                    <Button variant="outline" asChild>
                                        <a href={project.github} target="_blank" rel="noopener noreferrer"><Github className="mr-2"/> GitHub</a>
                                    </Button>
                                )}
                                {project.demo && (
                                    <Button asChild>
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-2"/> Live Demo</a>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
        
        {/* Experience Section */}
        <section id="experience">
            <h2 className="text-3xl font-bold font-headline mb-8 text-center">Work Experience</h2>
            <div className="relative border-l-2 border-primary/20 pl-6 space-y-10">
                 {data.experience.map((exp) => (
                    <div key={exp.id} className="relative">
                        <div className="absolute -left-7 h-4 w-4 rounded-full bg-accent top-1"></div>
                        <p className="text-sm text-muted-foreground">{exp.duration}</p>
                        <h3 className="text-xl font-bold">{exp.role}</h3>
                        <p className="font-semibold text-lg">{exp.company}</p>
                        <p className="mt-2 text-muted-foreground">{exp.desc}</p>
                    </div>
                ))}
            </div>
        </section>

         {/* Education Section */}
        <section id="education">
            <h2 className="text-3xl font-bold font-headline mb-8 text-center">Education</h2>
            <div className="relative border-l-2 border-primary/20 pl-6 space-y-10">
                 {data.education.map((edu) => (
                    <div key={edu.id} className="relative">
                        <div className="absolute -left-7 h-4 w-4 rounded-full bg-accent top-1"></div>
                        <p className="text-sm text-muted-foreground">{edu.duration}</p>
                        <h3 className="text-xl font-bold">{edu.degree}</h3>
                        <p className="font-semibold text-lg">{edu.institution}</p>
                        <p className="mt-2 text-muted-foreground">{edu.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="text-center">
             <h2 className="text-3xl font-bold font-headline mb-4">Get In Touch</h2>
             <p className="text-lg text-muted-foreground mb-6">Have a question or want to work together? Feel free to reach out!</p>
             <Button asChild size="lg">
                <a href={`mailto:${data.contact.email}`}>Contact Me</a>
             </Button>
        </section>

      </div>
    </div>
  );
}
