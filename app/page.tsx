'use client';

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import AnimateOnScroll from "./components/AnimateOnScroll";
import CaseStudyBlogViewer from "./components/CaseStudyBlogViewer";
import CursorSlideshow from "./components/CursorSlideshow";
import DotRevealSection from "./components/DotRevealSection";
import { blogCaseStudies, type BlogCaseStudy } from "./data/blogCaseStudies";

const caseStudyDescriptions: Record<string, { title: string; readTime: string }> = {
  lentlay: {
    title: "How I ideated, designed, built, launched Lentlay on Peerlist which got staff picked!",
    readTime: "2 min read",
  },
  secards: {
    title: "0 to 1 journey for a Local Sports Fantasy platform which enabled initial market validation ",
    readTime: "2 min read",
  },
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeBlogCaseStudy, setActiveBlogCaseStudy] = useState<BlogCaseStudy | null>(null);
  const [hoveredCaseStudyImages, setHoveredCaseStudyImages] = useState<string[]>([]);
  const [isCursorPreviewVisible, setIsCursorPreviewVisible] = useState(false);
  const [hoveredCaseStudyId, setHoveredCaseStudyId] = useState<string | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  // Trigger animations after component mounts to prevent flash of content
  useEffect(() => {
    setIsLoaded(true);
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Track if modal was closed via back button to avoid double history.back()
  const closedViaBackRef = useRef(false);

  // Handle browser back button to close modals
  useEffect(() => {
    const handlePopState = () => {
      closedViaBackRef.current = true;
      setActiveBlogCaseStudy(null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Push history state when any modal opens
  useEffect(() => {
    const isAnyModalOpen = activeBlogCaseStudy !== null;

    if (isAnyModalOpen) {
      closedViaBackRef.current = false;
      window.history.pushState({ modal: true }, '');
    }
  }, [activeBlogCaseStudy]);

  // Close handlers that also handle history
  const closeBlogViewer = useCallback(() => {
    setActiveBlogCaseStudy(null);
    if (!closedViaBackRef.current) window.history.back();
  }, []);

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
        .animate-delay-4 { animation-delay: 0.3s; }

        /* Scroll-triggered animation - starts hidden */
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

        /* Modal animation */
        @keyframes modalBackdropFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modalContentFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .modal-backdrop {
          animation: modalBackdropFadeIn 0.2s ease-out forwards;
        }

        .modal-content {
          animation: modalContentFadeIn 0.3s ease-out forwards;
        }

        /* Case study overlay animation */
        @keyframes casestudyOverlayFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .casestudy-overlay-fade-in {
          animation: casestudyOverlayFadeIn 0.3s ease-out forwards;
        }
      `}</style>

        {/* Hero Section */}
        <DotRevealSection className={`p-8 py-12 border-b border-[#2a2a2a] ${isLoaded ? 'animate-blur-fade-in animate-delay-1' : 'opacity-0'}`}>
          <div className="relative flex flex-col items-start gap-2">
            {/* Profile Image */}
            <div className="rounded-full">
              <Image
                src="/logos/profile-pic.png"
                alt="Omkar profile"
                width={40}
                height={40}
                className="rounded-sm"
              />
            </div>

            {/* Heading Text */}
            <div className="text-start">
              <h1 className="text-3xl ">
                <span className="text-[#7a7a7a] font-light font-serif">Hi, I am </span>
                <span className="text-white font-light font-serif">Omkar</span>
              </h1>
              <h2 className="text-3xl">
                <span className="text-[#7a7a7a] font-serif">and I love things that </span>
                <span className="text-white font-light font-serif">add value to lives</span>
              </h2>
            </div>
          </div>
        </DotRevealSection>

        {/* Sub Hero Section */}
        <DotRevealSection className={`px-8 py-4 border-b border-[#2a2a2a] ${isLoaded ? 'animate-blur-fade-in animate-delay-2' : 'opacity-0'}`}>
          <p className="relative text-lg text-[#A1A1A1]">
            A <span className="text-white font-regular">Product Designer</span> now and a learner forever!
          </p>
        </DotRevealSection>

        {/* CASE STUDIES Section */}
        <DotRevealSection className={`p-8 border-b border-[#2a2a2a] space-y-6 ${isLoaded ? 'animate-blur-fade-in animate-delay-3' : 'opacity-0'}`}>
          {/* Section Heading */}
          <h3 className="relative text-sm font-mono uppercase text-white">
            CASE STUDIES
          </h3>

          {/* Project Cards Grid */}
          <div
            className="relative grid grid-cols-1 md:grid-cols-2 gap-6 items-start"
            onMouseLeave={() => !isMobile && setHoveredCaseStudyId(null)}
          >
            {blogCaseStudies.map((study) => {
              const studyImages = study.content
                .filter((block): block is { type: "image"; src: string; alt: string } => block.type === "image")
                .map((block) => block.src);
              const desc = caseStudyDescriptions[study.id];
              return (
                  <button
                    key={study.id}
                    onClick={() => setActiveBlogCaseStudy(study)}
                    onMouseEnter={() => {
                      if (isMobile) return;
                      setHoveredCaseStudyId(study.id);
                      setHoveredCaseStudyImages(studyImages);
                      setIsCursorPreviewVisible(true);
                    }}
                    onMouseLeave={() => {
                      if (isMobile) return;
                      setIsCursorPreviewVisible(false);
                    }}
                    className={`group text-left w-full h-full cursor-pointer transition-all duration-300 ${!isMobile && hoveredCaseStudyId && hoveredCaseStudyId !== study.id ? 'blur-[2px] opacity-50' : ''}`}
                  >
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={study.thumbnail}
                        alt={study.title}
                        fill
                        className="object-cover transition-all duration-300 group-hover:brightness-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={100}
                      />
                    </div>
                    <div className="mt-3">
                      <p className="text-white text-base font-regular">
                        {desc ? desc.title : study.title}
                      </p>
                      <p className="text-[#7a7a7a] text-sm mt-1">
                        {desc ? desc.readTime : study.subtext}
                      </p>
                    </div>
                  </button>
              );
            })}
          </div>
        </DotRevealSection>

        {/* Testimonial 1 - Venkatesh Majji */}
        <DotRevealSection className={`bg-white/5 justify-center p-12 py-18 border-b border-[#2a2a2a] ${isLoaded ? 'animate-blur-fade-in animate-delay-4' : 'opacity-0'}`}>
          <p className="relative text-[white] text-xl font-regular font-sans mb-6">
            &ldquo;Omkar was a valuable asset to our team, demonstrating a strong work ethic and a keen eye for design. His contributions to everything design significantly impacted the project&apos;s success&rdquo;
          </p>
          <div className="relative flex items-center gap-3">
            <Image
              src="/testimonials/majji.jpg"
              alt="Venkatesh Majji"
              width={40}
              height={40}
              className="rounded-full object-cover w-10 h-10"
            />
            <div>
              <p className="text-white font-regular font-sans">Venkatesh Majji</p>
              <p className="text-[#7a7a7a] text-xs uppercase font-mono">Co-founder & CTO, Hyperly</p>
            </div>
          </div>
        </DotRevealSection>

        {/* CURRENTLY LEARNING Section */}
        <DotRevealSection className="p-8 py-12 border-b border-[#2a2a2a] space-y-6">
          <AnimateOnScroll as="h3" className="text-sm font-mono uppercase text-white">
            CURRENTLY LEARNING
          </AnimateOnScroll>

          <AnimateOnScroll className="text-base text-[#7a7a7a] space-y-4">
            <p>
              <span className="text-white font-regular">Coding!</span> Yep, learning to code so that I can bring my small ideas to life and claim a small part off then internet as mine! These are mostly some problems I face and I build a solution to it withouth thinking much.
            </p>
            <p>
              Built and launched 2 projects on{' '}
              <a
                href="https://peerlist.io/omkarux"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-regular underline underline-offset-4 hover:opacity-80 transition-opacity"
              >
                Peerlist
              </a>
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Card 1: Lentlay */}
            <div className="bg-[#1a1a1a] rounded-xl gap-2 p-2 flex flex-col">
              <div className="flex items-start gap-2">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src="/currently learning/lentlay.png"
                    alt="Lentlay logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-base font-medium text-white">Lentlay</h4>
                  <p className="text-sm text-[#7a7a7a]">Your Images made glassy</p>
                </div>
              </div>
              <div className="min-h-[1px] w-full bg-[#363636]"></div>
              <div className="flex justify-between items-center">
                <a
                  href="https://lentlay.framer.website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex uppercase font-mono items-center gap-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white text-sm font-regular px-2 py-1 rounded-lg transition-colors group"
                >
                  Visit
                  <ArrowUpRight size={14} weight="regular" className="text-[#6a6a6a] group-hover:text-white" />
                </a>
                <a
                  href="https://peerlist.io/omkarux/project/lentlay"
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

            {/* Card 2: Secards */}
            <div className="bg-[#1a1a1a] rounded-xl gap-2 p-2 flex flex-col">
              <div className="flex items-start gap-2">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src="/currently learning/secards-sq.png"
                    alt="Secards logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-full">
                  <h4 className="text-base font-medium text-white">Secards</h4>
                  <p className="text-sm text-[#7a7a7a]">All of Secured cards in India</p>
                </div>
              </div>
              <div className="min-h-[1px] w-full bg-[#363636]"></div>
              <div className="flex justify-between items-center">
                <a
                  href="https://secards.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white text-sm font-regular font-mono uppercase px-2 py-1 rounded-lg transition-colors group"
                >
                  Visit
                  <ArrowUpRight size={14} weight="regular" className="text-[#6a6a6a] group-hover:text-white"/>
                </a>
                <a
                  href="https://peerlist.io/omkarux/project/secards"
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
                  <ArrowUpRight size={14} weight="regular" className="text-[#6a6a6a] group-hover:text-white" />
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </DotRevealSection>

        {/* Testimonial 2 - Bentley Beacher */}
        <DotRevealSection className="p-12 py-18 bg-white/5 border-b border-[#2a2a2a]">
          <AnimateOnScroll>
            <p className="text-white text-lg mb-6">
              &ldquo;Although we hired Omkar on a contract, he was instrumental in bringing our vision to life. Creative ideas and technical expertise by him were invaluable in creating a functional, well communicated and visually appealing design.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <Image
                src="/testimonials/bentley.png"
                alt="Bentley Beacher"
                width={40}
                height={40}
                className="rounded-full object-cover w-10 h-10"
              />
              <div>
                <p className="text-white font-regular font-sans">Bentley Beacher</p>
                <p className="text-[#7a7a7a] text-xs font-mono uppercase">Founder, Vestorgrow</p>
              </div>
            </div>
          </AnimateOnScroll>
        </DotRevealSection>

        {/* SOCIALS Section */}
        <DotRevealSection className="p-8 border-b border-[#2a2a2a] space-y-6">
          <AnimateOnScroll as="h3" className="text-sm font-mono uppercase text-white">
            SOCIALS
          </AnimateOnScroll>

          <AnimateOnScroll className="text-base text-[#7a7a7a] space-y-1">
            <p>
              My mail is{' '}
              <a
                href="mailto:omkar.uxdesign@gmail.com"
                className="text-white underline underline-offset-4 hover:opacity-80 transition-opacity"
              >
                omkar.uxdesign@gmail.com
              </a>
            </p>
            <p>
              Mostly I am active on LinkedIn and Peerlist but, here&apos;s everything.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll className="grid grid-cols-4 border border-[#2a2a2a]">
            <a
              href="https://linkedin.com/in/omkarmangalekar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-8 border-r border-[#2a2a2a] hover:bg-[#111111] transition-colors"
            >
              <Image src="/socials/linkedin.svg" alt="LinkedIn" width={32} height={32} />
            </a>
            <a
              href="https://medium.com/@mangalekarom"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-8 border-r border-[#2a2a2a] hover:bg-[#111111] transition-colors"
            >
              <Image src="/socials/medium.svg" alt="Medium" width={32} height={32} />
            </a>
            <a
              href="https://behance.net/omkarmangalekar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-8 border-r border-[#2a2a2a] hover:bg-[#111111] transition-colors"
            >
              <Image src="/socials/behance.svg" alt="Behance" width={32} height={32} />
            </a>
            <a
              href="https://peerlist.io/omkarux"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-8 hover:bg-[#111111] transition-colors"
            >
              <Image src="/socials/peerlist.svg" alt="Peerlist" width={32} height={32} />
            </a>
          </AnimateOnScroll>
        </DotRevealSection>

        {/* Footer Section */}
        <DotRevealSection className="p-8 py-12 text-center">
          <AnimateOnScroll as="h3" className="text-sm font-mono uppercase text-white" delay={100}>
            THANK YOU FOR YOUR PRECIOUS TIME!
          </AnimateOnScroll>
          <AnimateOnScroll as="p" className="text-sm text-[#6a6a6a]" delay={200}>
            Made with love and curiosity, by Me and Claude :)
          </AnimateOnScroll>
        </DotRevealSection>

      {/* Case Study Blog Viewer */}
      {activeBlogCaseStudy && (
        <CaseStudyBlogViewer
          study={activeBlogCaseStudy}
          isOpen={true}
          onClose={closeBlogViewer}
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
