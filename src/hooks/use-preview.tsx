"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

type PreviewContextType = {
  isPreview: boolean;
  setIsPreview: React.Dispatch<React.SetStateAction<boolean>>;
};

const PreviewContext = createContext<PreviewContextType | undefined>(undefined);

export const PreviewProvider = ({ children }: { children: ReactNode }) => {
  const [isPreview, setIsPreview] = useState(false);

  return (
    <PreviewContext.Provider value={{ isPreview, setIsPreview }}>
      {children}
    </PreviewContext.Provider>
  );
};

export const usePreview = () => {
  const context = useContext(PreviewContext);
  if (context === undefined) {
    throw new Error('usePreview must be used within a PreviewProvider');
  }
  return context;
};
