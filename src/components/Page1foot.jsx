import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Page1foot = () => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    gsap.to(marqueeRef.current, {
      x: "-100%",
      duration: 10,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  return (
    <div className="overflow-hidden w-full  py-4">
      <div ref={marqueeRef} className="whitespace-nowrap text-2xl font-bold uppercase text-yellow-500 flex space-x-10">
        <span>⚡ Creative Coder ⚡ Anime UI ⚡ Problem Solver ⚡ Passionate Dev ⚡</span>
        <span>⚡ Creative Coder ⚡ Anime UI ⚡ Problem Solver ⚡ Passionate Dev ⚡</span>
        <span>⚡ Creative Coder ⚡ Anime UI ⚡ Problem Solver ⚡ Passionate Dev ⚡</span>
        <span>⚡ Creative Coder ⚡ Anime UI ⚡ Problem Solver ⚡ Passionate Dev ⚡</span>
        <span>⚡ Creative Coder ⚡ Anime UI ⚡ Problem Solver ⚡ Passionate Dev ⚡</span>
        <span>⚡ Creative Coder ⚡ Anime UI ⚡ Problem Solver ⚡ Passionate Dev ⚡</span>
        <span>⚡ Creative Coder ⚡ Anime UI ⚡ Problem Solver ⚡ Passionate Dev ⚡</span>
        <span>⚡ Creative Coder ⚡ Anime UI ⚡ Problem Solver ⚡ Passionate Dev ⚡</span>
        <span>⚡ Creative Coder ⚡ Anime UI ⚡ Problem Solver ⚡ Passionate Dev ⚡</span>
        <span>⚡ Creative Coder ⚡ Anime UI ⚡ Problem Solver ⚡ Passionate Dev ⚡</span>
        <span>⚡ Creative Coder ⚡ Anime UI ⚡ Problem Solver ⚡ Passionate Dev ⚡</span>
        <span>⚡ Creative Coder ⚡ Anime UI ⚡ Problem Solver ⚡ Passionate Dev ⚡</span>
        <span>⚡ Creative Coder ⚡ Anime UI ⚡ Problem Solver ⚡ Passionate Dev ⚡</span>
      </div>
    </div>
  );
};

export default Page1foot;
