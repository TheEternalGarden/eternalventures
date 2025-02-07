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
  const [peteRoleText, setPeteRoleText] = useState("");
  const [showPeteRoleCursor, setShowPeteRoleCursor] = useState(true);
  const [isClaireRoleComplete, setIsClaireRoleComplete] = useState(false);
  
  const title = "TEAM";
  const tkRole = "TK // CEO & FOUNDER";
  const claireRole = "CLAIRE // CO-FOUNDER";
  const peteRole = "PETE // AI AND RESEARCH LEAD";

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
            getRandomSymbols(title.length - currentIn