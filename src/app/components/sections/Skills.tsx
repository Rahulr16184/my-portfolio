import { skills } from "@/lib/data";
import Section from "./Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Server, Wrench } from "lucide-react";
import React from "react";

const categoryIcons = {
  frontend: <Code />,
  backend: <Server />,
  databases: <Database />,
  tools: <Wrench />,
};

const categoryTitles = {
    frontend: "Frontend",
    backend: "Backend",
    databases: "Databases",
    tools: "Tools & Platforms",
}

const Skills = () => {
  return (
    <Section id="skills" title="Technical Skills" className="bg-secondary/50 dark:bg-card">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {(Object.keys(skills) as Array<keyof typeof skills>).map((category) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                {React.cloneElement(categoryIcons[category], { className: "w-6 h-6 text-primary"})}
                <span className="font-headline">{categoryTitles[category]}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills[category].map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-sm py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Skills;
