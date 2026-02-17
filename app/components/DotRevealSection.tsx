'use client';

import { useState, useRef, useCallback } from 'react';

interface DotRevealSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function DotRevealSection({ children, className = '' }: DotRevealSectionProps) {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [radius, setRadius] = useState(0);
  const animRef = useRef<number | null>(null);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setRadius(0);
    setHovered(true);

    const maxRadius = Math.max(rect.width, rect.height) * 1.5;
    let currentRadius = 0;
    const step = () => {
      currentRadius += (maxRadius - currentRadius) * 0.08;
      setRadius(currentRadius);
      if (maxRadius - currentRadius > 1) {
        animRef.current = requestAnimationFrame(step);
      } else {
        setRadius(maxRadius);
      }
    };
    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(step);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setHovered(false);
    setRadius(0);
  }, []);

  return (
    <section
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '12px 12px',
          opacity: hovered ? 0.15 : 0,
          maskImage: `radial-gradient(circle ${radius}px at ${mouse.x}px ${mouse.y}px, black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle ${radius}px at ${mouse.x}px ${mouse.y}px, black 0%, transparent 100%)`,
          transition: hovered ? 'opacity 0.2s' : 'opacity 1.4s',
        }}
      />
      {children}
    </section>
  );
}
