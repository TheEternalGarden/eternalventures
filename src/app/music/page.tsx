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
            className="text-black text-xs tracking-wider font-thin mt-4 text-center max-w-md"
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
          {/* ... existing hamburger menu code ... */}
        </div>
      </main>
    </div>
  );
}
