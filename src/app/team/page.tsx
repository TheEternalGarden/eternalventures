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

  