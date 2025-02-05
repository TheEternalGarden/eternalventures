'use client';
import { useState, useEffect } from 'react';

interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

export default function RippleButton({ 
  children, 
  onClick, 
  onMouseEnter,
  onMouseLeave,
  className = '' 
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    ripples.forEach((ripple) => {
      const timer = setTimeout(() => {
        setRipples((prevRipples) =>
          prevRipples.filter((r) => r.id !== ripple.id)
        );
      }, 1000);

      return () => clearTimeout(timer);
    });
  }, [ripples]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRipples([...ripples, { x, y, id: Date.now() }]);
    onMouseEnter?.();
  };

  return (
    <button
      className={`relative overflow-hidden ${className}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-black bg-opacity-10 rounded-full pointer-events-none animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
            width: '100vw',
            paddingBottom: '200%',
          }}
        />
      ))}
      {children}
    </button>
  );
} 
