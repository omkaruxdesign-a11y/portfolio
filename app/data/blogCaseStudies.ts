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
    id: "opinex",
    title: "Opinex - Fantasy Sports",
    subtext: "Built MVP allowing stakeholders to test and validate",
    thumbnail: "/works/opinex/1.png",
    content: [
        {
          type: "image",
          src: "/works/opinex/1.png",
          alt: "Opinex Fantasy Sports hero image"
        },
        {
          type: "heading",
          text: "Impact"
        },
        {
          type: "bullets",
          items: [
            "Enabled 500+ pre-beta users to test MVP and provide iterative feedback",
            "Helped stakeholders validate product-market fit before full development",
            "Faster market validation helped the owners to launch the app 30% earlier than before"
          ]
        },
        {
          type: "image",
          src: "/works/opinex/2.png",
          alt: "Opinex context"
        },
        {
          type: "heading",
          text: "Context: How is the app different?"
        },
        {
          type: "text",
          text: "This would have been the first question you had reading the first page. Well, this was a project I had a while back. The client wanted to build a fantasy sports app for the local sports events - which are at maybe district level."
        },
        {
          type: "text",
          text: "Secondly, from the backend side the advantage was the user was able to book profit when he had it and didn't had to wait until the completion of event. This was something missing in current sports fantasy apps. My job was to blend these features with the current experience of the existing apps so that the product doesn't feel alienated."
        },
        {
          type: "heading",
          text: "User Groups"
        },
        {
          type: "bullets",
          items: [
            "Local Sports enthusiasts",
            "People wanting to earn from their game knowledge"
          ]
        },
        {
          type: "heading",
          text: "Real World Constraints"
        },
        {
          type: "bullets",
          items: [
            "Had a tight timeline hence had to make sure that I save time wherever possible"
          ]
        },
        {
          type: "heading",
          text: "Inspiration"
        },
        {
          type: "text",
          text: "As there were existing sports fantasy giants in the market so had to research, understand how their experience was to ultimately keep the experience similar to them for good adaptability rates. Also client had tight deadline as this was the first phase of the MVP and had plan to launch early."
        },
        {
          type: "text",
          text: "For visual side inspiration from current apps, studied their flows, structure and also simultaneously tried to understand their positioning, business model and limitations."
        },
        {
          type: "heading",
          text: "Approach"
        },
        {
          type: "text",
          text: "After all the work done till now and realising the time remaining decided to skip the lo-fi sketches and get into hi-fidelity designs as the structure was to be the same as the existing apps. Thought was needed to display the two features I first mentioned. For that, took inspiration from finance trading platforms which had similar core functioning of booking profit at a specific stage. Later also discovered that there were no limit orders option available in current apps. Was it intentional? had to check."
        },
        {
          type: "text",
          text: "After discussion with client clarified that due to less liquidity, limit orders had not been considered earlier but they had figured out a way and can provide this option. Hence the option to add a Limit order was also added when booking/exiting an order."
        },
        {
          type: "heading",
          text: "High Level Considerations"
        },
        {
          type: "numbered",
          items: [
            {
              text: "The experience has to feel intuitive and easy to navigate",
              nested: []
            },
            {
              text: "The profit booking flow has to be made familiar enough",
              nested: []
            },
            {
              text: "Choosing Yes or No is the primary action hence, that has to be conveyed correctly",
              nested: []
            }
          ]
        },
        {
          type: "image",
          src: "/works/opinex/3.png",
          alt: "Opinex design solution 1"
        },
        {
          type: "image",
          src: "/works/opinex/4.png",
          alt: "Opinex design solution 2"
        },
        {
          type: "image",
          src: "/works/opinex/5.png",
          alt: "Opinex design solution 3"
        },
        {
          type: "image",
          src: "/works/opinex/6.png",
          alt: "Opinex design solution 4"
        }
      ]
    },
  {
    id: "nothing",
    title: "Essential Suggestions",
    subtext: "Designed a personalized suggestion app for close friends",
    thumbnail: "/works/nothing/1.png",
    content: [
      {
        type: "image",
        src: "/works/nothing/1.png",
        alt: "Essential Suggestions hero image"
      },
      {
        type: "heading",
        text: "Learnings"
      },
      {
        type: "bullets",
        items: [
          "Working with a space constraint",
          "Priortizing the information to display",
          "working with a provided guidelines",
          "You get happiness by creating such fun projects"
        ]
      },
      {
        type: "image",
        src: "/works/nothing/2.png",
        alt: "Essential Suggestions inspiration"
      },
      {
        type: "heading",
        text: "Inspiration"
      },
      {
        type: "text",
        text: "A little back story; I am that guy in the circle who has visited a lot of places, restaurants, watches lots of movies and people come to me for suggestions. That's when this idea sparked in my mind and the designer side took over it. I also noticed that when we share something on a chats app, messages or save a reel about something, it get's lost the sea with the others."
      },
      {
        type: "text",
        text: "Result: We do not get what other's suggested or face friction to search the same. This is when I thought of making something around essential space."
      },
      {
        type: "text",
        text: "And finally this widget turned out to be another widget of the essential space."
      },
      {
        type: "image",
        src: "/works/nothing/3.png",
        alt: "Essential Suggestions idea"
      },
      {
        type: "heading",
        text: "The Idea"
      },
      {
        type: "text",
        text: "Now getting in the real thing. Here's what this widget is all about:"
      },
      {
        type: "text",
        text: "Assumptions",
        white: true,
      },
      {
        type: "bullets",
        items: [
          "Essential space app has a feature to add people and create groups",
          "A shareable widget exists similar the existing 'photo sharing widget'",
          "Integrations with apps like Spotify, YouTube etc."
        ]
      },
      {
        type: "text",
        text: "Functioning",
        white: true,
      },
      {
        type: "bullets",
        items: [
          "One would have a preview on the widget of what's suggestions are shared in a group or to the individual",
          "Option for the user to save the suggestions to their space",
          "Option for the user to share their suggestions right form the widget",
          "The app can provide notifications when one is needing the information from the essential space",
          "Example Case: You have saved a restaurant suggested from a friend. You get a notification when you are nearby it."
        ]
      },
      {
        type: "image",
        src: "/works/nothing/4.png",
        alt: "Essential Suggestions approach"
      },
      {
        type: "heading",
        text: "Approach"
      },
      {
        type: "text",
        text: "For the research I went out to friends asking them if they would use something like this, mostly the response was positive. Then I thought why I am giving this much of energy to this? I thought this maybe my habit of working on everything from execution mindset. Here's a short brief of what I did;"
      },
      {
        type: "text",
        text: "Coming back the the ideation part, I tried many variations of how this thing could work. This took the major part in making of the widget. I even got the screenshots from one of my friend's using phone 2A to see how the current widgets are working. There I noticed most of the widgets are 2x2 in size and that's what I chose."
      },
      {
        type: "heading",
        text: "Constraints"
      },
      {
        type: "bullets",
        items: [
          "Space constraint: This is a mobile widget of 2x2 ratio so have to make sure the information is concise yet enough to get the context",
          "Any technical constraint that can be an obstacle to bring this live"
        ]
      },
      {
        type: "image",
        src: "/works/nothing/5.png",
        alt: "Essential Suggestions solution overview"
      },
      {
        type: "heading",
        text: "Solution"
      },
      {
        type: "text",
        text: "After a countless hours and screen time I came up with the ideal flow and variations of the widget. Had to consider a lot of variables like the changing sizes of the media uploaded, when would the widget refresh, how it would look when there's no media and it's shared in a group and many such edge cases."
      },
      {
        type: "text",
        text: "I'll just show it to you right away, here it goes"
      },
      {
        type: "image",
        src: "/works/nothing/6.png",
        alt: "Essential Suggestions design variation 1"
      },
      {
        type: "image",
        src: "/works/nothing/7.png",
        alt: "Essential Suggestions design variation 2"
      },
      {
        type: "image",
        src: "/works/nothing/8.png",
        alt: "Essential Suggestions design variation 3"
      },
      {
        type: "image",
        src: "/works/nothing/9.png",
        alt: "Essential Suggestions design variation 4"
      },
      {
        type: "image",
        src: "/works/nothing/10.png",
        alt: "Essential Suggestions design variation 5"
      },
      {
        type: "image",
        src: "/works/nothing/11.png",
        alt: "Essential Suggestions design variation 6"
      },
      {
        type: "image",
        src: "/works/nothing/12.png",
        alt: "Essential Suggestions design variation 7"
      },
      {
        type: "image",
        src: "/works/nothing/13.png",
        alt: "Essential Suggestions design variation 8"
      }
    ]
  },
  {
    id: "mshps",
    title: "MSHPS - Police Housing Corp.",
    subtext: "Reduced time of task completion involving billing and finances by 50%",
    thumbnail: "/works/mshps/1.png",
    content: [
      {
        type: "image",
        src: "/works/mshps/1.png",
        alt: "Police Housing Corporation hero image"
      },
      {
        type: "heading",
        text: "Impact"
      },
      {
        type: "bullets",
        items: [
          "Reduced time of creating a bill from 7 days to 4 days",
          "Reduced 50% manual errors which caused delay in the process",
          "Modernized interface for improved accessibility compliance",
          "Average task completion time by 50% making work easier of 100s of employees"
        ]
      },
      {
        type: "image",
        src: "/works/mshps/2.png",
        alt: "Police Housing Corporation problem"
      },
      {
        type: "heading",
        text: "Problem"
      },
      {
        type: "text",
        text: "There's a government organization that keeps the track of construction carried out for the police departments may it be police stations, quarters etc. across the state of Maharashtra. They maintain the records of contractors and their works, transactions and approvals through various level of authorities."
      },
      {
        type: "text",
        text: "They were planning to bring all the existing data in the paper files online to make it easier to track and keep a record. For this to make happen, they needed a software solution. I was hired by a tech company to lead the design phase here."
      },
      {
        type: "text",
        text: "The processes of these organizations included various heads, contractors, payments, employees along with different levels of access according to their roles."
      },
      {
        type: "heading",
        text: "User Groups and Persona"
      },
      {
        type: "bullets",
        items: [
          "Government Employees working the organization",
          "Contractors working on a project",
          "Rajeev aged 32 works at MSPHC's as a D.O. his daily work consists of going through lot of data heavy papers and approving large transactions"
        ]
      },
      {
        type: "heading",
        text: "Real World Constraints"
      },
      {
        type: "numbered",
        items: [
          {
            text: "The web app has to as clear as possible due to users using it would be less tech-savvy",
            nested: []
          },
          {
            text: "Had to be multilingual for better accessibility (phase 2)",
            nested: []
          },
          {
            text: "Information had to be conveyed careful as the data was sensitive and a minor mistake could cause major problem",
            nested: []
          },
          {
            text: "Had to be technically optimised to run even on a low-end device",
            nested: []
          },
          {
            text: "The flow had to be informed with a good UX copy to ensure informed decisions",
            nested: []
          }
        ]
      },
      {
        type: "text",
        text: "Considering the large transactions, While making every decision it had to made sure that the information one receives is the right one."
      },
      {
        type: "heading",
        text: "Approach"
      },
      {
        type: "text",
        text: "Since this is highly confidential and crucial data regarding government funds, first thing to consider the human intervention in the process. 100% automation can leave vulnerabilities and uncertainty in decisions which can cause mishaps later."
      },
      {
        type: "text",
        text: "Began with understanding the current process of their work. Got to know a flow of how a bill is created and approved."
      },
      {
        type: "image",
        src: "/works/mshps/3.png",
        alt: "Police Housing Corporation process flow"
      },
      {
        type: "text",
        text: "Here the above mentioned steps were done through a lot of paperwork which were to be digitized along with same human intervention."
      },
      {
        type: "heading",
        text: "High Level Considerations"
      },
      {
        type: "numbered",
        items: [
          {
            text: "There had to role based clearance across the portal to maintain responsibility",
            nested: []
          },
          {
            text: "The portal has to have a seamless experience despite of internet connection",
            nested: []
          }
        ]
      },
      {
        type: "heading",
        text: "Second Level Considerations"
      },
      {
        type: "numbered",
        items: [
          {
            text: "The visual hierarchy is of utmost importance here to make sure the data is right",
            nested: []
          },
          {
            text: "Feedback for the user is crucial to make sure one does not miss a input field",
            nested: []
          },
          {
            text: "Handle the mathematically calculated inputs throughout the flow",
            nested: []
          }
        ]
      },
      {
        type: "heading",
        text: "Solution"
      },
      {
        type: "bullets",
        items: [
          "Calculate the derived fields before hand to ensure data accuracy",
          "End to end flow to create a new bill with role based approvals",
          "Defining a colour and typography system to ensure visual consistency",
          "Well informed input fields to make sure one inputs the right information in the respective field",
          "Easy to access the previous steps to double check the filled info"
        ]
      },
      {
        type: "image",
        src: "/works/mshps/4.png",
        alt: "Police Housing Corporation solution screenshot 1"
      },
      {
        type: "image",
        src: "/works/mshps/5.png",
        alt: "Police Housing Corporation solution screenshot 2"
      },
      {
        type: "image",
        src: "/works/mshps/6.png",
        alt: "Police Housing Corporation solution screenshot 3"
      },
      {
        type: "image",
        src: "/works/mshps/7.png",
        alt: "Police Housing Corporation solution screenshot 4"
      },
      {
        type: "image",
        src: "/works/mshps/8.png",
        alt: "Police Housing Corporation solution screenshot 5"
      }
    ]
  },
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
