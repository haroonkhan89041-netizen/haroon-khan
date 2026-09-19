import React, { useRef, useState, useEffect } from 'react';
import { useNexus } from '../../context/NexusContext';
import { MagneticButton } from '../common/MagneticButton';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  const { navigate, setCursorLabel } = useNexus();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [luminance, setLuminance] = useState(0.2);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // How far into view the element is (0 = just entering from bottom, 1 = centered/passed)
      const visibleRatio = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight * 0.8)));
      setLuminance(0.15 + visibleRatio * 0.45);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 md:px-10 py-32 text-center overflow-hidden transition-colors duration-700"
      aria-label="Final Invitation"
    >
      {/* Background dynamically becoming brighter as user approaches */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 -z-10"
        style={{
          background: `radial-gradient(circle at 50% 60%, rgba(124, 92, 255, ${luminance}) 0%, rgba(57, 217, 255, ${
            luminance * 0.45
          }) 35%, rgba(3, 3, 10, 0.95) 75%)`,
        }}
      />

      {/* Atmospheric center lens flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#7C5CFF]/20 via-[#39D9FF]/20 to-[#D85CFF]/20 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Luminous beacon tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A0A14]/80 backdrop-blur-md border border-[#39D9FF]/40 shadow-[0_0_20px_rgba(57,217,255,0.25)]">
          <Sparkles className="w-3.5 h-3.5 text-[#39D9FF] animate-pulse" />
          <span className="font-mono text-xs text-[#F5F5FA] tracking-[0.25em] uppercase">
            IMMERSIVE SYNTHESIS PORTAL
          </span>
        </div>

        {/* Huge Typography */}
        <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#F5F5FA] tracking-tight leading-[0.95]">
          <span className="block">YOUR NEXT IDEA</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F5F5FA] via-[#39D9FF] to-[#7C5CFF]">
            STARTS HERE.
          </span>
        </h2>

        {/* Subtext */}
        <p className="font-sans text-lg sm:text-xl md:text-2xl text-[#9292A5] max-w-xl mx-auto font-light leading-relaxed">
          “Don’t wait for the future.<br />
          <span className="text-[#F5F5FA] font-medium">Build something that belongs in it.”</span>
        </p>

        {/* Big Action CTA */}
        <div className="pt-6">
          <MagneticButton
            variant="primary"
            cursorLabel="ENTER"
            className="text-base px-10 py-5 text-[#03030A] font-bold"
            onClick={() => navigate('/create')}
          >
            <span>ENTER NEXUS</span>
            <ArrowUpRight className="w-5 h-5 ml-1 text-[#03030A]" />
          </MagneticButton>
        </div>

        {/* Bottom Coordinates Status */}
        <div className="pt-12 font-mono text-xs text-[#9292A5]/70 tracking-widest">
          NODE MATRIX INITIALIZED // READY FOR USER SYNAPSE
        </div>
      </div>
    </section>
  );
};
