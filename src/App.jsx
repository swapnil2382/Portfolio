import React, { useState } from "react";
import Navbar from "./components/navigation/Navbar";
import CommandPalette from "./components/navigation/CommandPalette";
import Cursor from "./components/navigation/Cursor";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import Skills from "./components/skills/Skills";
import Experience from "./components/experience/Experience";
import Projects from "./components/projects/Projects";
import Education from "./components/education/Education";
import Contact from "./components/contact/Contact";
import Footer from "./components/contact/Footer";

const App = () => {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <>
      <Cursor />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />
    </>
  );
};

export default App;
