/**
 * All editable copy for the site lives here.
 * Components read from this file only, so you can change text without touching UI code.
 * Items marked PLACEHOLDER are guesses; search for that word to find them.
 */

export type SkillGroupId = "frontend" | "backend" | "devops" | "tools";

/** Icon keys map to simple-icons glyphs in components/icons.tsx. */
export type IconKey =
  | "react" | "nextdotjs" | "typescript" | "javascript" | "tailwindcss" | "html5" | "css"
  | "nodedotjs" | "python" | "postgresql" | "supabase" | "drizzle" | "frappe" | "erpnext" | "express"
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
  featured?: boolean;
  url?: string;
}

export const site = {
  url: "https://muhammadzafar.dev", // PLACEHOLDER: your production domain
  name: "Muhammad Zafar",
  firstName: "Muhammad",
  /** Phrases the hero types out in turn. */
  typed: ["Muhammad Zafar,", "Software Engineer", "SaaS Founder"],
  /** PLACEHOLDER: replace with your photo at public/operator.jpg and point this to it. */
  photo: "/head_shot.png",
  role: "Software Engineer",
  headlineRole: "Software Engineer",
  roleLong: "Full Stack Engineer, SaaS founder",
  focus: "Next.js, TypeScript & SaaS",
  description:
    "Full-stack engineer and SaaS founder building polished web products with Next.js, TypeScript, APIs, and database architecture.",
  city: "Karachi", // PLACEHOLDER: assumed from Habib University
  country: "Pakistan",
  available: "Available for freelance work",
  intro: [
    "Full-stack engineer in Karachi. I build SaaS products for dealerships, schools and lenders, and the pipelines that ship them.",
    "Most recently I helped a UK Dealership Management System increase MRR from £200 to £2,400.",
  ],
  hint: "Click the rig or press Enter to ship",
  resume: "/resume.pdf", // copied from ~/Desktop/Zafar_Resume.pdf; replace public/resume.pdf to update
  ticker: ["Next.js", "TypeScript", "React", "Node.js", "Python", "PostgreSQL"],
  tags: ["Full Stack Engineering", "REST APIs", "Database Architecture", "SaaS", "ERPNext/Frappe", "CI/CD"],
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
  { href: "#skills", label: "Skills", icon: "code" },
  { href: "#experience", label: "Experience", icon: "briefcase" },
  { href: "#work", label: "Projects", icon: "grid" },
  { href: "#contact", label: "Contact", icon: "mail" },
] as const;

