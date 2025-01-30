'use client';
import { useState } from 'react';
import RippleButton from './RippleButton';

interface HamburgerMenuProps {
  onNavigate: (section: number) => void;
}

export default function HamburgerMenu({ onNavigate }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const menuItems = [
    { name: 'VENTURES', section: 0 },
    { name: 'LABS', section: 2 },
    { name: 'GARDEN', section: 4 },
    { name: 'MUSIC', section: 6 }
  ];

  return (
    <>
      {/* Hamburger Icon */}
      <div className="fixed top-8 right-8 z-50">
        <div 
          className="relative"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="w-8 h-6 flex flex-col justify-between cursor-pointer">
            <div className="w-full h-0.5 bg-black"></div>
            <div className="w-full h-0.5 bg-black"></div>
            <div className="w-full h-0.5 bg-black"></div>
          </div>
        </div>
      </div>

      {/* Centered Menu Items */}
      <div 
        className={`fixed inset-0 z-40 flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => {
          setIsOpen(false);
          setHoveredItem(null);
        }}
      >
        {/* Semi-transparent background */}
        <div className="absolute inset-0 bg-white bg-opacity-95" />
        
        {/* Menu Items */}
        <div className="relative flex flex-col items-center space-y-12">
          {menuItems.map((item, index) => (
            <RippleButton
              key={item.name}
              onClick={() => {
                onNavigate(item.section);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`font-[var(--font-helios)] text-base text-black transition-all duration-500 min-w-[200px] text-center px-8 py-2 ${
                hoveredItem !== null && hoveredItem !== index ? 'opacity-20' : 'opacity-100'
              }`}
            >
              <span className={`menu-item-underline ${hoveredItem === index ? 'active' : ''}`}>
                {item.name}
              </span>
            </RippleButton>
          ))}
        </div>
      </div>
    </>
  );
} 