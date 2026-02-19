'use client';

import { use, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { caseStudiesData, getCaseStudyIndex } from '@/app/data/caseStudies';
import { getBlogCaseStudyById } from '@/app/data/blogCaseStudies';
import CaseStudyViewer from '@/app/components/CaseStudyViewer';
import CaseStudyBlogViewer from '@/app/components/CaseStudyBlogViewer';

export default function WorksModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const hasHistory = useRef(false);

  useEffect(() => {
    hasHistory.current = window.history.length > 1;
  }, []);

  const handleClose = () => {
    if (hasHistory.current) {
      router.back();
    } else {
      router.push('/works');
    }
  };

  if (id === 'intro-design') {
    const index = getCaseStudyIndex(id);

    if (index === -1) {
      router.back();
      return null;
    }

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

  const blogStudy = getBlogCaseStudyById(id);

  if (!blogStudy) {
    router.back();
    return null;
  }

  return (
    <CaseStudyBlogViewer
      study={blogStudy}
      isOpen={true}
      onClose={handleClose}
    />
  );
}
