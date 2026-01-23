'use client';

import Image from 'next/image';
import { useState, useRef, useCallback } from 'react';

export interface AutoScrollImage {
  src: string;
  description: string;
}

interface AutoScrollSliderProps {
  images: AutoScrollImage[];
  onImageClick: (index: number) => void;
}

export default function AutoScrollSlider({ images, onImageClick }: AutoScrollSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    containerRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    containerRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleImageClick = useCallback((index: number) => {
    if (!hasDragged) {
      onImageClick(index);
    }
  }, [hasDragged, onImageClick]);

  return (
    <div className="relative overflow-hidden max-w-[600px]">
      {/* Left Fade */}
      <div
        className="absolute inset-y-0 w-20 z-20 pointer-events-none"
        style={{
          left: '-4px',
          background: 'linear-gradient(to right, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 30%, transparent 100%)',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
        }}
      />

      {/* Right Fade */}
      <div
        className="absolute inset-y-0 right-0 w-16 z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to left, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 20%, transparent 100%)',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
        }}
      />

      {/* Draggable container */}
      <div
        ref={containerRef}
        className={`flex gap-4 overflow-x-auto scrollbar-hide ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 group"
            onClick={() => handleImageClick(index)}
          >
            <div className="relative w-[150px] h-[200px] rounded-lg overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-white/10 group-hover:brightness-110 select-none">
              <Image
                src={image.src}
                alt={image.description}
                fill
                className="object-cover pointer-events-none"
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
