'use client';
// Force new deployment
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Team() {
  const [text, setText] = useState("");
  const [roleText, setRoleText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showRoleCursor, setShowRoleCursor] = useState(true);
  const [isFirstTextComplete, setIsFirstTextComplete] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [pageHeight, setPageHeight] = useState(0);
  const [claireRoleText, setClaireRoleText] = useState("");
  const [showClaireRoleCursor, setShowClaireRoleCursor] = useState(true);
  const [isTkRoleComplete, setIsTkRoleComplete] = useState(false);
  const [peteRoleText, setPeteRoleText] = useState("");
  const [showPeteRoleCursor, setShowPeteRoleCursor] = useState(true);
  const [isClaireRoleComplete, setIsClaireRoleComplete] = useState(false);
  
  const title = "TEAM";
  const tkRole = "TK // CEO & FOUNDER";
  const claireRole = "CLAIRE // CO-FOUNDER";
  const peteRole = "PETE // AI AND RESEARCH LEAD";

  // Set initial page height
  useEffect(() => {
    setPageHeight(window.innerHeight);
  }, []);

  // Symbol generation functions
  const getRandomSymbol = () => {
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const getRandomSymbols = (length: number) => {
    return Array(length).fill(0).map(() => getRandomSymbol()).join('');
  };

  // Title animation with loop
  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    
    const typeText = () => {
      if (!isDeleting) {
        if (currentIndex <= title.length) {
          const symbolsForRest = currentIndex < title.length ? 
            getRandomSymbols(title.length - currentIndex) : '';
          setText(title.slice(0, currentIndex) + symbolsForRest);
          currentIndex++;
          if (currentIndex > title.length) {
            setIsFirstTextComplete(true);
            setTimeout(() => {
              isDeleting = true;
            }, 1000);
          }
        }
      } else {
        if (currentIndex > 0) {
          const symbolsForRest = getRandomSymbols(currentIndex - 1);
          setText(title.slice(0, currentIndex - 1) + symbolsForRest);
          currentIndex--;
        } else {
          isDeleting = false;
        }
      }
    };

    const interval = setInterval(typeText, isDeleting ? 40 : 65);

    return () => clearInterval(interval);
  }, []);

  // TK role text animation
  useEffect(() => {
    let currentIndex = 0;
    
    const typeText = () => {
      if (currentIndex <= tkRole.length) {
        const symbolsForRest = currentIndex < tkRole.length ? 
          getRandomSymbols(tkRole.length - currentIndex) : '';
        setRoleText(tkRole.slice(0, currentIndex) + symbolsForRest);
        currentIndex++;
        if (currentIndex > tkRole.length) {
          setIsTkRoleComplete(true);
        }
      }
    };

    const interval = setInterval(typeText, 65);

    return () => clearInterval(interval);
  }, []);

  // Claire role text animation
  useEffect(() => {
    if (!isTkRoleComplete) return;
    
    let currentIndex = 0;
    
    const typeText = () => {
      if (currentIndex <= claireRole.length) {
        const symbolsForRest = currentIndex < claireRole.length ? 
          getRandomSymbols(claireRole.length - currentIndex) : '';
        setClaireRoleText(claireRole.slice(0, currentIndex) + symbolsForRest);
        currentIndex++;
        if (currentIndex > claireRole.length) {
          setIsClaireRoleComplete(true);
        }
      }
    };

    const interval = setInterval(typeText, 65);

    return () => clearInterval(interval);
  }, [isTkRoleComplete]);

  // Pete role text animation - starts after Claire's role is complete
  useEffect(() => {
    if (!isClaireRoleComplete) return;
    
    let currentIndex = 0;
    
    const typeText = () => {
      if (currentIndex <= peteRole.length) {
        const symbolsForRest = currentIndex < peteRole.length ? 
          getRandomSymbols(peteRole.length - currentIndex) : '';
        setPeteRoleText(peteRole.slice(0, currentIndex) + symbolsForRest);
        currentIndex++;
      }
    };

    const interval = setInterval(typeText, 65);

    return () => clearInterval(interval);
  }, [isClaireRoleComplete]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
      setShowRoleCursor(prev => !prev);
      setShowClaireRoleCursor(prev => !prev);
      setShowPeteRoleCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

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
    <div className="relative">
      {/* First Page - TK */}
      <main className="min-h-screen flex flex-col items-center pt-20 gap-8" 
        style={{ opacity: opacity, transition: 'opacity 0.3s ease-in-out' }}>
        <Image
          src="/images/tkheadshot.jpg"
          alt="TK Headshot"
          width={300}
          height={300}
          className="mt-32"
        />
        <div 
          className="text-black text-xs tracking-wider font-thin mt-8"
          style={{ fontFamily: 'var(--font-helios-ext)' }}
        >
          {roleText}{showRoleCursor && <span className="opacity-50">|</span>}
        </div>
      </main>

      {/* Second Page - Claire */}
      <main className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ 
          opacity: Math.min(1, Math.max(0, (scrollPosition / pageHeight - 0.5) * 2)),
          transition: 'opacity 0.3s ease-in-out'
        }}>
        <Image
          src="/images/claireheadshot.png"
          alt="Claire Headshot"
          width={300}
          height={300}
          priority
        />
        <div 
          className="text-black text-xs tracking-wider font-thin"
          style={{ fontFamily: 'var(--font-helios-ext)' }}
        >
          {claireRoleText}{showClaireRoleCursor && <span className="opacity-50">|</span>}
        </div>
      </main>

      {/* Third Page - Pete */}
      <main className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ 
          opacity: Math.min(1, Math.max(0, (scrollPosition / pageHeight - 1.5) * 2)),
          transition: 'opacity 0.3s ease-in-out'
        }}>
        <Image
          src="/images/peteheadshot.png"
          alt="Pete Headshot"
          width={300}
          height={300}
          priority
        />
        <div 
          className="text-black text-xs tracking-wider font-thin"
          style={{ fontFamily: 'var(--font-helios-ext)' }}
        >
          {peteRoleText}{showPeteRoleCursor && <span className="opacity-50">|</span>}
        </div>
      </main>
    </div>
  );
}
