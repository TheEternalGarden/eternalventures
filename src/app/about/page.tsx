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
  const description = 'ETERNAL VENTURES IS A STUDIO SPECIALIZING IN CREATIVE RESEARCH.';
  const founded = 'FOUNDED IN 2023';
  const mission = 'SPEARHEADED BY ETERNAL LABS, OUR TEAM BUILDS AT THE INTERSECTION OF TECHNOLOGY, ART AND STORYTELLING. THESE INNOVATIONS FUEL THE OUTPUT OF OUR OTHER C