
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Info, Laptop, Briefcase, GraduationCap, Mail, Palette, Award, ToyBrick, HeartHandshake, Languages } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const menuItems = [
  { href: '/admin/profile', label: 'Profile', icon: User },
  { href: '/admin/about', label: 'About Me', icon: Info },
  { href: '/admin/skills', label: 'Tech Skills', icon: Laptop },
  { href: '/admin/softskills', label: 'Soft Skills', icon: HeartHandshake },
  { href: '/admin/languages', label: 'Languages', icon: Languages },
  { href: '/admin/projects', label: 'Projects', icon: Briefcase },
  { href: '/admin/experience', label: 'Experience', icon: Briefcase },
  { href: '/admin/certifications', label: 'Certifications', icon: Award },
  { href: '/admin/education', label: 'Education', icon: GraduationCap },
  { href: '/admin/extracurricular', label: 'Activities', icon: ToyBrick },
  { href: '/admin/contact', label: 'Contact', icon: Mail },
  { href: '/admin/appearance', label: 'Appearance', icon: Palette },
];

const AdminNav = () => {
    const pathname = usePathname();
    return (
        <ScrollArea className="w-full whitespace-nowrap">
            <nav className="flex w-full justify-between items-center">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                            pathname.startsWith(item.href)
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
};

export default AdminNav;
