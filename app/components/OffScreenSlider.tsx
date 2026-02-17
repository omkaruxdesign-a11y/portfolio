'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import AutoScrollSlider, { AutoScrollImage } from './AutoScrollSlider';
import ImageViewer, { ViewerImage } from './ImageViewer';

const offScreenImages: AutoScrollImage[] = [
  { src: '/offscreen/2.jpeg', description: 'The light house in Vengurla' },
  { src: '/offscreen/3.jpeg', description: 'Diwali' },
  { src: '/offscreen/5.jpeg', description: 'Was worth the hike!' },
  { src: '/offscreen/6.jpeg', description: 'Highest peak in Maharashtra...check!' },
  { src: '/offscreen/7.jpg', description: 'Shimla, the only place I loved except Kolhapur (my hometown)' },
  { src: '/offscreen/12.jpg', description: 'Long exposure for the first time' },
  { src: '/offscreen/book1.jpg', description: 'Book that showed me a structure to work (Not that I applied it though:)' },
  { src: '/offscreen/book2.jpg', description: 'Love reading about people who\'ve achieved something in life' },
  { src: '/offscreen/book3.jpg', description: 'Read this one in a train journey. Great one!' },
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

      {isViewerOpen && createPortal(
        <ImageViewer
          images={viewerImages}
          currentIndex={currentImageIndex}
          isOpen={isViewerOpen}
          onClose={closeViewer}
          onNavigate={setCurrentImageIndex}
        />,
        document.body
      )}
    </>
  );
}
