'use client';

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { User, ArrowUpRight, X, Plus, ArrowUpRightIcon } from "@phosphor-icons/react";
import ImageSlider, { SliderImage } from "./components/ImageSlider";
import ImageViewer, { ViewerImage } from "./components/ImageViewer";
import AutoScrollSlider, { AutoScrollImage } from "./components/AutoScrollSlider";
import BlogCard from "./components/BlogCard";
import CaseStudyViewer, { CaseStudy } from "./components/CaseStudyViewer";

// Reusable animated wrapper component for scroll-triggered animations
function AnimateOnScroll({
  children,
  className = "",
  threshold = 0.15,
  as = 'div',
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  as?: 'div' | 'h3' | 'p' | 'span' | 'section' | 'footer';
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  const combinedClassName = `animate-on-scroll ${isInView ? 'in-view' : ''} ${className}`;
  const style = delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;

  // Use specific elements based on `as` prop
  if (as === 'h3') return <h3 ref={ref as React.RefObject<HTMLHeadingElement>} className={combinedClassName} style={style}>{children}</h3>;
  if (as === 'p') return <p ref={ref as React.RefObject<HTMLParagraphElement>} className={combinedClassName} style={style}>{children}</p>;
  if (as === 'span') return <span ref={ref as React.RefObject<HTMLSpanElement>} className={combinedClassName} style={style}>{children}</span>;
  if (as === 'section') return <section ref={ref as React.RefObject<HTMLElement>} className={combinedClassName} style={style}>{children}</section>;
  if (as === 'footer') return <footer ref={ref as React.RefObject<HTMLElement>} className={combinedClassName} style={style}>{children}</footer>;

  return <div ref={ref} className={combinedClassName} style={style}>{children}</div>;
}

interface BlogPost {
  title: string;
  image: string;
  excerpt: string;
  date: string;
  link: string;
}

const blogsData: BlogPost[] = [
  {
    title: "How an Indian boy discovers about finance",
    image: "/blogs/Finance.jpg",
    excerpt: "Every young boy has his own story of learning about finance, compounding, and basically everything money-related.",
    date: "Jun 22, 2025",
    link: "https://medium.com/@mangalekarom/how-an-indian-boy-discovers-personal-finance-147eb406f58e",
  },
  {
    title: "What's a privilege for you?",
    image: "/blogs/privilege.jpg",
    excerpt: "This is a reminder for you to do great things in your life time. If you are reading this you are privileged enough",
    date: "Oct 04, 2024",
    link: "https://medium.com/@mangalekarom/whats-a-privilege-for-you-297133684abb",
  },
  {
    title: "Judge a book by it's cover",
    image: "/blogs/book1.jpg",
    excerpt: "This maybe a contrary opinion to the. Don't judge a book by it's cover. But I think there's something practically wrong with it. No matter how much you try to accept it, people do judge a book by it's cover.",
    date: "Jul 18, 2024",
    link: "https://medium.com/@mangalekarom/judge-a-book-by-its-cover-9b621826a9ea",
  },
];

const uxShortsImages: SliderImage[] = [
  { src: "/uxshorts/tidy.png", name: "Tidy", icon: "/uxshorts/tidy.png" },
  { src: "/uxshorts/skillswap.png", name: "SkillSwap", icon: "/uxshorts/skillswap.png" },
  { src: "/uxshorts/supermoney.png", name: "SuperMoney", icon: "/uxshorts/supermoney.png" },
  { src: "/uxshorts/linkedin.png", name: "LinkedIn Redesign", icon: "/uxshorts/linkedin.png" },
  { src: "/uxshorts/wist.png", name: "Wist", icon: "/uxshorts/wist.png" },
];

const offScreenImages: AutoScrollImage[] = [
  { src: "/offscreen/2.jpeg", description: "The light house in Vengurla" },
  { src: "/offscreen/3.jpeg", description: "Diwali" },
  { src: "/offscreen/5.jpeg", description: "Was worth the hike!" },
  { src: "/offscreen/6.jpeg", description: "Highest peak in Maharashtra...check!" },
  { src: "/offscreen/12.jpg", description: "Long exposure for the first time" },
  { src: "/offscreen/book1.jpg", description: "Book that showed me a structure to work (Not that I applied it though:)" },
  { src: "/offscreen/book2.jpg", description: "Love reading about people who've achieved something in life" },
  { src: "/offscreen/book3.jpg", description: "Read this one in a train journey. Great one!" },
  { src: "/offscreen/7.jpg", description: "Shimla, the only place I loved except Kolhapur (my hometown)" },
];

const caseStudiesData: CaseStudy[] = [
  {
    id: "opinex",
    title: "Opinex - Fantasy Sports",
    metadata: "Work • App • Feb 2025",
    description: "A fantasy sports platform for opinion trading with some USPs",
    impact: [
      "Enabled 500+ pre-beta users to test MVP and provide iterative feedback",
      "Reduced onboarding drop-off by 30% through simplified user flows",
      "Helped stakeholders validate product-market fit before full development",
    ],
    thumbnail: "/works/opinex/1.jpg",
    images: [
      "/works/opinex/1.jpg",
      "/works/opinex/2.jpg",
      "/works/opinex/3.jpg",
      "/works/opinex/4.jpg",
      "/works/opinex/5.jpg",
    ],
  },
  {
    id: "nothing",
    title: "Essential Suggestions",
    metadata: "Concept • App-Widget • 2025",
    description: "This was my submission for Nothing's Community submissions where community submits their ideas of app-widgets and Nothing then chooses one and works with that person. It was quite an experience, worked on something different than usual phone/web things.",
    impact: [
      "Designed for Nothing's widget ecosystem reaching 1M+ device users",
      "Created interaction patterns optimized for quick glanceable information",
      "Submission recognized in Nothing's community review process",
    ],
    thumbnail: "/works/nothing/1.png",
    images: [
      "/works/nothing/1.png",
      "/works/nothing/2.png",
      "/works/nothing/3.png",
      "/works/nothing/4.png",
      "/works/nothing/5.png",
      "/works/nothing/6.png",
      "/works/nothing/7.png",
      "/works/nothing/8.png",
      "/works/nothing/9.png",
      "/works/nothing/10.png",
      "/works/nothing/11.png",
      "/works/nothing/12.png",
      "/works/nothing/13.png",
    ],
  },
  {
    id: "micro-ott",
    title: "Micro OTT Platform",
    metadata: "App • Entertainment • Sept 2025",
    description: "A micro-OTT platform which has vertically shot content which has bite sized video content.",
    impact: [
      "Designed for 15-second average session engagement target",
      "Created content discovery flow reducing browse-to-watch time by 40%",
      "Optimized for vertical-first mobile consumption patterns",
    ],
    thumbnail: "/works/micro-ott/1.jpg",
    images: [
      "/works/micro-ott/1.jpg",
      "/works/micro-ott/2.jpg",
    ],
  },
  {
    id: "mshps",
    title: "MSHPS - Police Housing Corp. ",
    metadata: "Web-App • Gov-Tech • Jan 2025",
    description: "This was a proposal kind-of design for a government organization which takes care of all the finances related to the police department",
    impact: [
      "Simplified 12-step financial workflow to 5 steps for 1000+ employees",
      "Proposed design reducing average task completion time by 50%",
      "Modernized interface for improved accessibility compliance",
    ],
    thumbnail: "/works/mshps/1.png",
    images: [
      "/works/mshps/1.png",
      "/works/mshps/2.png",
      "/works/mshps/3.png",
      "/works/mshps/4.png",
      "/works/mshps/5.png",
    ],
  },
  {
    id: "futura",
    title: "Futura",
    metadata: "Concept • AR/VR • Jan 2025",
    description: "This was a random problem statement I took on to explore what all can I do with my creative thinking",
    impact: [
      "Explored spatial UI patterns for immersive environments",
      "Designed gesture-based interactions reducing cognitive load",
      "Created concept showcasing future-forward design thinking",
    ],
    thumbnail: "/works/futura/1.png",
    images: [
      "/works/futura/1.png",
      "/works/futura/2.png",
      "/works/futura/3.png",
      "/works/futura/4.png",
      "/works/futura/5.png",
      "/works/futura/6.png",
      "/works/futura/7.png",
      "/works/futura/8.png",
      "/works/futura/9.png",
    ],
  },
  {
    id: "airbook",
    title: "Airbook UX Audit",
    metadata: "Web-App • SaaS • Feb 2025",
    description: "Currently its, The AI-powered analytics workspace where teams bring all their data in one place, explore what's driving revenue, and act on it. Back then Audited their platform for any UX issues",
    impact: [
      "Identified 15+ critical usability issues affecting user retention",
      "Recommendations projected to improve onboarding completion by 25%",
      "Delivered actionable audit report within 2-week timeline",
    ],
    thumbnail: "/works/airbook/thumbnail.jpg",
    images: [
      "/works/airbook/01.png",
      "/works/airbook/02.png",
      "/works/airbook/03.png",
      "/works/airbook/4.png",
      "/works/airbook/5.png",
      "/works/airbook/6.png",
      "/works/airbook/7.png",
      "/works/airbook/8.png",
      "/works/airbook/9.png",
      "/works/airbook/10.png",
      "/works/airbook/11.png",
      "/works/airbook/12.png",
      "/works/airbook/13.png",
    ],
  },
  {
    id: "intro-design",
    title: "Introduction to Design",
    metadata: "Personal • Presentation • Oct 2025",
    description: "This was when my professors from the college asked me to deliver a session on Design. Made this deck to help students understand what design in tech world really is. Hope I helped someone find their interest!",
    impact: [
      "Delivered session to 50+ engineering students",
      "3 students reached out expressing interest in design careers",
      "Created presentation deck for future sessions",
    ],
    thumbnail: "/works/intro-design/1.jpg",
    images: [
      "/works/intro-design/1.jpg",
      "/works/intro-design/2.jpg",
      "/works/intro-design/3.jpg",
      "/works/intro-design/4.jpg",
      "/works/intro-design/5.jpg",
      "/works/intro-design/6.jpg",
      "/works/intro-design/7.jpg",
      "/works/intro-design/8.jpg",
      "/works/intro-design/9.jpg",
      "/works/intro-design/10.jpg",
      "/works/intro-design/11.jpg",
      "/works/intro-design/12.jpg",
      "/works/intro-design/13.jpg",
      "/works/intro-design/14.jpg",
      "/works/intro-design/15.jpg",
    ],
  },
];

const companyCaseStudies: CaseStudy[] = [
  {
    id: "hyperly",
    title: "Hyperly",
    metadata: "Web-App • SaaS • Jun 2024 - Nov 2024",
    description: "AI-powered LinkedIn marketing automation platform which was helped sales teams and founders to have a good distribution on LinkedIn and crack more leads",
    impact: [
      "Designed product from 0 to 1 serving 20+ active users",
      "Built mini design system reducing design-to-dev handoff time by 40%",
      "Contributed to 3x growth in user engagement during tenure",
    ],
    images: [
      "/intro/hyperly/1.png",
      "/intro/hyperly/2.png",
      "/intro/hyperly/3.png",
      "/intro/hyperly/4.png",
      "/intro/hyperly/5.png",
      "/intro/hyperly/6.png",
      "/intro/hyperly/7.png",
    ],
  },
  {
    id: "vestorgrow",
    title: "VestorGrow",
    metadata: "Web-App • Social Media • Mar 2024 - Jun 2024",
    description: "Social Media platform for personal growth focusing on Personal Finance, Mental Health and Career Growth",
    impact: [
      "Designed social media profile page focusing on skills and works of the users",
      "Created scalable component library for rapid feature development",
    ],
    images: [
      "/intro/vestorgrow/1.png",
      "/intro/vestorgrow/2.png",
      "/intro/vestorgrow/3.png",
      "/intro/vestorgrow/4.png",
      "/intro/vestorgrow/5.png",
    ],
  },
];

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUxViewerOpen, setIsUxViewerOpen] = useState(false);
  const [isOffScreenViewerOpen, setIsOffScreenViewerOpen] = useState(false);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
  const [isCompanyCaseStudyOpen, setIsCompanyCaseStudyOpen] = useState(false);
  const [currentUxImageIndex, setCurrentUxImageIndex] = useState(0);
  const [currentOffScreenImageIndex, setCurrentOffScreenImageIndex] = useState(0);
  const [currentCaseStudyIndex, setCurrentCaseStudyIndex] = useState(0);
  const [currentCompanyCaseStudyIndex, setCurrentCompanyCaseStudyIndex] = useState(0);
  const [showAllWorks, setShowAllWorks] = useState(false);

  // Trigger animations after component mounts to prevent flash of content
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Track if modal was closed via back button to avoid double history.back()
  const closedViaBackRef = useRef(false);

  // Handle browser back button to close modals
  useEffect(() => {
    const handlePopState = () => {
      closedViaBackRef.current = true;
      // Close all modals when back is pressed
      setIsModalOpen(false);
      setIsUxViewerOpen(false);
      setIsOffScreenViewerOpen(false);
      setIsCaseStudyOpen(false);
      setIsCompanyCaseStudyOpen(false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Push history state when any modal opens
  useEffect(() => {
    const isAnyModalOpen = isModalOpen || isUxViewerOpen || isOffScreenViewerOpen || isCaseStudyOpen || isCompanyCaseStudyOpen;

    if (isAnyModalOpen) {
      closedViaBackRef.current = false;
      window.history.pushState({ modal: true }, '');
    }
  }, [isModalOpen, isUxViewerOpen, isOffScreenViewerOpen, isCaseStudyOpen, isCompanyCaseStudyOpen]);

  // Close handlers that also handle history
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    if (!closedViaBackRef.current) window.history.back();
  }, []);

  const closeUxViewer = useCallback(() => {
    setIsUxViewerOpen(false);
    if (!closedViaBackRef.current) window.history.back();
  }, []);

  const closeOffScreenViewer = useCallback(() => {
    setIsOffScreenViewerOpen(false);
    if (!closedViaBackRef.current) window.history.back();
  }, []);

  const closeCaseStudy = useCallback(() => {
    setIsCaseStudyOpen(false);
    if (!closedViaBackRef.current) window.history.back();
  }, []);

  const closeCompanyCaseStudy = useCallback(() => {
    setIsCompanyCaseStudyOpen(false);
    if (!closedViaBackRef.current) window.history.back();
  }, []);

  const handleUxImageClick = (index: number) => {
    setCurrentUxImageIndex(index);
    setIsUxViewerOpen(true);
  };

  const handleOffScreenImageClick = (index: number) => {
    setCurrentOffScreenImageIndex(index);
    setIsOffScreenViewerOpen(true);
  };

  const handleCaseStudyClick = (index: number) => {
    setCurrentCaseStudyIndex(index);
    setIsCaseStudyOpen(true);
  };

  const handleCompanyCaseStudy = (id: string) => {
    const index = companyCaseStudies.findIndex(cs => cs.id === id);
    if (index !== -1) {
      setCurrentCompanyCaseStudyIndex(index);
      setIsCompanyCaseStudyOpen(true);
    }
  };

  const visibleBlogs = blogsData;

  // Convert images to ViewerImage format
  const uxViewerImages: ViewerImage[] = uxShortsImages.map(img => ({
    src: img.src,
    label: img.name,
  }));

  const offScreenViewerImages: ViewerImage[] = offScreenImages.map(img => ({
    src: img.src,
    label: img.description,
  }));

  return (
    <div className="min-h-screen bg-black font-sans">
      <main className="mx-auto max-w-[650px] px-6 py-16">

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

        /* Works grid item animation */
        @keyframes workItemFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .work-item {
          animation: workItemFadeIn 0.4s ease-out forwards;
        }

        .work-item-delay-1 { animation-delay: 0ms; }
        .work-item-delay-2 { animation-delay: 50ms; }
        .work-item-delay-3 { animation-delay: 100ms; }
        .work-item-delay-4 { animation-delay: 150ms; }
        .work-item-delay-5 { animation-delay: 200ms; }
        .work-item-delay-6 { animation-delay: 250ms; }
        .work-item-delay-7 { animation-delay: 300ms; }
      `}</style>
        {/* Hero Section */}
        <section className={`flex flex-col items-start gap-2 mb-20 ${isLoaded ? 'animate-blur-fade-in animate-delay-1' : 'opacity-0'}`}>
          {/* Profile Image */}
          <div className="rounded-full ">
          <Image
                  src="/logos/profile-pic.png"
                  alt="Hyperly logo"
                  width={40}
                  height={40}
                  className="rounded-sm"
                />
          </div>

          {/* Heading Text */}
          <div className="text-start">
            <h1 className="text-2xl leading-relaxed -mb-2">
              <span className="text-[#7a7a7a]">Hi, I am </span>
              <span className="text-white font-regular">Omkar</span>
            </h1>
            <h2 className="text-2xl leading-relaxed mb-6">
              <span className="text-[#7a7a7a]">and I love things that </span>
              <span className="text-white font-regular">add value to lives</span>
            </h2>
          </div>

          {/* Tagline */}
          <p className="text-lg text-[#7a7a7a] text-start w-full">
            A <span className="text-white font-regular">Product Designer</span> now and a learner forever
          </p>
        </section>

        {/* INTRO Section */}
        <section className={`space-y-6 ${isLoaded ? 'animate-blur-fade-in animate-delay-2' : 'opacity-0'}`}>
          {/* Section Heading */}
          <h3 className="text-base font-mono uppercase tracking-wider text-white">
            INTRO
          </h3>

          {/* Body Text */}
          <div className="text-lg text-[#7a7a7a] leading-relaxed space-y-4">
            <p>
              I have been a{' '}
              <a

                className="text-white "
              >
                product designer
              </a>{' '}
              for{' '}
              <a

                className="text-white"
              >
                2+ years
              </a>{' '}
              now, started with freelancing and later focused on giving early stage start-ups an Headstart they need.
            </p>

            <p>
              Currently doing the same for{' '}
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-1 text-white underline hover:opacity-80 underline-offset-4 align-middle cursor-pointer"
              >
                <Image
                  src="/logos/socialsonar.png"
                  alt="SocialSonar logo"
                  width={18}
                  height={18}
                  className="rounded-sm"
                />
                SocialSonar
              </button>
              , prev. at{' '}
              <button
                onClick={() => handleCompanyCaseStudy('hyperly')}
                className="inline-flex items-center gap-1 text-[#7a7a7a] hover:text-white underline underline-offset-4 group align-middle cursor-pointer"
              >
                <Image
                  src="/logos/hyperly.png"
                  alt="Hyperly logo"
                  width={18}
                  height={18}
                  className="rounded-sm grayscale group-hover:grayscale-0"
                />
                Hyperly
              </button>{' '}
              and{' '}
              <button
                onClick={() => handleCompanyCaseStudy('vestorgrow')}
                className="inline-flex items-center gap-1 text-[#7a7a7a] hover:text-white group underline underline-offset-4 align-middle cursor-pointer"
              >
                <Image
                  src="/logos/vestorgrow.png"
                  alt="VestorGrow logo"
                  width={18}
                  height={18}
                  className="rounded-sm grayscale group-hover:grayscale-0"
                />
                VestorGrow
              </button>
            </p>
          </div>
        </section>

        {/* WORKS Section */}
        <section className={`space-y-6 mt-20 ${isLoaded ? 'animate-blur-fade-in animate-delay-3' : 'opacity-0'}`}>
          {/* Section Heading */}
          <h3 className="text-base font-mono uppercase tracking-wider text-white">
            WORKS
          </h3>

          {/* Description */}
          <p className="text-lg text-[#7a7a7a] leading-relaxed">
            Here's a glimpse of the work I have done recently. Includes professional and hobbyist works
          </p>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {(showAllWorks ? caseStudiesData : caseStudiesData.slice(0, 4)).map((caseStudy, index) => (
              <div
                key={caseStudy.id}
                onClick={() => handleCaseStudyClick(index)}
                className={`cursor-pointer group ${index >= 4 ? `work-item work-item-delay-${index - 3}` : ''}`}
                style={index >= 4 ? { opacity: 0 } : undefined}
              >
                <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-3">
                  <Image
                    src={caseStudy.thumbnail || caseStudy.images[0]}
                    alt={caseStudy.title}
                    fill
                    className="object-cover transition-all duration-300 group-hover:brightness-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                    priority={index < 2}
                  />
                </div>
                <h4 className="text-lg font-regular text-white mb-1 group-hover:underline underline-offset-2">
                  {caseStudy.title}
                </h4>
              </div>
            ))}
          </div>

          {/* View More/Less Button */}
          {caseStudiesData.length > 4 && (
            <button
              onClick={() => setShowAllWorks(!showAllWorks)}
              className="w-full flex items-center cursor-pointer font-mono justify-center gap-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white text-sm font-regular uppercase py-3 rounded-full transition-colors group"
            >
              {showAllWorks ? (
                <>
                  <X size={18} weight="bold" className="text-[#6a6a6a] group-hover:text-white" />
                  View Less
                </>
              ) : (
                <>
                  <Plus size={18} weight="bold" className="text-[#6a6a6a] group-hover:text-white" />
                  View More
                </>
              )}
            </button>
          )}
        </section>

        {/* CURRENTLY LEARNING Section */}
        <section className="space-y-6 mt-20">
          {/* Section Heading */}
          <AnimateOnScroll as="h3" className="text-base font-mono uppercase tracking-wider text-white">
            CURRENTLY LEARNING
          </AnimateOnScroll>

          {/* Intro Text */}
          <AnimateOnScroll className="text-lg text-[#7a7a7a] leading-relaxed space-y-4">
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

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* Card 1: Lentlay */}
            <AnimateOnScroll className="bg-[#1a1a1a] rounded-xl gap-2 p-2 flex flex-col">
              <div className="flex items-start gap-4">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src="/currently learning/lentlay.png"
                    alt="Lentlay logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Lentlay</h4>
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
            </AnimateOnScroll>

            {/* Card 2: Secards */}
            <AnimateOnScroll className="bg-[#1a1a1a] rounded-xl gap-2 p-2 flex flex-col">
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
                  <h4 className="text-lg font-medium text-white">Secards</h4>
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
            </AnimateOnScroll>
          </div>
        </section>

        {/* UX SHORTS Section */}
        <section className="space-y-6 mt-20">
          {/* Section Heading */}
          <AnimateOnScroll as="h3" className="text-base font-mono uppercase text-white">
            UX SHORTS
          </AnimateOnScroll>

          {/* Description */}
          <AnimateOnScroll as="p" className="text-lg text-[#7a7a7a] leading-relaxed">
            Bites of some random ideas I had in mind...
          </AnimateOnScroll>

          {/* Image Slider */}
          <AnimateOnScroll>
            <ImageSlider images={uxShortsImages} onImageClick={handleUxImageClick} />
          </AnimateOnScroll>
        </section>

        {/* BLOGS Section */}
        <section className="space-y-6 mt-20">
          {/* Section Heading */}
          <AnimateOnScroll as="h3" className="text-base font-mono uppercase tracking-wider text-white">
            BLOGS
          </AnimateOnScroll>

          {/* Description */}
          <AnimateOnScroll as="p" className="text-lg text-[#7a7a7a]">
            I love to write more than reading. I write about anything I think
          </AnimateOnScroll>

          {/* Blog Cards */}
          <div className="flex flex-col gap-2">
            {visibleBlogs.map((blog, index) => (
              <AnimateOnScroll key={index}>
                <BlogCard
                  title={blog.title}
                  image={blog.image}
                  excerpt={blog.excerpt}
                  date={blog.date}
                  link={blog.link}
                />
              </AnimateOnScroll>
            ))}
          </div>

          {/* View More Button */}
          <AnimateOnScroll>
            <a
              href="https://medium.com/@mangalekarom"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] group text-white text-sm font-mono font-regular uppercase py-3 rounded- transition-colors rounded-full"
            >
              View more on Medium
              <ArrowUpRightIcon size={18} weight="regular" className="text-[#6a6a6a] group-hover:text-white" />
            </a>
          </AnimateOnScroll>
        </section>

        {/* SOCIALS section */}
        <section className="space-y-6 mt-20">
          {/* section heading */}
          <AnimateOnScroll as="h3" className="text-base font-mono uppercase tracking-wider text-white">
            SOCIALS
          </AnimateOnScroll>

          {/* Intro text */}
          <AnimateOnScroll className="text-lg text-[#7a7a7a] leading-relaxed space-y-4">
            <p>
              My mail is {' '}
              <span className="text-white font-regular">omkar.uxdesign@gmail.com</span>
              {' '} . Mostly I am active on {' '}
              <a
              href="https://linkedin.com/in/omkarmangalekar"
              className="text-white underline underline-offset-4 hover:opacity-80 transition-opacity"
              target="_blank"
              >
              LinkedIn
              </a>
              {' '} and {' '}
              <a
              href="https://peerlist.io/omkarux"
              className="text-white underline underline-offset-4 hover:opacity-80 transition-opacity"
              target="_blank"
              >
              Peerlist
              </a>
              {' '} but, here's everything.
            </p>
          </AnimateOnScroll>

          {/* Social links */}
          <AnimateOnScroll className="grid grid-cols-4 gap-4">
            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/omkarmangalekar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center aspect-square bg-[#1a1a1a] rounded-lg hover:bg-[#2a2a2a] transition-colors p-4"
            >
              <Image
                src="/socials/linkedin.svg"
                alt="LinkedIn"
                width={32}
                height={32}

              />
            </a>

            {/* Medium */}
            <a
              href="https://medium.com/@mangalekarom"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center aspect-square bg-[#1a1a1a] rounded-lg hover:bg-[#2a2a2a] transition-colors p-4"
            >
              <Image
                src="/socials/medium.svg"
                alt="Medium"
                width={32}
                height={32}

              />
            </a>

            {/* Behance */}
            <a
              href="https://behance.net/omkarmangalekar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center aspect-square bg-[#1a1a1a] rounded-lg hover:bg-[#2a2a2a] transition-colors p-4"
            >
              <Image
                src="/socials/behance.svg"
                alt="Behance"
                width={32}
                height={32}

              />
            </a>

            {/* Peerlist */}
            <a
              href="https://peerlist.io/omkarux"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center aspect-square bg-[#1a1a1a] rounded-lg hover:bg-[#2a2a2a] transition-colors p-4"
            >
              <Image
                src="/socials/peerlist.svg"
                alt="Peerlist"
                width={32}
                height={32}

              />
            </a>
          </AnimateOnScroll>

        </section>

        {/* OFF SCREEN Section */}
        <section className="space-y-6 mt-20">
          {/* Section Heading */}
          <AnimateOnScroll as="h3" className="text-base font-mono uppercase tracking-wider text-white">
            OFF SCREEN
          </AnimateOnScroll>

          {/* Intro Text */}
          <AnimateOnScroll className="text-lg text-[#7a7a7a] leading-relaxed space-y-4">
            <p>
              Well, when I am not around – I am busy saving Gotham. I AM BATMAN... Just kidding :)
            </p>
            <p>
              I love to travel and click pictures and videos, which I post{' '}
              <a
                href="https://instagram.com/omkar_.27_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4 hover:opacity-80 transition-opacity"
              >
                here
              </a>
              {' '}. Not for any output, just for personal documentation. I love OBSERVING{' '}
              <span className="text-white font-regular ">films</span>
              {' '}and noticing the small details in it. {' '} 
              <a
                href="https://www.imdb.com/title/tt0359950/" 
                className="text-white font-regular underline underline-offset-4 transition-opacity cursor-pointer hover:opacity-80"
                >
                  The Secret Life of Walter Mitty
                
                </a> {' '} is something that I can watch anytime. 
            </p>
            <p>
              Would love to build something more human in the {' '}
              <span className="text-white font-regular">world of AI, with AI...</span>
            </p>
          </AnimateOnScroll>

          {/* Auto-scrolling Image Slider */}
          <AnimateOnScroll className="pt-4">
            <AutoScrollSlider images={offScreenImages} onImageClick={handleOffScreenImageClick} />
          </AnimateOnScroll>
        </section>

        {/* Footer Section */}
        <footer className="mt-24 pb-2 text-center">
          <AnimateOnScroll as="h3" className="text-sm font-mono uppercase text-white" delay={100}>
            THANK YOU FOR YOUR PRECIOUS TIME!
          </AnimateOnScroll>
          <AnimateOnScroll as="p" className="text-sm text-[#6a6a6a]" delay={200}>
            Made with love and curiosity, by Me and Claude :)
          </AnimateOnScroll>
        </footer>
      </main>

      {/* UX Shorts Image Viewer/Lightbox */}
      <ImageViewer
        images={uxViewerImages}
        currentIndex={currentUxImageIndex}
        isOpen={isUxViewerOpen}
        onClose={closeUxViewer}
        onNavigate={setCurrentUxImageIndex}
      />

      {/* Off Screen Image Viewer/Lightbox */}
      <ImageViewer
        images={offScreenViewerImages}
        currentIndex={currentOffScreenImageIndex}
        isOpen={isOffScreenViewerOpen}
        onClose={closeOffScreenViewer}
        onNavigate={setCurrentOffScreenImageIndex}
        useCenteredView={true}
      />

      {/* Case Study Viewer */}
      <CaseStudyViewer
        caseStudies={caseStudiesData}
        currentIndex={currentCaseStudyIndex}
        isOpen={isCaseStudyOpen}
        onClose={closeCaseStudy}
        onNavigate={setCurrentCaseStudyIndex}
      />

      {/* Company Case Study Viewer (Hyperly, VestorGrow) */}
      <CaseStudyViewer
        caseStudies={companyCaseStudies}
        currentIndex={currentCompanyCaseStudyIndex}
        isOpen={isCompanyCaseStudyOpen}
        onClose={closeCompanyCaseStudy}
        onNavigate={setCurrentCompanyCaseStudyIndex}
        showNavigation={false}
      />

      {/* Modal for SocialSonar */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 z-50 modal-backdrop"
          onClick={closeModal}
        >
          <div
            className="bg-zinc-900 rounded-lg p-4 max-w-lg w-full modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://socialsonar.app"
                className="flex p-2 hover:bg-[#464646] rounded-md  items-center justify-between mb-2 group">

              <div className="flex items-center gap-2">
              <Image
                  src="/logos/socialsonar.png"
                  alt="Hyperly logo"
                  width={32}
                  height={32}
                  className="rounded-sm"
                />
                <h3 className="text-[18px] font-regular text-white">SocialSonar</h3>
              </div>
              <button
              
                className="text-gray-400 group-hover:text-white transition-colors"
              >
                <ArrowUpRightIcon size={18}/>
              
              </button>
            </a>

            <div className="h-[1px] w-full bg-[#363636]"></div>

            <p className="text-[#7a7a7a] text-[18px] mt-2">
            Been working here as the {' '} 
            <span className="text-white">founding designer from April 2025</span>
            {' '} and have learnt tremendous amounts of things 
            related to collaboration, development, product thinking, market-fit, Sales, Communication and what not!
            </p>
            
            <p className="text-[#7a7a7a] text-[18px] mt-2">
            I am responsible for the everything related to design may it be {' '} 
            <span className="text-white">product design, discussing direction with founders, 
            talking with users for iteration, designing pitch decks (even pitching sometimes), ensuring the design is implemented during development
            </span>
            </p>
            
            <p className="text-[#7a7a7a] text-[18px] mt-2">
            Being an early stage start-up shipping fast is important here. {' '} 
            <span className="text-white">Ship - Feedback - Iterate</span>{' '} is the flow that is being followed by the team here. Perfectionism is something I avoid at current stage,{' '}
            <span className="text-white">faster implementation</span> {' '}is at most crucial than pixel perfect designs
            </p>
            

          </div>
        </div>
      )}
    </div>
  );
}
