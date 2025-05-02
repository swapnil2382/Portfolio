import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: "About", id: "page2" },
    { name: "Skills", id: "page3" },
    { name: "Experience", id: "page5" },
    { name: "Projects", id: "page4" },
    { name: "Contact", id: "page6" }
  ];

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // close mobile menu
    }
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center justify-between w-[85%] md:w-[60%] max-w-[550px] h-[70px] px-5 bg-black/80 backdrop-blur-lg shadow-lg rounded-full border border-yellow-400/30 transition-all duration-300 glowing-border hover:glow-hover">

      <div className="flex items-center">
        <a href="#home">
          <img
            src="https://us.123rf.com/450wm/mamun25g/mamun25g2007/mamun25g200701134/151666985-s-letter-logo-design-letter-s-design-s-logo.jpg"
            alt="S Logo"
            className="h-14 w-14 object-contain cursor-pointer rounded-full transition-all duration-300 hover:animate-wobble"
          />
        </a>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 text-[16px] font-semibold text-gray-200 tracking-wide">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="relative cursor-pointer transition-all duration-300 group hover:animate-bounce-small"
            onClick={() => handleScroll(item.id)}
          >
            <span className="group-hover:text-yellow-500">{item.name}</span>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
          </li>
        ))}
      </ul>

      {/* Mobile Icon */}
      <div className="md:hidden relative z-10">
        <FaBars
          className="text-[22px] text-yellow-500 cursor-pointer transition-all duration-300 hover:glow-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full right-0 mt-3 bg-black/90 shadow-lg rounded-lg p-4 w-48 flex flex-col space-y-3 z-50">
          {menuItems.map((item, index) => (
            <span
              key={index}
              className="text-white cursor-pointer font-semibold hover:text-yellow-500 transition"
              onClick={() => handleScroll(item.id)}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}

      <style>
        {`
          @keyframes wobble {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(5deg); }
            50% { transform: rotate(-5deg); }
            75% { transform: rotate(3deg); }
          }
          .hover\\:animate-wobble:hover {
            animation: wobble 0.4s ease-in-out;
          }

          @keyframes bounceSmall {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          .hover\\:animate-bounce-small:hover {
            animation: bounceSmall 0.3s ease-in-out;
          }

          @keyframes glow {
            0% {
              box-shadow:
                0 0 10px rgba(255, 221, 0, 0.6),
                0 0 20px rgba(255, 221, 0, 0.4),
                0 0 30px rgba(255, 221, 0, 0.2);
            }
            50% {
              box-shadow:
                0 0 20px rgba(255, 221, 0, 0.8),
                0 0 40px rgba(255, 221, 0, 0.5),
                0 0 60px rgba(255, 221, 0, 0.3);
            }
            100% {
              box-shadow:
                0 0 10px rgba(255, 221, 0, 0.6),
                0 0 20px rgba(255, 221, 0, 0.4),
                0 0 30px rgba(255, 221, 0, 0.2);
            }
          }

          .glowing-border {
            box-shadow:
              0 0 12px rgba(255, 221, 0, 0.5),
              0 0 25px rgba(255, 221, 0, 0.3);
          }

          .glow-hover:hover {
            animation: glow 2s infinite ease-in-out;
            transform: scale(1.02);
            border-color: rgba(255, 221, 0, 0.9);
          }

          .hover\\:glow-icon:hover {
            text-shadow: 0 0 10px rgba(255, 221, 0, 0.9);
            transform: scale(1.15);
          }
        `}
      </style>
    </nav>
  );
};

export default Header;
