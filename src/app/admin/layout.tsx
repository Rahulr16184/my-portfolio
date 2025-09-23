
"use client"

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  User,
  Info,
  Laptop,
  Briefcase,
  GraduationCap,
  Mail,
  Home,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/profile', label: 'Profile', icon: User },
  { href: '/admin/about', label: 'About Me', icon: Info },
  { href: '/admin/skills', label: 'Skills', icon: Laptop },
  { href: '/admin/projects', label: 'Projects', icon: Briefcase },
  { href: '/admin/experience', label: 'Experience', icon: Briefcase },
  { href: '/admin/education', label: 'Education', icon: GraduationCap },
  { href: '/admin/contact', label: 'Contact', icon: Mail },
];

const AdminNav = () => {
    const pathname = usePathname();
    return (
        <div className="relative border-b">
            <ScrollArea className="max-w-full whitespace-nowrap">
                <nav className="flex items-center gap-4 p-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                pathname === item.href
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-muted"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
};


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="pt-16">
        <AdminNav />
        <div className="p-4 md:p-6 lg:p-8 h-full">
            {children}
        </div>
    </div>
  );
}
