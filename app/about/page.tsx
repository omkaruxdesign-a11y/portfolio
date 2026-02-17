'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import SocialSonarModal from '../components/SocialSonarModal';
import MovieTooltip from '../components/MovieTooltip';
import OffScreenSlider from '../components/OffScreenSlider';
import DotRevealSection from '../components/DotRevealSection';

export default function AboutPage() {
  const [showSocialSonarModal, setShowSocialSonarModal] = useState(false);
  const [showMovieTooltip, setShowMovieTooltip] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
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
        <h1 className="relative text-3xl font-serif text-[#7a7a7a] mb-3">
          It&apos;s not easy to find{' '}
          <span className="text-white font-regular font-serif">passionate</span>
          {' '}people in the market!
        </h1>
        <p className="relative text-[#7a7a7a] text-base font-sans">
          – Learnt this when growing a team
        </p>
      </DotRevealSection>

      {/* SECTION 2: INTRO */}
      <DotRevealSection className={`border-b border-[#2a2a2a] p-8 ${isLoaded ? 'animate-blur-fade-in animate-delay-2' : 'opacity-0'}`}>
        <p className="relative text-sm font-mono uppercasetext-white mb-4">
          INTRO
        </p>

        <p className="relative text-[#7a7a7a] text-base leading-relaxed mb-6">
          I have been a{' '}
          <span className="text-white font-regular">product designer</span>
          {' '}for{' '}
          <span className="text-white font-regular">2 years</span>
          {' '}now, and later focused on giving early stage start-ups an Headstart they need.
        </p>

        {/* Experience list */}
        <div className="relative space-y-4">
          {/* SocialSonar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/logos/socialsonar.png"
                alt="SocialSonar"
                width={24}
                height={24}
                className="rounded-sm"
              />
              <button
                onClick={() => setShowSocialSonarModal(true)}
                className="text-white text-base underline underline-offset-4 hover:text-gray-300 transition-colors cursor-pointer"
              >
                SocialSonar
              </button>
            </div>
            <span className="text-[#7a7a7a] text-sm font-mono uppercase">
              Mar 2025 – Present
            </span>
          </div>

          {/* Hyperly */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/logos/hyperly.png"
                alt="Hyperly"
                width={24}
                height={24}
                className="rounded-sm"
              />
              <Link
                href="/intro/hyperly"
                className="text-white underline underline-offset-4 cursor-pointer hover:text-gray-300 transition-colors"
              >
                Hyperly
              </Link>
            </div>
            <span className="text-[#7a7a7a] uppercase text-sm font-mono">
              Jun 2024 – Nov 2024
            </span>
          </div>

          {/* VestorGrow */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/logos/vestorgrow.png"
                alt="VestorGrow"
                width={24}
                height={24}
                className="rounded-sm"
              />
              <Link
                href="/intro/vestorgrow"
                className="text-white underline underline-offset-4 cursor-pointer hover:text-gray-300 transition-colors"
              >
                VestorGrow
              </Link>
            </div>
            <span className="text-[#7a7a7a] uppercase text-sm font-mono">
              Mar 2024 – Jun 2024
            </span>
          </div>
        </div>

      </DotRevealSection>

      {/* SECTION 3: OFF SCREEN */}
      <DotRevealSection className={`border-b border-[#2a2a2a] p-8 ${isLoaded ? 'animate-blur-fade-in animate-delay-3' : 'opacity-0'}`}>
        <p className="relative text-sm font-mono uppercase tracking-wider text-white mb-4">
          OFF SCREEN
        </p>

        <p className="relative text-[#7a7a7a] text-base">
          Well, when I am not around – I am busy saving Gotham.
          <span className="text-white font-sans"> I AM BATMAN.</span>
        </p>

        <p className="relative text-[#7a7a7a] text-base mb-6">
          Just kidding :)
        </p>

        {/* Bat icon placeholder */}
        <div className="relative mb-6">
          <Image
            src="/logos/profile-pic.png"
            alt="Batman logo"
            width={67}
            height={24}
            className="object-contain"
          />
        </div>

        {/* Second paragraph with links */}
        <p className="relative text-[#7a7a7a] text-base leading-relaxed mb-4">
          I love to travel and click pictures and videos, which I post{' '}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline hover:text-gray-300"
          >
            here
          </a>
          . Not for any output, just for personal documentation.{' '}
          <span
            className="relative inline-block"
            onMouseEnter={() => setShowMovieTooltip(true)}
            onMouseLeave={() => setShowMovieTooltip(false)}
          >
            <span className="text-white font-regular underline underline-offset-4 cursor-pointer">
              The Secret Life of Walter Mitty
            </span>
            {showMovieTooltip && <MovieTooltip />}
          </span>
          {' '}is something that I can watch anytime.
        </p>

        <p className="relative text-[#7a7a7a] text-base mb-6">
          I love OBSERVING{' '}
          <span className="text-white font-regular">films</span>
          {' '}and noticing the small details in it.
        </p>

        {/* Auto scrolling image slider */}
        <div className="relative">
          <OffScreenSlider />
        </div>
      </DotRevealSection>

      {/* SECTION 4: Closing Quote */}
      <DotRevealSection className="p-8">
        <p className="relative text-white text-base font-sans">
          Ideas are overrated, execution is king
        </p>
        <p className="relative text-[#7a7a7a] text-base font-mono mt-2">
          - NAVAL
        </p>
      </DotRevealSection>

      {/* SocialSonar Modal - rendered at top level to escape stacking context */}
      {showSocialSonarModal && (
        <SocialSonarModal onClose={() => setShowSocialSonarModal(false)} />
      )}
    </div>
  );
}
