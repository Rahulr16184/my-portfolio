"use client";

import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type SectionProps = {
  id: string;
  title?: string;
  className?: string;
  children: React.ReactNode;
};

const Section = ({ id, title, className, children }: SectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px 0px -100px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "container mx-auto px-4 md:px-6 py-16 md:py-24 scroll-mt-16 transition-opacity duration-700 ease-in",
        isVisible ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {title && (
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">{title}</h2>
        </div>
      )}
      <div className={cn(isVisible && "fade-in")}>
        {children}
      </div>
    </section>
  );
};

export default Section;
