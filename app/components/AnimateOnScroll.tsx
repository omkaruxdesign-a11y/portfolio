'use client';

import { useRef, useState, useEffect } from "react";

export default function AnimateOnScroll({
  children,
  className = "",
  threshold = 0.15,
  as = 'div',
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  as?: 'div' | 'h3' | 'p' | 'span' | 'section' | 'footer';
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  const combinedClassName = `animate-on-scroll ${isInView ? 'in-view' : ''} ${className}`;
  const style = delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;

  // Use specific elements based on `as` prop
  if (as === 'h3') return <h3 ref={ref as React.RefObject<HTMLHeadingElement>} className={combinedClassName} style={style}>{children}</h3>;
  if (as === 'p') return <p ref={ref as React.RefObject<HTMLParagraphElement>} className={combinedClassName} style={style}>{children}</p>;
  if (as === 'span') return <span ref={ref as React.RefObject<HTMLSpanElement>} className={combinedClassName} style={style}>{children}</span>;
  if (as === 'section') return <section ref={ref as React.RefObject<HTMLElement>} className={combinedClassName} style={style}>{children}</section>;
  if (as === 'footer') return <footer ref={ref as React.RefObject<HTMLElement>} className={combinedClassName} style={style}>{children}</footer>;

  return <div ref={ref} className={combinedClassName} style={style}>{children}</div>;
}
