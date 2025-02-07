'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Labs() {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const fullText = "RESEARCHING AND SHAPING THE WORLD OF CREATIVE TECHNOLOGY.";

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

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-8">
        <Image
          src="/images/ETERNAL VENTURES - no ventures.png"
          alt="Eternal Labs Logo"
          width={150}
          height={150}
          priority
        />
        <h1 className="text-xs font-thin" style={{ fontFamily: 'var(--font-helios-ext)' }}>
          LABS
        </h1>
        <div className="text-center text-xs font-thin max-w-[800px] whitespace-nowrap" style={{ fontFamily: 'var(--font-helios-ext)' }}>
          {text}{showCursor && <span className="opacity-50">|</span>}
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

        {/* Menu Items */}
        {showMenu && (
          <div className="absolute top-0 right-0 mt-6 text-right">
            {/* Garden Link */}
            <div className={`relative menu-item-container ${hoveredItem === 'garden' ? 'menu-item-hover' : ''}`}>
              <Link
                href="/garden"
                onMouseEnter={() => setHoveredItem('garden')}
                onMouseLeave={() => setHoveredItem(null)}
                className="block py-1 text-xs tracking-wider"
                style={{
                  fontFamily: 'var(--font-helios-ext)',
                  opacity: !hoveredItem || hoveredItem === 'garden' ? 1 : 0.3
                }}
              >
                GARDEN
              </Link>
              <div 
                className="absolute bottom-0 left-0 w-full h-px bg-black transform origin-right transition-transform duration-300"
                style={{ transform: hoveredItem === 'garden' ? 'scaleX(1)' : 'scaleX(0)' }}
              ></div>
            </div>

            {/* Music Link */}
            <div className={`relative menu-item-container ${hoveredItem === 'music' ? 'menu-item-hover' : ''}`}>
              <Link
                href="/music"
                onMouseEnter={() => setHoveredItem('music')}
                onMouseLeave={() => setHoveredItem(null)}
                className="block py-1 text-xs tracking-wider"
                style={{
                  fontFamily: 'var(--font-helios-ext)',
                  opacity: !hoveredItem || hoveredItem === 'music' ? 1 : 0.3
                }}
              >
                MUSIC
              </Link>
              <div 
                className="absolute bottom-0 left-0 w-full h-px bg-black transform origin-right transition-transform duration-300"
                style={{ transform: hoveredItem === 'music' ? 'scaleX(1)' : 'scaleX(0)' }}
              ></div>
            </div>

            {/* About Link */}
            <div className={`relative menu-item-container ${hoveredItem === 'about' ? 'menu-item-hover' : ''}`}>
              <Link
                href="/about"
                onMouseEnter={() => setHoveredItem('about')}
                onMouseLeave={() => setHoveredItem(null)}
                className="block py-1 text-xs tracking-wider"
                style={{
                  fontFamily: 'var(--font-helios-ext)',
                  opacity: !hoveredItem || hoveredItem === 'about' ? 1 : 0.3
                }}
              >
                ABOUT
              </Link>
              <div 
                className="absolute bottom-0 left-0 w-full h-px bg-black transform origin-right transition-transform duration-300"
                style={{ transform: hoveredItem === 'about' ? 'scaleX(1)' : 'scaleX(0)' }}
              ></div>
            </div>

            {/* Team Link */}
            <div className={`relative menu-item-container ${hoveredItem === 'team' ? 'menu-item-hover' : ''}`}>
              <Link
                href="/team"
                onMouseEnter={() => setHoveredItem('team')}
                onMouseLeave={() => setHoveredItem(null)}
                className="block py-1 text-xs tracking-wider"
                style={{
                  fontFamily: 'var(--font-helios-ext)',
                  opacity: !hoveredItem || hoveredItem === 'team' ? 1 : 0.3
                }}
              >
                TEAM
              </Link>
              <div 
                className="absolute bottom-0 left-0 w-full h-px bg-black transform origin-right transition-transform duration-300"
                style={{ transform: hoveredItem === 'team' ? 'scaleX(1)' : 'scaleX(0)' }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 