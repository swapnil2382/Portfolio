import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Briefcase, Zap, Sparkles } from 'lucide-react';
import Profileimg from '../components/swapnil_SD_Codehub.jpg';

const AboutPage = () => {
  // For parallax effects
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  // For intersection observer animations
  const contentRef = useRef(null);
  const canvasRef = useRef(null);

  // Background particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Particle properties
    const particlesArray = [];
    const particleCount = Math.min(30, Math.floor(window.innerWidth / 50));
    
    const createParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particlesArray.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: Math.random() > 0.5 ? '#fde047' : '#f472b6',
          opacity: Math.random() * 0.3 + 0.1
        });
      }
    };
    createParticles();
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        const p = particlesArray[i];
        
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Boundary check
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      }
      
      // Draw connections
      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${0.03 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);
  
  return (
    <div id="page2" className="relative bg-gradient-to-t from-black to-gray-900 text-white min-h-screen overflow-hidden">
      {/* Background Canvas for Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full -z-10 opacity-60"
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-yellow-400 rounded-full opacity-5 blur-3xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 10 + Math.random() * 10,
            }}
          />
        ))}
      </div>
      
      {/* Main content */}
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        {/* Header with title */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 mb-4">
            About Me
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 mx-auto mb-2 rounded-full"></div>
        </motion.div>
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left section - Image (4 columns on large screens) */}
          <motion.div 
            className="lg:col-span-5 mb-8 lg:mb-0"
            style={{ y }}
          >
            <ProfileImage src={Profileimg} alt="Swapnil Profile" />
          </motion.div>
          
          {/* Right section - Content (8 columns on large screens) */}
          <div className="lg:col-span-7" ref={contentRef}>
            {/* Introduction */}
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-yellow-400 mb-3">Who Am I?</h2>
                <AnimatedText 
                  text="I am a MERN Stack Developer dedicated to creating high-performance, user-friendly web applications."
                  className="text-lg text-gray-300 leading-relaxed"
                  once={true}
                />
                <p className="mt-3 text-gray-300 leading-relaxed">
                  With expertise in <span className="text-pink-400 font-medium">React, Next.js, and Tailwind CSS</span>, 
                  I bring ideas to life with seamless, efficient, and visually appealing interfaces.
                </p>
              </motion.div>
            </div>
            
            {/* My Journey section (Replaces Skills section) */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-yellow-400 mb-3">My Journey</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <JourneyCard
                  icon={<Code size={20} className='text-black'/>}
                  title="The Beginning"
                  description="Started coding with HTML and CSS, building static pages. My curiosity led me to JavaScript, sparking a passion for dynamic web development."
                  delay={0.2}
                />
                <JourneyCard
                  icon={<Briefcase size={20}  className='text-black'/>}
                  title="Going Full-Stack"
                  description="Mastered the MERN stack, diving into Node.js and MongoDB to create end-to-end applications that power seamless user experiences."
                  delay={0.4}
                />
                <JourneyCard
                  icon={<Zap size={20} className='text-black' />}
                  title="Embracing Challenges"
                  description="Tackled complex projects, from real-time apps to performance-critical platforms, learning to optimize and innovate under pressure."
                  delay={0.6}
                />
                <JourneyCard
                  icon={<Sparkles size={20} className='text-black' />}
                  title="Looking Ahead"
                  description="Driven to explore AI-driven interfaces and Web3 technologies, aiming to shape the future of web development with cutting-edge solutions."
                  delay={0.8}
                />
              </div>
            </motion.div>
            
            {/* What drives me section */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-yellow-400 mb-3">What Drives Me?</h2>
              <p className="text-gray-300 leading-relaxed group">
                I love crafting <span className="text-yellow-400 font-medium">interactive, engaging experiences</span> that 
                push boundaries in web development.
                <br />
                My focus is on <span className="text-pink-400 font-medium">performance, accessibility, and futuristic UI/UX</span> that 
                <span className="text-yellow-400 font-medium ml-1">enhances user engagement</span>.
              </p>
              
              <motion.button
  className="mt-6 px-6 py-3 bg-gradient-to-r from-yellow-500 to-pink-500 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.98 }}
  onClick={() => {
    const section = document.getElementById("page4");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }}
>
  View My Work
</motion.button>

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// JourneyCard Component (Replaces SkillCard)
const JourneyCard = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-xl border border-gray-700 shadow-lg backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        scale: 1.02, 
        boxShadow: "0 0 15px 2px rgba(253, 224, 71, 0.3)",
        borderColor: "#fde047" 
      }}
    >
      <div className="flex items-center mb-3">
        <div className="p-2 bg-yellow-500 bg-opacity-20 rounded-lg mr-3 text-yellow-400">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-yellow-400">{title}</h3>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

// ProfileImage Component
const ProfileImage = ({ src, alt }) => {
  return (
    <motion.div
      className="relative w-full max-w-[320px] h-[450px] sm:max-w-[320px] md:max-w-[380px] md:h-[500px] mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400 to-pink-500 opacity-20 blur-xl -z-10 transform rotate-3"></div>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-pink-500 to-yellow-400 opacity-20 blur-xl -z-10 transform -rotate-3"></div>
      
      {/* Frame */}
      <div className="absolute inset-0 border-2 border-yellow-400 rounded-2xl opacity-50 transform rotate-3"></div>
      <div className="absolute inset-0 border-2 border-pink-400 rounded-2xl opacity-50 transform -rotate-3"></div>
      
      {/* Main image container */}
      <div className="relative w-full h-full overflow-hidden rounded-xl shadow-2xl transition-all duration-500 group">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40 z-10"></div>
        
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-center rounded-xl transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Corner accents */}
        <div className="absolute top-0 left-0 h-1/2 w-[4px] bg-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:shadow-[0px_0px_15px_4px_rgba(253,224,71,0.7)]"></div>
        <div className="absolute top-0 left-0 w-1/2 h-[4px] bg-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:shadow-[0px_0px_15px_4px_rgba(253,224,71,0.7)]"></div>
        <div className="absolute bottom-0 right-0 h-1/2 w-[4px] bg-pink-400 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:shadow-[0px_0px_15px_4px_rgba(244,114,182,0.7)]"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-[4px] bg-pink-400 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:shadow-[0px_0px_15px_4px_rgba(244,114,182,0.7)]"></div>
        
        {/* Name label */}
        <motion.div 
          className="absolute bottom-5 left-0 right-0 text-center z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <div className="inline-block bg-black bg-opacity-50 backdrop-blur-sm px-4 py-2 rounded-full">
            <h3 className="text-yellow-400 font-bold text-xl">Swapnil</h3>
            <p className="text-white text-sm">MERN Stack Developer</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// AnimatedText Component
const AnimatedText = ({ text, className = '', once = false }) => {
  const words = text.split(' ');
  
  // Variants for the container
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };
  
  // Variants for each word
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };
  
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-1"
          variants={child}
        >
          {word}{' '}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AboutPage;