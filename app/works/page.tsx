'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import ImageSlider, { SliderImage } from "../components/ImageSlider";
import ImageViewer, { ViewerImage } from "../components/ImageViewer";
import AnimateOnScroll from "../components/AnimateOnScroll";
import CursorSlideshow from "../components/CursorSlideshow";
import DotRevealSection from "../components/DotRevealSection";
import { caseStudiesData } from "../data/caseStudies";

const uxShortsImages: SliderImage[] = [
  { src: "/uxshorts/tidy.png", name: "Tidy", icon: "/uxshorts/tidy.png" },
  { src: "/uxshorts/skillswap.png", name: "SkillSwap", icon: "/uxshorts/skillswap.png" },
  { src: "/uxshorts/supermoney.png", name: "SuperMoney", icon: "/uxshorts/supermoney.png" },
  { src: "/uxshorts/linkedin.png", name: "LinkedIn Redesign", icon: "/uxshorts/linkedin.png" },
  { src: "/uxshorts/wist.png", name: "Wist", icon: "/uxshorts/wist.png" },
];

export default function WorksPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUxViewerOpen, setIsUxViewerOpen] = useState(false);
  const [currentUxImageIndex, setCurrentUxImageIndex] = useState(0);
  const [hoveredWorkId, setHoveredWorkId] = useState<string | null>(null);
  const [hoveredCaseStudyImages, setHoveredCaseStudyImages] = useState<string[]>([]);
  const [isCursorPreviewVisible, setIsCursorPreviewVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Track if modal was closed via back button
  const closedViaBackRef = useRef(false);

  useEffect(() => {
    const handlePopState = () => {
      closedViaBackRef.current = true;
      setIsUxViewerOpen(false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (isUxViewerOpen) {
      closedViaBackRef.current = false;
      window.history.pushState({ modal: true }, '');
    }
  }, [isUxViewerOpen]);

  const closeUxViewer = useCallback(() => {
    setIsUxViewerOpen(false);
    if (!closedViaBackRef.current) window.history.back();
  }, []);

  const handleUxImageClick = (index: number) => {
    setCurrentUxImageIndex(index);
    setIsUxViewerOpen(true);
  };

  const uxViewerImages: ViewerImage[] = uxShortsImages.map(img => ({
    src: img.src,
    label: img.name,
  }));

  return (
    <div className="bg-black font-sans">

      {/* Page Load Animation */}
      <style jsx global>{`
        @keyframes blurFadeIn {
          0% {
            opacity: 0;
            filter: blur(10px);
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
            transform: translateY(0);
          }
        }

        .animate-blur-fade-in {
          opacity: 0;
          filter: blur(10px);
          transform: translateY(20px);
          animation: blurFadeIn 0.6s ease-out forwards;
        }

        .animate-delay-1 { animation-delay: 0s; }
        .animate-delay-2 { animation-delay: 0.1s; }
        .animate-delay-3 { animation-delay: 0.2s; }

        .animate-on-scroll {
          opacity: 0;
          filter: blur(10px);
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, filter 0.6s ease-out, transform 0.6s ease-out;
        }

        .animate-on-scroll.in-view {
          opacity: 1;
          filter: blur(0px);
          transform: translateY(0);
        }
      `}</style>

      {/* SECTION 1: Hero Quote */}
      <DotRevealSection className={`bg-white/5 border-b border-[#2a2a2a] p-8 py-12 ${isLoaded ? 'animate-blur-fade-in animate-delay-1' : 'opacity-0'}`}>
        <h1 className="relative text-3xl font-serif text-[#6a6a6a] mb-3">
          Design is only as good as the{' '}
          <span className="text-white font-redular ">impact it ships.</span>
        </h1>
        <p className="relative text-[#6a6a6a] text-base font-sans">
          – Learnt this talking to users
        </p>
      </DotRevealSection>

      {/* SECTION 2: WORKS */}
      <DotRevealSection className={`p-8 border-b border-[#2a2a2a] space-y-4 ${isLoaded ? 'animate-blur-fade-in animate-delay-2' : 'opacity-0'}`}>
        <h3 className="relative text-sm font-mono uppercase tracking-wider text-white">
          WORKS
        </h3>

        <p className="relative text-base text-[#7a7a7a]">
          Here&apos;s a glimpse of the work I have done recently. Includes professional and hobbyist works
        </p>

        {/* Project Grid */}
        <div
          className="relative grid grid-cols-1 md:grid-cols-2 gap-3 pt-4"
          onMouseLeave={() => !isMobile && setHoveredWorkId(null)}
        >
            {caseStudiesData.map((caseStudy, index) => {
            if (caseStudy.isComingSoon) {
              return (
                <div
                  key={caseStudy.id}
                  className={`opacity-60 cursor-default transition-all duration-300 ${!isMobile && hoveredWorkId ? 'blur-[2px]' : ''}`}
                >
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={caseStudy.thumbnail || caseStudy.images[0]}
                      alt={caseStudy.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={100}
                      priority={index < 2}
                    />
                  </div>
                  <div className="mt-2">
                    <h4 className="text-white text-base font-medium">
                      {caseStudy.title}
                    </h4>
                    <p className="text-[#7a7a7a] text-sm">
                      {caseStudy.subtext}
                    </p>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={caseStudy.id}
                href={`/works/${caseStudy.id}`}
                className={`group transition-all duration-300 ${!isMobile && hoveredWorkId && hoveredWorkId !== caseStudy.id ? 'blur-[2px] opacity-50' : ''}`}
                onMouseEnter={() => {
                  if (isMobile) return;
                  setHoveredWorkId(caseStudy.id);
                  setHoveredCaseStudyImages(caseStudy.images.slice(0, 5));
                  setIsCursorPreviewVisible(true);
                }}
                onMouseLeave={() => {
                  if (isMobile) return;
                  setIsCursorPreviewVisible(false);
                }}
              >
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={caseStudy.thumbnail || caseStudy.images[0]}
                    alt={caseStudy.title}
                    fill
                    className="object-cover transition-all duration-300 group-hover:brightness-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={100}
                    priority={index < 2}
                  />
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-white text-base font-medium group-hover:underline underline-offset-2">
                      {caseStudy.title}
                    </h4>
                  </div>
                  <p className="text-[#7a7a7a] group-hover:text-[#9d9d9d] text-sm">
                    {caseStudy.subtext}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

      </DotRevealSection>

      {/* SECTION 3: UX SHORTS */}
      <DotRevealSection className="p-8 border-b border-[#2a2a2a] space-y-6">
        <AnimateOnScroll as="h3" className="text-base font-mono uppercase text-white">
          UX SHORTS
        </AnimateOnScroll>

        <AnimateOnScroll as="p" className="text-base text-[#7a7a7a] ">
          Bites of some random ideas I had in mind...
        </AnimateOnScroll>

        <AnimateOnScroll>
          <ImageSlider images={uxShortsImages} onImageClick={handleUxImageClick} />
        </AnimateOnScroll>
      </DotRevealSection>

      {/* SECTION 4: Closing Quote */}
      <DotRevealSection className="p-8 py-12 ">
        <AnimateOnScroll className="item-center justify-center">
          <p className="text-white text-center text-2xl font-serif ">
          <span className="text-white font-regular ">More designers should be founders.</span>
             And we want to back them at YC.
          </p>
          <p className="text-center text-[#7a7a7a] text-base font-mono mt-2">
            - AARON EPSTEIN, YC
          </p>
        </AnimateOnScroll>
      </DotRevealSection>

      {/* UX Shorts Image Viewer */}
      {isUxViewerOpen && (
        <ImageViewer
          images={uxViewerImages}
          currentIndex={currentUxImageIndex}
          isOpen={isUxViewerOpen}
          onClose={closeUxViewer}
          onNavigate={setCurrentUxImageIndex}
          showLabel={false}
        />
      )}

      {/* Cursor Slideshow Preview - desktop only */}
      {!isMobile && (
        <CursorSlideshow
          images={hoveredCaseStudyImages}
          isVisible={isCursorPreviewVisible}
        />
      )}
    </div>
  );
}
