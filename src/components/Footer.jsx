import useGsapAnimations from "../components/useGsapAnimations";
const Footer = () => {
  useGsapAnimations();
    return (
      <footer className="w-full bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center px-4">
        
          <p className="text-lg font-semibold mb-2">Swapnil's Portfolio</p>
  
     
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <a
              href="https://www.linkedin.com/in/swapnil-patil-1029492bb/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-sm md:text-base"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/swapnil2382"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-sm md:text-base"
            >
              GitHub
            </a>
            <a
              href="https://www.instagram.com/swapnil._16/?igsh=MXViZ3hkZ3JzcTlhMQ%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-sm md:text-base"
            >
              Instagram
            </a>
            <a
              href="https://wa.me/917410522382"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-sm md:text-base"
            >
              WhatsApp
            </a>
          </div>
  
      
          <p className="text-xs md:text-sm mt-4">
            © {new Date().getFullYear()} Swapnil Patil. All rights reserved.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  