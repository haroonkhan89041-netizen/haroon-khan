import React from 'react';
import { IntelligenceGraph } from '../components/home/IntelligenceGraph';
import { Cpu, Zap, Network, Radio } from 'lucide-react';

export const IntelligenceView: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#9292A5] tracking-[0.25em] uppercase mb-4">
            <Cpu className="w-3.5 h-3.5 text-[#39D9FF]" />
            NEURAL & PHILOSOPHICAL REASONING
          </div>
          <h1 className="font-display font-bold text-5xl sm:text-7xl text-[#F5F5FA] tracking-tight mb-4">
            INTELLIGENCE WITHOUT LIMITS
          </h1>
          <p className="font-sans text-lg text-[#9292A5] leading-relaxed">
            The mathematical and conceptual bridge linking human vulnerability, autonomous synthesis, and persistent computational worlds.
          </p>
        </div>

        {/* Interactive Graph */}
        <IntelligenceGraph />

        {/* Core Principles Grid */}
        <div className="mt-20 pt-16 border-t border-white/[0.06] grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-[#0A0A14] border border-[#7C5CFF]/20 space-y-3">
            <span className="font-mono text-xs text-[#39D9FF]">AXIOM 01 // SYMBIOSIS</span>
            <h3 className="font-display font-bold text-xl text-[#F5F5FA]">Amplification Over Automation</h3>
            <p className="font-sans text-xs text-[#9292A5] leading-relaxed">
              We reject the premise that intelligence is a finite resource to be industrialized. The machine generates candidates; the human provides existential direction and aesthetic truth.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0A0A14] border border-[#7C5CFF]/20 space-y-3">
            <span className="font-mono text-xs text-[#D85CFF]">AXIOM 02 // NON-LINEARITY</span>
            <h3 className="font-display font-bold text-xl text-[#F5F5FA]">Hyperbolic Topologies</h3>
            <p className="font-sans text-xs text-[#9292A5] leading-relaxed">
              Thought does not move in straight lines. NEXUS maps ideas onto non-Euclidean cognitive manifolds where opposing disciplines find instant tangent points.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0A0A14] border border-[#7C5CFF]/20 space-y-3">
            <span className="font-mono text-xs text-[#00F5D4]">AXIOM 03 // RESONANCE</span>
            <h3 className="font-display font-bold text-xl text-[#F5F5FA]">Collective Phase Lock</h3>
            <p className="font-sans text-xs text-[#9292A5] leading-relaxed">
              When thousands of creators focus their synaptic intentions simultaneously, the network enters a coherent state where novel theorems materialize spontaneously.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
