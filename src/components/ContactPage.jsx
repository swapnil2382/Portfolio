import React, { useState, useEffect } from "react";
import {
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt
} from "react-icons/fa";
import { motion } from "framer-motion";

const ModernContactPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("direct");

  // Simulate animations with useState
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const contactMethods = [
    { title: "Direct Contact", id: "direct" },
    { title: "Social Media", id: "social" },
    { title: "Availability", id: "availability" }
  ];

  const socialLinks = [
    {
      icon: <FaInstagram className="text-2xl" />,
      label: "Instagram",
      url: "https://www.instagram.com/swapnil._16",
      color: "bg-gradient-to-br from-purple-600 to-pink-500 bg-opacity-80",
      username: "@swapnil._16"
    },
    {
      icon: <FaWhatsapp className="text-2xl" />,
      label: "WhatsApp",
      url: "https://wa.me/917410522382",
      color: "bg-green-500 bg-opacity-80",
      username: "+91 7410522382"
    },
    {
      icon: <FaLinkedin className="text-2xl" />,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/swapnil-patil-1029492bb/",
      color: "bg-blue-600 bg-opacity-80",
      username: "Swapnil Patil"
    },
    {
      icon: <FaGithub className="text-2xl" />,
      label: "GitHub",
      url: "https://github.com/swapnil2382",
      color: "bg-slate-700 bg-opacity-80",
      username: "swapnil2382"
    },
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="w-full max-w-6xl relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 mb-4">
            Let's Connect
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Have a project idea, collaboration proposal, or just want to say hi?
            I'm just a click away. Let's create something amazing together!
          </p>
        </div>

        {/* Main content */}
        <div className={` backdrop-blur-sm rounded-2xl p-6 md:p-8  shadow-xl transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
          {/* Tab navigation */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
            {contactMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setActiveSection(method.id)}
                className={`px-4 py-2 md:px-6 md:py-3 rounded-full transition-all duration-300 ${activeSection === method.id
                  ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-slate-900 font-medium shadow-lg shadow-yellow-600/20"
                  : "bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-slate-200"
                  }`}
              >
                {method.title}
              </button>
            ))}
          </div>

          {/* Direct Contact Section */}
          {activeSection === "direct" && (
  <div id="direct-contact" className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Phone */}
    <a href="tel:+917410522382" className="block">
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-amber-600/10 hover:border-amber-500/30 cursor-pointer">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-3 rounded-lg text-slate-900">
            <FaPhone />
          </div>
          <h3 className="text-xl font-medium text-slate-200">Phone</h3>
        </div>
        <p className="text-slate-300 text-lg mb-2">+91 7410522382</p>
        <p className="text-slate-400 text-sm">Flexible and usually reachable.</p>
        <p className="text-slate-400 text-sm mt-1">Click to call</p>
      </div>
    </a>

    {/* Email */}
    <a href="mailto:swapnilpatil2382@gmail.com" className="block">
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 sm:p-6 transition-all duration-300 hover:shadow-lg hover:shadow-amber-600/10 hover:border-amber-500/30 cursor-pointer">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-3 rounded-lg text-slate-900">
            <FaEnvelope />
          </div>
          <h3 className="text-xl font-medium text-slate-200">Email</h3>
        </div>
        <p className="text-slate-300 text-lg break-words mb-2">swapnilpatil2382@gmail.com</p>
        <p className="text-slate-400 text-sm">I'll respond within 24 hours</p>
        <p className="text-slate-400 text-sm mt-1">Click to email</p>
      </div>
    </a>

    {/* Location (non-clickable) */}
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 md:col-span-2 transition-all duration-300 hover:shadow-lg hover:shadow-amber-600/10 hover:border-amber-500/30">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-3 rounded-lg text-slate-900">
          <FaMapMarkerAlt />
        </div>
        <h3 className="text-xl font-medium text-slate-200">Location</h3>
      </div>
      <p className="text-slate-300 text-lg">India</p>
      <p className="text-slate-400 text-sm mt-2">Available for remote work worldwide</p>
    </div>
  </div>
)}
          {/* Social Media Section */}
          {activeSection === "social" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-slate-800/30 backdrop-blur-md hover:bg-slate-800/60 border border-slate-700/50 rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-amber-600/10 hover:border-amber-500/30"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 rounded-lg text-slate-300 group-hover:scale-110 transition-all duration-300">
                      {social.icon}
                    </div>

                    <h3 className="text-lg font-medium text-slate-200 mb-1">{social.label}</h3>
                    <p className="text-sm text-slate-400">{social.username}</p>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Availability Section */}
          {activeSection === "availability" && (
            <motion.div
              className="bg-gray-800/50 sm:bg-gray-800/70 border border-gray-700/50 sm:border-gray-700 rounded-xl p-6 sm:p-8 max-w-2xl mx-auto"
           
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-r from-yellow-400 to-amber-500 p-3 rounded-lg text-gray-900">
                  <FaCalendarAlt size={20} />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-100">My Availability</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-yellow-400 mb-2">Engagement Types</h3>
                  <ul className="text-gray-300 text-sm sm:text-base space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span> Freelance Projects — Actively accepting
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span> Collaborations — Open to partnerships
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span> Full-Time Roles — Exploring opportunities
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Response Time</p>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Within 24 hours</span>
                      <div className="w-1/2 bg-gray-700 h-2 rounded-full">
                        <div className="bg-amber-500 h-2 rounded-full w-5/6" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Availability Level</p>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">High (Flexible hours)</span>
                      <div className="w-1/2 bg-gray-700 h-2 rounded-full">
                        <div className="bg-amber-500 h-2 rounded-full w-5/6" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <motion.a
                  href="#direct-contact"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 font-medium rounded-full shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSection("direct")}
                >
                  Contact Me Now
                </motion.a>
              </div>
            </motion.div>
          )}

        </div>

        {/* Footer Section */}
        <div className={`text-center mt-12 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "600ms" }}>
          <p className="text-slate-400">
            Looking forward to connecting with you and exploring possible collaborations!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModernContactPage;