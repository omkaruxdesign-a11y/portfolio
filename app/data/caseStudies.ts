export interface CaseStudy {
  id: string;
  title: string;
  subtext: string;
  isNDA: boolean;
  metadata: string;
  description?: string;
  impact?: string[];
  thumbnail?: string;
  images: string[];
}

export const caseStudiesData: CaseStudy[] = [
  {
    id: "opinex",
    title: "Opinex - Fantasy Sports",
    subtext: "Mobile app • Fast execution • Visual design ",
    isNDA: true,
    metadata: "Work • App • Feb 2025",
    description: "A fantasy sports platform for opinion trading for local events",
    impact: [
      "Enabled 500+ pre-beta users to test MVP and provide iterative feedback",
      "Reduced onboarding drop-off by 30% through simplified user flows",
      "Helped stakeholders validate product-market fit before full development",
    ],
    thumbnail: "/works/opinex/1.png",
    images: [
      "/works/opinex/1.png",
      "/works/opinex/2.png",
      "/works/opinex/3.png",
      "/works/opinex/4.png",
      "/works/opinex/5.png",
    ],
  },
  {
    id: "nothing",
    title: "Essential Suggestions",
    subtext: "Mobile widget • visual • Product thinking",
    isNDA: false,
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
    id: "mshps",
    title: "MSHPS - Police Housing Corp. ",
    subtext: "Web-app • User flows • Product thinking",
    isNDA: true,
    metadata: "Web-App • Gov-Tech • Jan 2025",
    description: "This was a proposal design for a government organization which takes care of all the finances related to the police department",
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
    id: "intro-design",
    title: "Introduction to Design",
    subtext: "Presentation Deck ",
    isNDA: false,
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

export const companyCaseStudies: CaseStudy[] = [
  {
    id: "hyperly",
    title: "Hyperly",
    subtext: "AI-powered LinkedIn marketing automation platform",
    isNDA: false,
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
    subtext: "Social media platform for personal growth",
    isNDA: false,
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

// Helper functions
export function getCaseStudyById(id: string): CaseStudy | undefined {
  return caseStudiesData.find(cs => cs.id === id);
}

export function getCompanyCaseStudyById(id: string): CaseStudy | undefined {
  return companyCaseStudies.find(cs => cs.id === id);
}

export function getCaseStudyIndex(id: string): number {
  return caseStudiesData.findIndex(cs => cs.id === id);
}

export function getCompanyCaseStudyIndex(id: string): number {
  return companyCaseStudies.findIndex(cs => cs.id === id);
}
