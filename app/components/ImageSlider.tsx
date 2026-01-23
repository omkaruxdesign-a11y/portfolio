'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

export interface SliderImage {
  src: string;
  name: string;
  icon: string;
}

interface ImageSliderProps {
  images: SliderImage[];
  onImageClick: (index: number) => void;
}

export default function ImageSlider({ images, onImageClick }: ImageSliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = scrollContainerRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left Arrow */}
      <button
        onClick={() => scroll('left')}
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Scroll left"
      >
        <CaretLeft size={20} weight="bold" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => scroll('right')}
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Scroll right"
      >
        <CaretRight size={20} weight="bold" />
      </button>

      {/* Left Fade */}
      <div className="absolute left-0 top-0 bottom-0 w-18 bg-gradient-to-r from-black to-transparent z-[5] pointer-events-none" />

      {/* Right Fade */}
      <div className="absolute right-0 top-0 bottom-0 w-18 bg-gradient-to-l from-black to-transparent z-[5] pointer-events-none" />

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 px-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 cursor-pointer group/item"
            onClick={() => onImageClick(index)}
          >
            <div className="relative w-[280px] h-[157px] rounded-lg overflow-hidden transition-all duration-300 hover:brightness-110">
              <Image
                src={image.src}
                alt={image.name}
                fill
                className="object-cover"
              />
              {/* App Icon Overlay
              <div className="absolute bottom-2 left-2">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden border-2 border-white/20">
                  <Image
                    src={image.icon}
                    alt={`${image.name} icon`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div> */}
            </div>
            {/* <p className="text-sm text-[#A1A1A1] mt-2 text-center">{image.name}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}
