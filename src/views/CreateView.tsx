import React from 'react';
import { CreativeLab } from '../components/home/CreativeLab';
import { useNexus } from '../context/NexusContext';
import { Palette, Bookmark, Sparkles, Layers, Clock, ArrowUpRight } from 'lucide-react';

export const CreateView: React.FC = () => {
  const { savedCreations, setCursorLabel } = useNexus();

  return (
    <div className="min-h-screen pt-28 pb-24">
      {/* Primary Generator Workspace */}
      <CreativeLab standalone={true} />

      {/* Saved Creations / Artifact Archive */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-16 pt-16 border-t border-white/[0.06]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="font-mono text-xs text-[#9292A5] tracking-[0.2em] uppercase mb-1 flex items-center gap-2">
              <Bookmark className="w-3.5 h-3.5 text-[#39D9FF]" />
              PERSONAL NEXUS REPOSITORY
            </div>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-[#F5F5FA]">
              Saved Spatial Creations ({savedCreations.length})
            </h2>
          </div>
        </div>

        {savedCreations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedCreations.map((artifact) => (
              <div
                key={artifact.id}
                className="p-6 rounded-2xl bg-[#0A0A14] border border-[#7C5CFF]/20 hover:border-[#39D9FF]/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#9292A5] mb-2">
                    <span className="text-[#39D9FF]">{artifact.archetype}</span>
                    <span>{artifact.generatedAt}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#F5F5FA] group-hover:text-[#39D9FF] transition-colors mb-2">
                    {artifact.title}
                  </h3>
                  <p className="font-sans text-xs text-[#9292A5] line-clamp-2 mb-4">
                    {artifact.prompt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs text-[#9292A5]">
                  <span>COHERENCE {artifact.coherenceScore.toFixed(1)}%</span>
                  <span className="text-[#00F5D4]">{artifact.entropyMetric}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* High-Craft Contextual Empty State matching strict requirements */
          <div className="p-12 rounded-3xl bg-[#0A0A14]/40 border border-dashed border-white/[0.08] text-center max-w-xl mx-auto flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-[#121222] border border-[#7C5CFF]/30 flex items-center justify-center text-[#7C5CFF] mb-4">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="font-display font-bold text-xl text-[#F5F5FA] mb-2">
              Nothing has appeared here yet.
            </h3>
            <p className="font-sans text-sm text-[#9292A5] mb-6">
              The next idea could be yours. Formulate a hypothesis above and synthesize your first digital universe.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
