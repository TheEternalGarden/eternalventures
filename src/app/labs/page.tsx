'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Labs() {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "RESEARCHING AND SHAPING THE WORLD OF CREATIVE TECHNOLOGY.";

  // Symbol generation functions
  const getRandomSymbol = () => {
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const getRandomSymbols = (length: number) => {
    return Array(length).fill(0).map(() => getRandomSymbol()).join('');
  };

  // Typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    let isTypingFirst = true;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;
    
    const typeText = () => {
      if (!isDeleting) {
        if (currentIndex <= fullText.length) {
          const symbolsForRest = currentIndex < fullText.length ? 
            getRandomSymbols(fullText.length - currentIndex) : '';
          setText(fullText.slice(0, currentIndex) + symbolsForRest);
          currentIndex++;
          if (currentIndex > fullText.length) {
            timeoutId = setTimeout(() => {
              isDeleting = true;
              currentIndex = fullText.length;
            }, 2000);
          }
        }
      } else {
        if (currentIndex > 0) {
          const symbolsForRest = getRandomSymbols(currentIndex - 1);
          setText(fullText.slice(0, currentIndex - 1) + symbolsForRest);
          currentIndex--;
        } else {
          isDeleting = false;
          currentIndex = 0;
        }
      }
    };

    const interval = setInterval(typeText, isDeleting ? 40 : 65);

    return () => {
      clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-8">
        <Image
          src="/images/ETERNAL VENTURES - no ventures.png"
          alt="Eternal Labs Logo"
          width={80}
          height={80}
          priority
        />
        <h1 className="text-2xl font-thin" style={{ fontFamily: 'var(--font-helios-ext)' }}>
          LABS
        </h1>
        <div className="text-center text-sm font-thin max-w-2xl" style={{ fontFamily: 'var(--font-helios-ext)' }}>
          {text}{showCursor && <span className="opacity-50">|</span>}
        </div>
      </div>
    </div>
  );
} 