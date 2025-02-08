'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Garden() {
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
  const [galleryText, setGalleryText] = useState("");
  const [galleryDescriptionText, setGalleryDescriptionText] = useState("");
  const [showGalleryDescriptionCursor, setShowGalleryDescriptionCursor] = useState(true);
  const [showGalleryCursor, setShowGalleryCursor] = useState(true);

  const eternalGardenText = "ETERNAL GARDEN";
  const gardenText = "GARDEN";
  const description = "A SCI-FI FANTASY EPIC ABOUT A MYSTICAL SEED THAT SPAWNS INFINITE WORLDS.";
  const galleryDescription = "A SCI-FI FANTASY EPIC ABOUT A MYSTICAL SEED THAT SPAWNS INFINITE WORLDS.";

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
        if (currentIndex <= eternalGardenText.length) {
          const symbolsForRest = currentIndex < eternalGardenText.length ? 
            getRandomSymbols(eternalGardenText.length - currentIndex) : '';
          setTopText(eternalGardenText.slice(0, currentIndex) + symbolsForRest);
          currentIndex++;
          if (currentIndex > eternalGardenText.length) {
            setIsTopTextComplete(true);
            setTimeout(() => {
              isDeleting = true;
            }, 1000);
          }
        }
      } else {
        if (currentIndex > 0) {
          const symbolsForRest = getRandomSymbols(currentIndex - 1);
          setTopText(eternalGardenText.slice(0, currentIndex - 1) + symbolsForRest);
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
      if (currentIndex <= gardenText.length) {
        const symbolsForRest = currentIndex < gardenText.length ? 
          getRandomSymbols(gardenText.length - currentIndex) : '';
        setCenterText(gardenText.slice(0, currentIndex) + symbolsForRest);
        currentIndex++;
        if (currentIndex > gardenText.length) {
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

  // Gallery text animation
  useEffect(() => {
    let currentIndex = 0;
    
    const typeText = () => {
      if (currentIndex <= galleryDescription.length) {
        const symbolsForRest = currentIndex < galleryDescription.length ? 
          getRandomSymbols(galleryDescription.length - currentIndex) : '';
        setGalleryText(galleryDescription.slice(0, currentIndex) + symbolsForRest);
        currentIndex++;
      }
    };

    const interval = setInterval(typeText, 65);
    return () => clearInterval(interval);
  }, []);

  // Gallery description text animation
  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    
    const typeText = () => {
      if (!isDeleting) {
        if (currentIndex <= galleryDescription.length) {
          const symbolsForRest = currentIndex < galleryDescription.length ? 
            getRandomSymbols(galleryDescription.length - currentIndex) : '';
          setGalleryDescriptionText(galleryDescription.slice(0, currentIndex) + symbolsForRest);
          currentIndex++;
          if (currentIndex > galleryDescription.length) {
            setTimeout(() => {
              isDeleting = true;
            }, 1000);
          }
        }
      } else {
        if (currentIndex > 0) {
          const symbolsForRest = getRandomSymbols(currentIndex - 1);
          setGalleryDescriptionText(galleryDescription.slice(0, currentIndex - 1) + symbolsForRest);
          currentIndex--;
        } else {
          isDeleting = false;
        }
      }
    };

    const interval = setInterval(typeText, isDeleting ? 40 : 65);
    return () => clearInterval(interval);
  }, []);

  // Update blinking cursor effect to include gallery cursors
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowTopCursor(prev => !prev);
      setShowCenterCursor(prev => !prev);
      setShowDescriptionCursor(prev => !prev);
      setShowGalleryCursor(prev => !prev);
      setShowGalleryDescriptionCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="relative">
      <div className="h-screen snap-y snap-mandatory overflow-y-scroll">
        {/* First Page */}
        <main className="h-screen flex flex-col items-center justify-center gap-8 relative snap-start">
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
            <img
              src="/images/ETERNAL VENTURES - no ventures.png"
              alt="Eternal Ventures Logo"
              className="w-[150px] h-[150px] object-contain"
            />

            {/* GARDEN Text */}
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
        </main>

        {/* Second Page - Gallery */}
        <div className="h-screen relative snap-start bg-white">
          {/* Gallery Description Text */}
          <div 
            className="absolute top-20 left-1/2 transform -translate-x-1/2 text-black text-xs tracking-wider font-thin text-center max-w-[800px] whitespace-nowrap px-4 z-10"
            style={{ fontFamily: 'var(--font-helios-ext)' }}
          >
            {galleryDescriptionText}{showGalleryDescriptionCursor && <span className="opacity-50">|</span>}
          </div>

          {/* Gallery Container */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-0 overflow-x-auto scrollbar-hide">
            <div className="flex gap-8 px-8 min-w-max mx-auto transition-transform duration-300 ease-in-out">
              {/* Sara */}
              <div className="relative w-[800px] h-[600px] hover:scale-[1.02] transition-transform duration-300">
                <img
                  src="/images/garden/sara.jpg"
                  alt="Sara"
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Kai */}
              <div className="relative w-[800px] h-[600px] hover:scale-[1.02] transition-transform duration-300">
                <img
                  src="/images/garden/kaicompressed.jpg"
                  alt="Kai"
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Kevin */}
              <div className="relative w-[800px] h-[600px] hover:scale-[1.02] transition-transform duration-300">
                <img
                  src="/images/garden/kevincompressed.jpg"
                  alt="Kevin"
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Refisings */}
              <div className="relative w-[800px] h-[600px] hover:scale-[1.02] transition-transform duration-300">
                <img
                  src="/images/garden/refisings.jpg"
                  alt="Refisings"
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Domino */}
              <div className="relative w-[800px] h-[600px] hover:scale-[1.02] transition-transform duration-300">
                <img
                  src="/images/garden/dominocompressed.jpg"
                  alt="Domino"
                  className="w-full h-full object-contain"
                />
              </div>
              {/* TK */}
              <div className="relative w-[800px] h-[600px] hover:scale-[1.02] transition-transform duration-300">
                <img
                  src="/images/garden/tkcompressed.jpg"
                  alt="TK"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
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
    </div>
  );
} 