
"use client";

import { usePreview } from '@/hooks/use-preview';
import { usePathname } from 'next/navigation';
import PublicPortfolioPage from '@/app/page';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { isPreview } = usePreview();
  const pathname = usePathname();

  const isAdminPage = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';
  
  const showPreview = isPreview && isAdminPage && !isLoginPage;

  return (
    <main className="flex-1">
      {showPreview ? <PublicPortfolioPage /> : children}
    </main>
  );
}
