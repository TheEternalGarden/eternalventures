'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Contact(): JSX.Element {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [pageHeight, setPageHeight] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const text = "GET IN TOUCH";

  // Set initial page height
  useEffect(() => {
    setPageHeight(window.innerHeight);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const type = () => {
      if (isDeleting) {
        if (currentText.length === 0) {
          setIsDeleting(false);
          setTypingSpeed(150);
          return;
        }
        setCurrentText(currentText.slice(0, -1));
        setTypingSpeed(50);
      } else {
        if (currentText === text) {
          setTypingSpeed(2000); // Pause at the end
          setIsDeleting(true);
          return;
        }
        setCurrentText(text.slice(0, currentText.length + 1));
        setTypingSpeed(150);
      }
    };

    timer = setTimeout(type, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, text, typingSpeed]);

  // Handle scroll effect
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      // Calculate opacity based on scroll position
      const scrollPercentage = position / pageHeight;
      
      // First page fades out from 1 to 0
      if (scrollPercentage <= 1) {
        setOpacity(1 - scrollPercentage);
      } else {
        setOpacity(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pageHeight]);

  return (
    <div className="min-h-screen bg-white">
      <main className="min-h-screen flex flex-col items-center justify-center gap-8">
        <div 
          className="text-black text-xl tracking-wider font-bold"
          style={{ fontFamily: 'var(--font-helios-ext)' }}
        >
          {currentText}<span className="animate-blink">|</span>
        </div>
        <div 
          className="text-black text-xs tracking-wider font-thin text-center max-w-[600px] px-4"
          style={{ fontFamily: 'var(--font-helios-ext)' }}
        >
          FOR INQUIRIES, PLEASE EMAIL US AT{' '}
          <a 
            href="mailto:eternal@gardenx.xyz" 
            className="underline hover:opacity-70 transition-opacity"
          >
            eternal@gardenx.xyz
          </a>
        </div>
      </main>

      {/* Hamburger Menu */}
      <div 
        className="fixed top-8 right-8 z-50 cursor-default"
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => {
          setShowMenu(false);
          setHoveredItem(null);
        }}
      >
        <div className="flex flex-col gap-1.5">
          <div className="w-8 h-0.5 bg-black"></div>
          <div className="w-8 h-0.5 bg-black"></div>
          <div className="w-8 h-0.5 bg-black"></div>
        </div>
        
        <div 
          className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 ${
            showMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="absolute inset-0 bg-white opacity-90"></div>
          
          <div className="relative z-10 flex flex-col gap-10 items-center">
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