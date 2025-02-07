'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function About() {
  const [text, setText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [foundedText, setFoundedText] = useState("");
  const [missionText, setMissionText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showDescriptionCursor, setShowDescriptionCursor] = useState(true);
  const [showFoundedCursor, setShowFoundedCursor] = useState(true);
  const [showMissionCursor, setShowMissionCursor] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const words = ['VENTURES', 'LABS', 'MUSIC', 'GARDEN'];
  const description = "ETERNAL VENTURES IS A STUDIO SPECIALIZING IN CREATIVE RESEARCH.";
  const founded = "FOUNDED IN 2023";
  const mission = "SPEARHEADED BY ETERNAL LABS, OUR TEAM BUILDS AT THE INTERSECTION OF TECHNOLOGY, ART AND STORYTELLING. THESE INNOVATIONS FUEL THE OUTPUT OF OUR OTHER CORE VENTURES, ETERNAL GARDEN AND ETERNAL MUSIC.";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8">
      <Image
        src="/images/ETERNAL VENTURES - no ventures.png"
        alt="Eternal Ventures Logo"
        width={150}
        height={150}
      />
      <div className="flex flex-col items-center gap-4 max-w-2xl px-4">
        <div 
          className="text-black text-xs tracking-wider font-thin"
          style={{ fontFamily: 'var(--font-helios-ext)' }}
        >
          {text}{showCursor && <span className="opacity-50">|</span>}
        </div>
        <div 
          className="text-black text-xs tracking-wider font-thin mt-4 text-center"
          style={{ fontFamily: 'var(--font-helios-ext)' }}
        >
          {descriptionText}{showDescriptionCursor && <span className="opacity-50">|</span>}
        </div>
        <div 
          className="text-black text-xs tracking-wider font-thin mt-4 text-center"
          style={{ fontFamily: 'var(--font-helios-ext)' }}
        >
          {missionText}{showMissionCursor && <span className="opacity-50">|</span>}
        </div>
        <div 
          className="text-black text-xs tracking-wider font-thin mt-4 text-center"
          style={{ fontFamily: 'var(--font-helios-ext)' }}
        >
          {foundedText}{showFoundedCursor && <span className="opacity-50">|</span>}
        </div>
      </div>
    </main>
  );
}