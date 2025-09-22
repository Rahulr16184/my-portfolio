"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Key, LogOut, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { adminCredentials } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { ThemeSwitcher } from '@/app/components/ThemeSwitcher';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLogoutAlertOpen, setIsLogoutAlertOpen] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const isAdminPage = pathname.startsWith('/admin');

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
  
  const handleLogout = () => {
    // In a real app, you would clear the user's session/token here
    setIsLogoutAlertOpen(false);
    router.push("/");
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
          <div className="flex-1 flex items-center justify-start gap-2">
            {isAdminPage && (
              <>
                <AlertDialog open={isLogoutAlertOpen} onOpenChange={setIsLogoutAlertOpen}>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-primary hover:text-primary/80 hover:bg-white/10 dark:hover:bg-black/10">
                      <LogOut className="h-5 w-5" />
                      <span className="sr-only">Logout</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You will be redirected to the public portfolio page.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button variant="ghost" size="icon" onClick={() => setIsPreview(!isPreview)} className="text-primary hover:text-primary/80 hover:bg-white/10 dark:hover:bg-black/10">
                  {isPreview ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  <span className="sr-only">Toggle Preview</span>
                </Button>
              </>
            )}
          </div>
          <h1 className="flex-1 text-center font-poppins font-bold text-xl uppercase text-primary">
            MY PORTFOLIO
          </h1>
          <nav className="flex flex-1 items-center justify-end gap-2">
            <ThemeSwitcher />
            {!isAdminPage && (
              <Button variant="ghost" size="icon" onClick={() => setIsDialogOpen(true)} className="text-primary hover:text-primary/80 hover:bg-white/10 dark:hover:bg-black/10">
                <Key className="h-5 w-5" />
                <span className="sr-only">Admin Login</span>
              </Button>
            )}
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
