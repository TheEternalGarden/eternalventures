'use client';
import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  startTyping?: boolean;
  startDelay?: number;
}

export default function TypewriterText({ 
  text, 
  delay = 150,
  startTyping = false,
  startDelay = 0
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shouldStart, setShouldStart] = useState(false);

  useEffect(() => {
    if (!startTyping) {
      setDisplayText('');
      setCurrentIndex(0);
      setShouldStart(false);
      return;
    }

    // Add initial delay before starting to type
    const initialDelay = setTimeout(() => {
      setShouldStart(true);
    }, startDelay);

    return () => clearTimeout(initialDelay);
  }, [startTyping, startDelay]);

  useEffect(() => {
    if (!shouldStart) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text, shouldStart]);

  return (
    <>
      <style jsx global>{`
        @font-face {
          font-family: 'Helios Extended';
          src: url('/fonts/HeliosExt.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
        }
      `}</style>
      <span className="font-['Helios_Extended'] text-xs tracking-wider text-black">
        {displayText}
        {(shouldStart && currentIndex < text.length) && <span className="animate-blink">|</span>}
      </span>
    </>
  );
} 