import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CaretLeft } from '@phosphor-icons/react/dist/ssr';
import { caseStudiesData, getCaseStudyById } from '@/app/data/caseStudies';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return caseStudiesData.map((study) => ({
    id: study.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const study = getCaseStudyById(id);

  if (!study) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: `${study.title} | Omkar Mangalekar`,
    description: study.description || `Case study: ${study.title}`,
    openGraph: {
      title: study.title,
      description: study.description || `Case study: ${study.title}`,
      images: study.thumbnail ? [study.thumbnail] : study.images.slice(0, 1),
    },
  };
}

export default async function WorksPage({ params }: Props) {
  const { id } = await params;
  const study = getCaseStudyById(id);

  if (!study) {
    notFound();
  }

  const sectionLabel = study.metadata.includes('Concept') || study.metadata.includes('Personal')
    ? 'LEARNINGS'
    : 'IMPACT';

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-[900px] mx-auto px-4 md:px-6 py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
        >
          <CaretLeft size={16} weight="bold" />
          <span className="text-sm font-mono uppercase">Back to Home</span>
        </Link>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {study.title}
          </h1>
          <p className="text-sm text-[#7a7a7a] mb-6">
            {study.metadata}
          </p>

          {/* Description */}
          {study.description && (
            <div className="mb-6">
              <h2 className="text-sm font-mono uppercase tracking-wider text-white mb-2">
                DESCRIPTION
              </h2>
              <p className="text-base text-[#7a7a7a] leading-relaxed">
                {study.description}
              </p>
            </div>
          )}

          {/* Impact/Learnings */}
          {study.impact && study.impact.length > 0 && (
            <div>
              <h2 className="text-sm font-mono uppercase tracking-wider text-white mb-2">
                {sectionLabel}
              </h2>
              <ul className="space-y-1">
                {study.impact.map((item, index) => (
                  <li key={index} className="text-base text-[#7a7a7a] leading-relaxed flex">
                    <span className="mr-3">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </header>

        {/* Images */}
        <div className="space-y-8">
          {study.images.map((imageSrc, index) => (
            <div
              key={index}
              className="relative w-full rounded-lg overflow-hidden"
            >
              <Image
                src={imageSrc}
                alt={`${study.title} - Page ${index + 1}`}
                width={900}
                height={600}
                className="object-contain rounded-lg w-full h-auto"
                loading={index < 2 ? 'eager' : 'lazy'}
                priority={index === 0}
                sizes="(max-width: 900px) 90vw, 900px"
                quality={85}
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <CaretLeft size={16} weight="bold" />
            <span className="text-sm font-mono uppercase">Back to Home</span>
          </Link>
        </footer>
      </div>
    </div>
  );
}
