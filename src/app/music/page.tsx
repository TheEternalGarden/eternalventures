'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Music() {
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [topText, setTopText] = useState("");
  const [centerText, setCenterText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [showTopCursor, setShowTopCursor] = useState(true);
  const [showCenterCursor, setShowCenterCursor] = useState(true);
  const [showDescriptionCursor, setShowDescriptionCursor] = useState(true);
  const [isTopTextComplete, setIsTopTextComplete] = useState(false);
  const [isCenterTextComplete, setIsCenterTextComplete] = useState(false);

  const eternalMusicText = "ETERNAL MUSIC";
  const musicText = "MUSIC";
  const description = "A RECORD LABEL DEVELOPING WORLD BUILDING EXPERIENCES.";

  // Symbol generation functions
  const getRandomSymbol = () => {
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const getRandomSymbols = (length: number) => {
    return Array(length).fill(0).map(() => getRandomSymbol()).join('');
  };

  // Top text animation
  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    
    const typeText = () => {
      if (!isDeleting) {
        if (currentIndex <= eternalMusicText.length) {
          const symbolsForRest = currentIndex < eternalMusicText.length ? 
            getRandomSymbols(eternalMusicText.length - currentIndex) : '';
          setTopText(eternalMusicText.slice(0, currentIndex) + symbolsForRest);
          currentIndex++;
          if (currentIndex > eternalMusicText.length) {
            setIsTopTextComplete(true);
            setTimeout(() => {
              isDeleting = true;
            }, 1000);
          }
        }
      } else {
        if (currentIndex > 0) {
          const symbolsForRest = getRandomSymbols(currentIndex - 1);
          setTopText(eternalMusicText.slice(0, currentIndex - 1) + symbolsForRest);
          currentIndex--;
        } else {
          isDeleting = false;
        }
      }
    };

    const interval = setInterval(typeText, isDeleting ? 40 : 65);
    return () => clearInterval(interval);
  }, []);

  // Center text animation
  useEffect(() => {
    if (!isTopTextComplete) return;
    
    let currentIndex = 0;
    
    const typeText = () => {
      if (currentIndex <= musicText.length) {
        const symbolsForRest = currentIndex < musicText.length ? 
          getRandomSymbols(musicText.length - currentIndex) : '';
        setCenterText(musicText.slice(0, currentIndex) + symbolsForRest);
        currentIndex++;
        if (currentIndex > musicText.length) {
          setIsCenterTextComplete(true);
        }
      }
    };

    const interval = setInterval(typeText, 65);
    return () => clearInterval(interval);
  }, [isTopTextComplete]);

  // Description text animation
  useEffect(() => {
    if (!isCenterTextComplete) return;
    
    let currentIndex = 0;
    
    const typeText = () => {
      if (currentIndex <= description.length) {
        const symbolsForRest = currentIndex < description.length ? 
          getRandomSymbols(description.length - currentIndex) : '';
        setDescriptionText(description.slice(0, currentIndex) + symbolsForRest);
        currentIndex++;
      }
    };

    const interval = setInterval(typeText, 65);
    return () => clearInterval(interval);
  }, [isCenterTextComplete]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowTopCursor(prev => !prev);
      setShowCenterCursor(prev => !prev);
      setShowDescriptionCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="relative">
      <main className="min-h-screen flex flex-col items-center justify-center gap-8 relative">
        {/* Top Text */}
        <div 
          className="absolute top-20 text-black text-xs tracking-wider font-thin"
          style={{ fontFamily: 'var(--font-helios-ext)' }}
        >
          {topText}{showTopCursor && <span className="opacity-50">|</span>}
        </div>

        {/* Center Content */}
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <Image
            src="/images/ETERNAL VENTURES - no ventures.png"
            alt="Eternal Ventures Logo"
            width={150}
            height={150}
            priority
          />

          {/* MUSIC Text */}
          <div 
            className="text-black text-xs tracking-wider font-thin mt-2"
            style={{ fontFamily: 'var(--font-helios-ext)' }}
          >
            {centerText}{showCenterCursor && <span className="opacity-50">|</span>}
          </div>

          {/* Description Text */}
          <div 
            className="text-black text-xs tracking-wider font-thin mt-4 text-center max-w-[800px] whitespace-nowrap"
            style={{ fontFamily: 'var(--font-helios-ext)' }}
          >
            {descriptionText}{showDescriptionCursor && <span className="opacity-50">|</span>}
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

              {/* Labs Link */}
              <div className={`relative menu-item-container ${hoveredItem === 'labs' ? 'menu-item-hover' : ''}`}>
                <Link
                  href="/labs"
                  onMouseEnter={() => setHoveredItem('labs')}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="block py-1 text-xs tracking-wider"
                  style={{
                    fontFamily: 'var(--font-helios-ext)',
                    opacity: !hoveredItem || hoveredItem === 'labs' ? 1 : 0.3
                  }}
                >
                  LABS
                </Link>
                <div 
                  className="absolute bottom-0 left-0 w-full h-px bg-black transform origin-right transition-transform duration-300"
                  style={{ transform: hoveredItem === 'labs' ? 'scaleX(1)' : 'scaleX(0)' }}
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
      </main>
    </div>
  );
} 