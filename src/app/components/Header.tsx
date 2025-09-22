"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Code } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-sm border-b" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Code className="h-6 w-6 text-primary" />
          <span className="font-headline">PortfolioForge</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="text-foreground/80 hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ))}
          <Button asChild variant="outline" size="sm">
            <Link href="/admin">Admin</Link>
          </Button>
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                  <Code className="h-6 w-6 text-primary" />
                  <span className="font-headline">PortfolioForge</span>
                </Link>
                {navItems.map((item) => (
                  <Link key={item.label} href={item.href} className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                ))}
                <Button asChild variant="outline" className="mt-4">
                  <Link href="/admin">Admin</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
