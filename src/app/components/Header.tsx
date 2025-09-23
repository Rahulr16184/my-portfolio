
"use client";

import * as React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
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
import { Key, LogOut, Eye, EyeOff, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { ThemeSwitcher } from '@/app/components/ThemeSwitcher';
import { usePreview } from '@/hooks/use-preview';

const AdminNav = dynamic(() => import('./AdminNav'), { ssr: false });

const SECRET_CODE = "123";

const Header = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isLogoutAlertOpen, setIsLogoutAlertOpen] = React.useState(false);
  const [secretCode, setSecretCode] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { isPreview, setIsPreview } = usePreview();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const isAdminPage = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';

  const handleSecretCodeSubmit = async () => {
    setIsSubmitting(true);
    if (secretCode === SECRET_CODE) {
      setIsDialogOpen(false);
      router.push('/admin/login');
    } else {
      toast({
        variant: 'destructive',
        title: 'Incorrect Code',
        description: 'The secret code you entered is incorrect.',
      });
    }
    setSecretCode('');
    setIsSubmitting(false);
  };
  
  const handleLogout = () => {
    setIsLogoutAlertOpen(false);
    router.push("/");
  };

  const handlePreviewToggle = () => {
    setIsPreview(!isPreview);
  }

  const paddingTop = isAdminPage && !isLoginPage ? 'pt-[113px]' : 'pt-16';

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex flex-col transition-all duration-300 bg-background/80 backdrop-blur-sm",
        )}
      >
        <div className={cn(
          "container mx-auto flex h-16 items-center justify-between px-4 md:px-6 border-b"
        )}>
          <div className="flex-1 flex items-center justify-start gap-2">
            {isAdminPage && !isLoginPage && (
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
                <Button 
                    variant="ghost" 
                    onClick={handlePreviewToggle}
                    size="icon" 
                    className="text-primary hover:text-primary/80 hover:bg-white/10 dark:hover:bg-black/10"
                >
                    {isPreview ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </>
            )}
          </div>
          <h1 className="flex-1 text-center font-poppins font-bold text-xl uppercase text-primary">
            <Link href="/">MY PORTFOLIO</Link>
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
        {isAdminPage && !isLoginPage && !isPreview && (
          <div className="container mx-auto border-b h-[49px] flex items-center overflow-x-hidden">
            <AdminNav />
          </div>
        )}
      </header>
      <div className={paddingTop} />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enter Secret Code</DialogTitle>
            <DialogDescription>
              To access the admin login page, please enter the secret code. This provides an initial layer of security.
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
                disabled={isSubmitting}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSecretCodeSubmit} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
