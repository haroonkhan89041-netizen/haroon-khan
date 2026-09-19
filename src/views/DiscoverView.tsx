import React, { useState } from 'react';
import { useNexus } from '../context/NexusContext';
import { PROJECTS_DATA } from '../data/nexusData';
import { Category, Project } from '../types';
import { Sparkles, Search, ArrowUpRight, Filter, SlidersHorizontal } from 'lucide-react';

export const DiscoverView: React.FC = () => {
  const { openProject, setCursorLabel } = useNexus();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [sortBy, setSortBy] = useState<'resonance' | 'views' | 'recent'>('resonance');

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

  const filtered = PROJECTS_DATA.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.creator.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#9292A5] tracking-[0.25em] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#39D9FF]" />
            DISCOVERY INDEX // 2026
          </div>
          <h1 className="font-display font-bold text-5xl sm:text-7xl text-[#F5F5FA] tracking-tight mb-4">
            DISCOVER WHAT'S NEXT
          </h1>
          <p className="font-sans text-lg text-[#9292A5] leading-relaxed">
            Curated speculative realities, interactive algorithms, non-Euclidean architectures, and generative acoustic ecosystems.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 p-3 rounded-2xl bg-[#0A0A14] border border-[#7C5CFF]/20">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9292A5]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across titles, creators, tags, technologies..."
              className="w-full pl-11 pr-4 py-2.5 bg-transparent font-sans text-sm text-[#F5F5FA] placeholder-[#9292A5]/50 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto font-mono text-xs">
            <span className="text-[#9292A5]">SORT:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#121222] border border-white/[0.08] text-[#F5F5FA] px-3 py-1.5 rounded-lg focus:outline-none"
            >
              <option value="resonance">Resonance (Likes)</option>
              <option value="views">Spectral Views</option>
              <option value="recent">Chronological</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-[#7C5CFF] text-[#F5F5FA] font-bold shadow-[0_0_15px_rgba(124,92,255,0.4)]'
                  : 'bg-[#0A0A14] text-[#9292A5] border border-white/[0.06] hover:border-[#39D9FF]/40 hover:text-[#F5F5FA]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((proj) => (
              <div
                key={proj.id}
                onClick={() => openProject(proj.slug)}
                onMouseEnter={() => setCursorLabel('OPEN')}
                onMouseLeave={() => setCursorLabel(null)}
                className="group rounded-3xl bg-[#0A0A14] border border-[#7C5CFF]/20 hover:border-[#39D9FF]/60 p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[11px] mb-4">
                    <span className="text-[#39D9FF] uppercase tracking-wider font-semibold">
                      {proj.category}
                    </span>
                    <span className="text-[#9292A5]">{proj.date}</span>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-[#F5F5FA] group-hover:text-[#39D9FF] transition-colors mb-2">
                    {proj.title}
                  </h3>

                  <p className="font-sans text-xs text-[#9292A5] line-clamp-2 mb-6">
                    {proj.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs text-[#9292A5]">
                  <span>{proj.creator.name}</span>
                  <div className="flex items-center gap-1 text-[#39D9FF]">
                    <span>EXPLORE</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-16 rounded-3xl bg-[#0A0A14]/40 border border-dashed border-white/[0.08] text-center max-w-lg mx-auto">
            <h3 className="font-display font-bold text-xl text-[#F5F5FA] mb-2">
              Nothing has appeared here yet.
            </h3>
            <p className="font-sans text-sm text-[#9292A5]">
              No worlds matched the query “{searchQuery}”. Try adjusting your filters or synthesize a new universe in the Creative Lab.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
