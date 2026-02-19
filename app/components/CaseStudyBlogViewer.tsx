'use client';

import { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X, ArrowUpRight } from '@phosphor-icons/react';
import type { BlogCaseStudy, BlogContentBlock } from '../data/blogCaseStudies';
import ImageViewer from './ImageViewer';
import type { ViewerImage } from './ImageViewer';

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function ContentRenderer({ blocks, onImageClick }: { blocks: BlogContentBlock[]; onImageClick?: (src: string) => void }) {
  return (
    <div className="space-y-0">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'image':
            return (
              <div key={index} className="my-8">
                <div
                  className="relative cursor-pointer group"
                  onClick={() => onImageClick?.(block.src)}
                  role="button"
                  aria-label={`View ${block.alt} fullscreen`}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onImageClick?.(block.src)}
                >
                  <Image
                    src={block.src}
                    alt={block.alt}
                    width={650}
                    height={400}
                    className="w-full h-auto rounded-lg"
                    loading={index === 0 ? undefined : 'lazy'}
                    priority={index === 0}
                    sizes="(max-width: 650px) 100vw, 650px"
                    quality={100}
                  />
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-white/5" />
                </div>
              </div>
            );

            case 'title':
              return (
                <h3
                  key={index}
                  className="text-2xl font-bold text-white mt-10 font-sans"
                >
                  {block.title}
                </h3>
              );

          case 'heading':
            return (
              <h3
                key={index}
                id={slugify(block.text)}
                className="text-base font-regular text-white mt-1 mb-3 font-mono uppercase scroll-mt-20"
              >
                {block.text}
              </h3>
            );

          case 'text':
            return (
              <p
                key={index}
                className={`${block.white ? 'text-white' : 'text-[#7a7a7a]'} text-base leading-relaxed mb-4`}
              >
                {block.text}
              </p>
            );

          case 'note':
            return (
              <p key={index} className="text-white/60 bg-white/10 text-base mb-4 italic border-l-2 border-[#9a9a9a] pl-3 py-2 mt-2">
                {block.text}
              </p>
            );

          case 'bullets':
            return (
              <ul key={index} className="list-disc ml-5 space-y-2 mb-4">
                {block.items.map((item, i) => (
                  <li
                    key={i}
                    className="text-[#7a7a7a] text-base leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );

          case 'numbered':
            return (
              <ol key={index} className="list-decimal ml-5 space-y-3 mb-4">
                {block.items.map((item, i) => (
                  <li
                    key={i}
                  className="text-[#7a7a7a] text-base leading-relaxed"
                  >
                    {item.text}
                    {item.nested.length > 0 && (
                      <ol className="list-[lower-alpha] ml-5 mt-2 space-y-1">
                        {item.nested.map((nestedItem, j) => (
                          <li
                            key={j}
                            className="text-[#7a7a7a] text-base leading-relaxed"
                          >
                            {nestedItem}
                          </li>
                        ))}
                      </ol>
                    )}
                  </li>
                ))}
              </ol>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

const projectCards: Record<string, { logo: string; name: string; subtitle: string; visitUrl: string; peerlistUrl: string }> = {
  lentlay: {
    logo: '/currently learning/lentlay.png',
    name: 'Lentlay',
    subtitle: 'Your Images made glassy',
    visitUrl: 'https://lentlay.framer.website',
    peerlistUrl: 'https://peerlist.io/omkarux/project/lentlay',
  },
  secards: {
    logo: '/currently learning/secards-sq.png',
    name: 'Secards',
    subtitle: 'All of Secured cards in India',
    visitUrl: 'https://secards.vercel.app',
    peerlistUrl: 'https://peerlist.io/omkarux/project/secards',
  },
};

interface CaseStudyBlogViewerProps {
  study: BlogCaseStudy;
  isOpen: boolean;
  onClose: () => void;
}

export default function CaseStudyBlogViewer({
  study,
  isOpen,
  onClose,
}: CaseStudyBlogViewerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef(0);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Mount flag for portal (SSR safety)
  useEffect(() => { setMounted(true); }, []);

  // Extract heading sections for nav
  const sections = useMemo(() =>
    study.content
      .filter((b): b is Extract<BlogContentBlock, { type: 'heading' }> => b.type === 'heading')
      .map(b => ({ id: slugify(b.text), label: b.text })),
    [study.content]
  );

  const allImages = useMemo<ViewerImage[]>(() =>
    study.content
      .filter((b): b is Extract<BlogContentBlock, { type: 'image' }> => b.type === 'image')
      .map(b => ({ src: b.src, label: b.alt })),
    [study.content]
  );

  const handleImageClick = useCallback((src: string) => {
    const idx = allImages.findIndex(img => img.src === src);
    if (idx !== -1) {
      setLightboxIndex(idx);
      setLightboxOpen(true);
    }
  }, [allImages]);

  // IntersectionObserver to track active section
  useEffect(() => {
    const scrollEl = overlayRef.current;
    if (!scrollEl || !isOpen || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        root: scrollEl,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }
    );

    // Observe all heading elements
    const headingEls = sections
      .map(s => scrollEl.querySelector(`#${s.id}`))
      .filter(Boolean) as Element[];

    headingEls.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [isOpen, sections]);

  const scrollToSection = useCallback((sectionId: string) => {
    const scrollEl = overlayRef.current;
    if (!scrollEl) return;

    const isFirst = sections.length > 0 && sectionId === sections[0].id;
    const isLast = sections.length > 0 && sectionId === sections[sections.length - 1].id;

    if (isFirst) {
      scrollEl.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (isLast) {
      scrollEl.scrollTo({ top: scrollEl.scrollHeight, behavior: 'smooth' });
    } else {
      const el = scrollEl.querySelector(`#${sectionId}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [sections]);

  // Hide header on scroll down, show on scroll up (mobile)
  useEffect(() => {
    const scrollEl = overlayRef.current;
    if (!scrollEl || !isOpen) return;

    lastScrollY.current = 0;

    const handleScroll = () => {
      const y = scrollEl.scrollTop;
      if (y > lastScrollY.current && y > 50) {
        setIsHeaderHidden(true);
      } else if (y < lastScrollY.current) {
        setIsHeaderHidden(false);
      }
      lastScrollY.current = y;
    };

    scrollEl.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollEl.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // Lock body scroll and manage focus when open
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      // Focus the overlay for keyboard events
      setTimeout(() => overlayRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      // Return focus to the element that opened the viewer
      previousFocusRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // ESC key handler
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      // Focus trap: keep Tab within the overlay
      if (e.key === 'Tab') {
        const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable && focusable.length > 0) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [onClose]
  );

  // Click outside content to close
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) {
        onClose();
      }
    },
    [onClose]
  );

  if (!isOpen) return null;

  return (
    <>
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black casestudy-overlay-fade-in overflow-y-auto"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`Case study: ${study.title}`}
    >
      {/* Mobile fixed close button - always visible */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-[60] sm:hidden text-white/70 hover:text-white p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-opacity flex items-center justify-center"
        aria-label="Close case study"
      >
        <X size={16} weight="regular" />
      </button>

      {/* Section Nav - desktop only */}
      {sections.length > 0 && (
        <nav
          className="bg-white/5 p-2 border border-white/10 rounded-md fixed top-1/2 -translate-y-1/2 z-[55] hidden xl:flex flex-col gap-1"
          style={{ right: 'calc(50% + 365px)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`text-left text-sm py-1 px-3 transition-all duration-200 border-l-2 ${
                activeSection === section.id
                  ? 'text-white border-white '
                  : 'text-[#7a7a7a] border-transparent hover:text-[#a1a1a1] hover:border-[#7a7a7a]'
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
      )}

      {/* Content */}
      <div
        ref={contentRef}
        className="max-w-[650px] mx-auto px-6 pt-0 pb-24"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section with Close Button */}
        <header className={`p-2 pt-6 bg-black/80 backdrop-blur-3xl sticky top-0 z-[3] group/title transition-transform duration-300 ${isHeaderHidden ? '-translate-y-full' : 'translate-y-0'}`}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="text-2xl font-semibold text-white font-sans">
                {study.title}
              </h2>
              <p className="text-[#6a6a6a] text-base">{study.subtext}</p>
            </div>
            <button
              onClick={onClose}
              className="hidden sm:flex flex-shrink-0 text-white/70 group-hover/title:opacity-100 hover:text-white p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-opacity items-center justify-center"
              aria-label="Close case study"
            >
              <X size={16} weight="regular" />
            </button>
          </div>
        </header>

        {/* Content Blocks */}
        <ContentRenderer blocks={study.content} onImageClick={handleImageClick} />

        {/* Project Card */}
        {projectCards[study.id] && (() => {
          const card = projectCards[study.id];
          return (
            <div className="mt-4 mb-4 bg-[#1a1a1a] rounded-xl gap-2 p-2 flex flex-col">
              <div className="flex items-start gap-2">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={card.logo}
                    alt={`${card.name} logo`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">{card.name}</h4>
                  <p className="text-sm text-[#7a7a7a]">{card.subtitle}</p>
                </div>
              </div>
              <div className="min-h-[1px] w-full bg-[#363636]"></div>
              <div className="flex justify-between items-center">
                <a
                  href={card.visitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex uppercase font-mono items-center gap-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white text-sm font-regular px-2 py-1 rounded-lg transition-colors group"
                >
                  Visit
                  <ArrowUpRight size={14} weight="regular" className="text-[#6a6a6a] group-hover:text-white" />
                </a>
                <a
                  href={card.peerlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex p-1 items-center gap-1 hover:bg-[#009940] rounded-full transition-colors"
                >
                  <Image
                    src="/logos/peerlist.png"
                    alt="Peerlist"
                    width={18}
                    height={18}
                    className="rounded-full"
                  />
                  <ArrowUpRight size={14} weight="regular" className="text-[#6a6a6a] group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          );
        })()}
      </div>
    </div>

    {mounted && createPortal(
      <ImageViewer
        images={allImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => {
          setLightboxOpen(false);
          document.body.style.overflow = 'hidden';
        }}
        onNavigate={(idx) => setLightboxIndex(idx)}
        showLabel={false}
      />,
      document.body
    )}
    </>
  );
}
