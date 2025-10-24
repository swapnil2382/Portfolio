import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaReact, FaAws, FaJava, FaDatabase, FaUserShield, FaTrophy, FaCode } from "react-icons/fa";
import { FaLayerGroup } from "react-icons/fa6";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { ExternalLink } from "lucide-react";
import { SiUdemy } from "react-icons/si";

// Import certificates (replace with actual paths)
import AccentureCert from "../components/Accenture Certificate.pdf";
import HackversCert from "../components/Hackverse watmul 2025.pdf";
import AvishkarCert from "../components/Avishka2 2025.pdf";
import AWSCert from "../components/AWS certificate.pdf";
import CodecraftersCert from "../components/Code Crafters 2.0.pdf";
import LinkdinCert from "../components/CertificateOfCompletion_Career Essentials in Generative AI by Microsoft and LinkedIn.pdf";
import GoldmanCert from "../components/Goladsmash Certificate.pdf";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Custom hook for GSAP animations
const useGsapAnimations = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".gsap-animate");
    
    elements.forEach((el, index) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          delay: index * 0.1, // Staggered animation
        }
      );
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};

const ExperiencePage = () => {
  const [selectedTab, setSelectedTab] = useState("Certificates");
  const [popupData, setPopupData] = useState(null);
  const [currentCertificateSlide, setCurrentCertificateSlide] = useState(0);
  const [currentExperienceSlide, setCurrentExperienceSlide] = useState(0);
  const [currentCourseSlide, setCurrentCourseSlide] = useState(0);
  const sectionRef = useRef(null);

  // Initialize animations
  useGsapAnimations();

  // Data sets
  const experiences = [
    {
      title: "Full Stack Developer",
      period: "Rainy 2023",
      company: "Prodigy InfoTech",
      description: "Developed responsive web applications using React, Node.js, and MongoDB. Collaborated with UX designers to implement intuitive user interfaces and optimize application performance.",
icon: <FaCode size={40} className="text-white" />,
      achievements: ["Increased page load performance by 40%", "Implemented CI/CD pipeline", "Created reusable component library"],
    },
    {
      title: "Front-End Developer Intern",
      period: "Winter 2023",
      company: "Octanet",
      description: "Created interactive UI components and optimized website performance. Collaborated in an Agile team environment to deliver high-quality features on schedule.",
      icon: <FaReact size={40} className="text-white" />,
      achievements: ["Built 5+ responsive web pages", "Reduced CSS bundle size by 30%", "Integrated multiple third-party APIs"],
    },

 {
  title: "MERN-Stack Developer Intern",
  period: "3 months",
  company: "UD Studios",
  description:
    "Built and deployed full-stack web applications using MongoDB, Express, React, and Node.js. Worked on both client and server-side logic to deliver efficient, scalable, and user-friendly solutions. Collaborated with the design and backend teams in an Agile environment to ensure seamless integration and optimal performance across the stack.",
  icon: <FaLayerGroup size={40} className="text-white" />,
  achievements: [
    "Developed RESTful APIs using Express and integrated them with React front-end",
    "Implemented user authentication and authorization with JWT and bcrypt",
    "Designed and managed MongoDB schemas for optimized data handling",
  ],
},

  ];

  const certificates = [
    {
      title: "Data Analysis Certification",
      issuer: "Accenture",
      date: "January 2024",
      description: "Advanced data cleaning, modeling, and visualization techniques for business intelligence applications.",
      pdf: AccentureCert,
      icon: <FaDatabase size={40} className="text-amber-400" />,
    },
    {
      title: "AWS Solutions Architecture",
      issuer: "AWS",
      date: "March 2024",
      description: "Designed scalable cloud-based solutions and implemented serverless architectures for enterprise applications.",
      pdf: AWSCert,
      icon: <FaAws size={40} className="text-amber-500" />,
    },
    {
      title: "Goldman Sachs Cybersecurity",
      issuer: "Goldman Sachs",
      date: "November 2023",
      description: "Worked on cybersecurity challenges and implemented secure authentication protocols in financial applications.",
      pdf: GoldmanCert,
      icon: <FaUserShield size={40} className="text-amber-600" />,
    },
    {
      title: "Generative AI by Microsoft",
      issuer: "LinkedIn",
      date: "February 2024",
      description: "Covered AI fundamentals, ethical AI implementation, and practical applications in software development.",
      pdf: LinkdinCert,
      icon: <FaReact size={40} className="text-amber-500" />,
    },
    {
      title: "Hackverse 2025 Participation",
      issuer: "Hackverse",
      date: "January 2025",
      description: "Selected from 200+ groups for innovative project contributions in blockchain technology and AI integration.",
      pdf: HackversCert,
      icon: <FaTrophy size={40} className="text-amber-600" />,
    },
    {
      title: "CodeCrafters 2.0 2025",
      issuer: "CodeCrafters 2.0",
      date: "March 2025",
      description: "Selected from 850+ groups for outstanding hackathon performance in developing real-time data visualization tools.",
      pdf: CodecraftersCert,
      icon: <FaTrophy size={40} className="text-amber-500" />,
    },
    {
      title: "Avishkar 2025 Participation",
      issuer: "Avishkar",
      date: "February 2025",
      description: "Participated in Avishkar 2025, showcasing technical creativity and innovation in cloud computing solutions.",
      pdf: AvishkarCert,
      icon: <FaTrophy size={40} className="text-amber-400" />,
    },
  ];

  const courses = [
    {
      title: "Full Stack Web Development",
      platform: "Udemy",
      date: "December 2023",
      description: "Comprehensive course covering React, Node.js, MongoDB, and Express for modern web application development.",
      icon: <FaReact size={40} className="text-amber-500" />,
      skills: ["React Hooks", "RESTful APIs", "JWT Authentication", "MongoDB Atlas"],
    },
    {
      title: "Advanced Java Programming",
      platform: "Coursera",
      date: "October 2023",
      description: "OOP principles, multithreading, design patterns and advanced data structures for enterprise applications.",
      icon: <FaJava size={40} className="text-amber-600" />,
      skills: ["Design Patterns", "Concurrency", "Java Collections", "Streams API"],
    },
    {
      title: "Cloud Computing with AWS",
      platform: "AWS Academy",
      date: "January 2024",
      description: "AWS services and cloud architecture design patterns for scalable and resilient applications.",
      icon: <FaAws size={40} className="text-amber-500" />,
      skills: ["EC2", "S3", "Lambda", "DynamoDB", "CloudFormation"],
    },
    {
      title: "Machine Learning - Fundamentals of Python ML",
      platform: "Udemy (Sara Academy)",
      date: "April 2025",
      description: "Fundamentals of Python-based machine learning techniques including supervised and unsupervised learning using practical examples.",
      icon: <SiUdemy size={40} className="text-purple-600" />,
      skills: ["Python", "Scikit-learn", "Supervised Learning", "Unsupervised Learning", "ML Pipelines"],
    },
  ];

  // Navigation handlers for Certificates
  const handleNextCertificateSlide = () => {
    if (currentCertificateSlide < certificates.length - 3) {
      setCurrentCertificateSlide(currentCertificateSlide + 3);
    }
  };

  const handlePrevCertificateSlide = () => {
    if (currentCertificateSlide > 0) {
      setCurrentCertificateSlide(currentCertificateSlide - 3);
    }
  };

  // Navigation handlers for Experiences
  const handleNextExperienceSlide = () => {
    if (currentExperienceSlide < experiences.length - 3) {
      setCurrentExperienceSlide(currentExperienceSlide + 3);
    }
  };

  const handlePrevExperienceSlide = () => {
    if (currentExperienceSlide > 0) {
      setCurrentExperienceSlide(currentExperienceSlide - 3);
    }
  };

  // Navigation handlers for Courses
  const handleNextCourseSlide = () => {
    if (currentCourseSlide < courses.length - 3) {
      setCurrentCourseSlide(currentCourseSlide + 3);
    }
  };

  const handlePrevCourseSlide = () => {
    if (currentCourseSlide > 0) {
      setCurrentCourseSlide(currentCourseSlide - 3);
    }
  };

  // Tab button component
  const TabButton = ({ label, isActive, onClick }) => (
    <motion.button
      className={`px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg shadow-amber-500/30"
          : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 backdrop-blur-sm"
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.button>
  );

  // Certificate card component
  const CertificateCard = ({ cert }) => (
    <motion.div
      className="gsap-animate w-full max-w-sm bg-gradient-to-br from-slate-900/80 to-slate-950/80 rounded-2xl p-6 border border-slate-800/50 hover:border-amber-500/50 shadow-xl backdrop-blur-sm transition-all cursor-pointer group"
      onClick={() => setPopupData(cert)}
      whileHover={{ y: -8, boxShadow: "0 10px 20px rgba(255, 191, 0, 0.2)" }}
    >
      <div className="mb-4 transform transition-transform duration-300 group-hover:scale-105">
        {cert.icon}
      </div>
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-amber-400">{cert.title}</h3>
        <p className="text-slate-300 text-sm font-medium">Issued by: {cert.issuer}</p>
        <p className="text-slate-400 text-xs">{cert.date}</p>
        <p className="text-slate-300 text-sm line-clamp-2">{cert.description}</p>
      </div>
      {cert.pdf && (
        <a
          href={cert.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all group-hover:shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          View Certificate <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </motion.div>
  );

  // Experience card component
  const ExperienceCard = ({ exp }) => (
    <motion.div
      className="gsap-animate w-full max-w-md bg-gradient-to-br from-slate-900/80 to-slate-950/80 rounded-2xl p-6 border border-slate-800/50 hover:border-amber-500/50 shadow-xl backdrop-blur-sm transition-all cursor-pointer group"
      onClick={() => setPopupData(exp)}
      whileHover={{ y: -8, boxShadow: "0 10px 20px rgba(255, 191, 0, 0.2)" }}
    >
      <div className="mb-4 transform transition-transform duration-300 group-hover:scale-105">
        {exp.icon}
      </div>
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-amber-400">{exp.title}</h3>
        <p className="text-slate-300 text-sm font-medium">{exp.company}</p>
        <p className="text-slate-400 text-xs">{exp.period}</p>
        <p className="text-slate-300 text-sm line-clamp-2">{exp.description}</p>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-800/50">
        <p className="text-xs font-medium text-slate-400 mb-2">Key Achievements:</p>
        <ul className="space-y-2">
          {exp.achievements.map((achievement, idx) => (
            <li key={idx} className="flex items-start text-sm text-slate-300">
              <div className="h-3 w-3 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5 mr-2">
                <div className="h-1 w-1 rounded-full bg-amber-500"></div>
              </div>
              {achievement}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );

  // Course card component
  const CourseCard = ({ course }) => (
    <motion.div
      className="gsap-animate w-full max-w-sm bg-gradient-to-br from-slate-900/80 to-slate-950/80 rounded-2xl p-6 border border-slate-800/50 hover:border-amber-500/50 shadow-xl backdrop-blur-sm transition-all cursor-pointer group"
      onClick={() => setPopupData(course)}
      whileHover={{ y: -8, boxShadow: "0 10px 20px rgba(255, 191, 0, 0.2)" }}
    >
      <div className="mb-4 transform transition-transform duration-300 group-hover:scale-105">
        {course.icon}
      </div>
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-amber-400">{course.title}</h3>
        <p className="text-slate-300 text-sm font-medium">Platform: {course.platform}</p>
        <p className="text-slate-400 text-xs">{course.date}</p>
        <p className="text-slate-300 text-sm line-clamp-2">{course.description}</p>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-800/50">
        <p className="text-xs font-medium text-slate-400 mb-2">Skills Acquired:</p>
        <div className="flex flex-wrap gap-2">
          {course.skills.map((skill, idx) => (
            <span key={idx} className="px-2 py-1 text-xs rounded-full bg-slate-800/50 text-slate-300">{skill}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div id="page5" className="min-h-screen bg-gradient-to-t from-black to-gray-900 py-20 px-4 sm:px-8 font-sans">
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 gsap-animate">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">
            Experience & Achievements
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-600 rounded-full mx-auto mt-4"></div>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            Showcasing a journey of professional growth through impactful experiences, certifications, and continuous learning.
          </p>
        </div>

        {/* Sticky Tab Navigation */}
        <div className="top-0 z-10 backdrop-blur-sm py-4 mb-12 gsap-animate">
          <div className="flex justify-center flex-wrap gap-4">
            {["Certificates", "Experience", "Courses"].map((tab) => (
              <TabButton
                key={tab}
                label={tab}
                isActive={selectedTab === tab}
                onClick={() => setSelectedTab(tab)}
              />
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Certificates Section */}
            {selectedTab === "Certificates" && (
              <>
                {/* Desktop View */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {certificates.slice(currentCertificateSlide, currentCertificateSlide + 3).map((cert, index) => (
                    <CertificateCard key={currentCertificateSlide + index} cert={cert} />
                  ))}
                </div>

                {/* Navigation Controls */}
                <div className="hidden md:flex justify-center mt-10 items-center gap-6">
                  <motion.button
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      currentCertificateSlide > 0
                        ? "bg-amber-500 text-white hover:bg-amber-600"
                        : "bg-slate-800/50 text-slate-600 cursor-not-allowed"
                    }`}
                    onClick={handlePrevCertificateSlide}
                    disabled={currentCertificateSlide === 0}
                    whileHover={currentCertificateSlide > 0 ? { scale: 1.1 } : {}}
                    whileTap={currentCertificateSlide > 0 ? { scale: 0.9 } : {}}
                  >
                    <IoIosArrowBack size={24} />
                  </motion.button>

                  <div className="flex gap-3">
                    {Array.from({ length: Math.ceil(certificates.length / 3) }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentCertificateSlide(idx * 3)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          currentCertificateSlide / 3 === idx ? "bg-amber-500 w-8" : "bg-slate-700 hover:bg-slate-600"
                        }`}
                        aria-label={`Go to certificate slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <motion.button
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      currentCertificateSlide < certificates.length - 3
                        ? "bg-amber-500 text-white hover:bg-amber-600"
                        : "bg-slate-800/50 text-slate-600 cursor-not-allowed"
                    }`}
                    onClick={handleNextCertificateSlide}
                    disabled={currentCertificateSlide >= certificates.length - 3}
                    whileHover={currentCertificateSlide < certificates.length - 3 ? { scale: 1.1 } : {}}
                    whileTap={currentCertificateSlide < certificates.length - 3 ? { scale: 0.9 } : {}}
                  >
                    <IoIosArrowForward size={24} />
                  </motion.button>
                </div>

                {/* Mobile View */}
                <div className=" W-full flex flex-col items-center md:hidden grid grid-cols-1 gap-8 max-w-md mx-auto">
                  {certificates.map((cert, index) => (
                    <CertificateCard key={index} cert={cert} />
                  ))}
                </div>
              </>
            )}

            {/* Experience Section */}
            {selectedTab === "Experience" && (
              <>
                {/* Desktop View */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {experiences.slice(currentExperienceSlide, currentExperienceSlide + 3).map((exp, index) => (
                    <ExperienceCard key={currentExperienceSlide + index} exp={exp} />
                  ))}
                </div>

                {/* Navigation Controls */}
                <div className="hidden md:flex justify-center mt-10 items-center gap-6">
                  <motion.button
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      currentExperienceSlide > 0
                        ? "bg-amber-500 text-white hover:bg-amber-600"
                        : "bg-slate-800/50 text-slate-600 cursor-not-allowed"
                    }`}
                    onClick={handlePrevExperienceSlide}
                    disabled={currentExperienceSlide === 0}
                    whileHover={currentExperienceSlide > 0 ? { scale: 1.1 } : {}}
                    whileTap={currentExperienceSlide > 0 ? { scale: 0.9 } : {}}
                  >
                    <IoIosArrowBack size={24} />
                  </motion.button>

                  <div className="flex gap-3">
                    {Array.from({ length: Math.ceil(experiences.length / 3) }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentExperienceSlide(idx * 3)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          currentExperienceSlide / 3 === idx ? "bg-amber-500 w-8" : "bg-slate-700 hover:bg-slate-600"
                        }`}
                        aria-label={`Go to experience slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <motion.button
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      currentExperienceSlide < experiences.length - 3
                        ? "bg-amber-500 text-white hover:bg-amber-600"
                        : "bg-slate-800/50 text-slate-600 cursor-not-allowed"
                    }`}
                    onClick={handleNextExperienceSlide}
                    disabled={currentExperienceSlide >= experiences.length - 3}
                    whileHover={currentExperienceSlide < experiences.length - 3 ? { scale: 1.1 } : {}}
                    whileTap={currentExperienceSlide < experiences.length - 3 ? { scale: 0.9 } : {}}
                  >
                    <IoIosArrowForward size={24} />
                  </motion.button>
                </div>

                {/* Mobile View */}
                <div className="md:hidden grid grid-cols-1 gap-8 max-w-md mx-auto">
                  {experiences.map((exp, index) => (
                    <ExperienceCard key={index} exp={exp} />
                  ))}
                </div>
              </>
            )}

            {/* Courses Section */}
            {selectedTab === "Courses" && (
              <>
                {/* Desktop View */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {courses.slice(currentCourseSlide, currentCourseSlide + 3).map((course, index) => (
                    <CourseCard key={currentCourseSlide + index} course={course} />
                  ))}
                </div>

                {/* Navigation Controls */}
                <div className="hidden md:flex justify-center mt-10 items-center gap-6">
                  <motion.button
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      currentCourseSlide > 0
                        ? "bg-amber-500 text-white hover:bg-amber-600"
                        : "bg-slate-800/50 text-slate-600 cursor-not-allowed"
                    }`}
                    onClick={handlePrevCourseSlide}
                    disabled={currentCourseSlide === 0}
                    whileHover={currentCourseSlide > 0 ? { scale: 1.1 } : {}}
                    whileTap={currentCourseSlide > 0 ? { scale: 0.9 } : {}}
                  >
                    <IoIosArrowBack size={24} />
                  </motion.button>

                  <div className="flex gap-3">
                    {Array.from({ length: Math.ceil(courses.length / 3) }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentCourseSlide(idx * 3)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          currentCourseSlide / 3 === idx ? "bg-amber-500 w-8" : "bg-slate-700 hover:bg-slate-600"
                        }`}
                        aria-label={`Go to course slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <motion.button
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      currentCourseSlide < courses.length - 3
                        ? "bg-amber-500 text-white hover:bg-amber-600"
                        : "bg-slate-800/50 text-slate-600 cursor-not-allowed"
                    }`}
                    onClick={handleNextCourseSlide}
                    disabled={currentCourseSlide >= courses.length - 3}
                    whileHover={currentCourseSlide < courses.length - 3 ? { scale: 1.1 } : {}}
                    whileTap={currentCourseSlide < courses.length - 3 ? { scale: 0.9 } : {}}
                  >
                    <IoIosArrowForward size={24} />
                  </motion.button>
                </div>

                {/* Mobile View */}
                <div className="md:hidden grid grid-cols-1 gap-8 max-w-md mx-auto">
                  {courses.map((course, index) => (
                    <CourseCard key={index} course={course} />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Popup Modal */}
        <AnimatePresence>
          {popupData && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPopupData(null)}
            >
              <motion.div
                className="bg-gradient-to-br from-slate-900/90 to-slate-950/90 text-white p-8 rounded-2xl border border-slate-800/50 shadow-2xl w-full max-w-lg max-h-[80vh] overflow-auto backdrop-blur-sm"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-semibold text-amber-400">{popupData.title}</h2>
                  <button
                    className="text-slate-400 hover:text-white transition-colors"
                    onClick={() => setPopupData(null)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {popupData.issuer && (
                  <p className="text-slate-300 text-sm mb-2">
                    <span className="font-medium">Issuer:</span> {popupData.issuer}
                  </p>
                )}

                {popupData.company && (
                  <p className="text-slate-300 text-sm mb-2">
                    <span className="font-medium">Company:</span> {popupData.company}
                  </p>
                )}

                {popupData.platform && (
                  <p className="text-slate-300 text-sm mb-2">
                    <span className="font-medium">Platform:</span> {popupData.platform}
                  </p>
                )}

                {(popupData.period || popupData.date) && (
                  <p className="text-slate-400 text-xs mb-4">{popupData.period || popupData.date}</p>
                )}

                <div className="my-4 border-t border-slate-800/50 pt-4">
                  <p className="text-slate-300 text-sm">{popupData.description}</p>
                </div>

                {popupData.achievements && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-amber-400 mb-2">Achievements</h3>
                    <ul className="space-y-2">
                      {popupData.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start text-sm text-slate-300">
                          <div className="h-3 w-3 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5 mr-2">
                            <div className="h-1 w-1 rounded-full bg-amber-500"></div>
                          </div>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {popupData.skills && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-amber-400 mb-2">Skills Acquired</h3>
                    <div className="flex flex-wrap gap-2">
                      {popupData.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs rounded-full bg-slate-800/50 text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-end gap-4">
                  {popupData.pdf && (
                    <a
                      href={popupData.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all"
                    >
                      View Certificate <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    className="bg-slate-800/50 hover:bg-slate-700/50 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors backdrop-blur-sm"
                    onClick={() => setPopupData(null)}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExperiencePage;