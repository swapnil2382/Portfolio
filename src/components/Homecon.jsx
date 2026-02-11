import React, { useState } from "react";
import { motion } from "framer-motion";
import { CloudDownload, Sparkles } from "lucide-react";
import resumePDF from "../components/Swapnil resume final2.pdf";
import avatar from "../assets/avatar-removebg-preview.png";

const Homecon = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 pt-10 md:pt-0 pb-10 md:pb-0 overflow-hidden w-full"
    >
      {/* Background gradient animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-40 z-[-1]"
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-30"
        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-16 h-16 bg-yellow-400 rounded-full opacity-30"
        animate={{ y: [0, 15, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Avatar section with glow */}
      <motion.div
        className="relative w-48 sm:w-56 md:w-64 lg:w-96 xl:w-[450px]"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Glowing background behind avatar */}
        <motion.div
  className="absolute -inset-6 sm:-inset-10 bg-gradient-to-r from-yellow-400 to-blue-600 rounded-full blur-3xl opacity-30"
  animate={{
    scale: [1, 1.1, 1],
    opacity: [0.2, 0.3, 0.2],
  }}
  transition={{ duration: 3, repeat: Infinity }}
/>

        <img src={avatar} alt="Avatar" className="relative z-10 w-full object-contain drop-shadow-2xl" />
      </motion.div>

      {/* Text Content */}
      <div className="flex flex-col items-center md:items-start mt-5 md:mt-0 md:ml-16">
        {/* Welcome Message */}
        <motion.div
          className="flex items-center justify-center md:justify-start gap-2 text-yellow-400 mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-sm uppercase tracking-wider">Welcome to my portfolio</span>
        </motion.div>

        {/* Main Headings */}
        <motion.h1
          className="font-extrabold uppercase text-white drop-shadow-md text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">Hey, I am</span>{" "}
          <br />
          <span className="text-yellow-400 text-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl whitespace-nowrap">Swapnil</span>{" "}
          <br />
          <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-4xl">Who believes in Transforming</span>{" "}
          <br />
          <span className="text-yellow-400 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl">Ideas into Reality</span>
        </motion.h1>

        {/* Subtitle */}
        <p className="mt-3 text-lg text-gray-300">
          <span className="text-yellow-400">MERN Stack Developer</span> | Anime UI Enthusiast ⚡
        </p>

        {/* Resume Button */}
        <motion.div
          className="relative mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <a
            href={resumePDF}
            target="_blank"
            className={`relative flex items-center justify-start 
              ${isHovered ? "w-48 md:w-48 px-4" : "w-12 md:w-16"} 
              h-12 md:h-16 bg-gradient-to-r from-yellow-500 to-yellow-500 
              rounded-full transition-all duration-500 overflow-hidden`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span
              className="absolute flex items-center justify-center 
              w-12 h-12 md:w-16 md:h-16 rounded-full transition-transform 
              duration-300"
            >
              <CloudDownload size={28} className="text-white" />
            </span>
            <motion.span
              className="ml-16 text-white font-bold text-sm md:text-lg uppercase whitespace-nowrap"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
              transition={{ duration: 0.3 }}
            >
              Resume
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Homecon;
