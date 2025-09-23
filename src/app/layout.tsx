
import type {Metadata} from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/app/components/Header';
import { ThemeProvider } from '@/app/components/ThemeProvider';
import { PreviewProvider } from '@/hooks/use-preview';
import { AppInitializer } from './components/AppInitializer';
import MainLayout from './components/MainLayout';

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=PT+Sans:wght@400;700&family=Poppins:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppInitializer />
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
