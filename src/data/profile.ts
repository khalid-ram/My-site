/**
 * Verified professional profile.
 * Source of truth: Khaled Ramadan CV (public/Khaled-Ramadan-CV.pdf).
 * Do not add experience, metrics, or credentials that are not in the CV.
 */

export const profile = {
  name: "Khaled Ramadan",
  fullName: "Khaled Ahmed Ramadan",
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
      "A leading real estate technology platform serving buyers, sellers, brokers, and real estate businesses.",
    role: "Senior Product Manager",
    type: "Full-time",
    period: "Feb 2022 – Present",
    start: "2022-02",
    location: "Cairo, Egypt",
    highlights: [
      "Run qualitative (user interviews, surveys, usability testing) and quantitative (data analysis, funnel metrics, behavioral analytics) research to uncover customer needs and pain points.",
      "Work closely with UI/UX designers to translate insights into intuitive, user-centric solutions.",
      "Validate product ideas and hypotheses through continuous experimentation and feedback loops for both B2B and B2C users.",
      "Define and maintain the product roadmap, prioritizing initiatives by business goals, user value, and data.",
      "Lead sprint planning, backlog grooming, and stand-ups with engineering, design, and QA teams.",
      "Translate requirements and user problems into well-defined stories and acceptance criteria.",
      "Define, monitor, and analyze feature-level KPIs to evaluate performance and find opportunities.",
      "Partner with marketing, sales, and operations on go-to-market execution and adoption.",
    ],
  },
  {
    company: "EduSmart",
    companyBlurb:
      "An EdTech marketplace connecting students with qualified teachers and educational centers across Egypt.",
    role: "Project Manager",
    type: "Freelance",
    period: "Dec 2025 – Jun 2026",
    start: "2025-12",
    end: "2026-06",
    location: "Remote",
    highlights: [
      "Conducted competitive analysis of the EdTech market to identify opportunities for differentiation.",
      "Translated business requirements into visual prototypes in Figma, keeping stakeholders aligned.",
      "Owned the structure and design of the admin dashboard, building interactive prototypes for faster decisions.",
      "Owned delivery, testing, and handover to the client.",
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
      "Acted as the main point of contact between teams and stakeholders, keeping everyone informed of product status.",
    ],
  },
];

export const education = {
  degree: "B.A. in Business Administration",
  school: "Cairo University",
  period: "2014 – 2018",
};

export const competencies = [
  {
    title: "Strategy & Roadmapping",
    items: ["Vision setting", "Product roadmapping", "Roadmap execution", "Prioritization", "KPI setting"],
  },
  {
    title: "Discovery & Research",
    items: ["User interviews & surveys", "Usability testing", "Funnel & behavioral analytics", "Continuous experimentation"],
  },
  {
    title: "Delivery & Leadership",
    items: ["Sprint planning & backlog grooming", "Stories & acceptance criteria", "Stakeholder management", "Go-to-market alignment"],
  },
  {
    title: "Design & Prototyping",
    items: ["User experience (UX)", "Wireframes", "Prototyping", "Figma"],
  },
  {
    title: "Quality",
    items: ["Manual testing", "API testing"],
  },
];

export const tools = [
  "Jira",
  "Trello",
  "Miro",
  "Figma",
  "Figma Make",
  "Bolt.new",
  "Google Analytics",
  "Microsoft Clarity",
  "Firebase",
  "Wootric (NPS)",
  "Google Workspace",
];

export const certifications = [
  { name: "Introduction to Agile & Scrum for Product Owners", issuer: "Udemy" },
  { name: "Business Analysis Fundamentals (IIBA-endorsed)", issuer: "Udemy" },
  { name: "Business Analysis: Developing Requirements", issuer: "Udemy" },
  { name: "Presentation Skills: Master Confident Presentations", issuer: "Udemy" },
  { name: "Product Management Basics", issuer: "Pendo" },
  { name: "Product Discovery", issuer: "Pendo" },
  { name: "Product Analytics Certification", issuer: "Pendo" },
  { name: "Product-Led Certification", issuer: "Pendo" },
];

export const languages = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "Proficient" },
];
