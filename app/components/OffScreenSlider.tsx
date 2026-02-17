'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import AutoScrollSlider, { AutoScrollImage } from './AutoScrollSlider';
import ImageViewer, { ViewerImage } from './ImageViewer';

const offScreenImages: AutoScrollImage[] = [
  { src: '/offscreen/2.jpeg', description: 'Travel photo' },
  { src: '/offscreen/3.jpeg', description: 'Travel photo' },
  { src: '/offscreen/5.jpeg', description: 'Travel photo' },
  { src: '/offscreen/6.jpeg', description: 'Travel photo' },
  { src: '/offscreen/7.jpg', description: 'Travel photo' },
  { src: '/offscreen/12.jpg', description: 'Travel photo' },
  { src: '/offscreen/book1.jpg', description: 'Book' },
  { src: '/offscreen/book2.jpg', description: 'Book' },
  { src: '/offscreen/book3.jpg', description: 'Book' },
];

const viewerImages: ViewerImage[] = offScreenImages.map((img) => ({
  src: img.src,
  label: img.description,
}));

export default function OffScreenSlider() {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const closedViaBackRef = useRef(false);

  useEffect(() => {
    const handlePopState = () => {
      closedViaBackRef.current = true;
      setIsViewerOpen(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (isViewerOpen) {
      closedViaBackRef.current = false;
      window.history.pushState({ modal: true }, '');
    }
  }, [isViewerOpen]);

  const closeViewer = useCallback(() => {
    setIsViewerOpen(false);
    if (!closedViaBackRef.current) window.history.back();
  }, []);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsViewerOpen(true);
  };

  return (
    <>
      <AutoScrollSlider images={offScreenImages} onImageClick={handleImageClick} />

      {isViewerOpen && (
        <ImageViewer
          images={viewerImages}
          currentIndex={currentImageIndex}
          isOpen={isViewerOpen}
          onClose={closeViewer}
          onNavigate={setCurrentImageIndex}
        />
      )}
    </>
  );
}
