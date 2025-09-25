
"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Home, User, Laptop, Briefcase, GraduationCap, Mail, Info, Award, ToyBrick, HeartHandshake, Languages } from 'lucide-react';

const navItems = [
  { id: 'home', href: '#home', label: 'Home', icon: Home },
  { id: 'about', href: '#about', label: 'About', icon: Info },
  { id: 'skills', href: '#skills', label: 'Tech Skills', icon: Laptop },
  { id: 'soft-skills', href: '#soft-skills', label: 'Soft Skills', icon: HeartHandshake },
  { id: 'languages', href: '#languages', label: 'Languages', icon: Languages },
  { id: 'projects', href: '#projects', label: 'Projects', icon: Briefcase },
  { id: 'experience', href: '#experience', label: 'Experience', icon: Briefcase },
  { id: 'certifications', href: '#certifications', label: 'Certs', icon: Award },
  { id: 'education', href: '#education', label: 'Education', icon: GraduationCap },
  { id: 'extracurricular', href: '#extracurricular', label: 'Activities', icon: ToyBrick },
  { id: 'contact', href: '#contact', label: 'Contact', icon: Mail },
];

export default function PublicNav() {
  const [activeSection, setActiveSection] = useState('home');
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    // Manually set active section on click for instant feedback
    setActiveSection(targetId);
  };

  const handleScrollSpy = useCallback(() => {
    const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean);
    const scrollPosition = window.scrollY;
    
    // Header height offset
    const offset = 150;

    let currentSection = '';

    for (const section of sections) {
        if (section) {
            if (section.offsetTop - offset <= scrollPosition) {
                currentSection = section.id;
            }
        }
    }
    
    // If scrolled to the bottom of the page, set the last nav item as active
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 20) {
        currentSection = navItems[navItems.length - 1].id;
    } else if (scrollPosition < (document.getElementById(navItems[0].id)?.offsetTop || 0) - offset) {
      // If scroll position is above the first section, set home as active
        currentSection = 'home';
    }
    
    setActiveSection(currentSection || 'home');
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollSpy);
    // Initial check
    handleScrollSpy();
    return () => {
      window.removeEventListener('scroll', handleScrollSpy);
    };
  }, [handleScrollSpy]);

  useEffect(() => {
    const activeIndex = navItems.findIndex(item => item.id === activeSection);
    if (activeIndex !== -1 && navLinksRef.current[activeIndex]) {
        navLinksRef.current[activeIndex]?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }
  }, [activeSection]);


  return (
    <ScrollArea className="w-full whitespace-nowrap">
        <nav className="flex w-full justify-between items-center">
            {navItems.map((item, index) => (
                <Link
                    key={item.href}
                    ref={el => navLinksRef.current[index] = el}
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        activeSection === item.id
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    )}
                >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                </Link>
            ))}
        </nav>
        <ScrollBar orientation="horizontal" className="mt-2" />
    </ScrollArea>
  );
}
