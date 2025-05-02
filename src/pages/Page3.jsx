import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import useGsapAnimations from "../components/useGsapAnimations";

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  { name: "Node.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Java", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "HTML5", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Figma", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Bootstrap", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "MongoDB", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Git", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", white: true },
  { name: "Express", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", white: true },
  { name: "React", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "blue" },
];

const chunkArray = (array, size) => {
  return array.reduce((acc, _, i) => {
    if (i % size === 0) acc.push(array.slice(i, i + size));
    return acc;
  }, []);
};

const Page3 = () => {
  const rowsRef = useRef([]);

  useEffect(() => {
    rowsRef.current.forEach((row, index) => {
      if (row) {
        gsap.set(row, { visibility: "hidden", opacity: 0, scale: 0.5 }); 

        gsap.to(row, {
          opacity: 1,
          scale: 1,
          visibility: "visible",
          duration: 0.6,
          ease: "power4.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reset",
          },
        });
      }
    });
  }, []);

  const rows = chunkArray(techStack, 4);
  useGsapAnimations();

  return (
    <div id="page3" className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900 text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 mb-4">
             Skills
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 mx-auto mb-6 rounded-full"></div>

      <div className="w-full sm:w-full md:w-4/5 lg:w-3/5 flex flex-col items-center mt-10 pb-10">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            ref={(el) => (rowsRef.current[rowIndex] = el)}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9 w-full mb-9"
          >
            {row.map((tech, index) => (
              <div
                key={index}
                className="p-6 bg-[#29282880] border border-gray-700 rounded-[30%] shadow-lg transition-all transform hover:scale-110 hover:border-yellow-400 hover:shadow-[0_0_15px_2px_rgba(250,204,21,0.5)] flex justify-center items-center w-full aspect-square"
                >
                <img
                  src={tech.image}
                  alt={tech.name}
                  className={`w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 ${tech.white ? "filter invert" : ""}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page3;
