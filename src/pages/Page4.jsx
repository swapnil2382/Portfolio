import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

// Project data with images from ProjectsPage
const projects = [
  {
    id: "investment-portal",
    title: "Investment Portal",
    image:
      "https://png.pngtree.com/png-vector/20220702/ourmid/pngtree-business-making-money-and-investment-activities-of-people-vector-png-image_5681078.png",
    description:
      "A feature-rich investment calculator and stock trading platform that empowers users to analyze potential investments.",
    technologies: "React, Node.js, MongoDB",
    role: "Full Stack Developer",
    category: "finance",
  },
  {
    id: "fintech-ai-accountant",
    title: "Fintech – AI-Powered Accountant",
    image:
      "https://static.vecteezy.com/system/resources/previews/035/276/482/non_2x/unique-3d-rendering-tax-report-icon-simple-realistic-vector-illustration-free-png.png",
    description:
      "An intelligent financial management system using AI to track expenses, manage investments, and provide tax insights.",
    technologies: "MongoDB, Express.js, React, Node.js",
    role: "Full Stack Developer",
    category: "finance",
  },
  {
    id: "vendor-place-allocation",
    title: "Vendor Place Allocation System",
    image:
      "https://png.pngtree.com/png-vector/20240314/ourmid/pngtree-asset-allocation-vector-concept-color-illustration-png-image_11948850.png",
    description:
      "A platform for smart allocation of vendor spots in weekly markets to reduce congestion and improve vendor visibility.",
    technologies: "React, Node.js, MySQL",
    role: "Backend Developer",
    category: "management",
  },
  {
    id: "disaster-relief",
    title: "Disaster Relief Management System",
    image: "https://png.pngtree.com/png-vector/20230808/ourmid/pngtree-natural-disaster-vector-png-image_6877903.png",
    description:
      "A centralized platform to coordinate disaster relief efforts, ensuring faster response and resource distribution.",
    technologies: "React, Node.js, PostgreSQL",
    role: "Backend Developer",
    category: "management",
  },
  {
    id: "parent-teacher-portal",
    title: "Parent-Teacher Portal",
    image:
      "https://cdni.iconscout.com/illustration/premium/thumb/online-education-illustration-download-in-svg-png-gif-file-formats--e-book-learning-gradient-pack-business-illustrations-2488466.png?f=webp",
    description:
      "A digital platform that bridges the gap between parents and teachers, allowing seamless communication and performance tracking.",
    technologies: "React, Firebase, Express.js",
    role: "Full Stack Developer",
    category: "education",
  },
  {
    id: "complaint-management",
    title: "Complaint Management System",
    image: "https://alisonstech.com/wordpress/wp-content/uploads/2022/09/complaints-management-food-beverage.png",
    description:
      "A platform designed to streamline complaint filing and management, providing seamless tracking and resolution features.",
    technologies: "React, Node.js, MongoDB",
    role: "Full Stack Developer",
    category: "management",
  },
  {
    id: "movie-ticket-booking",
    title: "Movie Ticket Booking",
    image:
      "https://media.excellentwebworld.com/wp-content/uploads/2021/01/16121416/online-movie-ticket-booking-app_development.png",
    description: "A seamless movie ticket booking platform with real-time seat selection and payment integration.",
    technologies: "Python, Django, SQLite",
    role: "Backend Developer",
    category: "entertainment",
  },
  {
    id: "frontend-templates",
    title: "Frontend Templates",
    image: "https://apaengineering.com/wp-content/uploads/2022/11/ui-banner-desktop1.png",
    description: "A collection of modern, responsive frontend templates for various applications.",
    technologies: "HTML, CSS, JavaScript, Bootstrap",
    role: "UI/UX Designer",
    category: "design",
  },
  {
    id: "cultural-heritage",
    title: "Cultural Heritage (SANSKRITI)",
    image: "https://purepng.com/public/uploads/large/india-gxl.png",
    description: "An educational platform highlighting India's cultural richness.",
    technologies: "HTML, CSS, JavaScript, MongoDB",
    role: "Web Developer",
    category: "education",
  },
];

// Extract unique categories
const categories = ["all", ...new Set(projects.map((project) => project.category))];

