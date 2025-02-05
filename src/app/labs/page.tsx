'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Labs() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <Link href="/" className="absolute top-8 left-8">
        <Image
          src="/images/ETERNAL VENTURES - no ventures.png"
          alt="Eternal Labs Logo"
          width={80}
          height={80}
          priority
        />
      </Link>
      <h1 className="text-4xl font-thin mb-8" style={{ fontFamily: 'var(--font-helios-ext)' }}>
        LABS
      </h1>
      <p className="text-center text-sm font-thin max-w-2xl" style={{ fontFamily: 'var(--font-helios-ext)' }}>
        RESEARCHING AND SHAPING THE WORLD OF CREATIVE TECHNOLOGY.
      </p>
    </div>
  );
} 