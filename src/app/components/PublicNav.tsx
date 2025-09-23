
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Home, User, Laptop, Briefcase, GraduationCap, Mail, Info } from 'lucide-react';

const navItems = [
  { href: '#home', label: 'Home', icon: Home },
  { href: '#about', label: 'About', icon: Info },
  { href: '#skills', label: 'Skills', icon: Laptop },
  { href: '#projects', label: 'Projects', icon: Briefcase },
  { href: '#experience', label: 'Experience', icon: Briefcase },
  { href: '#education', label: 'Education', icon: GraduationCap },
  { href: '#contact', label: 'Contact', icon: Mail },
];

export default function PublicNav() {
  const pathname = usePathname();

  // In a single-page portfolio, we can use a hash to track active state, but it requires more complex logic.
  // For now, we'll just style the links for hover/focus states.
  // A more advanced implementation could use IntersectionObserver to highlight the active link.

  return (
    <ScrollArea className="w-full whitespace-nowrap">
        <nav className="flex w-max space-x-4 px-4">
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        "text-muted-foreground hover:bg-muted"
                        // Add active link styling logic here if needed
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
