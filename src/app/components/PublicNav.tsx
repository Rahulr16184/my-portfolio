
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Home, User, Laptop, Briefcase, GraduationCap, Mail, Info, Award, ToyBrick, HeartHandshake } from 'lucide-react';

const navItems = [
  { href: '#home', label: 'Home', icon: Home },
  { href: '#about', label: 'About', icon: Info },
  { href: '#skills', label: 'Tech Skills', icon: Laptop },
  { href: '#soft-skills', label: 'Soft Skills', icon: HeartHandshake },
  { href: '#projects', label: 'Projects', icon: Briefcase },
  { href: '#experience', label: 'Experience', icon: Briefcase },
  { href: '#certifications', label: 'Certs', icon: Award },
  { href: '#education', label: 'Education', icon: GraduationCap },
  { href: '#extracurricular', label: 'Activities', icon: ToyBrick },
  { href: '#contact', label: 'Contact', icon: Mail },
];

export default function PublicNav() {
  const pathname = usePathname();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ScrollArea className="w-full whitespace-nowrap">
        <nav className="flex w-full justify-between items-center">
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.href)}
                    className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        "text-muted-foreground hover:bg-muted"
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
