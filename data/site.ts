/**
 * All editable copy for the site lives here.
 * Components read from this file only, so you can change text without touching UI code.
 * Items marked PLACEHOLDER are guesses; search for that word to find them.
 */

export type SkillGroupId = "frontend" | "backend" | "devops" | "tools";

/** Icon keys map to simple-icons glyphs in components/icons.tsx. */
export type IconKey =
  | "react" | "nextdotjs" | "typescript" | "javascript" | "tailwindcss" | "html5" | "css"
  | "nodedotjs" | "python" | "postgresql" | "supabase" | "drizzle" | "express"
  | "docker" | "redux" | "firebase" | "githubactions" | "vercel" | "linux" | "nginx" | "cloudflare"
  | "git" | "github" | "figma" | "postman" | "notion" | "api" | "x" | "linkedin" | "agile" | "whatsapp";

export interface Skill { name: string; icon: IconKey }
export interface SkillGroup { id: SkillGroupId; label: string; items: Skill[] }

export interface Role {
  period: string;
  title: string;
  org: string;
  /** Two or three letters for the monogram logo tile. */
  mark: string;
  impact: string;
  points: string[];
  stack?: string[];
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  /** Short words for the preview card, e.g. ["Listings", "Tickets", "SoR"]. */
  tagline: string[];
  /** Small footer line on the preview card (a domain, platform or client). */
  footnote: string;
  /** Two letters for the preview card's app tile. */
  mark: string;
  /** Short name for the preview card (the full title appears below it). */
  short: string;
  summary: string;
  year: string;
  role: string;
  stack: string[];
  highlights: string[];
  details?: string[];
  url?: string;
  image?: string;
}

export const site = {
  url: "https://muhammadzafar.dev", // PLACEHOLDER: your production domain
  name: "Muhammad Zafar",
  firstName: "Muhammad",
  /** Phrases the hero types out in turn. */
  typed: ["Muhammad Zafar,", "Software Engineer", "Full Stack Engineer"],
  /** PLACEHOLDER: replace with your photo at public/operator.jpg and point this to it. */
  photo: "/head_shot.png",
  role: "Software Engineer",
  headlineRole: "Software Engineer",
  roleLong: "Full Stack Engineer",
  focus: "Next.js, TypeScript & SaaS",
  description:
    "Full-stack engineer building polished web products with Next.js, TypeScript, APIs, and database architecture.",
  city: "Karachi", // PLACEHOLDER: assumed from Habib University
  country: "Pakistan",
  available: "Available for freelance work",
  intro: [
    "Full-stack engineer in Karachi. I build SaaS products for dealerships, schools and lenders, and the pipelines that ship them.",
    "During my tenure as a full-stack engineer on a UK dealership management platform, its MRR grew from £200 to £2,400.",
  ],
  hint: "Click the rig or press Enter to ship",
  resume: "/resume.pdf", // copied from ~/Desktop/Zafar_Resume.pdf; replace public/resume.pdf to update
  ticker: ["Next.js", "TypeScript", "React", "Node.js", "Python", "PostgreSQL"],
  tags: ["Full Stack Engineering", "REST APIs", "Database Architecture", "SaaS", "Python", "CI/CD"],
  quote: {
    text: "If I have the belief that I can do it, I shall surely acquire the capacity to do it even if I may not have it at the beginning.",
    author: "Mahatma Gandhi", // PLACEHOLDER: attribution added by me; the quote is widely credited to Gandhi
  },
  contact: {
    email: "mohamedalzafar@gmail.com",
    phone: "+92 326 5908446",
    whatsapp: { label: "+92 326 5908446", href: "https://wa.me/923265908446" },
    github: { label: "github.com/Zafar205", href: "https://github.com/Zafar205" },
    linkedin: { label: "linkedin.com/in/zafar2062005", href: "https://www.linkedin.com/in/zafar2062005" },
    x: { label: "@Zafar205", href: "https://x.com/Zafar205" },
  },
};

/** Bottom dock. Icons live in components/Dock.tsx. */
export const nav = [
  { href: "#top", label: "Home", icon: "home" },
  { href: "#work", label: "Projects", icon: "grid" },
  { href: "#skills", label: "Skills", icon: "code" },
  { href: "#experience", label: "Experience", icon: "briefcase" },
  { href: "#contact", label: "Contact", icon: "mail" },
] as const;

