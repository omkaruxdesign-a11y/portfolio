'use client';

import { use, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { companyCaseStudies, getCompanyCaseStudyIndex } from '@/app/data/caseStudies';
import CaseStudyViewer from '@/app/components/CaseStudyViewer';

export default function IntroModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const index = getCompanyCaseStudyIndex(id);
  const hasHistory = useRef(false);

  useEffect(() => {
    hasHistory.current = window.history.length > 1;
  }, []);

  if (index === -1) {
    router.back();
    return null;
  }

  const handleClose = () => {
    if (hasHistory.current) {
      router.back();
    } else {
      router.push('/about');
    }
  };

  const handleNavigate = (newIndex: number) => {
    const newId = companyCaseStudies[newIndex].id;
    router.replace(`/intro/${newId}`, { scroll: false });
  };

  return (
    <CaseStudyViewer
      caseStudies={companyCaseStudies}
      currentIndex={index}
      isOpen={true}
      onClose={handleClose}
      onNavigate={handleNavigate}
      showNavigation={false}
    />
  );
}
