
"use client";

import React from 'react';
import { portfolioData as initialData } from "@/lib/portfolio-data";
import { usePreview } from '@/hooks/use-preview';
import { usePortfolioStore } from '@/hooks/use-portfolio-store';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import ExperienceSection from './sections/ExperienceSection';
import EducationSection from './sections/EducationSection';
import ContactSection from './sections/ContactSection';


export default function PublicPortfolioPage() {
  const { isPreview } = usePreview();
  const storedPortfolio = usePortfolioStore(state => state.portfolio);
  
  const [data, setData] = React.useState(initialData);

  React.useEffect(() => {
    if (isPreview) {
      setData(storedPortfolio);
    } else {
      // In a real-world app, you might fetch initial data here
      // For now, we just reset to the initial static data.
      setData(initialData);
    }
  }, [isPreview, storedPortfolio]);
  
  React.useEffect(() => {
    const unsubscribe = usePortfolioStore.subscribe(
      (state) => {
        if (isPreview) {
          setData(state.portfolio);
        }
      }
    );
    return () => unsubscribe();
  }, [isPreview]);


  return (
    <div className="container mx-auto py-24 px-4 md:px-6">
      <div className="space-y-24">
        <HeroSection data={data.profile} />
        <AboutSection data={data.about} />
        <SkillsSection data={data.skills} />
        <ProjectsSection data={data.projects} />
        <ExperienceSection data={data.experience} />
        <EducationSection data={data.education} />
        <ContactSection data={data.contact} />
      </div>
    </div>
  );
}
