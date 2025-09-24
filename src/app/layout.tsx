
import type {Metadata} from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/app/components/Header';
import { ThemeProvider } from '@/app/components/ThemeProvider';
import { PreviewProvider } from '@/hooks/use-preview';
import { AppInitializer } from './components/AppInitializer';
import MainLayout from './components/MainLayout';
import { ThemeManager } from './components/ThemeManager';

export const metadata: Metadata = {
  title: 'PortfolioForge',
  description: 'Built by PortfolioForge',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=PT+Sans:wght@400;700&family=Poppins:wght@700&family=Lora:wght@400;500;600;700&family=Merriweather:wght@400;700;900&family=EB+Garamond:wght@400;500;600;700;800&family=Lato:wght@400;700;900&family=Open+Sans:wght@400;500;600;700;800&family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppInitializer />
          <ThemeManager />
          <PreviewProvider>
            <Header />
            <MainLayout>{children}</MainLayout>
            <Toaster />
          </PreviewProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
