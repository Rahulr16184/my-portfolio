
import { Project } from "@/lib/types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ConfirmationDialog from "../components/ConfirmationDialog";

interface ProjectsSectionProps {
    data: Project[];
}

export default function ProjectsSection({ data }: ProjectsSectionProps) {
    const handleLinkOpen = (url: string) => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    }

    return (
        <section id="projects" className="fade-in-up section-padding" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-3xl font-headline font-headline mb-12 text-center animated-section-title">Projects</h2>
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
                                <ConfirmationDialog
                                    title="Open GitHub?"
                                    description="You are about to be redirected to an external GitHub repository."
                                    onConfirm={() => handleLinkOpen(project.github!)}
                                >
                                    <Button variant="outline"><Github className="mr-2" /> GitHub</Button>
                                </ConfirmationDialog>
                            )}
                            {project.demo && (
                                <ConfirmationDialog
                                    title="Open Live Demo?"
                                    description="You are about to be redirected to an external site for the live demo."
                                    onConfirm={() => handleLinkOpen(project.demo!)}
                                >
                                    <Button><ExternalLink className="mr-2" /> Live Demo</Button>
                                </ConfirmationDialog>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
}
