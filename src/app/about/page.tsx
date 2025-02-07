'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function About() {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const words = ['VENTURES', 'LABS', 'MUSIC', 'GARDEN'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Add symbol generation functions
  const getRandomSymbol = () => {
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const getRandomSymbols = (length: number) => {
    return Array(length).fill(0).map(() => getRandomSymbol()).join('');
  };

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

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8">
      <Image
        src="/images/ETERNAL VENTURES - no ventures.png"
        alt="Eternal Ventures Logo"
        width={150}
        height={150}
      />
      <div className="flex flex-col items-center gap-4">
        <div 
          className="text-black text-xs tracking-wider font-thin"
          style={{ fontFamily: 'var(--font-helios-ext)' }}
        >
          {text}{showCursor && <span className="opacity-50">|</span>}
        </div>
      </div>
    </main>
  );
}
