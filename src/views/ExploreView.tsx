import React, { useState } from 'react';
import { useNexus } from '../context/NexusContext';
import { WORLD_DIMENSIONS } from '../data/nexusData';
import { Compass, ArrowRight, Layers, Sparkles, Brain, Eye, Share2, Check } from 'lucide-react';

export const ExploreView: React.FC = () => {
  const { navigate, setCursorLabel } = useNexus();
  const [selectedId, setSelectedId] = useState<string>('create');

  const activeDim = WORLD_DIMENSIONS.find((d) => d.id === selectedId) || WORLD_DIMENSIONS[0];

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-24 px-5 sm:px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#9292A5] tracking-[0.25em] uppercase mb-4">
            <Compass className="w-3.5 h-3.5 text-[#39D9FF]" />
            DIMENSIONAL NAVIGATION ATLAS
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl text-[#F5F5FA] tracking-tight mb-4">
            EXPLORE THE UNKNOWN
          </h1>
          <p className="font-sans text-lg text-[#9292A5] leading-relaxed">
            Traverse the four fundamental axes of creative intelligence. Each dimension represents a phase shift from raw intuition into realized experiential topology.
          </p>
        </div>

        {/* Sector Tabs Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10 md:mb-12">
          {WORLD_DIMENSIONS.map((dim) => {
            const isSelected = dim.id === selectedId;
            return (
              <button
                key={dim.id}
                onClick={() => setSelectedId(dim.id)}
                onMouseEnter={() => setCursorLabel(dim.title)}
                onMouseLeave={() => setCursorLabel(null)}
                className={`group p-5 sm:p-6 rounded-2xl text-left border transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39D9FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#03030A] ${
                  isSelected
                    ? 'bg-[#0A0A14] border-[#7C5CFF] shadow-[0_0_30px_rgba(124,92,255,0.25)]'
                    : 'bg-[#0A0A14]/40 border-white/[0.04] hover:border-white/[0.15] hover:bg-[#0A0A14]/80 hover:shadow-[0_12px_35px_rgba(124,92,255,0.12)]'
                }`}
              >
                <div
                  className="font-mono text-xs tracking-widest font-bold mb-2"
                  style={{ color: isSelected ? dim.accentColor : '#9292A5' }}
                >
                  {dim.number} // SECTOR
                </div>
                <div className="font-display text-2xl font-bold text-[#F5F5FA] mb-1">
                  {dim.title}
                </div>
                <div className="font-sans text-xs text-[#9292A5] line-clamp-1">
                  {dim.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dimension Spotlight Stage */}
        <div className="rounded-3xl bg-[#0A0A14]/80 backdrop-blur-xl border border-[#7C5CFF]/30 p-6 sm:p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3 font-mono text-xs">
              <span
                className="w-2.5 h-2.5 rounded-full animate-ping"
                style={{ backgroundColor: activeDim.accentColor }}
              />
              <span className="text-[#39D9FF] font-semibold">SECTOR {activeDim.number} // ACTIVE</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F5FA]">
              {activeDim.title}: {activeDim.subtitle}
            </h2>

            <p className="font-sans text-base md:text-lg text-[#9292A5] leading-relaxed">
              {activeDim.summary}
            </p>

            {/* Core Capabilities */}
            <div className="space-y-3 pt-4 border-t border-white/[0.06]">
              <div className="font-mono text-xs text-[#F5F5FA] uppercase tracking-wider">
                CORE CAPABILITIES IN THIS SECTOR
              </div>
              <div className="flex flex-wrap gap-2.5">
                {activeDim.capabilities.map((cap) => (
                  <span
                    key={cap}
                    className="px-3 py-1.5 rounded-xl bg-[#121222] border border-white/[0.08] font-mono text-xs text-[#39D9FF]"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => navigate('/create')}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#39D9FF] text-[#03030A] font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(124,92,255,0.4)]"
              >
                <span>Materialize In This Sector</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Graphic Simulation Box */}
          <div className="lg:col-span-5 h-72 sm:h-80 rounded-2xl bg-[#03030A] border border-[#7C5CFF]/20 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${activeDim.accentColor} 0%, transparent 70%)`,
              }}
            />
            <div
              className="w-28 h-28 rounded-full border border-dashed animate-spin flex items-center justify-center mb-4"
              style={{ borderColor: activeDim.accentColor, animationDuration: '18s' }}
            >
              <div
                className="w-16 h-16 rounded-full blur-xs animate-pulse"
                style={{ backgroundColor: `${activeDim.accentColor}40` }}
              />
            </div>
            <div className="font-mono text-xs text-[#F5F5FA] uppercase tracking-widest mb-1">
              RESONANCE FIELD: 99.8%
            </div>
            <div className="font-mono text-[10px] text-[#9292A5]">
              {activeDim.interactionPrompt}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
