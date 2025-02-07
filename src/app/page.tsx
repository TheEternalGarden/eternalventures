'use client';

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

interface ScrollProgress {
  first: number;
  second: number;
  third: number;
  fourth: number;
  fifth: number;
  sixth: number;
  seventh: number;
}

export default function Home() {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [secondText, setSecondText] = useState("");
  const [showSecondCursor, setShowSecondCursor] = useState(true);
  const [thirdText, setThirdText] = useState("");
  const [showThirdCursor, setShowThirdCursor] = useState(true);
  const [fourthText, setFourthText] = useState("");
  const [showFourthCursor, setShowFourthCursor] = useState(true);
  const [fifthText, setFifthText] = useState("");
  const [showFifthCursor, setShowFifthCursor] = useState(true);
  const [sixthText, setSixthText] = useState("");
  const [showSixthCursor, setShowSixthCursor] = useState(true);
  const [seventhText, setSeventhText] = useState("");
  const [showSeventhCursor, setShowSeventhCursor] = useState(true);
  const [eighthText, setEighthText] = useState("");
  const [showEighthCursor, setShowEighthCursor] = useState(true);
  const [scrollProgress, setScrollProgress] = useState<ScrollProgress>({ 
    first: 0, 
    second: 0, 
    third: 0, 
    fourth: 0,
    fifth: 0,
    sixth: 0,
    seventh: 0 
  });
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const [isFirstTextComplete, setIsFirstTextComplete] = useState(false);
  const [isSecondTextComplete, setIsSecondTextComplete] = useState(false);
  
  const fullText = "VENTURES";
  const secondFullText = "ETERNAL VENTURES IS A CREATIVE VENTURE STUDIO.";
  const thirdFullText = "LABS";
  const fourthFullText = "RESEARCHING AND SHAPING THE WORLD OF CREATIVE TECHNOLOGY.";
  const fifthFullText = "GARDEN";
  const sixthFullText = "A SCI-FI FANTASY EPIC ABOUT A MYSTICAL SEED THAT SPAWNS INFINITE WORLDS.";
  const seventhFullText = "MUSIC";
  const eighthFullText = "A RECORD LABEL CREATING WORLD BUILDING MUSICAL EXPERIENCES.";

  const scrollToPage = (pageNumber: number) => {
    const windowHeight = window.innerHeight;
    window.scrollTo({
      top: windowHeight * (pageNumber - 1),
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollPosition / windowHeight, 1);
      const secondPageProgress = Math.max(0, Math.min((scrollPosition - windowHeight) / windowHeight, 1));
      const thirdPageProgress = Math.max(0, Math.min((scrollPosition - (windowHeight * 2)) / windowHeight, 1));
      const fourthPageProgress = Math.max(0, Math.min((scrollPosition - (windowHeight * 3)) / windowHeight, 1));
      const fifthPageProgress = Math.max(0, Math.min((scrollPosition - (windowHeight * 4)) / windowHeight, 1));
      setScrollProgress({ 
        first: progress, 
        second: secondPageProgress, 
        third: thirdPageProgress,
        fourth: fourthPageProgress,
        fifth: fifthPageProgress,
        sixth: fourthPageProgress,
        seventh: fourthPageProgress
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Add symbol generation functions
  const getRandomSymbol = () => {
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const getRandomSymbols = (length: number) => {
    return Array(length).fill(0).map(() => getRandomSymbol()).join('');
  };

  // Update the typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    let isTypingFirst = true;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;
    
    const typeText = () => {
      if (isTypingFirst) {
        if (!isDeleting) {
          if (currentIndex <= fullText.length) {
            const symbolsForRest = currentIndex < fullText.length ? 
              getRandomSymbols(fullText.length - currentIndex) : '';
            setText(fullText.slice(0, currentIndex) + symbolsForRest);
            currentIndex++;
            if (currentIndex > fullText.length) {
              setIsFirstTextComplete(true);
              timeoutId = setTimeout(() => {
                isDeleting = true;
                currentIndex = fullText.length;
              }, 1000);
            }
          }
        } else {
          if (currentIndex > 0) {
            const symbolsForRest = getRandomSymbols(currentIndex - 1);
            setText(fullText.slice(0, currentIndex - 1) + symbolsForRest);
            currentIndex--;
          } else {
            isDeleting = false;
            isTypingFirst = false;
            currentIndex = 0;
          }
        }
      } else {
        if (!isDeleting) {
          if (currentIndex <= secondFullText.length) {
            const symbolsForRest = currentIndex < secondFullText.length ? 
              getRandomSymbols(secondFullText.length - currentIndex) : '';
            setText(secondFullText.slice(0, currentIndex) + symbolsForRest);
            currentIndex++;
            if (currentIndex > secondFullText.length) {
              setIsSecondTextComplete(true);
              timeoutId = setTimeout(() => {
                isDeleting = true;
                currentIndex = secondFullText.length;
              }, 2000);
            }
          }
        } else {
          if (currentIndex > 0) {
            const symbolsForRest = getRandomSymbols(currentIndex - 1);
            setText(secondFullText.slice(0, currentIndex - 1) + symbolsForRest);
            currentIndex--;
          } else {
            isDeleting = false;
            isTypingFirst = true;
            currentIndex = 0;
          }
        }
      }
    };

    const interval = setInterval(typeText, isDeleting ? 40 : 65);

    return () => {
      clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Second text typewriter effect
  useEffect(() => {
    if (!isFirstTextComplete) return;
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= secondFullText.length) {
        setSecondText(secondFullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isFirstTextComplete]);

  // Labs section typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    let isTypingFirst = true;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;
    
    const typeText = () => {
      if (isTypingFirst) {
        if (!isDeleting) {
          if (currentIndex <= thirdFullText.length) {
            const symbolsForRest = currentIndex < thirdFullText.length ? 
              getRandomSymbols(thirdFullText.length - currentIndex) : '';
            setThirdText(thirdFullText.slice(0, currentIndex) + symbolsForRest);
            currentIndex++;
            if (currentIndex > thirdFullText.length) {
              timeoutId = setTimeout(() => {
                isDeleting = true;
                currentIndex = thirdFullText.length;
              }, 1000);
            }
          }
        } else {
          if (currentIndex > 0) {
            const symbolsForRest = getRandomSymbols(currentIndex - 1);
            setThirdText(thirdFullText.slice(0, currentIndex - 1) + symbolsForRest);
            currentIndex--;
          } else {
            isDeleting = false;
            isTypingFirst = false;
            currentIndex = 0;
          }
        }
      } else {
        if (!isDeleting) {
          if (currentIndex <= fourthFullText.length) {
            const symbolsForRest = currentIndex < fourthFullText.length ? 
              getRandomSymbols(fourthFullText.length - currentIndex) : '';
            setThirdText(fourthFullText.slice(0, currentIndex) + symbolsForRest);
            currentIndex++;
            if (currentIndex > fourthFullText.length) {
              timeoutId = setTimeout(() => {
                isDeleting = true;
                currentIndex = fourthFullText.length;
              }, 2000);
            }
          }
        } else {
          if (currentIndex > 0) {
            const symbolsForRest = getRandomSymbols(currentIndex - 1);
            setThirdText(fourthFullText.slice(0, currentIndex - 1) + symbolsForRest);
            currentIndex--;
          } else {
            isDeleting = false;
            isTypingFirst = true;
            currentIndex = 0;
          }
        }
      }
    };

    const interval = setInterval(typeText, isDeleting ? 40 : 65);

    return () => {
      clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [scrollProgress.first]);

  // Garden section typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    let isTypingFirst = true;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;
    
    const typeText = () => {
      if (isTypingFirst) {
        if (!isDeleting) {
          if (currentIndex <= fifthFullText.length) {
            const symbolsForRest = currentIndex < fifthFullText.length ? 
              getRandomSymbols(fifthFullText.length - currentIndex) : '';
            setFifthText(fifthFullText.slice(0, currentIndex) + symbolsForRest);
            currentIndex++;
            if (currentIndex > fifthFullText.length) {
              timeoutId = setTimeout(() => {
                isDeleting = true;
                currentIndex = fifthFullText.length;
              }, 1000);
            }
          }
        } else {
          if (currentIndex > 0) {
            const symbolsForRest = getRandomSymbols(currentIndex - 1);
            setFifthText(fifthFullText.slice(0, currentIndex - 1) + symbolsForRest);
            currentIndex--;
          } else {
            isDeleting = false;
            isTypingFirst = false;
            currentIndex = 0;
          }
        }
      } else {
        if (!isDeleting) {
          if (currentIndex <= sixthFullText.length) {
            const symbolsForRest = currentIndex < sixthFullText.length ? 
              getRandomSymbols(sixthFullText.length - currentIndex) : '';
            setFifthText(sixthFullText.slice(0, currentIndex) + symbolsForRest);
            currentIndex++;
            if (currentIndex > sixthFullText.length) {
              timeoutId = setTimeout(() => {
                isDeleting = true;
                currentIndex = sixthFullText.length;
              }, 2000);
            }
          }
        } else {
          if (currentIndex > 0) {
            const symbolsForRest = getRandomSymbols(currentIndex - 1);
            setFifthText(sixthFullText.slice(0, currentIndex - 1) + symbolsForRest);
            currentIndex--;
          } else {
            isDeleting = false;
            isTypingFirst = true;
            currentIndex = 0;
          }
        }
      }
    };

    const interval = setInterval(typeText, isDeleting ? 40 : 65);

    return () => {
      clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [scrollProgress.second]);

  // Sixth page typewriter effect
  useEffect(() => {
    if (scrollProgress.fourth < 0.55) {
      setSixthText("");
      return;
    }
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= sixthFullText.length) {
        setSixthText(sixthFullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [scrollProgress.fourth]);

  // Music section typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    let isTypingFirst = true;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;
    
    const typeText = () => {
      if (isTypingFirst) {
        if (!isDeleting) {
          if (currentIndex <= seventhFullText.length) {
            const symbolsForRest = currentIndex < seventhFullText.length ? 
              getRandomSymbols(seventhFullText.length - currentIndex) : '';
            setSeventhText(seventhFullText.slice(0, currentIndex) + symbolsForRest);
            currentIndex++;
            if (currentIndex > seventhFullText.length) {
              timeoutId = setTimeout(() => {
                isDeleting = true;
                currentIndex = seventhFullText.length;
              }, 1000);
            }
          }
        } else {
          if (currentIndex > 0) {
            const symbolsForRest = getRandomSymbols(currentIndex - 1);
            setSeventhText(seventhFullText.slice(0, currentIndex - 1) + symbolsForRest);
            currentIndex--;
          } else {
            isDeleting = false;
            isTypingFirst = false;
            currentIndex = 0;
          }
        }
      } else {
        if (!isDeleting) {
          if (currentIndex <= eighthFullText.length) {
            const symbolsForRest = currentIndex < eighthFullText.length ? 
              getRandomSymbols(eighthFullText.length - currentIndex) : '';
            setSeventhText(eighthFullText.slice(0, currentIndex) + symbolsForRest);
            currentIndex++;
            if (currentIndex > eighthFullText.length) {
              timeoutId = setTimeout(() => {
                isDeleting = true;
                currentIndex = eighthFullText.length;
              }, 2000);
            }
          }
        } else {
          if (currentIndex > 0) {
            const symbolsForRest = getRandomSymbols(currentIndex - 1);
            setSeventhText(eighthFullText.slice(0, currentIndex - 1) + symbolsForRest);
            currentIndex--;
          } else {
            isDeleting = false;
            isTypingFirst = true;
            currentIndex = 0;
          }
        }
      }
    };

    const interval = setInterval(typeText, isDeleting ? 40 : 65);

    return () => {
      clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [scrollProgress.third]);

  // Blinking cursor effects
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
      setShowSecondCursor(prev => !prev);
      setShowThirdCursor(prev => !prev);
      setShowFourthCursor(prev => !prev);
      setShowFifthCursor(prev => !prev);
      setShowSixthCursor(prev => !prev);
      setShowSeventhCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="bg-white h-[400vh] relative snap-y snap-mandatory" ref={mainRef}>
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
        
        {/* Menu Items */}
        <div 
          className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 ${
            showMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-white opacity-90"></div>
          
          {/* Menu Content */}
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

      {/* First Page */}
      <div className="h-screen flex flex-col items-center justify-center relative snap-start">
        <div className="flex flex-col items-center gap-4" style={{ 
          opacity: scrollProgress.first > 0.5 ? 0 : 1,
          transform: `translateY(${scrollProgress.first * 20}px)`,
          transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out'
        }}>
          <Link href="/about">
            <Image
              src="/images/ETERNAL VENTURES - no ventures.png"
              alt="Eternal Ventures Logo"
              width={300}
              height={500}
            />
          </Link>
          <div className="flex flex-col items-center gap-2">
            <div className="text-black text-xs tracking-wider font-thin" style={{ fontFamily: 'var(--font-helios-ext)' }}>
              {text}{showCursor && <span className="opacity-50">|</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Second Page */}
      <div className="h-screen flex flex-col items-center justify-center relative snap-start">
        <div className="flex flex-col items-center gap-4" style={{ 
          opacity: scrollProgress.first < 0.5 ? 0 : (scrollProgress.second > 0.5 ? 0 : 1),
          transform: `translateY(${scrollProgress.second * 20}px)`,
          transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out'
        }}>
          <Link href="/labs">
            <Image
              src="/images/ETERNAL VENTURES - no ventures.png"
              alt="Eternal Labs Logo"
              width={80}
              height={80}
            />
          </Link>
          <div className="flex flex-col items-center gap-2">
            <div className="text-black text-xs tracking-wider font-thin" style={{ fontFamily: 'var(--font-helios-ext)' }}>
              {thirdText}{showThirdCursor && <span className="opacity-50">|</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Third Page */}
      <div className="h-screen flex flex-col items-center justify-center relative snap-start">
        <div className="flex flex-col items-center gap-4" style={{ 
          opacity: scrollProgress.second < 0.5 ? 0 : (scrollProgress.third > 0.5 ? 0 : 1),
          transform: `translateY(${scrollProgress.third * 20}px)`,
          transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out'
        }}>
          <Link href="/garden">
            <Image
              src="/images/ETERNAL VENTURES - no ventures.png"
              alt="Eternal Garden Logo"
              width={80}
              height={80}
            />
          </Link>
          <div className="flex flex-col items-center gap-2">
            <div className="text-black text-xs tracking-wider font-thin" style={{ fontFamily: 'var(--font-helios-ext)' }}>
              {fifthText}{showFifthCursor && <span className="opacity-50">|</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Fourth Page */}
      <div className="h-screen flex flex-col items-center justify-center relative snap-start">
        <div className="flex flex-col items-center gap-4" style={{ 
          opacity: scrollProgress.third < 0.5 ? 0 : (scrollProgress.fourth > 0.5 ? 0 : 1),
          transform: `translateY(${scrollProgress.fourth * 20}px)`,
          transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out'
        }}>
          <Link href="/music">
            <Image
              src="/images/ETERNAL VENTURES - no ventures.png"
              alt="Eternal Music Logo"
              width={80}
              height={80}
            />
          </Link>
          <div className="flex flex-col items-center gap-2">
            <div className="text-black text-xs tracking-wider font-thin" style={{ fontFamily: 'var(--font-helios-ext)' }}>
              {seventhText}{showSeventhCursor && <span className="opacity-50">|</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
