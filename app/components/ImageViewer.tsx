'use client';

import Image from 'next/image';
import { useEffect, useCallback } from 'react';
import { X, CaretLeft, CaretRight } from '@phosphor-icons/react';

export interface ViewerImage {
  src: string;
  label: string; // Can be name or description
}

interface ImageViewerProps {
  images: ViewerImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  useCenteredView?: boolean; // If true, uses centered 16:9 aspect-video view
}

export default function ImageViewer({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  useCenteredView = false,
}: ImageViewerProps) {
  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    onNavigate(newIndex);
  }, [currentIndex, images.length, onNavigate]);

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    onNavigate(newIndex);
  }, [currentIndex, images.length, onNavigate]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    },
    [isOpen, onClose, goToPrevious, goToNext]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-blur-fade-in"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[60] text-white/70 hover:text-white p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
        aria-label="Close viewer"
      >
        <X size={16} weight="regular" />
      </button>

      {/* Image Counter */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[60] text-white/70 text-sm font-mono flex items-center px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goToPrevious();
        }}
        className="fixed left-[calc(50%-480px)] top-1/2 -translate-y-1/2 z-50 hidden md:block text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors animate-blur-fade-in"
        aria-label="Previous image"
      >
        <CaretLeft size={20} weight="bold" />
      </button>

      {/* Next Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goToNext();
        }}
        className="fixed right-[calc(50%-480px)] top-1/2 -translate-y-1/2 z-50 hidden md:block text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-blur animate-blur-fade-in"
        aria-label="Next image"
      >
        <CaretRight size={20} weight="bold" />
      </button>

      {/* Main Image */}
      <div
        key={currentIndex}
        className="relative max-w-[90vw] max-h-[85vh] w-auto h-auto overflow-auto image-transition"
        onClick={(e) => e.stopPropagation()}
      >
        {useCenteredView ? (
          <>
            <div className="relative w-[90vw] max-w-[900px] aspect-video">
              <Image
                src={currentImage.src}
                alt={currentImage.label}
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>
            {/* Image Label */}
            <p className="text-center text-white mt-4 text-base">
              {currentImage.label}
            </p>
          </>
        ) : (
          <>
            <div className="relative w-[90vw] max-w-[800px] aspect-video">
              <Image
                src={currentImage.src}
                alt={currentImage.label}
                fill
                className="object-contain rounded-lg"
                priority
                sizes="(max-width: 800px) 90vw, 800px"
              />
            </div>
            {/* Image Label */}
            <p className="text-center text-white mt-4 text-base">
              {currentImage.label}
            </p>
          </>
        )}
      </div>

      {/* Image transition animation */}
      <style jsx global>{`
        @keyframes imageBlurFadeIn {
          from {
            opacity: 0;
            filter: blur(8px);
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            filter: blur(0);
            transform: scale(1);
          }
        }

        .image-transition {
          animation: imageBlurFadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
