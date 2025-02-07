'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Music() {
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [centerText, setCenterText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showCenterCursor, setShowCenterCursor] = useState(true);
  const [isTopTextComplete, setIsTopTextComplete] = useState(false);

  const topText = "ETERNAL MUSIC";
  const centerText = "MUSIC";

  // Symbol generation functions
  const getRandomSymbol = () => {
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const getRandomSymbols = (length: number) => {
    return Array(length).fill(0).map(() => getRandomSymbol()).join('');
  };

  // Top text animation (looping)
  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    
    const typeText = () => {
      if (!isDeleting) {
        if (currentIndex <= topText.length) {
          const symbolsForRest = currentIndex < topText.length ? 
            getRandomSymbols(topText.length - currentIndex) : '';
          setText(topText.slice(0, currentIndex) + symbolsForRest);
          currentIndex++;
          if (currentIndex > topText.length) {
            setIsTopTextComplete(true);
            setTimeout(() => {
              isDeleting = true;
            }, 1000);
          }
        }
      } else {
        if (currentIndex > 0) {
          const symbolsForRest = getRandomSymbols(currentIndex - 1);
          setText(topText.slice(0, currentIndex - 1) + symbolsForRest);
          currentIndex--;
        } else {
          isDeleting = false;
        }
      }
    };

    const interval = setInterval(typeText, isDeleting ? 40 : 65);

    return () => clearInterval(interval);
  }, []);

  // Center text animation - starts after top text is complete
  useEffect(() => {
    if (!isTopTextComplete) return;
    
    let currentIndex = 0;
    
    const typeText = () => {
      if (currentIndex <= centerText.length) {
        const symbolsForRest = currentIndex < centerText.length ? 
          getRandomSymbols(centerText.length - currentIndex) : '';
        setCenterText(centerText.slice(0, currentIndex) + symbolsForRest);
        currentIndex++;
      }
    };

    const interval = setInterval(typeText, 65);

    return () => clearInterval(interval);
  }, [isTopTextComplete]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
      setShowCenterCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 relative">
      {/* Top Text */}
      <div 
        className="absolute top-20 text-black text-xs tracking-wider font-thin"
        style={{ fontFamily: 'var(--font-helios-ext)' }}
      >
        {text}{showCursor && <span className="opacity-50">|</span>}
      </div>

      {/* Center Logo */}
      <Image
        src="/images/ETERNAL VENTURES - no ventures.png"
        alt="Eternal Ventures Logo"
        width={150}
        height={150}
        priority
      />

      {/* Center Text */}
      <div 
        className="text-black text-xs tracking-wider font-thin"
        style={{ fontFamily: 'var(--font-helios-ext)' }}
      >
        {centerText}{showCenterCursor && <span className="opacity-50">|</span>}
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
  );
}