const EnhancedProjectCards = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile on mount and when resized
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Dynamic projects per page based on screen size
  const projectsPerPage = isMobile ? 1 : 3;

  // Load animation effect
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Filter projects based on active category
  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Get current projects
  const currentProjects = filteredProjects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  // Handle page navigation
  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(0);
  }, [activeCategory]);

  // Reset to first page when switching between mobile and desktop views
  useEffect(() => {
    setCurrentPage(0);
  }, [isMobile]);

  return (
    <div id="page4" className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with styling from ProjectsPage */}
        <div className="relative text-center mb-16">
          {/* Background decorative elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl"></div>
          </div>

          <div className={`transform transition-all duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 mb-4">
              My Projects
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-slate-300 max-w-2xl mx-auto">
              A collection of my work across different domains and technologies.
            </p>
          </div>
        </div>

        {/* Category Filter with styling from ProjectsPage */}
        <div className="mb-10">
          <div className={`flex flex-wrap justify-center gap-2 transition-all duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-yellow-600 to-amber-600 text-white"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mb-6 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto">
              <span className="text-2xl">🔍</span>
            </div>
            <p className="text-xl font-medium text-slate-300 mb-2">No projects found in this category.</p>
            <p className="text-slate-400">Try selecting a different category.</p>
          </div>
        ) : (
          <>
            {/* Removed Mobile View Pagination Controls from Top */}

            {/* Project Cards Grid - Responsive */}
            <div 
              className={`grid ${
                isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3"
              } gap-6 mb-8 transition-all duration-700 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {currentProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl overflow-hidden border border-slate-800/50 shadow-xl transition-all duration-500 hover:border-yellow-500/30 hover:shadow-yellow-500/10 transform ${
                    isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  } ${isMobile ? "mx-auto max-w-sm" : ""}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden aspect-video">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent z-10"></div>
                    
                    {/* Category badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-300 backdrop-blur-sm">
                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                      </span>
                    </div>
                    
                    {/* Project image */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6 relative">
                    {/* Background glow effect */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-1/2 bg-yellow-500/5 blur-xl rounded-full opacity-70"></div>
                    
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-500 mb-3">
                        {project.title}
                      </h3>
                      
                      <p className="text-slate-300 text-sm mb-5">{project.description}</p>
                      
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.split(", ").map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 text-xs rounded-full bg-slate-800/80 text-slate-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center pt-4 border-t border-slate-800/50">
                          <span className="text-sm text-slate-400">{project.role}</span>
                          <a
                            href={`https://github.com/swapnil2382`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-yellow-400 hover:text-yellow-300 transition-colors hover:underline"
                          >
                            View Project <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Pagination */}
            {!isMobile && totalPages > 1 && (
              <div className={`flex justify-center items-center space-x-4 mt-10 transition-all duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
                <button
                  onClick={goToPrevPage}
                  className="p-3 rounded-full bg-slate-800/80 hover:bg-yellow-600/30 text-white transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        idx === currentPage 
                          ? "bg-yellow-500 w-8" 
                          : "bg-slate-600 hover:bg-slate-500"
                      }`}
                      aria-label={`Go to page ${idx + 1}`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={goToNextPage}
                  className="p-3 rounded-full bg-slate-800/80 hover:bg-yellow-600/30 text-white transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
            
            {/* Mobile View Pagination Controls - Bottom (Same style as desktop) */}
            {isMobile && totalPages > 1 && (
              <div className={`flex justify-center items-center space-x-4 mt-10 transition-all duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
                <button
                  onClick={goToPrevPage}
                  className="p-3 rounded-full bg-slate-800/80 hover:bg-yellow-600/30 text-white transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        idx === currentPage 
                          ? "bg-yellow-500 w-8" 
                          : "bg-slate-600 hover:bg-slate-500"
                      }`}
                      aria-label={`Go to page ${idx + 1}`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={goToNextPage}
                  className="p-3 rounded-full bg-slate-800/80 hover:bg-yellow-600/30 text-white transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
            
            {/* Page counter - for both mobile and desktop */}
            {totalPages > 1 && (
              <div className="text-center mt-4 text-sm text-slate-400">
                Page {currentPage + 1} of {totalPages}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EnhancedProjectCards;