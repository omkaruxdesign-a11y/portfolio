'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from '@phosphor-icons/react';

interface SocialSonarModalProps {
  onClose: () => void;
}

export default function SocialSonarModal({ onClose }: SocialSonarModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md modal-backdrop"
      onClick={onClose}
    >
      <div
        className="relative bg-[#111111] border border-[#2a2a2a] rounded-lg max-w-md w-[90vw] p-6 modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <a
          href="https://socialsonar.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 mb-4 group"
        >
          <Image
            src="/logos/socialsonar.png"
            alt="SocialSonar"
            width={24}
            height={24}
            className="rounded-sm"
          />
          <span className="text-white text-lg font-medium hover:underline underline-offset-4">SocialSonar</span>
          <ArrowUpRight size={16} weight="bold" className="text-white/70 group-hover:text-white transition-colors" />
        </a>
        <p className="text-[#7a7a7a] text-base mb-4">
        Been working here as the founding designer from April 2025 and have learnt tremendous amounts of things related to collaboration, development, product thinking, market-fit, Sales, Communication and what not!.
        I am responsible for the everything related to design may it be product design, discussing direction with founders, talking with users for iteration, designing pitch decks (even pitching sometimes), ensuring the design is implemented during development
        Being an early stage start-up shipping fast is important here. Ship - Feedback - Iterate is the flow that is being followed by the team here. Perfectionism is something I avoid at current stage, faster implementation is at most crucial than pixel perfect designs
        </p>
        <p className="text-[#7a7a7a] text-sm font-mono">
          Mar 2025 – Present
        </p>
      </div>

      <style jsx global>{`
        @keyframes modalBackdropFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalContentFadeIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .modal-backdrop { animation: modalBackdropFadeIn 0.2s ease-out forwards; }
        .modal-content { animation: modalContentFadeIn 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}