/** Section headings: number, English label and native-script subtitle. */
export const sections = {
  work: { no: "01", label: "All work", title: "Projects", urdu: "منصوبے" },
  skills: { no: "02", label: "Stack", title: "Skills", urdu: "مہارت" },
  experience: { no: "03", label: "Timeline", title: "Experience", urdu: "تجربہ" },
  contact: { no: "00", label: "Send a message", title: "Contact", urdu: "رابطہ" },
};

export const skills: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Redux", icon: "redux" },
      { name: "HTML", icon: "html5" },
      { name: "CSS", icon: "css" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Python", icon: "python" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Supabase", icon: "supabase" },
      { name: "Drizzle ORM", icon: "drizzle" },
      { name: "REST APIs", icon: "api" },
      { name: "Firebase", icon: "firebase" },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    items: [
      { name: "GitHub Actions", icon: "githubactions" },
      { name: "CI/CD pipelines", icon: "api" },
      { name: "Vercel", icon: "vercel" },
      { name: "Linux", icon: "linux" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Postman", icon: "postman" },
      { name: "Agile & Scrum", icon: "agile" },
      { name: "Figma", icon: "figma" }, // PLACEHOLDER: not on your resume; remove if unused
    ],
  },
];

export const experience: Role[] = [
  {
    period: "2025 – 2026",
    title: "Contract Full Stack Engineer",
    org: "MYDV-DMS · UK, remote",
    mark: "MV",
    impact: "During my engineering tenure, monthly recurring revenue grew from £200 to £2,400.",
    points: [
      "Built vehicle listings, support tickets, part exchange, SoR agreements, blogs and customer pages",
      "Automated vehicle publishing to Facebook, Instagram, YouTube and TikTok",
      "GitHub Actions CI/CD with Vercel deployment",
    ],
    stack: ["Next.js", "TypeScript", "Drizzle", "PostgreSQL", "Supabase", "Vercel"],
  },
  {
    period: "2026",
    title: "Full Stack Engineer",
    org: "UnityAlgo",
    mark: "UA",
    impact: "Worked on the interest accrual engine for Care Financial Services Lending Management System.",
    points: [
      "Supported loan interest calculations and lending workflows",
      "The system served approximately 11,000 customers with over PKR 750 million in disbursed loans",
      "Led development, CI/CD deployment and post-launch support",
    ],
    stack: ["Python", "Next.js"],
  },
  {
    period: "2026",
    title: "Full Stack Engineer, volunteer",
    org: "RLCC School",
    mark: "RL",
    impact: "Marks and attendance for about 750 students, delivered in one month.",
    points: ["Student records, attendance, midterm and final marks, and result management"],
    stack: ["Next.js", "Supabase"],
  },
  {
    period: "2025",
    title: "Software Engineer Intern",
    org: "1tensolutions",
    mark: "1T",
    impact: "Built a trucking management UI with Twilio messaging built in.",
    points: ["Shipment tracking and driver management screens", "Twilio SMS for status updates and customer notifications"],
    stack: ["React", "Twilio"],
  },
  {
    period: "2025",
    title: "Undergraduate Research Intern",
    org: "Habib University – SUPARCO",
    mark: "HS",
    impact: "Developed an anti-jamming GNSS antenna array and automated Ansys HFSS workflows.",
    points: ["Four-element microstrip patch antenna array", "HFSS automation in Python and MATLAB, cutting manual simulation time"],
  },
  {
    period: "2024 – 2025",
    title: "Frontend Developer Intern",
    org: "Xeverse",
    mark: "XV",
    impact: "Shipped a Trello-style project board and an online code editor.",
    points: ["Kanban project management app", "Browser-based code editor"],
    stack: ["React"],
  },
  {
    period: "2023 – 2027",
    title: "BS Computer Science",
    org: "Habib University",
    mark: "HU",
    impact: "100% merit-based scholarship · CGPA 3.4.",
    points: ["Focus on full-stack engineering, systems and product development"],
  },
];

