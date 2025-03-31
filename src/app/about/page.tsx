'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function About(): JSX.Element {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const texts = ['ETERNAL LABS', 'ETERNAL MUSIC', 'ETERNAL GARDEN'];
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Typewriter effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const type = () => {
      const fullText = texts[currentIndex];
      
      if (isDeleting) {
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
          setTypingSpeed(150);
          return;
        }
        setCurrentText(currentText.slice(0, -1));
        setTypingSpeed(50);
      } else {
        if (currentText === fullText) {
          setTypingSpeed(2000); // Pause at the end
          setIsDeleting(true);
          return;
        }
        setCurrentText(fullText.slice(0, currentText.length + 1));
        setTypingSpeed(150);
      }
    };

    timer = setTimeout(type, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, currentIndex, isDeleting, texts, typingSpeed]);

  // Add smooth scroll behavior
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const container = document.querySelector('.scroll-container');
      if (!container) return;

      const scrollAmount = e.deltaY;
      container.scrollBy({
        top: scrollAmount,
        behavior: 'smooth'
      });
    };

    const container = document.querySelector('.scroll-container');
    if (container) {
      container.addEventListener('wheel', handleWheel as EventListener, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel as EventListener);
      }
    };
  }, []);

  return (
    <div className="scroll-container h-screen overflow-y-auto snap-y snap-mandatory bg-white">
      {/* First Section */}
      <div className="h-screen snap-start flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-8">
          <Image
            src="/images/ETERNAL VENTURES - no ventures.png"
            alt="Eternal Ventures Logo"
            width={150}
            height={150}
            priority
          />
          <div className="text-center text-xs font-thin" style={{ fontFamily: 'var(--font-helios-ext)' }}>
            VENTURES
          </div>
          <div className="text-center text-xs font-thin max-w-[800px]" style={{ fontFamily: 'var(--font-helios-ext)' }}>
            ETERNAL VENTURES IS A STUDIO SPECIALIZING IN CREATIVE RESEARCH.
          </div>
          <div className="text-center text-xs font-thin" style={{ fontFamily: 'var(--font-helios-ext)' }}>
            FOUNDED IN 2023
          </div>
          {/* Scroll Arrow */}
          <div 
            className="mt-8 cursor-pointer transform transition-transform hover:translate-y-1"
            onClick={() => {
              const container = document.querySelector('.scroll-container');
              if (container) {
                container.scrollTo({
                  top: window.innerHeight,
                  behavior: 'smooth'
                });
              }
            }}
          >
            <div className="w-6 h-6 relative">
              <div className="absolute w-full h-[1px] bg-black rotate-45 origin-left"></div>
              <div className="absolute w-full h-[1px] bg-black -rotate-45 origin-right"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section - Horizontal Gallery */}
      <div className="h-screen snap-start flex flex-col items-center justify-center bg-white relative">
        {/* Circular Gallery Container */}
        <div className="relative w-[600px] h-[600px] flex items-center justify-center mx-auto">
          {/* Center Text */}
          <div 
            className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
            style={{ fontFamily: 'var(--font-helios-ext)' }}
          >
            <span className="text-xl font-bold tracking-wider whitespace-nowrap">
              {currentText}
              <span className="animate-blink">|</span>
            </span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            {/* Publishing and Media */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-circle-rotate" style={{ transformOrigin: 'center center', animationDelay: '0s' }}>
              <div className="w-[350px] h-[100px] border border-black p-4 flex flex-col gap-2 bg-white transform hover:scale-110 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
                <div className="text-xs font-bold tracking-wider" style={{ fontFamily: 'var(--font-helios-ext)' }}>PUBLISHING AND MEDIA</div>
                <div className="text-[10px] font-thin line-clamp-3" style={{ fontFamily: 'var(--font-helios-ext)' }}>
                  Crafts engaging narrative, features creative process, leverages AI-assisted storytelling workflows
                </div>
              </div>
            </div>

            {/* Merchandise */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-circle-rotate" style={{ transformOrigin: 'center center', animationDelay: '-5s' }}>
              <div className="w-[350px] h-[100px] border border-black p-4 flex flex-col gap-2 bg-white transform hover:scale-110 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
                <div className="text-xs font-bold tracking-wider" style={{ fontFamily: 'var(--font-helios-ext)' }}>MERCHANDISE</div>
                <div className="text-[10px] font-thin line-clamp-3" style={{ fontFamily: 'var(--font-helios-ext)' }}>
                  Physical IP expansion, thematic products inspired by narrative and expanded storytelling
                </div>
              </div>
            </div>

            {/* Research and Development */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-circle-rotate" style={{ transformOrigin: 'center center', animationDelay: '-10s' }}>
              <div className="w-[350px] h-[100px] border border-black p-4 flex flex-col gap-2 bg-white transform hover:scale-110 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
                <div className="text-xs font-bold tracking-wider" style={{ fontFamily: 'var(--font-helios-ext)' }}>RESEARCH AND DEVELOPMENT</div>
                <div className="text-[10px] font-thin line-clamp-3" style={{ fontFamily: 'var(--font-helios-ext)' }}>
                  Optimizes creation, production and execution process and provides a funnel for development of internal products
                </div>
              </div>
            </div>

            {/* Music */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-circle-rotate" style={{ transformOrigin: 'center center', animationDelay: '-15s' }}>
              <div className="w-[350px] h-[100px] border border-black p-4 flex flex-col gap-2 bg-white transform hover:scale-110 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
                <div className="text-xs font-bold tracking-wider" style={{ fontFamily: 'var(--font-helios-ext)' }}>MUSIC</div>
                <div className="text-[10px] font-thin line-clamp-3" style={{ fontFamily: 'var(--font-helios-ext)' }}>
                  Expands IP via sonics, provides a soundtrack wrapper to all storytelling content
                </div>
              </div>
            </div>

            {/* Events and Experiences */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-circle-rotate" style={{ transformOrigin: 'center center', animationDelay: '-20s' }}>
              <div className="w-[350px] h-[100px] border border-black p-4 flex flex-col gap-2 bg-white transform hover:scale-110 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
                <div className="text-xs font-bold tracking-wider" style={{ fontFamily: 'var(--font-helios-ext)' }}>EVENTS AND EXPERIENCES</div>
                <div className="text-[10px] font-thin line-clamp-3" style={{ fontFamily: 'var(--font-helios-ext)' }}>
                  Thematic live experiences & performances that expand all mediums
                </div>
              </div>
            </div>

            {/* Community */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-circle-rotate" style={{ transformOrigin: 'center center', animationDelay: '-25s' }}>
              <div className="w-[350px] h-[100px] border border-black p-4 flex flex-col gap-2 bg-white transform hover:scale-110 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
                <div className="text-xs font-bold tracking-wider" style={{ fontFamily: 'var(--font-helios-ext)' }}>COMMUNITY</div>
                <div className="text-[10px] font-thin line-clamp-3" style={{ fontFamily: 'var(--font-helios-ext)' }}>
                  Building connections through shared experiences and collaborative creation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hamburger Menu */}
      <div 
        className="fixed top-8 right-8 z-50 cursor-default"
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => {
          setShowMenu(false);
          setHoveredItem(null);
        }}
      >
        {/* Menu Icon */}
        <div className="flex flex-col items-end gap-1.5">
          <div className="w-6 h-px bg-black"></div>
          <div className="w-6 h-px bg-black"></div>
        </div>

        {/* Menu Container */}
        <div className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 ${
          showMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          {/* Overlay */}
          <div className="absolute inset-0 bg-white opacity-90"></div>
          
          {/* Menu Content */}
          <div className="relative z-10 flex flex-col gap-10 items-center">
            {/* Home Link */}
            <div className={`relative menu-item-container ${hoveredItem === 'home' ? 'menu-item-hover' : ''}`}>
              <Link
                href="/"
                onMouseEnter={() => setHoveredItem('home')}
                onMouseLeave={() => setHoveredItem(null)}
                className="text-black text-xs transition-all tracking-wider font-thin cursor-default"
                style={{
                  fontFamily: 'var(--font-helios-ext)',
                  opacity: !hoveredItem || hoveredItem === 'home' ? 1 : 0.3
                }}
              >
                HOME
              </Link>
              <div 
                className="absolute bottom-0 left-0 w-full h-[1px] bg-black transition-transform duration-300 origin-left"
                style={{ transform: hoveredItem === 'home' ? 'scaleX(1)' : 'scaleX(0)' }}
              ></div>
            </div>

            {/* Garden Link */}
            <div className={`relative menu-item-container ${hoveredItem === 'garden' ? 'menu-item-hover' : ''}`}>
              <Link
                href="/garden"
                onMouseEnter={() => setHoveredItem('garden')}
                onMouseLeave={() => setHoveredItem(null)}
                className="text-black text-xs transition-all tracking-wider font-thin cursor-default"
                style={{
                  fontFamily: 'var(--font-helios-ext)',
                  opacity: !hoveredItem || hoveredItem === 'garden' ? 1 : 0.3
                }}
              >
                GARDEN
              </Link>
              <div 
                className="absolute bottom-0 left-0 w-full h-[1px] bg-black transition-transform duration-300 origin-left"
                style={{ transform: hoveredItem === 'garden' ? 'scaleX(1)' : 'scaleX(0)' }}
              ></div>
            </div>

            {/* Labs Link */}
            <div className={`relative menu-item-container ${hoveredItem === 'labs' ? 'menu-item-hover' : ''}`}>
              <Link
                href="/labs"
                onMouseEnter={() => setHoveredItem('labs')}
                onMouseLeave={() => setHoveredItem(null)}
                className="text-black text-xs transition-all tracking-wider font-thin cursor-default"
                style={{
                  fontFamily: 'var(--font-helios-ext)',
                  opacity: !hoveredItem || hoveredItem === 'labs' ? 1 : 0.3
                }}
              >
                LABS
              </Link>
              <div 
                className="absolute bottom-0 left-0 w-full h-[1px] bg-black transition-transform duration-300 origin-left"
                style={{ transform: hoveredItem === 'labs' ? 'scaleX(1)' : 'scaleX(0)' }}
              ></div>
            </div>

            {/* Music Link */}
            <div className={`relative menu-item-container ${hoveredItem === 'music' ? 'menu-item-hover' : ''}`}>
              <Link
                href="/music"
                onMouseEnter={() => setHoveredItem('music')}
                onMouseLeave={() => setHoveredItem(null)}
                className="text-black text-xs transition-all tracking-wider font-thin cursor-default"
                style={{
                  fontFamily: 'var(--font-helios-ext)',
                  opacity: !hoveredItem || hoveredItem === 'music' ? 1 : 0.3
                }}
              >
                MUSIC
              </Link>
              <div 
                className="absolute bottom-0 left-0 w-full h-[1px] bg-black transition-transform duration-300 origin-left"
                style={{ transform: hoveredItem === 'music' ? 'scaleX(1)' : 'scaleX(0)' }}
              ></div>
            </div>

            {/* About Link */}
            <div className={`relative menu-item-container ${hoveredItem === 'about' ? 'menu-item-hover' : ''}`}>
              <Link
                href="/about"
                onMouseEnter={() => setHoveredItem('about')}
                onMouseLeave={() => setHoveredItem(null)}
                className="text-black text-xs transition-all tracking-wider font-thin cursor-default"
                style={{
                  fontFamily: 'var(--font-helios-ext)',
                  opacity: !hoveredItem || hoveredItem === 'about' ? 1 : 0.3
                }}
              >
                ABOUT
              </Link>
              <div 
                className="absolute bottom-0 left-0 w-full h-[1px] bg-black transition-transform duration-300 origin-left"
                style={{ transform: hoveredItem === 'about' ? 'scaleX(1)' : 'scaleX(0)' }}
              ></div>
            </div>

            {/* Team Link */}
            <div className={`relative menu-item-container ${hoveredItem === 'team' ? 'menu-item-hover' : ''}`}>
              <Link
                href="/team"
                onMouseEnter={() => setHoveredItem('team')}
                onMouseLeave={() => setHoveredItem(null)}
                className="text-black text-xs transition-all tracking-wider font-thin cursor-default"
                style={{
                  fontFamily: 'var(--font-helios-ext)',
                  opacity: !hoveredItem || hoveredItem === 'team' ? 1 : 0.3
                }}
              >
                TEAM
              </Link>
              <div 
                className="absolute bottom-0 left-0 w-full h-[1px] bg-black transition-transform duration-300 origin-left"
                style={{ transform: hoveredItem === 'team' ? 'scaleX(1)' : 'scaleX(0)' }}
              ></div>
            </div>

            {/* Contact Link */}
            <div className={`relative menu-item-container ${hoveredItem === 'contact' ? 'menu-item-hover' : ''}`}>
              <Link
                href="/contact"
                onMouseEnter={() => setHoveredItem('contact')}
                onMouseLeave={() => setHoveredItem(null)}
                className="text-black text-xs transition-all tracking-wider font-thin cursor-default"
                style={{
                  fontFamily: 'var(--font-helios-ext)',
                  opacity: !hoveredItem || hoveredItem === 'contact' ? 1 : 0.3
                }}
              >
                CONTACT
              </Link>
              <div 
                className="absolute bottom-0 left-0 w-full h-[1px] bg-black transition-transform duration-300 origin-left"
                style={{ transform: hoveredItem === 'contact' ? 'scaleX(1)' : 'scaleX(0)' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}