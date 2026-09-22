const devicon = (slug, file) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${file}`;

export const skillGroups = [
  {
    id: "frontend",
    label: "Frontend",
    accent: "#60a5fa",
    items: [
      { name: "React", icon: devicon("react", "react-original.svg"), note: "Primary UI library — 2+ years" },
      { name: "React Native", icon: devicon("react", "react-original.svg"), note: "Mobile apps in production" },
      { name: "JavaScript", icon: devicon("javascript", "javascript-original.svg"), note: "Core language — 2+ years" },
      { name: "HTML", icon: devicon("html5", "html5-original.svg"), note: "Semantic markup" },
      { name: "CSS", icon: devicon("css3", "css3-original.svg"), note: "Layout and responsive design" },
      { name: "Tailwind", icon: devicon("tailwindcss", "tailwindcss-original.svg"), note: "Utility-first styling" },
      { name: "Bootstrap", icon: devicon("bootstrap", "bootstrap-original.svg"), note: "Component styling" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    accent: "#4ade80",
    items: [
      { name: "Node.js", icon: devicon("nodejs", "nodejs-original.svg"), note: "Server runtime — 2+ years" },
      { name: "Express.js", icon: devicon("express", "express-original.svg"), invert: true, note: "REST service layer" },
      { name: "Python", icon: devicon("python", "python-original.svg"), note: "Services and ML — 1+ year" },
      { name: "REST APIs", icon: null, note: "API design and integration — 2+ years" },
    ],
  },
  {
    id: "database",
    label: "Database",
    accent: "#fbbf24",
    items: [
      { name: "MongoDB", icon: devicon("mongodb", "mongodb-original.svg"), note: "Primary datastore — 2+ years" },
      { name: "MySQL", icon: devicon("mysql", "mysql-original.svg"), note: "Relational data" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    accent: "#a78bfa",
    items: [
      { name: "Git", icon: devicon("git", "git-original.svg"), note: "Version control" },
      { name: "GitHub", icon: devicon("github", "github-original.svg"), invert: true, note: "Collaboration" },
      { name: "Postman", icon: devicon("postman", "postman-original.svg"), note: "API testing" },
      { name: "Figma", icon: devicon("figma", "figma-original.svg"), note: "Design handoff" },
      { name: "AWS", icon: devicon("amazonwebservices", "amazonwebservices-plain-wordmark.svg"), invert: true, note: "Cloud services" },
      { name: "Android", icon: devicon("android", "android-original.svg"), note: "Mobile target platform" },
    ],
  },
];

/**
 * Node graph for the interactive skill network.
 * Positions are normalised (-1..1) and scaled by the renderer.
 */
export const skillNetwork = {
  center: { id: "core", label: "Full-Stack Developer" },
  nodes: [
    { id: "react", label: "React", x: 0.78, y: -0.22, group: "frontend" },
    { id: "react-native", label: "React Native", x: 0.34, y: -0.82, group: "frontend" },
    { id: "javascript", label: "JavaScript", x: 0.92, y: 0.36, group: "frontend" },
    { id: "node", label: "Node.js", x: 0.1, y: 0.82, group: "backend" },
    { id: "express", label: "Express", x: -0.42, y: 0.7, group: "backend" },
    { id: "python", label: "Python", x: -0.86, y: -0.16, group: "backend" },
    { id: "mongodb", label: "MongoDB", x: -0.3, y: -0.8, group: "database" },
    { id: "mysql", label: "MySQL", x: -0.92, y: 0.42, group: "database" },
    { id: "rest", label: "REST APIs", x: 0.56, y: 0.7, group: "backend" },
  ],
  // Which nodes light up together when one is hovered.
  related: {
    react: ["javascript", "rest", "react-native"],
    "react-native": ["react", "javascript", "rest"],
    javascript: ["react", "node", "react-native"],
    node: ["express", "mongodb", "rest"],
    express: ["node", "mongodb", "rest"],
    python: ["rest", "mysql"],
    mongodb: ["node", "express"],
    mysql: ["python", "node"],
    rest: ["node", "express", "react", "python"],
  },
};

/** Layers for the About section's architecture diagram. */
export const architecture = [
  { id: "user", label: "User", detail: "Web & mobile clients" },
  { id: "client", label: "React / React Native", detail: "Interface layer" },
  { id: "api", label: "REST API", detail: "Contract between client and server" },
  { id: "server", label: "Node.js / Express", detail: "Application logic" },
  { id: "data", label: "MongoDB / MySQL", detail: "Persistence" },
  { id: "services", label: "Python · AI services", detail: "Analysis and ML features" },
];
