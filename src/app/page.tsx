'use client';
import Image from "next/image";
import TypewriterText from "@/components/TypewriterText";
import HamburgerMenu from "@/components/HamburgerMenu";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [activeSection, setActiveSection] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionIndex = parseInt(entry.target.getAttribute('data-section') || '0');
        
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          entry.target.classList.remove('fade-out');
          setActiveSection(sectionIndex);
        } else {
          entry.target.classList.remove('fade-in');
          entry.target.classList.add('fade-out');
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: "-10% 0px -10% 0px"
    });

    document.querySelectorAll('.section-content').forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const handleNavigate = (section: number) => {
    if (scrollContainerRef.current) {
      const targetSection = scrollContainerRef.current.children[section] as HTMLElement;
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <HamburgerMenu onNavigate={handleNavigate} />
      <div ref={scrollContainerRef} className="snap-y snap-mandatory h-screen w-full overflow-y-scroll">
        {/* First Section - Logo */}
        <section className="snap-start h-screen w-full flex items-center justify-center bg-white relative">
          <div className="section-content flex flex-col items-center" data-section="0">
            <div className="relative w-[150px] h-[150px]">
              <Image
                src="/images/ETERNAL VENTURES - no ventures.png"
                alt="ETERNAL Logo"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <div className="mt-[-15px] ml-[-8px]">
              <TypewriterText 
                text="VENTURES"
                startTyping={activeSection === 0}
                delay={100}
              />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white pointer-events-none" />
        </section>

        {/* Second Section - Description */}
        <section className="snap-start h-screen w-full flex items-center justify-center bg-white relative">
          <div className="section-content transition-opacity duration-700" data-section="1">
            <div className="text-sm">
              <TypewriterText 
                text="A VENTURE STUDIO SPECIALIZING IN CREATIVE RESEARCH."
                startTyping={activeSection === 1}
                delay={70}
              />
            </div>
          </div>
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-white pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white pointer-events-none" />
        </section>

        {/* Third Section - Labs */}
        <section className="snap-start h-screen w-full flex items-center justify-center bg-white relative">
          <div className="section-content flex flex-col items-center" data-section="2">
            <div className="relative w-[150px] h-[150px]">
              <Image
                src="/images/ETERNAL VENTURES - no ventures.png"
                alt="ETERNAL Logo"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <div className="mt-[-15px] ml-[-8px]">
              <TypewriterText 
                text="LABS"
                startTyping={activeSection === 2}
                delay={150}
                startDelay={800}
              />
            </div>
          </div>
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-white pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white pointer-events-none" />
        </section>

        {/* Fourth Section - Research Description */}
        <section className="snap-start h-screen w-full flex items-center justify-center bg-white relative">
          <div className="section-content transition-opacity duration-700" data-section="3">
            <div className="text-sm">
              <TypewriterText 
                text="RESEARCHING, AND SHAPING THE WORLD OF CREATIVE TECHNOLOGY."
                startTyping={activeSection === 3}
                delay={70}
                startDelay={400}
              />
            </div>
          </div>
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-white pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white pointer-events-none" />
        </section>

        {/* Fifth Section - Garden */}
        <section className="snap-start h-screen w-full flex items-center justify-center bg-white relative">
          <div className="section-content flex flex-col items-center" data-section="4">
            <div className="relative w-[150px] h-[150px]">
              <Image
                src="/images/ETERNAL VENTURES - no ventures.png"
                alt="ETERNAL Logo"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <div className="mt-[-15px] ml-[-8px]">
              <TypewriterText 
                text="GARDEN"
                startTyping={activeSection === 4}
                delay={70}
                startDelay={800}
              />
            </div>
          </div>
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-white pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white pointer-events-none" />
        </section>

        {/* Sixth Section - Garden Description */}
        <section className="snap-start h-screen w-full flex items-center justify-center bg-white relative">
          <div className="section-content transition-opacity duration-700" data-section="5">
            <div className="text-sm">
              <TypewriterText 
                text="A SCI-FI FANTASY EPIC ABOUT A MYSTICAL SEED THAT SPAWNS INFINITE WORLDS."
                startTyping={activeSection === 5}
                delay={70}
                startDelay={400}
              />
            </div>
          </div>
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-white pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white pointer-events-none" />
        </section>

        {/* Seventh Section - Music */}
        <section className="snap-start h-screen w-full flex items-center justify-center bg-white relative">
          <div className="section-content flex flex-col items-center" data-section="6">
            <div className="relative w-[150px] h-[150px]">
              <Image
                src="/images/ETERNAL VENTURES - no ventures.png"
                alt="ETERNAL Logo"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <div className="mt-[-15px] ml-[-8px]">
              <TypewriterText 
                text="MUSIC"
                startTyping={activeSection === 6}
                delay={70}
                startDelay={800}
              />
            </div>
          </div>
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-white pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white pointer-events-none" />
        </section>

        {/* Eighth Section - Music Description */}
        <section className="snap-start h-screen w-full flex items-center justify-center bg-white relative">
          <div className="section-content transition-opacity duration-700" data-section="7">
            <div className="text-sm">
              <TypewriterText 
                text="A RECORD LABEL CREATING WORLD-BUILDING MUSICAL EXPERIENCES."
                startTyping={activeSection === 7}
                delay={70}
                startDelay={400}
              />
            </div>
          </div>
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-white pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white pointer-events-none" />
        </section>
      </div>
    </>
  );
}
