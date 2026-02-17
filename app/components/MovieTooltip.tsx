'use client';

import Image from 'next/image';
import { Quotes } from '@phosphor-icons/react';

export default function MovieTooltip() {
  return (
    <div
      id="movie-tooltip"
      role="tooltip"
      aria-label="Movie quote tooltip"
      className="absolute -left-32 translate-x-1/64 top-full mt-2 z-[9999] w-96 sm:w-[480px] bg-[#1a1a1a] rounded-lg shadow-2xl border border-[#1c1c1c] p-2 animate-tooltip"
    >
      <div className="flex gap-4">
        {/* Movie Poster */}
        <div className="flex-shrink-0">
          <Image
            src="/offscreen/movie.jpg"
            alt="The Secret Life of Walter Mitty movie poster"
            width={80}
            height={120}
            className="rounded object-cover"
          />
        </div>

        {/* Quote Content */}
        <div className="flex-1">
          <Quotes
            size={32}
            weight="fill"
            className="text-white mb-2"
          />
          <p className="text-white text-base font-extralight italic">
            To see the world, things dangerous to come to, to see behind walls, draw closer, to find each other and to feel. That is the purpose of life.
          </p>
        </div>
      </div>
    </div>
  );
}
