
"use client"

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar';
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
import { Button } from '@/components/ui/button';

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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          {/* Optional: Add a header or logo here */}
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                 <Link href={item.href} passHref legacyBehavior>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={{
                        children: item.label,
                      }}
                    >
                      <a>
                        <item.icon />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="p-4 md:p-6 lg:p-8 h-full">
            {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
