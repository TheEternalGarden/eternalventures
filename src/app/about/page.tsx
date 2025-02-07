'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function About() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ['VENTURES', 'LABS', 'MUSIC', 'GARDEN'];
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);

  useEffect(() => {
    if (currentWordIndex < words.length) {
      const timer = setTimeout(() => {
        setDisplayedWords(prev => [...prev, words[currentWordIndex]]);
        setCurrentWordIndex(prev => prev + 1);
      }, 1000); // Increased delay for better visibility

      return () => clearTimeout(timer);
    }
  }, [currentWordIndex]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8">
      <Image
        src="/images/ETERNAL VENTURES - no ventures.png"
        alt="Eternal Ventures Logo"
        width={150}
        height={150}
      />
      <div className="flex flex-col items-center gap-4">
        {displayedWords.map((word, index) => (
          <p 
            key={index} 
            className="text-xl"
            style={{
              opacity: 0,
              animation: `fadeIn 0.5s ease-in-out forwards`,
              animationDelay: `${index * 0.5}s`
            }}
          >
            {word}
          </p>
        ))}
      </div>
    </main>
  );
}
