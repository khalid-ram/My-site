/**
 * Verified professional profile.
 * Source of truth: Khaled Ramadan CV (public/Khaled-Ramadan-CV.pdf).
 * Do not add experience, metrics, or credentials that are not in the CV.
 */

export const profile = {
  name: "Khaled Ramadan",
  fullName: "Khaled Ahmed Ramadan",
  phone: "+20 108 003 3211",
  firstName: "Khaled",
  title: "Senior Product Manager",
  location: "Cairo, Egypt",
  email: "Khaledram96@gmail.com",
  linkedin: "https://linkedin.com/in/khalid-ramadan-4a0a87221",
  linkedinLabel: "linkedin.com/in/khalid-ramadan-4a0a87221",
  cvPath: "/Khaled-Ramadan-CV.pdf",
  cvFileName: "Khaled-Ramadan-CV.pdf",
  tagline: "Building products that make an impact.",
  subline: "From product strategy to hands-on execution.",
  intro:
    "I'm Khaled, a Senior Product Manager passionate about turning complex challenges into intuitive experiences and measurable business outcomes. I combine product thinking, data, and emerging AI tools to bring ideas to life.",
  philosophy:
    "I believe product management is about more than managing roadmaps. It's about understanding problems, making thoughtful decisions, collaborating across disciplines, and taking ownership of outcomes.",
} as const;

export type Experience = {
  company: string;
  companyBlurb: string;
  role: string;
  type: string;
  period: string;
  start: string; // ISO yyyy-mm, used for structured data
  end?: string;
  location: string;
  highlights: string[];
  caseStudySlugs?: string[];
};

export const experience: Experience[] = [
  {
    company: "Aqarmap",
    companyBlurb:
      "Real estate technology (PropTech) platform serving buyers, sellers, brokers and real estate businesses.",
    role: "Senior Product Manager",
    type: "Full-time",
    period: "Feb 2022 – Present",
    start: "2022-02",
    location: "Cairo, Egypt",
    highlights: [
      "Conduct qualitative (user interviews, surveys, usability testing) and quantitative (data analysis, funnel metrics, behavioral analytics) research to uncover customer needs and pain points.",
      "Work closely with UI/UX designers to translate insights into intuitive, user-centric solutions.",
      "Validate product ideas and hypotheses through continuous experimentation and feedback loops for B2B and B2C users.",
      "Define and maintain the product roadmap, prioritizing initiatives by business goals, user value and data-driven insights.",
      "Align product vision and strategy with company objectives, keeping all stakeholders informed and coordinated.",
      "Lead sprint planning, backlog grooming and daily stand-ups with engineering, design and QA for timely, high-quality delivery.",
      "Translate requirements and user problems into well-defined user stories, acceptance criteria and deliverables.",
      "Define, monitor and analyze feature-level KPIs to evaluate performance and identify opportunities for improvement.",
      "Collaborate with marketing, sales and operations teams on go-to-market execution and adoption.",
    ],
  },
  {
    company: "CSA Academy",
    companyBlurb:
      "An EdTech platform growing into a marketplace for students, teachers and educational centers in Egypt.",
    role: "Project Manager",
    type: "Freelance",
    period: "Dec 2025 – Jun 2026",
    start: "2025-12",
    end: "2026-06",
    location: "Remote",
    caseStudySlugs: ["csa-academy"],
    highlights: [
      "Conducted competitive analysis of the EdTech market to identify opportunities for differentiation.",
      "Translated business requirements into visual prototypes in Figma, keeping all stakeholders aligned.",
      "Owned the structure and design of the admin dashboard, building interactive prototypes for clearer, faster decisions.",
      "Planned meetings and recorded walkthrough videos to enable faster, clearer communication across the team.",
      "Followed up closely with the designer to ensure delivered solutions met the agreed requirements.",
      "Owned delivery, testing and handover to the client, ensuring a smooth, high-quality transition.",
    ],
  },
  {
    company: "Bites",
    companyBlurb: "A product-focused tech company.",
    role: "Product Owner",
    type: "Full-time",
    period: "Dec 2019 – Dec 2021",
    start: "2019-12",
    end: "2021-12",
    location: "Giza, Egypt",
    highlights: [
      "Strategized and presented product ideas to stakeholders.",
      "Defined product features according to customer needs.",
      "Led the development process end to end.",
      "Acted as the main point of contact between teams and stakeholders, keeping customers and stakeholders informed of product status.",
    ],
  },
];

export const education = {
  degree: "B.A. in Business Administration",
  school: "Cairo University",
  period: "2014 – 2018",
};

export const competencies = [
  { title: "Product", items: ["Strategy", "Roadmapping", "Prioritization", "KPIs", "Monetization", "Go-to-market"] },
  { title: "Discovery", items: ["User research", "Usability testing", "Funnel analytics", "Experimentation"] },
  { title: "Delivery", items: ["Agile / Scrum", "User stories & acceptance criteria", "Stakeholder management", "API testing"] },
  { title: "AI & building", items: ["Multi-agent workflows", "Claude Code", "Figma Make", "Bolt.new", "Playwright"] },
];

export const tools = ["Jira", "Figma", "Miro", "Trello", "Google Analytics", "Microsoft Clarity", "Firebase", "Wootric (NPS)"];

export const languages = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "Proficient" },
];

/** AI agents & vibe-coding projects (matches the CV). */
export const builds = [
  {
    name: "AI Product Agent",
    status: "",
    summary: "A multi-agent product team that turns my brief into reviewed Figma designs and Jira-ready requirements.",
    steps: [
      { title: "Product Owner", note: "Writes requirements and the plan" },
      { title: "Product Designer", note: "2 Figma options, desktop & mobile" },
      { title: "Head of Product", note: "Reviews UX and design-system fit" },
      { title: "My approval", note: "Then Jira AC and frontend handoff" },
    ],
    stack: ["Claude Code subagents", "Figma", "Jira"],
    links: [] as { label: string; href: string }[],
  },
  {
    name: "AI QA Agent · Lead Generation",
    status: "",
    summary: "Runs Aqarmap's 32 lead test cases (call, WhatsApp, Top Seller) and reports every run automatically.",
    steps: [
      { title: "Test cases", note: "Written from the Jira issue" },
      { title: "Browser run", note: "Scripted Playwright tests" },
      { title: "Manual OTP", note: "Agent pauses and asks me for the code" },
      { title: "Telegram report", note: "Results with evidence" },
      { title: "Sheet update", note: "Test cases synced to Google Sheets" },
    ],
    stack: ["Claude Code subagent", "Playwright", "Jira", "Telegram", "Google Sheets"],
    links: [] as { label: string; href: string }[],
  },
  {
    name: "Torta Lab",
    status: "Live",
    summary: "A custom-cake ordering website I designed and built end to end with AI-assisted development (vibe coding).",
    steps: [] as { title: string; note: string }[],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "NestJS", "Supabase", "Vercel", "Railway"],
    links: [
      { label: "Visit website", href: "https://torta-lab-omega.vercel.app" },
      { label: "GitHub", href: "https://github.com/khalid-ram/Torta-Lab" },
    ],
  },
];
