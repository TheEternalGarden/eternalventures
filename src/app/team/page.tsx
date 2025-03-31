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
  const [ladiRoleText, setLadiRoleText] = useState("");
  const [showLadiRoleCursor, setShowLadiRoleCursor] = useState(true);
  const [isClaireRoleComplete, setIsClaireRoleComplete] = useState(false);
  
  const title = "TEAM";
  const tkRole = "TK // CEO & FOUNDER";
  const claireRole = "CLAIRE // CO-FOUNDER";
  const ladiRole = "LADI // LABEL MANAGEMENT";

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

  // Ladi role text animation - starts after Claire's role is complete
  useEffect(() => {
    if (!isClaireRoleComplete) return;
    
    let currentIndex = 0;
    
    const typeText = () => {
      if (currentIndex <= ladiRole.length) {
        const symbolsForRest = currentIndex < ladiRole.length ? 
          getRandomSymbols(ladiRole.length - currentIndex) : '';
        setLadiRoleText(ladiRole.slice(0, currentIndex) + symbolsForRest);
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
      setShowLadiRoleCursor(prev => !prev);
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
              />
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
              />
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
              />
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
              />
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
              />
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
              />
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
              />
            </div>
          </div>
        </div>
      </div>

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

      {/* Third Page - Ladi */}
      <main className="min-h-screen flex flex-col items-center justify-center gap-8"
        style={{ 
          opacity: Math.min(1, Math.max(0, (scrollPosition / pageHeight - 1.5) * 2)),
          transition: 'opacity 0.3s ease-in-out'
        }}>
        <Image
          src="/images/ladieternalfinal.png"
          alt="Ladi Headshot"
          width={250}
          height={250}
          priority
        />
        <div 
          className="text-black text-xs tracking-wider font-thin"
          style={{ fontFamily: 'var(--font-helios-ext)' }}
        >
          {ladiRoleText}{showLadiRoleCursor && <span className="opacity-50">|</span>}
        </div>
      </main>
    </div>
  );
}
