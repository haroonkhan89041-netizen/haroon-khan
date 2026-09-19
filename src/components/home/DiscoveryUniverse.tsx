import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { PROJECTS_DATA } from '../../data/nexusData';
import { Category, Project } from '../../types';
import { ArrowUpRight, Sparkles, Filter, Layers } from 'lucide-react';

export const DiscoveryUniverse: React.FC = () => {
  const { openProject, setCursorLabel } = useNexus();
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  const categories: Category[] = [
    'All',
    'Design',
    'Technology',
    'Architecture',
    'AI',
    'Music',
    'Science',
    'Culture',
    'Games',
  ];

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  return (
    <section className="relative py-28 px-6 md:px-10 border-t border-white/[0.04]" aria-label="Discovery Universe">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="font-mono text-xs text-[#9292A5] tracking-[0.25em] uppercase mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#39D9FF]" />
              EDITORIAL CURATION
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-[#F5F5FA]">
              DISCOVER WHAT'S NEXT
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                onMouseEnter={() => setCursorLabel(cat.toUpperCase())}
                onMouseLeave={() => setCursorLabel(null)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-[#7C5CFF] text-[#F5F5FA] font-bold shadow-[0_0_15px_rgba(124,92,255,0.4)]'
                    : 'bg-[#0A0A14] text-[#9292A5] border border-white/[0.06] hover:border-[#39D9FF]/40 hover:text-[#F5F5FA]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Controlled Asymmetric Editorial Layout (Not a generic marketplace grid) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {filteredProjects.map((project, idx) => {
            // Controlled Asymmetry: Vary span & layout structure based on project index/size
            const isHeroCard = idx === 0 || idx === 4;
            const isWideCard = idx === 2;
            const colSpan = isHeroCard
              ? 'md:col-span-8'
              : isWideCard
              ? 'md:col-span-12'
              : 'md:col-span-4';

            return (
              <div
                key={project.id}
                id={`project-card-${project.slug}`}
                onClick={() => openProject(project.slug)}
                onMouseEnter={() => setCursorLabel('VIEW')}
                onMouseLeave={() => setCursorLabel(null)}
                className={`group relative rounded-3xl bg-[#0A0A14]/70 backdrop-blur-md border border-[#7C5CFF]/20 hover:border-[#39D9FF]/60 p-6 md:p-8 transition-all duration-500 cursor-pointer overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_0_40px_rgba(124,92,255,0.25)] ${colSpan} ${
                  idx % 2 === 1 ? 'md:translate-y-4' : ''
                }`}
              >
                {/* Visual Preview Background & Atmospheric Aura */}
                <div
                  className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-[100px] opacity-15 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none"
                  style={{ backgroundColor: project.visualColor }}
                />

                {/* Top Metas */}
                <div className="flex items-center justify-between font-mono text-xs mb-6">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: project.accentColor }}
                    />
                    <span className="text-[#39D9FF] uppercase tracking-wider font-semibold">
                      {project.category}
                    </span>
                  </div>
                  <span className="text-[#9292A5]">{project.date}</span>
                </div>

                {/* Title & Creator */}
                <div className="mb-4">
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-[#F5F5FA] group-hover:text-[#39D9FF] transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="font-display text-base text-[#9292A5] font-light line-clamp-2">
                    {project.subtitle}
                  </p>
                </div>

                {/* Visual Showcase Specimen */}
                <div className="relative w-full h-44 sm:h-52 rounded-2xl bg-[#03030A] border border-white/[0.04] mb-6 overflow-hidden flex items-center justify-center group-hover:border-[#7C5CFF]/40 transition-colors">
                  {/* Geometric Wireframe Visual Preview */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div
                      className="w-16 h-16 rounded-2xl border border-dashed flex items-center justify-center transition-transform duration-700 group-hover:rotate-45"
                      style={{ borderColor: project.accentColor }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg blur-xs"
                        style={{ backgroundColor: project.visualColor }}
                      />
                    </div>
                  </div>

                  {/* Telemetry Tag */}
                  <div className="absolute bottom-2.5 left-3 font-mono text-[9px] text-[#9292A5]">
                    {project.technology.slice(0, 2).join(' // ')}
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px] text-[#F5F5FA]"
                      style={{ backgroundColor: project.creator.avatarGlow }}
                    >
                      {project.creator.name.charAt(0)}
                    </div>
                    <span className="text-[#F5F5FA] text-xs font-sans">{project.creator.name}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[#39D9FF] group-hover:translate-x-1 transition-transform">
                    <span>EXPLORE</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
