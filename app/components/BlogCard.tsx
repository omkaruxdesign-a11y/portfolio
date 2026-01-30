'use client';

import Image from 'next/image';

interface BlogCardProps {
  title: string;
  image: string;
  excerpt: string;
  date: string;
  link: string;
}

export default function BlogCard({ title, image, excerpt, date, link }: BlogCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col sm:flex-row gap-2 p-2 rounded-xl hover:bg-[#222222] transition-all duration-300 cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative w-full sm:w-[200px] aspect-video flex-shrink-0 rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, 200px"
          quality={80}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <h4 className="text-lg font-medium text-white line-clamp-2">
          {title}
        </h4>
        <p className="text-sm text-[#A1A1A1] line-clamp-2 mb-6">
          {excerpt}
        </p>
        <span className="text-sm text-[#6a6a6a]">
          {date}
        </span>
      </div>
    </a>
  );
}
