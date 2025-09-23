
"use client"

import * as React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="p-4 md:p-6 lg:p-8 h-full">
        {children}
    </div>
  );
}
