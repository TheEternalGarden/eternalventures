'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function About() {
  const [text, setText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [foundedText, setFoundedText] = useState('');
  const [missionText, setMissionText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [showDescriptionCursor, setShowDescriptionCursor] = useState(true);
  const [showFoundedCursor, setShowFoundedCursor] = useState(true);
  const [showMissionCursor, setShowMissionCursor] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const words = ['VENTURES', 'LABS', 'MUSIC', 'GARDEN'];
  const description = 'ETERNAL VENTURES IS A STUDIO SPECIALIZING IN CREATIVE RESEARCH.';
  const founded = 'FOUNDED IN 2023';
  const mission = 'SPEARHEADED BY ETERNAL LABS, OUR TEAM BUILDS AT THE INTERSECTION OF TECHNOLOGY, ART AND STORYTELLING. THESE INNOVATIONS FUEL THE OUTPUT OF OUR OTHER CORE VENTURES, ETERNAL GARDEN AND ETERNAL MUSIC.';
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isFirstTextComplete, setIsFirstTextComplete] = useState(false);
  const [isDescriptionComplete, setIsDescriptionComplete] = useState(false);
  const [isFoundedComplete, setIsFoundedComplete] = useState(false);

  // Symbol generation functions
  const getRandomSymbol = () => {
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const getRandomSymbols = (length: number) => {
    return Array(length).fill(0).map(() => getRandomSymbol()).join('');
  };

  // First text animation
  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;
    
    const typeText = () => {
      const currentWord = words[currentWordIndex];
      
      if (!isDeleting) {
        if (currentIndex <= currentWord.length) {
          const symbolsForRest = currentIndex < currentWord.length ? 
            getRandomSymbols(currentWord.length - currentIndex) : '';
          setText(currentWord.slice(0, currentIndex) + symbolsForRest);
          currentIndex++;
          if (currentIndex > currentWord.length) {
            setIsFirstTextComplete(true);
            timeoutId = setTimeout(() => {
              isDeleting = true;
              currentIndex = currentWord.length;
            }, 1000);
          }
        }
      } else {
        if (currentIndex > 0) {
          const symbolsForRest = getRandomSymbols(currentIndex - 1);
          setText(currentWord.slice(0, currentIndex - 1) + symbolsForRest);
          currentIndex--;
        } else {
          isDeleting = false;
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          currentIndex = 0;
        }
      }
    };

    const interval = setInterval(typeText, isDeleting ? 40 : 65);

    return () => {
      clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentWordIndex]);

  // Description text animation - starts after first text is complete
  useEffect(() => {
    if (!isFirstTextComplete) return;
    
    let currentIndex = 0;
    
    const typeText = () => {
      if (currentIndex <= description.length) {
        const symbolsForRest = currentIndex < description.length ? 
          getRandomSymbols(description.length - currentIndex) : '';
        setDescriptionText(description.slice(0, currentIndex) + symbolsForRest);
        currentIndex++;
        if (currentIndex > description.length) {
          setIsDescriptionComplete(true);
        }
      }
    };

    const interval = setInterval(typeText, 65);

    return () => clearInterval(interval);
  }, [isFirstTextComplete]);

  // Mission text animation - starts after description is complete
  useEffect(() => {
    if (!isDescriptionComplete) return;
    
    let currentIndex = 0;
    
    const typeText = () => {
      if (currentIndex <= mission.length) {
        const symbolsForRest = currentIndex < mission.length ? 
          getRandomSymbols(mission.length - currentIndex) : '';
        setMissionText(mission.slice(0, currentIndex) + symbolsForRest);
        currentIndex++;
        if (currentIndex > mission.length) {
          setIsFoundedComplete(true);
        }
      }
    };

    const interval = setInterval(typeText, 65);

    return () => clearInterval(interval);
  }, [isDescriptionComplete]);

  // Founded text animation - starts after mission is complete
  useEffect(() => {
    if (!isFoundedComplete) return;
    
    let currentIndex = 0;
    
    const typeText = () => {
      if (currentIndex <= founded.length) {
        const symbolsForRest = currentIndex < founded.length ? 
          getRandomSymbols(founded.length - currentIndex) : '';
        setFoundedText(founded.slice(0, currentIndex) + symbolsForRest);
        currentIndex++;
      }
    };

    const interval = setInterval(typeText, 65);

    return () => clearInterval(interval);
  }, [isFoundedComplete]);

  // Blinking cursor effects
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
      setShowDescriptionCursor(prev => !prev);
      setShowFoundedCursor(prev => !prev);
      setShowMissionCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8">
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
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Image
        src="/images/ETERNAL VENTURES - no ventures.png"
        alt="Eternal Ventures Logo"
        width={150}
        height={150}
      />
      <div className="flex flex-col items-center gap-4 max-w-2xl px-4">
        <div 
          className="text-black text-xs tracking-wider font-thin"
          style={{ fontFamily: 'var(--font-helios-ext)' }}
        >
          {text}{showCursor && <span className="opacity-50">|</span>}
        </div>
        <div 
          className="text-black text-xs tracking-wider font-thin mt-4 text-center"
          style={{ fontFamily: 'var(--font-helios-ext)' }}
        >
          {descriptionText}{showDescriptionCursor && <span className="opacity-50">|</span>}
        </div>
        <div 
          className="text-black text-xs tracking-wider font-thin mt-4 text-center"
          style={{ fontFamily: 'var(--font-helios-ext)' }}
        >
          {missionText}{showMissionCursor && <span className="opacity-50">|</span>}
        </div>
        <div 
          className="text-black text-xs tracking-wider font-thin mt-4 text-center"
          style={{ fontFamily: 'var(--font-helios-ext)' }}
        >
          {foundedText}{showFoundedCursor && <span className="opacity-50">|</span>}
        </div>
      </div>
    </main>
  );
}