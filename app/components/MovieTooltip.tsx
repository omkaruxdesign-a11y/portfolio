'use client';

import Image from 'next/image';

export default function MovieTooltip() {
  return (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none">
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-2 shadow-xl w-[200px]">
        <div className="relative w-full aspect-[2/3] rounded overflow-hidden mb-2">
          <Image
            src="/offscreen/movie.jpg"
            alt="The Secret Life of Walter Mitty"
            fill
            className="object-cover"
            sizes="200px"
          />
        </div>
        <p className="text-white text-xs font-medium text-center">
          The Secret Life of Walter Mitty
        </p>
        <p className="text-gray-400 text-[10px] text-center">
          2013 • Adventure, Comedy, Drama
        </p>
      </div>
    </div>
  );
}
