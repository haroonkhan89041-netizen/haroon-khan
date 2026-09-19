import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { MagneticButton } from '../common/MagneticButton';
import { ArrowUpRight, Compass, Sparkles, Orbit, Layers } from 'lucide-react';

export const Hero: React.FC = () => {
  const { navigate, setCursorLabel } = useNexus();
  const [hoverWord, setHoverWord] = useState<string | null>(null);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-6 md:px-10 pt-28 pb-16 overflow-hidden">
      {/* Subtle atmospheric center spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[500px] rounded-full bg-gradient-to-b from-[#7C5CFF]/12 via-[#39D9FF]/8 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow badge */}
        <div
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0A0A14]/80 backdrop-blur-md border border-[#7C5CFF]/30 mb-8 shadow-[0_0_20px_rgba(124,92,255,0.15)]"
          onMouseEnter={() => setCursorLabel('PLATFORM')}
          onMouseLeave={() => setCursorLabel(null)}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#39D9FF] animate-pulse" />
          <span className="font-mono text-[11px] md:text-xs tracking-[0.25em] text-[#9292A5] uppercase">
            The Creative Intelligence Platform
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#7C5CFF]" />
        </div>

        {/* Huge Enormous Headline */}
        <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.92] text-[#F5F5FA] mb-8 select-none">
          <span
            className="block transition-all duration-500 hover:text-[#39D9FF] hover:translate-x-1 inline-block"
            onMouseEnter={() => {
              setHoverWord('IDEAS');
              setCursorLabel('IDEATE');
            }}
            onMouseLeave={() => {
              setHoverWord(null);
              setCursorLabel(null);
            }}
          >
            IDEAS
          </span>
          <span
            className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F5F5FA] via-[#7C5CFF] to-[#39D9FF] transition-all duration-500 hover:scale-[1.02] inline-block"
            onMouseEnter={() => {
              setHoverWord('BECOME');
              setCursorLabel('EVOLVE');
            }}
            onMouseLeave={() => {
              setHoverWord(null);
              setCursorLabel(null);
            }}
          >
            BECOME
          </span>
          <span
            className="block transition-all duration-500 hover:text-[#D85CFF] hover:-translate-x-1 inline-block"
            onMouseEnter={() => {
              setHoverWord('WORLDS');
              setCursorLabel('EXPAND');
            }}
            onMouseLeave={() => {
              setHoverWord(null);
              setCursorLabel(null);
            }}
          >
            WORLDS.
          </span>
        </h1>

        {/* Cinematic Subtext */}
        <p className="font-sans text-base sm:text-lg md:text-xl text-[#9292A5] max-w-2xl leading-relaxed mb-12 font-normal">
          Think beyond the screen. Explore ideas, build experiences, and turn imagination into something real.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <MagneticButton
            variant="primary"
            cursorLabel="ENTER"
            className="w-full sm:w-auto text-sm px-8 py-4"
            onClick={() => navigate('/create')}
          >
            ENTER NEXUS
            <ArrowUpRight className="w-4 h-4 ml-1 text-[#03030A]" />
          </MagneticButton>

          <MagneticButton
            variant="secondary"
            cursorLabel="EXPLORE"
            className="w-full sm:w-auto text-sm px-8 py-4"
            onClick={() => navigate('/explore')}
          >
            <Compass className="w-4 h-4 mr-1 text-[#39D9FF]" />
            EXPLORE THE UNIVERSE
          </MagneticButton>
        </div>

        {/* Interactive Micro-Stats Row */}
        <div className="mt-16 pt-8 border-t border-white/[0.05] grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 w-full max-w-4xl text-left">
          <div className="space-y-1">
            <div className="font-mono text-[10px] text-[#9292A5] tracking-widest uppercase">COGNITIVE NODES</div>
            <div className="font-display font-bold text-xl md:text-2xl text-[#F5F5FA]">148,920+</div>
            <div className="font-mono text-[10px] text-[#39D9FF] flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-[#39D9FF]" /> Active mesh
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-mono text-[10px] text-[#9292A5] tracking-widest uppercase">DIMENSIONAL WORLDS</div>
            <div className="font-display font-bold text-xl md:text-2xl text-[#F5F5FA]">42,800+</div>
            <div className="font-mono text-[10px] text-[#7C5CFF]">Synthesized</div>
          </div>
          <div className="space-y-1">
            <div className="font-mono text-[10px] text-[#9292A5] tracking-widest uppercase">SYNAPTIC LATENCY</div>
            <div className="font-display font-bold text-xl md:text-2xl text-[#F5F5FA]">14 ms</div>
            <div className="font-mono text-[10px] text-[#00F5D4]">Sub-perceptual</div>
          </div>
          <div className="space-y-1">
            <div className="font-mono text-[10px] text-[#9292A5] tracking-widest uppercase">CREATOR GUILDS</div>
            <div className="font-display font-bold text-xl md:text-2xl text-[#F5F5FA]">184</div>
            <div className="font-mono text-[10px] text-[#D85CFF]">Global networks</div>
          </div>
        </div>
      </div>
    </section>
  );
};
