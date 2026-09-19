import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFadeOut(true);
          setTimeout(() => {
            onComplete();
          }, 450);
          return 100;
        }
        return prev + Math.floor(Math.random() * 18 + 12);
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#03030A] transition-opacity duration-500 ease-out ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Loading NEXUS"
    >
      {/* Central Quantum Orb */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* Orbital rings */}
        <div className="w-24 h-24 rounded-full border border-[#7C5CFF]/30 animate-spin" style={{ animationDuration: '4s' }} />
        <div className="absolute w-16 h-16 rounded-full border border-[#39D9FF]/40 animate-spin" style={{ animationDuration: '2.5s', animationDirection: 'reverse' }} />
        <div className="absolute w-6 h-6 rounded-full bg-gradient-to-tr from-[#7C5CFF] to-[#39D9FF] blur-xs shadow-[0_0_25px_#39D9FF] animate-pulse" />
      </div>

      {/* Brand title */}
      <h1 className="font-display text-2xl font-bold tracking-[0.35em] text-[#F5F5FA] mb-2">
        NEXUS
      </h1>

      <p className="font-mono text-xs text-[#9292A5] tracking-wider mb-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#39D9FF] animate-ping" />
        Initializing imagination…
      </p>

      {/* Sleek progress line */}
      <div className="w-48 h-[2px] bg-[#121222] rounded-full overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-[#7C5CFF] via-[#39D9FF] to-[#D85CFF] transition-all duration-150 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      <span className="font-mono text-[10px] text-[#9292A5]/60 mt-3">
        SYSTEM COHERENCE: {Math.min(progress, 100)}%
      </span>
    </div>
  );
};
