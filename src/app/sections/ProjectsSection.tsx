
import { Project } from "@/lib/types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectsSectionProps {
    data: Project[];
}

export default function ProjectsSection({ data }: ProjectsSectionProps) {
    return (
        <section id="projects" className="fade-in-up section-padding" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-3xl font-bold font-headline mb-12 text-center animated-section-title">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.map((project) => (
                    <Card key={project.id} className="bg-card/80 backdrop-blur-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                        <Image src={project.imageUrl} alt={project.title} width={600} height={400} className="w-full h-56 object-cover" />
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground mb-4">{project.desc}</p>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech, i) => <Badge key={i} variant="secondary">{tech}</Badge>)}
                            </div>
                        </CardContent>
                        <CardFooter className="flex items-center gap-4">
                            {project.github && (
                                <Button variant="outline" asChild>
                                    <a href={project.github} target="_blank" rel="noopener noreferrer"><Github className="mr-2" /> GitHub</a>
                                </Button>
                            )}
                            {project.demo && (
                                <Button asChild>
                                    <a href={project.demo} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-2" /> Live Demo</a>
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
}