/** Section headings: number, English label and native-script subtitle. */
export const sections = {
  skills: { no: "01", label: "Stack", title: "Skills", urdu: "مہارت" },
  experience: { no: "01", label: "Timeline", title: "Experience", urdu: "تجربہ" },
  work: { no: "02", label: "Selected work", title: "Projects", urdu: "منصوبے" },
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
      { name: "ERPNext / Frappe", icon: "frappe" },
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
      { name: "Docker", icon: "docker" }, // PLACEHOLDER: not on your resume; remove if unused
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
    period: "2025 – Now",
    title: "Founder & Full Stack Engineer",
    org: "UnityAlgo",
    mark: "UA",
    impact: "Won 3+ paying clients and grew to $251 in monthly recurring revenue.",
    points: [
      "Deliver ERPNext/Frappe and custom software for SMEs and microfinance institutions in Pakistan",
      "Lead client acquisition, development, CI/CD deployment and post-launch support",
    ],
    stack: ["ERPNext", "Frappe", "Python", "Next.js"],
  },
  {
    period: "2025 – Now",
    title: "Contract Full Stack Engineer",
    org: "MYDV-DMS · UK, remote",
    mark: "MV",
    impact: "Helped grow monthly recurring revenue from £200 to £2,400.",
    points: [
      "Built vehicle listings, support tickets, part exchange, SoR agreements, blogs and customer pages",
      "Automated vehicle publishing to Facebook, Instagram, YouTube and TikTok",
      "GitHub Actions CI/CD with Vercel deployment",
    ],
    stack: ["Next.js", "TypeScript", "Drizzle", "PostgreSQL", "Supabase", "Vercel"],
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

// PLACEHOLDER: summaries, stacks and highlights are drafted from your experience notes; edit freely.
export const projects: Project[] = [
  {
    slug: "mydealershipview",
    short: "MyDealershipView",
    mark: "MV",
    title: "MYDEALERSHIPVIEW",
    category: "Dealership Management System",
    tagline: ["Listings", "Part exchange", "SoR"],
    footnote: "UK dealers · Next.js",
    summary: "Stock, enquiries, part exchange and SoR agreements for UK car dealers in one platform.",
    year: "2025",
    role: "Contract full-stack engineer",
    stack: ["Next.js", "TypeScript", "Drizzle", "PostgreSQL", "Supabase", "Vercel"],
    highlights: [
      "Vehicle listings, support tickets, part exchange and SoR agreements",
      "Blog and customer-facing pages for each dealership",
      "GitHub Actions CI/CD with Vercel deployment",
      "Helped grow monthly recurring revenue from £200 to £2,400",
    ],
    featured: true,
  },
  {
    slug: "rlcc-marks",
    short: "RLCC Marks",
    mark: "RL",
    title: "RLCC School Marks Management System",
    category: "Education Management System",
    tagline: ["Marks", "Attendance", "Results"],
    footnote: "~750 students · Supabase",
    summary: "Marks, attendance and results for about 750 students, built as a volunteer in one month.",
    year: "2026",
    role: "Full stack engineer (volunteer)",
    stack: ["Next.js", "Supabase", "PostgreSQL"],
    highlights: [
      "Student records and daily attendance",
      "Delivered in one month (April to May 2026)",
      "Midterm and final marks entry with result generation",
      "Used by staff for about 750 female students",
    ],
    featured: true,
  },
  {
    slug: "mydv-marketing",
    short: "MYDV Marketing",
    mark: "MM",
    title: "MYDV Marketing",
    category: "Dealership Marketing & Automation",
    tagline: ["Facebook", "Instagram", "TikTok"],
    footnote: "Auto-publishing · UK",
    summary: "Publishes each new vehicle to Facebook, Instagram, YouTube and TikTok automatically.",
    year: "2025",
    role: "Full-stack engineer",
    stack: ["Next.js", "TypeScript", "Social APIs"],
    highlights: [
      "One listing, four social channels",
      "Scheduled publishing pipeline",
      "Built on the MYDEALERSHIPVIEW data model",
    ],
  },
  {
    slug: "lending-platform",
    short: "Lending Platform",
    mark: "LM",
    title: "Lending Management Platform",
    category: "ERP / Fintech",
    tagline: ["Loans", "Repayments", "Reports"],
    footnote: "ERPNext · Frappe",
    summary: "Loan origination, repayments and reporting for microfinance institutions.",
    year: "2025",
    role: "Founder & engineer",
    stack: ["ERPNext", "Frappe", "Python"],
    highlights: ["Loan lifecycle on ERPNext", "Repayment schedules and reporting", "Delivered to paying clients"],
  },
  {
    slug: "autoprestige-cars",
    short: "Autoprestige Cars",
    mark: "AP",
    title: "Autoprestige Cars",
    category: "Dealership Website",
    tagline: ["Stock", "Finance", "Enquiries"],
    footnote: "Dealership website",
    summary: "Stock-led dealership website fed by the dealer's live inventory.",
    year: "2025",
    role: "Full-stack engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: ["Live stock feed", "Vehicle detail pages", "Enquiry capture"],
  },
  {
    slug: "motor-time-group",
    short: "Motor Time Group",
    mark: "MT",
    title: "Motor Time Group",
    category: "Dealership Website",
    tagline: ["Stock", "Finance", "Part exchange"],
    footnote: "Dealership website",
    summary: "Multi-page dealership site with finance and part-exchange enquiries.",
    year: "2025",
    role: "Full-stack engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: ["Live stock feed", "Finance enquiries", "Part-exchange form"],
  },
  {
    slug: "ideal-car",
    short: "Ideal Car",
    mark: "IC",
    title: "Ideal Car",
    category: "Dealership Website",
    tagline: ["Stock", "Search", "Leads"],
    footnote: "Dealership website",
    summary: "Fast, mobile-first dealership website with searchable stock.",
    year: "2025",
    role: "Full-stack engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: ["Searchable stock", "Mobile-first layout", "Lead capture"],
  },
  {
    slug: "mwa-autos",
    short: "MWA Autos",
    mark: "MW",
    title: "MWA Autos",
    category: "Dealership Website",
    tagline: ["Stock", "Enquiries", "SEO"],
    footnote: "Dealership website",
    summary: "Dealership website with stock pages and enquiry routing.",
    year: "2025",
    role: "Full-stack engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: ["Stock pages", "Enquiry routing", "SEO-ready vehicle pages"],
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
