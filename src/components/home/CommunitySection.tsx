import React from 'react';
import { useNexus } from '../../context/NexusContext';
import { CREATORS_DATA } from '../../data/nexusData';
import { Users, ArrowUpRight, Check, Plus, Quote } from 'lucide-react';

export const CommunitySection: React.FC = () => {
  const { followingCreators, toggleFollowCreator, setCursorLabel, triggerNotification, navigate } = useNexus();

  const handleToggle = (id: string, name: string) => {
    toggleFollowCreator(id);
    const isNowFollowing = !followingCreators.includes(id);
    triggerNotification(
      isNowFollowing ? `Subscribed to ${name}'s world transmissions.` : `Unsubscribed from ${name}.`
    );
  };

  return (
    <section className="relative py-28 px-6 md:px-10 border-t border-white/[0.04]" aria-label="Community Section">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="font-mono text-xs text-[#9292A5] tracking-[0.25em] uppercase mb-3 flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-[#39D9FF]" />
              CREATOR GUILD & THINKERS
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-[#F5F5FA]">
              PEOPLE MAKE THE UNIVERSE.
            </h2>
          </div>
          <button
            onClick={() => navigate('/community')}
            onMouseEnter={() => setCursorLabel('ALL')}
            onMouseLeave={() => setCursorLabel(null)}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#39D9FF] hover:text-[#F5F5FA] group transition-colors self-start md:self-auto"
          >
            <span>Explore Creator Registry</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Editorial Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CREATORS_DATA.map((creator) => {
            const isFollowing = followingCreators.includes(creator.id);

            return (
              <div
                key={creator.id}
                id={`creator-card-${creator.id}`}
                className="group relative rounded-3xl bg-[#0A0A14]/70 backdrop-blur-md border border-[#7C5CFF]/20 hover:border-[#39D9FF]/50 p-8 transition-all duration-300 flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
              >
                {/* Background glow on hover */}
                <div
                  className="absolute top-0 right-0 w-44 h-44 rounded-full blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none"
                  style={{ backgroundColor: creator.avatarGlow }}
                />

                <div>
                  {/* Top Creator Identification Row */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-2xl bg-[#03030A] border flex items-center justify-center font-display font-bold text-xl text-[#F5F5FA] shadow-[0_0_20px_rgba(124,92,255,0.2)] group-hover:scale-105 transition-transform"
                        style={{ borderColor: creator.avatarGlow }}
                      >
                        {creator.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg text-[#F5F5FA] group-hover:text-[#39D9FF] transition-colors">
                          {creator.name}
                        </h3>
                        <div className="font-mono text-xs text-[#9292A5]">
                          {creator.handle}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggle(creator.id, creator.name)}
                      onMouseEnter={() => setCursorLabel(isFollowing ? 'UNFOLLOW' : 'CONNECT')}
                      onMouseLeave={() => setCursorLabel(null)}
                      className={`px-3 py-1.5 rounded-full font-mono text-[11px] tracking-wider transition-all flex items-center gap-1.5 ${
                        isFollowing
                          ? 'bg-[#39D9FF]/20 text-[#39D9FF] border border-[#39D9FF]/50'
                          : 'bg-[#121222] text-[#9292A5] hover:text-[#F5F5FA] border border-white/[0.08]'
                      }`}
                      aria-label={`${isFollowing ? 'Following' : 'Follow'} ${creator.name}`}
                    >
                      {isFollowing ? (
                        <>
                          <Check className="w-3 h-3 text-[#39D9FF]" />
                          <span>SYNAPSED</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" />
                          <span>RESONATE</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Role & Specialty */}
                  <div className="space-y-1 mb-4">
                    <div className="font-display text-sm font-semibold text-[#F5F5FA]/90">
                      {creator.role}
                    </div>
                    <div className="font-mono text-xs text-[#39D9FF]">
                      Focus // {creator.specialty}
                    </div>
                  </div>

                  {/* Editorial Quote */}
                  <div className="p-4 rounded-xl bg-[#03030A] border border-white/[0.04] mb-6">
                    <p className="font-sans text-xs text-[#9292A5] italic leading-relaxed">
                      “{creator.quote}”
                    </p>
                  </div>
                </div>

                {/* Bottom Stats & Specialty Tags */}
                <div className="space-y-4 pt-4 border-t border-white/[0.06]">
                  <div className="flex flex-wrap gap-1.5">
                    {creator.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md bg-[#121222] text-[10px] font-mono text-[#9292A5]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between font-mono text-[11px] text-[#9292A5]">
                    <span>{creator.projectsCount} WORLDS</span>
                    <span>{creator.followersCount} RESONATING</span>
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
