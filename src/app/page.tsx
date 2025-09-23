
"use client";

import React from 'react';
import { usePreview } from '@/hooks/use-preview';
import { usePortfolioStore } from '@/hooks/use-portfolio-store';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import ExperienceSection from './sections/ExperienceSection';
import EducationSection from './sections/EducationSection';
import ContactSection from './sections/ContactSection';
import { Skeleton } from '@/components/ui/skeleton';

export default function PublicPortfolioPage() {
  const { isPreview } = usePreview();
  const { portfolio: storedPortfolio, isLoading } = usePortfolioStore();

  const data = isPreview ? storedPortfolio : usePortfolioStore.getState().portfolio;

  if (isLoading && !isPreview) {
    return (
       <div className="container mx-auto py-24 px-4 md:px-6">
         <div className="space-y-24">
            <div className="text-center flex flex-col items-center space-y-4">
                <Skeleton className="h-32 w-32 rounded-full" />
                <Skeleton className="h-12 w-96 max-w-full" />
                <Skeleton className="h-8 w-72 max-w-full" />
                <Skeleton className="h-6 w-full max-w-2xl" />
                <Skeleton className="h-12 w-40" />
            </div>
             <div className="space-y-8">
                 <Skeleton className="h-10 w-64 mx-auto" />
                 <Skeleton className="h-24 w-full max-w-3xl mx-auto" />
                 <div className="flex flex-wrap justify-center gap-4">
                     <Skeleton className="h-10 w-32" />
                     <Skeleton className="h-10 w-40" />
                     <Skeleton className="h-10 w-36" />
                 </div>
             </div>
         </div>
       </div>
    );
  }

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
