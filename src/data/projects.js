/**
 * Single source of truth for project data.
 *
 * TO UPDATE LATER — only this file needs editing:
 *   github:     real repository URL, or null  -> renders "Coming Soon"
 *   live:       real deployed URL, or null    -> button hidden
 *   image:      "/projects/<file>.png" once you have a real screenshot.
 *               While null, the device frame draws a clearly-labelled DEMO
 *               mockup instead of pretending to be a screenshot.
 *
 * Nothing here is invented: descriptions, stacks and roles come from the
 * resume and the previous portfolio data.
 */

export const projects = [
  {
    id: "energispeak-mobile",
    name: "React Native Applications",
    org: "Energispeak Analytics",
    category: "mobile",
    platform: "mobile",
    featured: true,
    confidential: true,
    tagline: "Production mobile apps shipped with a product team.",
    description:
      "Mobile applications built at Energispeak Analytics with API integration, reusable components, navigation and responsive mobile interfaces.",
    problem:
      "The company needed mobile clients that shared behaviour with existing web products without duplicating backend logic.",
    approach:
      "Built React Native screens against the same REST services used by web, with a reusable component library and a navigation structure the team could extend.",
    contribution: [
      "Built reusable components and navigation structure",
      "Integrated REST APIs with backend services",
      "Worked on responsive mobile interfaces",
    ],
    technologies: ["React Native", "Expo", "Node.js", "REST APIs"],
    stackDetail: {
      Frontend: "React Native",
      Backend: "Node.js",
      API: "REST",
      Platform: "Android",
    },
    role: "Software Developer",
    status: "In production",
    image: null,
    github: null,
    live: null,
  },
  {
    id: "fintech-ai-accountant",
    name: "Fintech – AI-Powered Accountant",
    category: "ai",
    platform: "web",
    featured: true,
    tagline: "Financial management with AI-assisted expense and tax insight.",
    description:
      "An intelligent financial management system using AI to track expenses, manage investments and provide automated tax insights.",
    problem:
      "Manual expense tracking and tax preparation are slow and easy to get wrong for individuals managing their own finances.",
    approach:
      "A MERN application where transactions are categorised automatically and surfaced as spending, investment and tax insights on a single dashboard.",
    contribution: [
      "Built the full MERN stack application end to end",
      "Implemented AI-driven expense tracking",
      "Built automated tax insight reporting",
    ],
    technologies: ["MongoDB", "Express.js", "React", "Node.js"],
    stackDetail: {
      Frontend: "React",
      Backend: "Node.js / Express",
      Database: "MongoDB",
      API: "REST",
    },
    role: "Full Stack Developer",
    status: "Complete",
    image: null,
    github: null,
    live: null,
  },
  {
    id: "ai-voice-disorder",
    name: "AI Voice Disorder Detection",
    category: "ai",
    platform: "web",
    featured: false,
    tagline: "Machine learning applied to clinical audio classification.",
    description:
      "An ML-based system for voice disorder detection using audio analysis and classification.",
    problem:
      "Voice disorder screening normally requires specialist assessment, which limits how early and how often it happens.",
    approach:
      "Extract acoustic features from recorded audio, then classify them with a trained model exposed to a web client through a Python service.",
    contribution: [
      "Built the audio feature extraction pipeline",
      "Trained and evaluated the classification model",
      "Served predictions to a web client",
    ],
    technologies: ["Python", "Machine Learning", "Scikit-learn", "Flask"],
    stackDetail: {
      Language: "Python",
      ML: "Scikit-learn",
      Backend: "Flask",
      Domain: "Audio classification",
    },
    role: "ML & Backend Developer",
    status: "Complete",
    image: null,
    github: null,
    live: null,
  },
  {
    id: "investment-portal",
    name: "Investment Portal",
    category: "fullstack",
    platform: "web",
    featured: false,
    tagline: "Investment calculator and stock trading platform.",
    description:
      "An investment calculator and stock trading platform with balance management and multi-step calculation logic.",
    technologies: ["React", "Node.js", "MongoDB"],
    stackDetail: {
      Frontend: "React",
      Backend: "Node.js",
      Database: "MongoDB",
    },
    role: "Full Stack Developer",
    status: "Complete",
    image: null,
    github: null,
    live: null,
  },
  {
    id: "complaint-management",
    name: "Complaint Management System",
    category: "fullstack",
    platform: "web",
    featured: false,
    tagline: "Complaint tracking, management and analytics.",
    description:
      "A web application for complaint filing, tracking, management and analytics with a polished, usable UI.",
    technologies: ["React", "Node.js", "MongoDB"],
    stackDetail: {
      Frontend: "React",
      Backend: "Node.js",
      Database: "MongoDB",
    },
    role: "Full Stack Developer",
    status: "Complete",
    image: null,
    github: null,
    live: null,
  },
  {
    id: "parent-teacher-portal",
    name: "Parent-Teacher Portal",
    category: "web",
    platform: "web",
    featured: false,
    tagline: "Structured communication between two distinct user roles.",
    description:
      "A communication platform enabling structured interaction between parents and teachers, with performance tracking.",
    technologies: ["React", "Firebase", "Express.js"],
    stackDetail: {
      Frontend: "React",
      Backend: "Express.js",
      Database: "Firebase",
    },
    role: "Full Stack Developer",
    status: "Complete",
    image: null,
    github: null,
    live: null,
  },
  {
    id: "vendor-place-allocation",
    name: "Vendor Place Allocation System",
    category: "fullstack",
    platform: "web",
    featured: false,
    tagline: "Smart vendor allocation with congestion optimisation.",
    description:
      "A platform for smart allocation of vendor spots in weekly markets, with license verification and congestion optimisation logic.",
    technologies: ["React", "Node.js", "MySQL"],
    stackDetail: {
      Frontend: "React",
      Backend: "Node.js",
      Database: "MySQL",
    },
    role: "Backend Developer",
    status: "Complete",
    image: null,
    github: null,
    live: null,
  },
  {
    id: "disaster-relief",
    name: "Disaster Relief Management System",
    category: "fullstack",
    platform: "web",
    featured: false,
    tagline: "Coordinating relief efforts and resource distribution.",
    description:
      "A centralized platform to coordinate disaster relief efforts, supporting faster response and resource distribution.",
    technologies: ["React", "Node.js", "PostgreSQL"],
    stackDetail: {
      Frontend: "React",
      Backend: "Node.js",
      Database: "PostgreSQL",
    },
    role: "Backend Developer",
    status: "Complete",
    image: null,
    github: null,
    live: null,
  },
  {
    id: "movie-ticket-booking",
    name: "Movie Ticket Booking",
    category: "academic",
    platform: "web",
    featured: false,
    tagline: "Seat selection and booking flow.",
    description:
      "A movie ticket booking platform with real-time seat selection and payment integration.",
    technologies: ["Python", "Django", "SQLite"],
    stackDetail: {
      Backend: "Django",
      Language: "Python",
      Database: "SQLite",
    },
    role: "Backend Developer",
    status: "Complete",
    image: null,
    github: null,
    live: null,
  },
  {
    id: "cultural-heritage",
    name: "Cultural Heritage (SANSKRITI)",
    category: "academic",
    platform: "web",
    featured: false,
    tagline: "An educational platform on India's cultural richness.",
    description:
      "An educational platform highlighting India's cultural richness.",
    technologies: ["HTML", "CSS", "JavaScript", "MongoDB"],
    stackDetail: {
      Frontend: "HTML / CSS / JS",
      Database: "MongoDB",
    },
    role: "Web Developer",
    status: "Complete",
    image: null,
    github: null,
    live: null,
  },
  {
    id: "frontend-templates",
    name: "Frontend Templates",
    category: "web",
    platform: "web",
    featured: false,
    tagline: "A set of responsive interface templates.",
    description:
      "A collection of modern, responsive frontend templates for various applications.",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    stackDetail: {
      Frontend: "HTML / CSS / JS",
      Styling: "Bootstrap",
    },
    role: "UI Developer",
    status: "Complete",
    image: null,
    github: null,
    live: null,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

// A featured project can opt back into the grid with `alsoInGrid`, so it shows
// up in both the showcase and the full list without duplicating its data.
export const gridProjects = projects.filter(
  (project) => !project.featured || project.alsoInGrid
);

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "ai", label: "AI" },
  { id: "fullstack", label: "Full Stack" },
  { id: "academic", label: "Academic" },
];