// Project copy is based on the linked live sites and the existing experience notes.
export const projects: Project[] = [
  {
    slug: "mydealershipview",
    short: "MyDealershipView",
    mark: "MV",
    title: "MYDEALERSHIPVIEW",
    category: "Dealership Management System",
    tagline: ["Listings", "Part exchange", "SoR"],
    footnote: "UK dealers · Next.js",
    summary: "A dealership management platform for independent UK used-car dealers, bringing stock, sales, customer leads, invoices and workshop work into one system.",
    year: "2025",
    role: "Contract full-stack engineer",
    stack: ["Next.js", "TypeScript", "Drizzle", "PostgreSQL", "Supabase", "Vercel"],
    highlights: [
      "Vehicle stock management with DVLA/CAP data and AutoTrader integration",
      "Sales pipeline, invoices and VAT margin scheme calculations",
      "Customer lead tracking, test-drive records and workshop job cards",
      "Dealer websites connected to live stock, plus part exchange and SoR workflows",
      "During my engineering tenure, monthly recurring revenue grew from £200 to £2,400",
    ],
    url: "https://mydealershipview.com/",
    image: "/mydv.png",
    details: [
      "The public product covers a vehicle from acquisition through preparation, advertising, sale and aftercare. Dealers can manage stock, capture leads, record test drives, create invoices and coordinate workshop tasks from one dashboard.",
      "The platform also offers dealer website templates tied to live inventory, plus public vehicle listings. My work included listings, support tickets, part exchange, SoR agreements, blogs and customer-facing pages, alongside GitHub Actions deployment to Vercel.",
    ],
  },
  {
    slug: "orpheus-urdu-tts",
    short: "Orpheus Urdu TTS",
    mark: "OU",
    title: "Orpheus Urdu TTS",
    category: "Text-to-Speech Project",
    tagline: ["Urdu", "Speech", "Orpheus"],
    footnote: "Urdu text-to-speech",
    summary: "Urdu language adaptation for Orpheus speech generation, with a longer-term goal of controllable emotional delivery.",
    year: "2026",
    role: "Research writeup by Muhammad Hassan",
    stack: ["Orpheus", "SNAC", "LoRA", "Urdu TTS"],
    highlights: [
      "Encoded 24 kHz speech with the SNAC codec into seven interleaved tokens per frame",
      "Retained 16,111 training clips (26.09 hours) after audit and context filtering",
      "Trained a LoRA adapter for 2,014 optimizer steps on a Tesla T4 in about 5.04 hours",
      "Best periodic validation loss was 5.5768 at step 1,600; full final validation loss was 5.5684",
      "Small two-prompt speech diagnostics worsened at the final checkpoint; emotion control remains future work",
    ],
    image: "/orpheus.png",
    details: [
      "The project starts with Urdu pronunciation and intelligibility. Its eventual aim is an agent whose voice can express states such as reassurance or concern, but the completed run establishes only the language-adaptation stage. No trained emotion-conditioned Urdu voice is demonstrated yet.",
      "The pipeline uses the roughly 3B-parameter Orpheus backbone and the SNAC codec at 24 kHz. Three hierarchical codebooks are serialized into seven position-aware audio tokens per frame. Text and audio share a causal next-token training objective.",
      "Transcripts are normalized and audio is checked before tokenization. A 2,048-token context limit led to whole text-audio pairs being excluded when too long. The retained ASLP UrduSpeech training set was 16,111 clips, or 26.09 hours, rather than the larger figure implied by the run name.",
      "The completed configuration used a four-bit backbone with rank-32 LoRA, eight accumulation steps and one epoch on a Tesla T4. Validation loss improved, but speech quality needs separate listening and recognition checks. A two-Urdu-prompt diagnostic improved at an earlier checkpoint and then deteriorated at the final one, including a sustained hum in one sample.",
      "A later UrduTTS data-preparation run processed more clips but stopped before training because there was insufficient space for a checkpoint. The next steps are broader Urdu prompt testing, multiple generation seeds, human listening assessment and a separately trained emotion-conditioning stage.",
    ],
  },
  {
    slug: "rlcc-marks",
    short: "RLCC Marks",
    mark: "RL",
    title: "RLCC School Marks Management System",
    category: "Education Management System",
    tagline: ["Marks", "Attendance", "Results"],
    footnote: "~750 students · Supabase",
    summary: "A volunteer-built school system for recording attendance, midterm and final marks, and student results for roughly 750 learners.",
    year: "2026",
    role: "Full stack engineer (volunteer)",
    stack: ["Next.js", "Supabase", "PostgreSQL"],
    highlights: [
      "Student records and daily attendance",
      "Delivered in one month (April to May 2026)",
      "Midterm and final marks entry with result generation",
      "Used by staff for about 750 female students",
    ],
    url: "https://khidmat-mms.vercel.app/",
    image: "/rlcc.png",
    details: [
      "The school uses this application for student records, daily attendance and exam marks. Staff can move from mark entry to result management in one workflow.",
      "The public URL currently opens an authentication screen, so the private staff workflows are described from the project notes rather than from a public demo.",
    ],
  },
  {
    slug: "mydv-marketing",
    short: "MYDV Marketing",
    mark: "MM",
    title: "MYDV Marketing",
    category: "Dealership Marketing & Automation",
    tagline: ["Facebook", "Instagram", "TikTok"],
    footnote: "Auto-publishing · UK",
    summary: "A dealership marketing service that turns live vehicle inventory into scheduled social posts and manages listings across connected channels.",
    year: "2025",
    role: "Full-stack engineer",
    stack: ["Next.js", "TypeScript", "Social APIs"],
    highlights: [
      "Stock-driven post rules for newest, oldest, cheapest or flagship vehicles",
      "Daily, weekly, monthly or custom publishing cadence",
      "Connected social channels and listing status managed in one place",
      "Public site lists Facebook, Instagram, X, YouTube Shorts and Snapchat Spotlight; TikTok is marked coming soon",
      "Paid advertising services are presented as future add-ons",
    ],
    url: "https://marketing.mydealershipview.com/",
    image: "/marketing.png",
    details: [
      "Dealers connect inventory and social accounts, then choose rules for which vehicles to promote and how often. Posts use current stock data so promotions track what is actually on the forecourt.",
      "The public service page distinguishes existing social and listings management from planned additions. TikTok and managed Google Vehicle, Meta and OpenAI advertising are labeled as coming soon.",
    ],
  },
  {
    slug: "lending-platform",
    short: "Lending Platform",
    mark: "LM",
    title: "Lending Management Platform",
    category: "Lending Management System",
    tagline: ["Interest", "Loans", "Workflows"],
    footnote: "Care Financial Services · ~11,000 customers",
    summary: "Worked on the interest accrual engine for Care Financial Services Lending Management System, supporting loan interest calculations and lending workflows. The system served approximately 11,000 customers with over PKR 750 million in disbursed loans.",
    year: "2025",
    role: "Engineer",
    stack: ["Python"],
    highlights: ["Worked on the interest accrual engine", "Supported loan interest calculations and lending workflows", "Served approximately 11,000 customers with over PKR 750 million in disbursed loans"],
  },
  {
    slug: "bluebell-motorhouse",
    short: "Bluebell Motorhouse",
    mark: "BM",
    title: "Bluebell Motorhouse",
    category: "Dealership Website",
    tagline: ["Used cars", "Finance", "Enquiries"],
    footnote: "Bradford · West Yorkshire",
    summary: "A used-car dealership website for Bluebell Motorhouse in Bradford, with a browsable showroom, vehicle finance figures and customer contact paths.",
    year: "2025",
    role: "Full-stack engineer",
    stack: ["Dealership website", "Vehicle listings"],
    highlights: [
      "Used-car inventory with price, mileage, fuel type and monthly finance figures",
      "Vehicle advert pages and showroom browsing",
      "Sell-your-car and customer review pages",
      "Finance information and dealership contact details",
    ],
    url: "https://www.bluebellmotorhouse.co.uk/",
    image: "/bluebell.png",
    details: [
      "The public site presents Bluebell Motorhouse as a family-owned dealership in Bradford, West Yorkshire. Shoppers can browse stock, inspect vehicle adverts and see indicative monthly payments.",
      "The site also gives buyers routes to finance information, reviews, selling a car and contacting the dealership.",
    ],
  },
  {
    slug: "autoprestige-cars",
    short: "Autoprestige Cars",
    mark: "AP",
    title: "Autoprestige Cars",
    category: "Dealership Website",
    tagline: ["Stock", "Finance", "Enquiries"],
    footnote: "Dealership website",
    summary: "A used-car showroom for Autoprestige Cars in Bradford, with routes to stock, finance, vehicle valuation and customer enquiries.",
    year: "2025",
    role: "Full-stack engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Used-car showroom and sold-car browsing",
      "Finance, valuation and registration-plate sections",
      "Vehicle enquiries and dealership contact information",
      "Website identifies MYDEALERSHIPVIEW as its platform",
    ],
    url: "https://autoprestigecars.co.uk/usedcars",
    image: "/autotprestige.png",
    details: [
      "The used-cars page is the live stock entry point for Autoprestige Cars. Its navigation also exposes sold vehicles, services, registration plates, valuation, finance, reviews and contact.",
      "The public page loads its stock client-side, so current individual vehicles are not included in this portfolio description.",
    ],
  },
  {
    slug: "motor-time-group",
    short: "Motor Time Group",
    mark: "MT",
    title: "Motor Time Group",
    category: "Dealership Website",
    tagline: ["Stock", "Finance", "Part exchange"],
    footnote: "Dealership website",
    summary: "A dealership website for a family-run business in Long Eaton, combining featured stock with finance, part exchange and warranty enquiries.",
    year: "2025",
    role: "Full-stack engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Featured vehicle stock and a route to the full showroom",
      "Finance enquiries through regulated partners",
      "Part-exchange valuation enquiries",
      "Warrantywise information and customer reviews",
    ],
    url: "https://motortimegroup.co.uk/",
    image: "/motortime.png",
    details: [
      "Motor Time Group presents hand-picked, inspected used vehicles with a straightforward buying experience. Visitors can browse featured stock and then move to the full inventory.",
      "The site also explains finance through partner firms, part exchange, warranty coverage and ways to visit or contact the dealership.",
    ],
  },
  {
    slug: "ideal-car",
    short: "Ideal Car",
    mark: "IC",
    title: "Ideal Car",
    category: "Dealership Website",
    tagline: ["Stock", "Search", "Leads"],
    footnote: "Dealership website",
    summary: "A Nottinghamshire dealership website with used-car search, featured vehicles, a finance calculator and warranty information.",
    year: "2025",
    role: "Full-stack engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Vehicle search by make and model",
      "Featured used-car listings and showroom information",
      "Finance calculator and finance options",
      "Warranty details, reviews and car enhancements",
    ],
    url: "https://idealcarltd.co.uk/",
    image: "/idealcar.png",
    details: [
      "Ideal Car provides a searchable entry point to its used inventory, alongside featured cars and information about its indoor showroom.",
      "The site also supports finance exploration with a calculator, and presents warranty, customer review and vehicle enhancement sections.",
    ],
  },
  {
    slug: "mwa-autos",
    short: "MWA Autos",
    mark: "MW",
    title: "MWA Autos",
    category: "Dealership Website",
    tagline: ["Stock", "Enquiries", "SEO"],
    footnote: "Dealership website",
    summary: "A Nottingham used-car dealership website with stock filters, budget-led browsing, finance information and aftercare content.",
    year: "2025",
    role: "Full-stack engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Vehicle search by make and model with additional filters",
      "Budget slider for browsing vehicles by monthly payment",
      "Finance, part-exchange and warranty information",
      "Customer experience, promotions and contact routes",
    ],
    url: "https://mwaautosltd.co.uk/",
    image: "/mwa.png",
    details: [
      "MWA Autos uses a stock search and monthly-budget control to help shoppers narrow down vehicles. The site also introduces finance and part-exchange options.",
      "Supporting pages cover warranties, promotions, reviews, aftercare and dealership contact details.",
    ],
  },
];

/** Cities engraved on the hero figure's world map. The first one is home. */
export const cities: { name: string; lon: number; lat: number }[] = [
  { name: "Karachi", lon: 67.0, lat: 24.9 },
  { name: "Lahore", lon: 74.3, lat: 31.5 },
  { name: "Dubai", lon: 55.3, lat: 25.2 },
  { name: "London", lon: -0.1, lat: 51.5 },
  { name: "Berlin", lon: 13.4, lat: 52.5 },
  { name: "New York", lon: -74.0, lat: 40.7 },
  { name: "Toronto", lon: -79.4, lat: 43.7 },
  { name: "San Francisco", lon: -122.4, lat: 37.8 },
  { name: "Singapore", lon: 103.8, lat: 1.35 },
];
