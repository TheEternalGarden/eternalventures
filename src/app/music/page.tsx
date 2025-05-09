'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Import video
import videoUrl from '../../../public/videos/darksidetrailer.mp4';

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
  const [scrollProgress, setScrollProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState<string | null>(null);

  const eternalMusicText = "ETERNAL MUSIC";
  const musicText = "MUSIC";
  const description = "A RECORD LABEL DEVELOPING WORLD BUILDING EXPERIENCES.";

  const handlePageScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollTop;
    const windowHeight = container.clientHeight;
    const progress = scrollPosition / windowHeight;
    setScrollProgress(progress);
  };

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

  useEffect(() => {
    if (videoRef.current) {
      // Add canplay event listener
      videoRef.current.addEventListener('canplay', () => {
        console.log('Video can play');
        if (videoRef.current) {
          videoRef.current.muted = false;
        }
      });

      videoRef.current.addEventListener('error', (e) => {
        console.error('Video error event:', e);
        const video = e.target as HTMLVideoElement;
        const errorMessage = video.error ? 
          `Error code: ${video.error.code}, Message: ${video.error.message}` : 
          'Unknown video error';
        console.error('Detailed error:', errorMessage);
        setVideoError(errorMessage);
      });

      // Log initial video element state
      console.log('Video element initial state:', {
        src: videoRef.current.currentSrc,
        readyState: videoRef.current.readyState,
        networkState: videoRef.current.networkState,
        error: videoRef.current.error,
        paused: videoRef.current.paused,
        muted: videoRef.current.muted
      });
    }
  }, []);

  return (
    <div className="relative">
      <div 
        className="h-screen snap-y snap-mandatory overflow-y-scroll"
        onScroll={handlePageScroll}
      >
        {/* First Page */}
        <main className="h-screen flex flex-col items-center justify-center gap-8 relative snap-start">
          {/* Top Text */}
          <div 
            className="absolute top-20 left-1/2 transform -translate-x-1/2 text-black text-xs tracking-wider font-thin"
            style={{ fontFamily: 'var(--font-helios-ext)' }}
          >
            {topText}{showTopCursor && <span className="opacity-50">|</span>}
          </div>

          <div className="flex flex-col items-center gap-4" style={{ 
            opacity: scrollProgress > 0.5 ? 0 : 1,
            transform: `translateY(${scrollProgress * 20}px)`,
            transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out'
          }}>
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
        </main>

        {/* Second Page - Video */}
        <div className="h-screen relative snap-start bg-black">
          <div className="h-full flex items-center justify-center" style={{ 
            opacity: scrollProgress < 0.5 ? 0 : (scrollProgress > 1.5 ? 0 : 1),
            transform: `translateY(${(scrollProgress - 1) * 20}px)`,
            transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out'
          }}>
            <div className="w-[1280px] h-[720px] relative bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                className="w-full h-full"
                controls
                playsInline
                preload="auto"
                crossOrigin="anonymous"
                poster="/images/ETERNAL VENTURES - no ventures.png"
                onLoadStart={() => {
                  console.log('Video load started');
                  if (videoRef.current) {
                    const videoElement = videoRef.current;
                    videoElement.load(); // Force reload
                    console.log('Initial video state:', {
                      src: videoElement.currentSrc || videoElement.src,
                      readyState: videoElement.readyState,
                      networkState: videoElement.networkState,
                      paused: videoElement.paused,
                    });
                  }
                }}
                onError={(e) => {
                  const video = e.currentTarget;
                  const error = video.error;
                  console.error('Video error details:', error);
                  if (error) {
                    let errorMessage = '';
                    switch (error.code) {
                      case MediaError.MEDIA_ERR_ABORTED:
                        errorMessage = 'Video playback was aborted';
                        break;
                      case MediaError.MEDIA_ERR_NETWORK:
                        errorMessage = 'Network error occurred while loading video';
                        break;
                      case MediaError.MEDIA_ERR_DECODE:
                        errorMessage = 'Video decoding error';
                        break;
                      case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                        errorMessage = 'Video format or MIME type not supported';
                        break;
                      default:
                        errorMessage = `Unknown error: ${error.message}`;
                    }
                    setVideoError(errorMessage);
                  } else {
                    setVideoError('Unknown error occurred');
                  }
                }}
                onCanPlay={() => {
                  console.log('Video can play');
                  if (videoRef.current) {
                    videoRef.current.muted = false;
                  }
                }}
              >
                <source 
                  src={videoUrl} 
                  type="video/mp4" 
                />
                {videoError && (
                  <div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50">
                    {videoError}
                  </div>
                )}
              </video>
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
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}