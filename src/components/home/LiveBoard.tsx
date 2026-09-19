import React, { useState, useEffect } from 'react';
import { useNexus } from '../../context/NexusContext';
import { LIVE_EVENTS_DATA } from '../../data/nexusData';
import { LiveEvent } from '../../types';
import { Radio, Plus, Send, Play, Pause, Activity, Sparkles, Filter } from 'lucide-react';

export const LiveBoard: React.FC = () => {
  const { setCursorLabel, triggerNotification } = useNexus();
  const [events, setEvents] = useState<LiveEvent[]>(LIVE_EVENTS_DATA);
  const [isPaused, setIsPaused] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [newIdeaText, setNewIdeaText] = useState('');
  const [isTransmitting, setIsTransmitting] = useState(false);

  // Simulated live event generation every few seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const types: LiveEvent['type'][] = ['LIVE', 'PROJECT', 'DISCOVERY', 'SYNTHESIS', 'TELEMETRY'];
      const chosenType = types[Math.floor(Math.random() * types.length)];
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

      const randomEvents: Partial<LiveEvent>[] = [
        {
          code: `LIVE / ${timeStr.slice(0, 5)}`,
          type: 'LIVE',
          title: 'New idea entering the network',
          subtitle: '“Adaptive crystalline facades harvesting quantum fluctuations”',
          tags: ['Nanotech', 'Architecture', 'Materials'],
          vector: `VECTOR [${(Math.random() * 90).toFixed(2)}, ${(Math.random() * 180).toFixed(2)}]`,
        },
        {
          code: `PROJECT / ${(Math.random() * 9).toFixed(2)}`,
          type: 'PROJECT',
          title: 'A new visual universe is being created',
          subtitle: '“Resonant Void: Hyperspatial soundscapes for deep space travel”',
          tags: ['Acoustics', 'Simulation', 'Void'],
          vector: `RENDER_CLUSTER #X_${Math.floor(Math.random() * 900 + 100)}`,
        },
        {
          code: 'DISCOVERY',
          type: 'DISCOVERY',
          title: 'A new connection has formed between',
          subtitle: 'BIOMIMICRY × HYPERBOLIC TOPOLOGY × BIO-LUMINESCENCE',
          tags: ['Mycology', 'Mathematics', 'Optics'],
          vector: `COHERENCE: ${(99 + Math.random() * 0.99).toFixed(2)}%`,
        },
      ];

      const template = randomEvents[Math.floor(Math.random() * randomEvents.length)];

      const newEvent: LiveEvent = {
        id: `live-${Date.now()}`,
        timestamp: timeStr,
        code: template.code || `LIVE / ${timeStr.slice(0, 5)}`,
        type: template.type || chosenType,
        title: template.title || 'Signal broadcast received',
        subtitle: template.subtitle,
        tags: template.tags,
        vector: template.vector || 'MESH_NODE #GLOBAL',
      };

      setEvents((prev) => [newEvent, ...prev.slice(0, 14)]);
    }, 6500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleInjectIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIdeaText.trim()) return;

    setIsTransmitting(true);
    setTimeout(() => {
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
      const userEvent: LiveEvent = {
        id: `user-live-${Date.now()}`,
        timestamp: `${timeStr}:${now.getSeconds().toString().padStart(2, '0')}`,
        code: `LIVE / ${timeStr}`,
        type: 'LIVE',
        title: 'New idea entering the network',
        subtitle: `“${newIdeaText.trim()}”`,
        tags: ['Pioneer Idea', 'Real-time', 'Global'],
        vector: 'LOCAL_TRANSMITTER // SYNCED',
      };

      setEvents((prev) => [userEvent, ...prev]);
      setNewIdeaText('');
      setIsTransmitting(false);
      triggerNotification('Your idea was broadcast to the global NEXUS intelligence stream.');
    }, 450);
  };

  const filteredEvents = events.filter((ev) => {
    if (activeFilter === 'ALL') return true;
    return ev.type === activeFilter;
  });

  return (
    <section className="relative py-24 px-6 md:px-10 border-t border-white/[0.04]" aria-label="Live Intelligence Board">
      <div className="max-w-7xl mx-auto">
        {/* Header with Live Ticker status */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="font-mono text-xs text-[#9292A5] tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#39D9FF] animate-pulse" />
              SYNAPTIC STREAM // REAL-TIME
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5FA]">
              THE NEXUS IS ALIVE.
            </h2>
          </div>

          {/* Controls: Pause/Play & Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsPaused(!isPaused)}
              onMouseEnter={() => setCursorLabel(isPaused ? 'RESUME' : 'PAUSE')}
              onMouseLeave={() => setCursorLabel(null)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A0A14] border border-[#7C5CFF]/30 font-mono text-xs text-[#9292A5] hover:text-[#F5F5FA] hover:border-[#39D9FF]/50 transition-colors"
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-[#39D9FF]" /> : <Pause className="w-3.5 h-3.5 text-[#7C5CFF]" />}
              <span>{isPaused ? 'STREAM PAUSED' : 'LIVE STREAM'}</span>
            </button>

            {['ALL', 'LIVE', 'PROJECT', 'DISCOVERY'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1 rounded-full font-mono text-[11px] transition-colors ${
                  activeFilter === cat
                    ? 'bg-[#7C5CFF]/30 text-[#39D9FF] border border-[#7C5CFF]/50'
                    : 'text-[#9292A5] hover:text-[#F5F5FA] border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Live Broadcast Submission Strip */}
        <form
          onSubmit={handleInjectIdea}
          className="mb-8 p-2 rounded-2xl bg-[#0A0A14]/80 backdrop-blur-md border border-[#7C5CFF]/25 flex items-center gap-3 shadow-[0_4px_25px_rgba(0,0,0,0.4)]"
        >
          <div className="pl-3 text-[#39D9FF] hidden sm:block">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <input
            type="text"
            value={newIdeaText}
            onChange={(e) => setNewIdeaText(e.target.value)}
            placeholder="Broadcast an idea into the network (e.g. 'Floating libraries woven from bio-acoustic glass')..."
            className="flex-1 bg-transparent px-3 py-2 text-sm text-[#F5F5FA] placeholder-[#9292A5]/60 focus:outline-none font-sans"
            disabled={isTransmitting}
          />
          <button
            type="submit"
            disabled={!newIdeaText.trim() || isTransmitting}
            onMouseEnter={() => setCursorLabel('TRANSMIT')}
            onMouseLeave={() => setCursorLabel(null)}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#39D9FF] text-[#03030A] font-mono text-xs font-bold tracking-wider flex items-center gap-2 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {isTransmitting ? (
              <span>TRANSMITTING...</span>
            ) : (
              <>
                <span>TRANSMIT</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Live Stream Ticker Feed */}
        <div className="space-y-3 font-mono">
          {filteredEvents.map((item, index) => {
            let badgeBg = 'bg-[#7C5CFF]/20 text-[#7C5CFF] border-[#7C5CFF]/40';
            if (item.type === 'LIVE') badgeBg = 'bg-[#39D9FF]/20 text-[#39D9FF] border-[#39D9FF]/40';
            if (item.type === 'DISCOVERY') badgeBg = 'bg-[#D85CFF]/20 text-[#D85CFF] border-[#D85CFF]/40';
            if (item.type === 'PROJECT') badgeBg = 'bg-[#00F5D4]/20 text-[#00F5D4] border-[#00F5D4]/40';

            return (
              <div
                key={item.id}
                className="group relative p-4 md:p-5 rounded-xl bg-[#0A0A14]/50 border border-white/[0.04] hover:border-[#7C5CFF]/30 hover:bg-[#0A0A14]/90 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4">
                  {/* Status Code badge */}
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${badgeBg}`}>
                      {item.code}
                    </span>
                    <span className="text-[10px] text-[#9292A5]/60 sm:hidden">
                      {item.timestamp}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <span className="text-xs text-[#9292A5] tracking-wider mr-2">{item.title}:</span>
                    <span className="text-sm font-sans font-medium text-[#F5F5FA] group-hover:text-[#39D9FF] transition-colors">
                      {item.subtitle}
                    </span>
                  </div>
                </div>

                {/* Right Metadata */}
                <div className="flex items-center gap-4 self-end md:self-auto text-[10px] text-[#9292A5]">
                  {item.tags && (
                    <div className="hidden lg:flex items-center gap-1.5">
                      {item.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/[0.03] text-[#9292A5]">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="hidden sm:inline-block text-[#9292A5]/70">{item.vector}</span>
                  <span className="text-[#39D9FF] font-semibold">{item.timestamp}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
