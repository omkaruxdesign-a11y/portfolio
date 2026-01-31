export interface CaseStudy {
  id: string;
  title: string;
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
    metadata: "Work • App • Feb 2025",
    description: "A fantasy sports platform for opinion trading for local events",
    impact: [
      "Enabled 500+ pre-beta users to test MVP and provide iterative feedback",
      "Reduced onboarding drop-off by 30% through simplified user flows",
      "Helped stakeholders validate product-market fit before full development",
    ],
    thumbnail: "/works/opinex/1.jpg",
    images: [
      "/works/opinex/1.jpg",
      "/works/opinex/2.jpg",
      "/works/opinex/3.jpg",
      "/works/opinex/4.jpg",
      "/works/opinex/5.jpg",
    ],
  },
  {
    id: "nothing",
    title: "Essential Suggestions",
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
    id: "micro-ott",
    title: "Micro OTT Platform",
    metadata: "App • Entertainment • Sept 2025",
    description: "A micro-OTT platform which has vertically shot content which has bite sized video content.",
    impact: [
      "Designed for 15-second average session engagement target",
      "Created content discovery flow reducing browse-to-watch time by 40%",
      "Optimized for vertical-first mobile consumption patterns",
    ],
    thumbnail: "/works/micro-ott/1.jpg",
    images: [
      "/works/micro-ott/1.jpg",
      "/works/micro-ott/2.jpg",
    ],
  },
  {
    id: "mshps",
    title: "MSHPS - Police Housing Corp. ",
    metadata: "Web-App • Gov-Tech • Jan 2025",
    description: "This was a proposal kind-of design for a government organization which takes care of all the finances related to the police department",
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
    id: "futura",
    title: "Futura",
    metadata: "Concept • AR/VR • Jan 2025",
    description: "This was a random problem statement I took on to explore what all can I do with my creative thinking",
    impact: [
      "Explored spatial UI patterns for immersive environments",
      "Designed gesture-based interactions reducing cognitive load",
      "Created concept showcasing future-forward design thinking",
    ],
    thumbnail: "/works/futura/1.png",
    images: [
      "/works/futura/1.png",
      "/works/futura/2.png",
      "/works/futura/3.png",
      "/works/futura/4.png",
      "/works/futura/5.png",
      "/works/futura/6.png",
      "/works/futura/7.png",
      "/works/futura/8.png",
      "/works/futura/9.png",
    ],
  },
  {
    id: "airbook",
    title: "Airbook UX Audit",
    metadata: "Web-App • SaaS • Feb 2025",
    description: "Currently its, The AI-powered analytics workspace where teams bring all their data in one place, explore what's driving revenue, and act on it. Back then Audited their platform for any UX issues",
    impact: [
      "Identified 15+ critical usability issues affecting user retention",
      "Recommendations projected to improve onboarding completion by 25%",
      "Delivered actionable audit report within 2-week timeline",
    ],
    thumbnail: "/works/airbook/thumbnail.jpg",
    images: [
      "/works/airbook/01.png",
      "/works/airbook/02.png",
      "/works/airbook/03.png",
      "/works/airbook/4.png",
      "/works/airbook/5.png",
      "/works/airbook/6.png",
      "/works/airbook/7.png",
      "/works/airbook/8.png",
      "/works/airbook/9.png",
      "/works/airbook/10.png",
      "/works/airbook/11.png",
      "/works/airbook/12.png",
      "/works/airbook/13.png",
    ],
  },
  {
    id: "intro-design",
    title: "Introduction to Design",
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
