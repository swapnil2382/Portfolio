import AccentureCert from "../components/Accenture Certificate.pdf";
import AWSCert from "../components/AWS certificate.pdf";
import GoldmanCert from "../components/Goladsmash Certificate.pdf";
import LinkedinCert from "../components/CertificateOfCompletion_Career Essentials in Generative AI by Microsoft and LinkedIn.pdf";
import HackverseCert from "../components/Hackverse watmul 2025.pdf";
import CodecraftersCert from "../components/Code Crafters 2.0.pdf";
import AvishkarCert from "../components/Avishka2 2025.pdf";

/**
 * Every entry links to a real PDF in src/components.
 * `year` is only set where the resume actually states one — no invented dates,
 * no invented credential IDs.
 */
export const certificates = [
  {
    id: "accenture",
    title: "Data Analysis",
    issuer: "Accenture",
    year: null,
    description: "Data cleaning, modeling and visualization.",
    pdf: AccentureCert,
  },
  {
    id: "aws",
    title: "APAC Solutions Architecture Virtual Experience",
    issuer: "AWS",
    year: "2024",
    description: "Designing scalable cloud-based solutions.",
    pdf: AWSCert,
  },
  {
    id: "goldman",
    title: "Software Engineering Virtual Experience",
    issuer: "Goldman Sachs",
    year: "2024",
    description: "Engineering and security challenges.",
    pdf: GoldmanCert,
  },
  {
    id: "genai",
    title: "Career Essentials in Generative AI",
    issuer: "Microsoft & LinkedIn",
    year: null,
    description: "AI fundamentals and ethical AI practice.",
    pdf: LinkedinCert,
  },
  {
    id: "hackverse",
    title: "Hackverse 2025",
    issuer: "Hackverse",
    year: "2025",
    description: "Selected from 200+ teams for project contributions.",
    pdf: HackverseCert,
  },
  {
    id: "codecrafters",
    title: "CodeCrafters 2.0",
    issuer: "CodeCrafters",
    year: "2025",
    description: "Selected from 850+ teams for hackathon performance.",
    pdf: CodecraftersCert,
  },
  {
    id: "avishkar-2025",
    title: "Avishkar 2025",
    issuer: "Avishkar",
    year: "2025",
    description: "Participated, showcasing technical creativity.",
    pdf: AvishkarCert,
  },
];

export const courses = [
  {
    id: "fullstack",
    title: "Full Stack Web Development",
    platform: "Udemy",
    description: "React, Node.js, MongoDB and Express.",
    skills: ["React Hooks", "RESTful APIs", "JWT Authentication", "MongoDB"],
  },
  {
    id: "java",
    title: "Java Programming",
    platform: "Coursera",
    description: "OOP, multithreading and data structures.",
    skills: ["OOP", "Concurrency", "Java Collections"],
  },
  {
    id: "aws-course",
    title: "Cloud Computing with AWS",
    platform: "AWS Academy",
    description: "AWS services and cloud architecture.",
    skills: ["EC2", "S3", "Lambda", "DynamoDB"],
  },
  {
    id: "ml",
    title: "Fundamentals of Python ML",
    platform: "Udemy",
    description: "Supervised and unsupervised learning with practical examples.",
    skills: ["Python", "Scikit-learn", "Supervised Learning", "ML Pipelines"],
  },
];
