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
      }, 500); // Adjust timing as needed

      return () => clearTimeout(timer);
    }
  }, [currentWordIndex]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8">
      <Image
        src="/images/ETERNAL VENTURES - no ventures.png"
        alt="Eternal Ventures Logo"
        width={300}
        height={300}
      />
      <div className="flex flex-col items-center gap-2">
        {displayedWords.map((word, index) => (
          <p key={index} className="text-2xl">{word}</p>
        ))}
      </div>
    </main>
  );
}
