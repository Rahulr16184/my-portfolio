import Hero from '@/app/components/sections/Hero';
import About from '@/app/components/sections/About';
import Skills from '@/app/components/sections/Skills';
import Projects from '@/app/components/sections/Projects';
import Experience from '@/app/components/sections/Experience';
import Contact from '@/app/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
}
