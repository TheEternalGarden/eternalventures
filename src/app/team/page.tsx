'use client';
// Force new deployment
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Team() {
  const [text, setText] = useState("");
  const [roleText, setRoleText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showRoleCursor, setShowRoleCursor] = useState(true);
  const [isFirstTextComplete, setIsFirstTextComplete] = useState(false);
  
  const title = "TEAM";
  const role = "TK: CEO & FOUNDER";

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

  // Role text animation - starts after title is complete
  useEffect(() => {
    if (!isFirstTextComplete) return;
    
    let currentIndex = 0;
    
    const typeText = () => {
      if (currentIndex <= role.length) {
        const symbolsForRest = currentIndex < role.length ? 
          getRandomSymbols(role.length - currentIndex) : '';
        setRoleText(role.slice(0, currentIndex) + symbolsForRest);
        currentIndex++;
      }
    };

    const interval = setInterval(typeText, 65);

    return () => clearInterval(interval);
  }, [isFirstTextComplete]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
      setShowRoleCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center pt-20 gap-8">
      <div 
        className="text-black text-xs tracking-wider font-thin"
        style={{ fontFamily: 'var(--font-helios-ext)' }}
      >
        {text}{showCursor && <span className="opacity-50">|</span>}
      </div>
      <Image
        src="/images/tkheadshot.jpg"
        alt="Team Member Headshot"
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
  );
}
