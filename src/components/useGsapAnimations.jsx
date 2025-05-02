import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const useGsapAnimations = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".gsap-animate");

    // Handle window resize for mobile-specific animations
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    const updateDesktopAnimations = () => {
      const desktopElements = document.querySelectorAll(".gsap-animate-desktop");

      desktopElements.forEach((el) => {
        gsap.set(el, { opacity: 0 });

        gsap.to(el, {
          opacity: 1,
          duration: 0.6,
          ease: "power4.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reset",
            markers: false,
            scrub: false,
            pin: false,
          },
        });
      });
    };

    const updateMobileAnimations = () => {
      const mobileElements = document.querySelectorAll(".gsap-animate-mobile");

      mobileElements.forEach((el) => {
        gsap.set(el, { opacity: 0 });

        gsap.to(el, {
          opacity: 1,
          duration: 0.6,
          ease: "power4.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reset",
            markers: false,
            scrub: false,
            pin: false,
          },
        });
      });
    };

    // Apply desktop animations if screen size > 768px
    if (!mobileQuery.matches) {
      updateDesktopAnimations();
    }

    // Apply mobile-specific animations if screen size <= 768px
    if (mobileQuery.matches) {
      updateMobileAnimations();
    }

    // Listen for changes in screen size and update animations accordingly
    mobileQuery.addListener((e) => {
      if (e.matches) {
        updateMobileAnimations(); // Apply mobile animation
      } else {
        updateDesktopAnimations(); // Apply desktop animation
      }
    });

    // Cleanup on component unmount
    return () => {
      gsap.killTweensOf(elements);
    };
  }, []);
};

export default useGsapAnimations;
