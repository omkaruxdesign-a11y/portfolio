'use client';

import Image from 'next/image';
import { useEffect, useRef, useCallback, useState } from 'react';
import { X, CaretLeft, CaretRight, Plus } from '@phosphor-icons/react';

export interface CaseStudy {
  id: string;
  title: string;
  metadata: string;
  description?: string;
  impact?: string[];
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
  const [isImpactExpanded, setIsImpactExpanded] = useState(false);

  const currentStudy = caseStudies[currentIndex];

  // Reset expanded state when changing case study
  useEffect(() => {
    setIsImpactExpanded(false);
  }, [currentIndex]);

  // Touch/swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  }, []);

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

  const handleTouchEnd = useCallback(() => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  }, [handleNext, handlePrevious]);

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
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
            <div className="flex items-center gap-1 text-white/70 group-hover:text-white transition-colors z-3">
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
          <header className="px-2 pt-2 md:pt-4 pb-4 md:pb-6 bg-black/80 backdrop-blur-3xl sticky top-0 z-3 animate-blur-fade-in group/title">
            {/* Title, Metadata and Close Button - Grouped */}
            <div className="flex items-start justify-between gap-4 ">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {currentStudy.title}
                </h1>
                <p className="text-sm text-[#7a7a7a]">
                  {currentStudy.metadata}
                </p>
              </div>
              {/* Close Button - Grouped with title */}
              <button
                onClick={onClose}
                className="flex-shrink-0 text-white/70 opacity-0 sm:opacity-100 group-hover/title:opacity-100 hover:text-white p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-opacity flex items-center justify-center"
                aria-label="Close case study viewer"
              >
                <X size={16} weight="regular" />
              </button>
            </div>

            {/* Description Section */}
            {currentStudy.description && (
              <div className="mt-4 mb-2">
                <h2 className="text-sm font-mono uppercase tracking-wider text-white mb-1">
                  DESCRIPTION
                </h2>
                <p className="text-base text-[#7a7a7a] leading-relaxed">
                  {currentStudy.description}
                </p>
              </div>
            )}

            {/* Impact/Learnings Section - Collapsible */}
            {currentStudy.impact && currentStudy.impact.length > 0 && (
              <div>
                <button
                  onClick={() => setIsImpactExpanded(!isImpactExpanded)}
                  className="w-full flex items-center justify-between py-2 pr-2 cursor-pointer group/collapse"
                >
                  <h2 className="text-sm font-mono uppercase group-hover/collapse:underline underline-offset-4 tracking-wider text-white">
                    {currentStudy.metadata.includes('Concept') || currentStudy.metadata.includes('Personal') ? 'LEARNINGS' : 'IMPACT'}
                  </h2>
                  <Plus
                    size={16}
                    weight="bold"
                    className={`text-white/70 group-hover/collapse:text-white transition-transform duration-300 ${isImpactExpanded ? 'rotate-45' : ''}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isImpactExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <ul className="space-y-1 pt-2">
                    {currentStudy.impact.map((item, index) => (
                      <li key={index} className="text-base text-[#7a7a7a] leading-relaxed flex">
                        <span className="mr-3">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
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
                  sizes="(max-width: 900px) 90vw, 900px"
                  quality={85}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Arrows */}
      {showNavigation && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-4 lg:hidden bg-black/70 backdrop-blur-sm p-2 rounded-full">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`p-3 rounded-full transition-colors ${
              currentIndex === 0
                ? 'text-white/30 bg-white/5 cursor-not-allowed'
                : 'text-white/70 active:text-white bg-white/10 active:bg-white/20'
            }`}
            aria-label="Previous project"
          >
            <CaretLeft size={24} weight="bold" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === caseStudies.length - 1}
            className={`p-3 rounded-full transition-colors ${
              currentIndex === caseStudies.length - 1
                ? 'text-white/30 bg-white/5 cursor-not-allowed'
                : 'text-white/70 active:text-white bg-white/10 active:bg-white/20'
            }`}
            aria-label="Next project"
          >
            <CaretRight size={24} weight="bold" />
          </button>
        </div>
      )}

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
