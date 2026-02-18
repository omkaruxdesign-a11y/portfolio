export type BlogContentBlock =
  | { type: "image"; src: string; alt: string }
  | { type: "title"; title: string }
  | { type: "heading"; text: string }
  | { type: "text"; text: string; white?: boolean }
  | { type: "note"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "numbered"; items: { text: string; nested: string[] }[] };

export interface BlogCaseStudy {
  id: string;
  title: string;
  subtext: string;
  thumbnail: string;
  content: BlogContentBlock[];
}

export const blogCaseStudies: BlogCaseStudy[] = [
  {
    id: "lentlay",
    title: "How I ideated, designed, built, launched Lentlay on Peerlist which got staff picked!",
    subtext: "Bringing lenticular effect to any image",
    thumbnail: "/casestudy/lentlay/1.png",
    content: [
      {
        type: "image",
        src: "/casestudy/lentlay/1.png",
        alt: "Lentlay hero image",
      },
      {
        type: "heading",
        text: "The Idea",
      },
      {
        type: "text",
        text: "I had recently bought the CMF phone 2 pro and since I had been interested in photography was exploring the camera it has.",
      },
      {
        type: "text",
        text: "Discovered an effect called Lenticular firstly, I thought it was an useless feature but after sometime it hit me that this can be used as a background asset in the visuals.",
      },
      {
        type: "text",
        text: "But the problem here was it\u2019s available only on Nothing phones and that too when you click though that specific filter.",
      },
      {
        type: "text",
        text: "One cannot apply it to an existing image. That\u2019s what I wanted to solve.",
      },
      {
        type: "image",
        src: "/casestudy/lentlay/2.png",
        alt: "Lentlay solution",
      },
      {
        type: "heading",
        text: "Solution",
      },
      {
        type: "text",
        text: "So the problem was simple.",
      },
      {
        type: "text",
        text: "Build a tool that can apply lenticular effect to any image one has irrespective of that picture being clicked from Nothing phone or not.",
      },
      {
        type: "text",
        text: "Drafted a simple flow for the user to get a similar image",
      },
      {
        type: "image",
        src: "/casestudy/lentlay/3.png",
        alt: "Lentlay approach",
      },
      {
        type: "heading",
        text: "Approach",
      },
      {
        type: "bullets",
        items: [
          "Keeping the flow as simple as possible",
          "I had to make sure there\u2019s not much edgecases as this was going to be a simple tool with no intial business plan in mind",
        ],
      },
      {
        type: "heading",
        text: "Blockers for me",
      },
      {
        type: "bullets",
        items: [
          "Not knowing how to code \u2013 Was going to vibe code this one using v0",
        ],
      },
      {
        type: "image",
        src: "/casestudy/lentlay/4.png",
        alt: "Lentlay bonus",
      },
      {
        type: "heading",
        text: "Bonus: Revenue Model",
      },
      {
        type: "numbered",
        items: [
          {
            text: "Can be converted into a paid figma plugin and market accordingly",
            nested: [
              "One could use this directly in figma which would be blended in their workflow seamlessly",
              "Could be discovered easily by target audience on a large marketplace of figma plugins",
            ],
          },
          {
            text: "Create several background images with the tool and sell them as a stock image bundle",
            nested: [],
          },
        ],
      },
    ],
  },
  {
    id: "secards",
    title: "Building the only directory of secured credit cards in India, helping people to begin their credit journey",
    subtext: "Directory of Secured cards in India",
    thumbnail: "/casestudy/secards/1.png",
    content: [
      {
        type: "image",
        src: "/casestudy/secards/1.png",
        alt: "Secards header",
      },
      {
        type: "heading",
        text: "Problem I faced",
      },
      {
        type: "text",
        text: "So while I was looking for a secured credit card to start my credit journey, I noticed that the card comparing sites like paisabazaar and others are not updated with the latest \u2018Secured\u2019 cards due to increase in no. of these cards recently.",
      },
      {
        type: "text",
        text: "There was no place for me to browse them all in one place. I took the efforts to visit all the available card\u2019s websites, not everyone does it.",
      },
      {
        type: "text",
        text: "It may lead them to choose a card that does not benefit them much considering even secured cards have movie ticket and dining discounts nowadays.",
      },
      {
        type: "text",
        text: "One might lose those benefits because he/she didn\u2019t get a chance to explore.",
      },
      {
        type: "note",
        text: "PS: Secured cards are credit cards backed by an FD and aimed for people with no credit history",
      },
      {
        type: "image",
        src: "/casestudy/secards/2.png",
        alt: "Secards user groups",
      },
      {
        type: "heading",
        text: "User Groups",
      },
      {
        type: "bullets",
        items: [
          "Individuals aged 22-24 who have recently started earning",
          "Anyone who has no credit history but wants to build one",
        ],
      },
      {
        type: "heading",
        text: "User Persona",
      },
      {
        type: "bullets",
        items: [
          "Raghu who\u2019s 22 recently got a job in Mumbai.",
          "He\u2019s been learning about personal finance and now wants to get a secured card to build his credit score but, is confused as there are many options available.",
          "Also, he may not know all the options available.",
        ],
      },
      {
        type: "note",
        text: "PS: Credit score helps one in future to get a low interest rate on loans, better unsecured card offers etc.",
      },
      {
        type: "image",
        src: "/casestudy/secards/3.png",
        alt: "Secards existing solutions",
      },
      {
        type: "heading",
        text: "Existing Solutions",
      },
      {
        type: "text",
        text: "Where could one get the info about secured cards?",
        white: true,
      },
      {
        type: "bullets",
        items: [
          "For co-branded cards, on the websites of the banks",
          "Targeted ads across social media",
          "Ads on UPI payment apps",
        ],
      },
      {
        type: "text",
        text: "Problems with these methods",
        white: true,
      },
      {
        type: "bullets",
        items: [
          "One business would promote the card they\u2019ve partnered with",
          "No source for one to view all the available cards as the user is price conscious who wants to start with a small amount of FD",
          "Visibility of co-branded cards is more which over powers the bank-only cards",
        ],
      },
      {
        type: "image",
        src: "/casestudy/secards/4.png",
        alt: "Secards solution",
      },
      {
        type: "heading",
        text: "Solution",
      },
      {
        type: "bullets",
        items: [
          "A Web Platform which lets the user browse all the secured cards, know the pros and cons and filter according to the min. FD amount.",
          "Goal: Help user make the right choice",
        ],
      },
      {
        type: "text",
        text: "Technical Constraints",
        white: true,
      },
      {
        type: "bullets",
        items: [
          "Uniform Images of all the cards are not available on the internet - well I replicated them in figma!",
          "Less coding knowledge - Vibe coding with help of claude code",
        ],
      },
      {
        type: "image",
        src: "/casestudy/secards/5.png",
        alt: "Secards approach",
      },
      {
        type: "heading",
        text: "Approach",
      },
      {
        type: "bullets",
        items: [
          "Since the user was price conscious, had to make sure the first thing he/she sees on the first page is the min. FD amount.",
        ],
      },
      {
        type: "bullets",
        items: [
            "Stating this in a phrased input makes it easier to filter than traditional filters",
        ],
      },
      {
        type: "bullets",
        items: [
          "List of cards with name and bank logos, highlighting the main factors which can make one interested or not interested in a card",
        ],
      },
      {
        type: "image",
        src: "/casestudy/secards/6.png",
        alt: "Secards revenue model",
      },
      {
        type: "heading",
        text: "Bonus: Revenue Model",
      },
      {
        type: "numbered",
        items: [
          {
            text: "Thinking from a business side this could be monetized as consultation to which card to choose using AI for a token amount.",
            nested: [
              "This would consist of analysis taking user\u2019s interest, financial info and spending habits as an input",
              "Getting insight from those and suggesting cards according to priority to ensure there\u2019s no partiality for a single card",
            ],
          },
          {
            text: "Partnering with banks to promote their cards on the platform and providing real time information",
            nested: [],
          },
        ],
      },
      {
        type: "image",
        src: "/casestudy/secards/8.png",
        alt: "Secards revenue model",
      },
      {
        type: "heading",
        text: "Check it out here",
      },
    ],
  },
];

export function getBlogCaseStudyById(id: string): BlogCaseStudy | undefined {
  return blogCaseStudies.find((cs) => cs.id === id);
}
