'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';

interface CursorSlideshowProps {
  images: string[];
  isVisible: boolean;
  /** Interval in ms between slides */
  interval?: number;
}

export default function CursorSlideshow({
  images,
  isVisible,
  interval = 1200,
}: CursorSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse globally
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    if (isVisible) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVisible, handleMouseMove]);

  // Animate in/out
  useEffect(() => {
    if (isVisible) {
      // Small delay for mount animation
      requestAnimationFrame(() => setShow(true));
    } else {
      setShow(false);
    }
  }, [isVisible]);

  // Cycle through images
  useEffect(() => {
    if (isVisible && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isVisible, images.length, interval]);

  // Reset index when visibility changes or images change
  useEffect(() => {
    if (!isVisible) {
      setCurrentIndex(0);
    }
  }, [isVisible, images]);

  if (!isVisible && !show) return null;

  // Position: below and slightly right of cursor
  const offsetX = 16;
  const offsetY = 20;

  return (
    <div
      ref={containerRef}
      className="fixed pointer-events-none z-[100]"
      style={{
        left: mousePos.x + offsetX,
        top: mousePos.y + offsetY,
        transition: 'opacity 0.25s ease, transform 0.25s ease',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0px) scale(1)' : 'translateY(8px) scale(0.95)',
      }}
    >
      <div className="w-[260px] aspect-video rounded-lg overflow-hidden shadow-2xl bg-[#1a1a1a] relative">
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Preview ${index + 1}`}
            fill
            className="object-cover"
            style={{
              transition: 'opacity 0.4s ease',
              opacity: index === currentIndex ? 1 : 0,
            }}
            sizes="260px"
            quality={100}
            priority={index === 0}
          />
        ))}
      </div>
    </div>
  );
}
