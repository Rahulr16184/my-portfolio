"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Code, Key } from 'lucide-react';
import { cn } from '@/lib/utils';
import { adminCredentials } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSecretCodeSubmit = () => {
    if (secretCode === adminCredentials.secretCode) {
      setIsDialogOpen(false);
      router.push('/admin/login');
    } else {
      toast({
        variant: 'destructive',
        title: 'Incorrect Code',
        description: 'The secret code you entered is incorrect.',
      });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-header-background/80 backdrop-blur-sm border-b" : "bg-header-background"
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
            <Code className="h-6 w-6 text-primary" />
            <span className="font-headline">PortfolioForge</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsDialogOpen(true)} className="text-primary hover:text-primary/80 hover:bg-white/10 dark:hover:bg-black/10">
              <Key className="h-5 w-5" />
              <span className="sr-only">Admin Login</span>
            </Button>
          </nav>
        </div>
      </header>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enter Secret Code</DialogTitle>
            <DialogDescription>
              Enter the secret code to access the admin area.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="secret-code" className="text-right">
                Code
              </Label>
              <Input
                id="secret-code"
                type="password"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                className="col-span-3"
                onKeyDown={(e) => e.key === 'Enter' && handleSecretCodeSubmit()}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSecretCodeSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
