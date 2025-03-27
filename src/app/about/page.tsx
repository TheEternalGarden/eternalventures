'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const fullText = "BUILDING WORLDS THROUGH TECHNOLOGY AND STORYTELLING.";

  // Symbol generation functions
  const getRandomSymbol = () => {
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const getRandomSymbols = (length: number) => {
    return Array(length).fill(0).map(() => getRandomSymbol()).join('');
  };

  // Typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    let isTypingFirst = true;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;
    
    const typeText = () => {
      if (!isDeleting) {
        if (currentIndex <= fullText.length) {
          const symbolsForRest = currentIndex < fullText.length ? 
            getRandomSymbols(fullText.length - currentIndex) : '';
          setText(fullText.slice(0, currentIndex) + symbolsForRest);
          currentIndex++;
          if (currentIndex > fullText.length) {
            timeoutId = setTimeout(() => {
              isDeleting = true;
              currentIndex = fullText.length;
            }, 2000);
          }
        }
      } else {
        if (currentIndex > 0) {
          const symbolsForRest = getRandomSymbols(currentIndex - 1);
          setText(fullText.slice(0, currentIndex - 1) + symbolsForRest);
          currentIndex--;
        } else {
          isDeleting = false;
          currentIndex = 0;
        }
      }
    };

    const interval = setInterval(typeText, isDeleting ? 40 : 65);

    return () => {
      clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

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
          <div className="text-center text-xs font-thin max-w-[800px]" style={{ fontFamily: 'var(--font-helios-ext)' }}>
            SPEARHEADED BY ETERNAL LABS, OUR TEAM BUILDS AT THE INTERSECTION OF TECHNOLOGY, ART, AND STORYTELLING. THESE INNOVATIONS FUEL THE OUTPUT OF OUR OTHER CORE VENTURES, ETERNAL GARDEN AND ETERNAL MUSIC.
          </div>
          <div className="text-center text-xs font-thin" style={{ fontFamily: 'var(--font-helios-ext)' }}>
            FOUNDED IN 2023
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className="h-screen snap-start flex flex-col items-center justify-center p-4 relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/@FLORA.jpg"
            alt="Flora Background"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        {/* Content */}
        <div className="flex flex-col items-center gap-8 relative z-10">
          <Image
            src="/images/@EV.png"
            alt="Eternal Ventures Logo"
            width={150}
            height={150}
            priority
          />
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
          </div>
        </div>
      </div>
    </div>
  );
}