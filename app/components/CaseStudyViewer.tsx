'use client';

import Image from 'next/image';
import { useEffect, useRef, useCallback } from 'react';
import { X, CaretLeft, CaretRight } from '@phosphor-icons/react';

export interface CaseStudy {
  id: string;
  title: string;
  metadata: string;
  description?: string;
  thumbnail?: string;
  images: string[];
}

interface CaseStudyViewerProps {
  caseStudies: CaseStudy[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  showNavigation?: boolean;
}

export default function CaseStudyViewer({
  caseStudies,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  showNavigation = true,
}: CaseStudyViewerProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const currentStudy = caseStudies[currentIndex];

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
      contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentIndex, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < caseStudies.length - 1) {
      onNavigate(currentIndex + 1);
      contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentIndex, caseStudies.length, onNavigate]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrevious, handleNext]);

  // Prevent body scroll when open and manage focus
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      // Reset scroll position when opening or changing project
      contentRef.current?.scrollTo({ top: 0 });
    } else {
      document.body.style.overflow = '';
      // Return focus when closing
      previousFocusRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, currentIndex]);

  if (!isOpen || !currentStudy) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={`Case study: ${currentStudy.title}`}
    >
      {/* Navigation Arrows - Outside animated container to stay viewport-centered */}
      {showNavigation && currentIndex > 0 && (
        <button
          onClick={handlePrevious}
          className="fixed top-1/2 -translate-y-1/2 z-50 hidden lg:block group cursor-pointer"
          style={{ left: 'calc(50% - 566px)' }}
          aria-label="Previous project"
        >
          <div className="flex flex-col hover:bg-[#363636] p-1 rounded-lg items-center gap-2">
            {/* Thumbnail */}
            <div className="w-20 aspect-video rounded-lg overflow-hidden bg-white/5 relative">
              {caseStudies[currentIndex - 1].thumbnail && (
                <Image
                  src={caseStudies[currentIndex - 1].thumbnail!}
                  alt={caseStudies[currentIndex - 1].title}
                  fill
                  className="object-cover transition-transform"
                  sizes="80px"
                />
              )}
            </div>
            {/* Label */}
            <div className="flex items-center gap-1 text-white/70 group-hover:text-white transition-colors">
              <CaretLeft size={12} weight="bold" />
              <span className="text-xs font-medium">Prev</span>
            </div>
          </div>
        </button>
      )}

      {showNavigation && currentIndex < caseStudies.length - 1 && (
        <button
          onClick={handleNext}
          className="fixed top-1/2 -translate-y-1/2 z-50 hidden lg:block group cursor-pointer"
          style={{ right: 'calc(50% - 550px)' }}
          aria-label="Next project"
        >
          <div className="flex flex-col hover:bg-[#363636] p-1 rounded-lg items-center gap-2">
            {/* Thumbnail */}
            <div className="w-20 aspect-video rounded-lg overflow-hidden bg-white/5 relative">
              {caseStudies[currentIndex + 1].thumbnail && (
                <Image
                  src={caseStudies[currentIndex + 1].thumbnail!}
                  alt={caseStudies[currentIndex + 1].title}
                  fill
                  className="object-cover transition-transform"
                  sizes="80px"
                />
              )}
            </div>
            {/* Label */}
            <div className="flex items-center gap-1 text-white/70 group-hover:text-white transition-colors">
              <span className="text-xs font-medium">Next</span>
              <CaretRight size={12} weight="bold" />
            </div>
          </div>
        </button>
      )}

      {/* Scrollable Content Area */}
      <div
        ref={contentRef}
        className="h-full overflow-y-auto scroll-smooth relative"
        onClick={(e) => {
          // Close if clicking on the backdrop (not the content)
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        {/* Centered Container for Header and Images */}
        <div key={currentIndex} className="max-w-[900px] mx-auto px-4 md:px-6 relative case-study-transition">
          {/* Header Section with Close Button */}
          <header className="px-2 pt-2 md:pt-4 pb-2 md:pb-4 flex items-start bg-black/80 backdrop-blur-3xl justify-between gap-4 sticky top-0 z-3 animate-blur-fade-in">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {currentStudy.title}
              </h1>
              <p className="text-base text-white mb-1">
                {currentStudy.metadata}
              </p>
              {currentStudy.description && (
                <p className="text-base md:text-lg text-[#A1A1A1] leading-relaxed">
                  {currentStudy.description}
                </p>
              )}
            </div>

            {/* Close Button - Inline with header */}
            <button
              onClick={onClose}
              className="flex-shrink-0 text-white/70 hover:text-white p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
              aria-label="Close case study viewer"
            >
              <X size={16} weight="regular" />
            </button>
          </header>

          {/* Case Study Images */}
          <div className="space-y-8 pb-2">
            {currentStudy.images.map((imageSrc, index) => (
              <div
                key={index}
                className="relative w-full animate-fadeIn rounded-lg overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'backwards',
                }}
              >
                <Image
                  src={imageSrc}
                  alt={`${currentStudy.title} - Page ${index + 1}`}
                  width={900}
                  height={600}
                  className="object-contain rounded-lg w-full h-auto"
                  loading={index < 2 ? 'eager' : 'lazy'}
                  priority={index === 0}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes caseStudyBlurFadeIn {
          from {
            opacity: 0;
            filter: blur(8px);
          }
          to {
            opacity: 1;
            filter: blur(0);
          }
        }

        .case-study-transition {
          animation: caseStudyBlurFadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
