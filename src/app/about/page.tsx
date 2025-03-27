'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface MenuItemProps {
  href: string;
  text: string;
  isHovered: boolean;
  onHover: (item: string | null) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ href, text, isHovered, onHover }) => (
  <Link 
    href={href}
    className={`menu-item ${isHovered ? 'hovered' : ''}`}
    onMouseEnter={() => onHover(text)}
    onMouseLeave={() => onHover(null)}
  >
    {text}
  </Link>
);

export default function About(): JSX.Element {
  const [text, setText] = useState<string>("");
  const [showCursor, setShowCursor] = useState<boolean>(true);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const fullText = "BUILDING WORLDS THROUGH TECHNOLOGY AND STORYTELLING.";

  // Symbol generation functions
  const getRandomSymbol = (): string => {
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const getRandomSymbols = (length: number): string => {
    return Array(length).fill(0).map(() => getRandomSymbol()).join('');
  };

  // Typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    let isTypingFirst = true;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;
    
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
      setShowCursor((prev: boolean) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  // Add smooth scroll behavior
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const container = document.querySelector('.scroll-container');
      if (!container) return;

      const scrollAmount = e.deltaY;
      container.scrollBy({
        top: scrollAmount,
        behavior: 'smooth'
      });
    };

    const container = document.querySelector('.scroll-container');
    if (container) {
      container.addEventListener('wheel', handleWheel as EventListener, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel as EventListener);
      }
    };
  }, []);

  return (
    <main className="scroll-container min-h-screen bg-black text-white relative overflow-hidden">
      <div className="flex flex-col items-center justify-center min-h-screen relative">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            {text}{showCursor ? '|' : ''}
          </h1>
        </div>
      </div>
    </main>
  );
}