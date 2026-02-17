'use client';

import { use, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { caseStudiesData, getCaseStudyIndex } from '@/app/data/caseStudies';
import CaseStudyViewer from '@/app/components/CaseStudyViewer';

export default function WorksModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const index = getCaseStudyIndex(id);
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
      router.push('/works');
    }
  };

  const handleNavigate = (newIndex: number) => {
    const newId = caseStudiesData[newIndex].id;
    router.replace(`/works/${newId}`, { scroll: false });
  };

  return (
    <CaseStudyViewer
      caseStudies={caseStudiesData}
      currentIndex={index}
      isOpen={true}
      onClose={handleClose}
      onNavigate={handleNavigate}
    />
  );
}
