import React, { useState } from 'react';
import { CommunitySection } from '../components/home/CommunitySection';
import { useNexus } from '../context/NexusContext';
import { Users, Sparkles, Send, Check } from 'lucide-react';

export const CommunityView: React.FC = () => {
  const { userSession, triggerNotification, setCursorLabel } = useNexus();
  const [handleInput, setHandleInput] = useState('');
  const [focusInput, setFocusInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleInput.trim()) return;
    setSubmitted(true);
    triggerNotification('Transmitted nomination to the Creator Guild Council.');
  };

  return (
    <div className="min-h-screen pt-28 pb-24">
      {/* Editorial Creator Showcase */}
      <CommunitySection />

      {/* Guild Application Section */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 mt-16 pt-16 border-t border-white/[0.06]">
        <div className="rounded-3xl bg-[#0A0A14] border border-[#7C5CFF]/30 p-8 md:p-12">
          <div className="font-mono text-xs text-[#39D9FF] tracking-widest uppercase mb-2">
            PIONEER NOMINATION
          </div>
          <h3 className="font-display font-bold text-3xl text-[#F5F5FA] mb-3">
            Join the Creator Guild
          </h3>
          <p className="font-sans text-sm text-[#9292A5] mb-8">
            Are you designing worlds at the edge of computation, architecture, or acoustic form? Connect your neural signature to the global collective.
          </p>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-[#121222] border border-[#00F5D4]/40 flex items-center gap-4 text-[#00F5D4] font-mono text-xs">
              <Check className="w-5 h-5" />
              <span>Nomination received for {handleInput}. Telemetry link verified.</span>
            </div>
          ) : (
            <form onSubmit={handleApply} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="guild-handle" className="block font-mono text-xs text-[#9292A5] mb-1.5">
                    TRANSMITTER HANDLE
                  </label>
                  <input
                    id="guild-handle"
                    type="text"
                    value={handleInput}
                    onChange={(e) => setHandleInput(e.target.value)}
                    placeholder="@your_alias"
                    className="w-full px-4 py-3 rounded-xl bg-[#03030A] border border-white/[0.08] text-sm text-[#F5F5FA] focus:outline-none focus:border-[#39D9FF]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="guild-specialty" className="block font-mono text-xs text-[#9292A5] mb-1.5">
                    PRIMARY SPECIALTY
                  </label>
                  <input
                    id="guild-specialty"
                    type="text"
                    value={focusInput}
                    onChange={(e) => setFocusInput(e.target.value)}
                    placeholder="e.g. Non-Euclidean Shaders, Spatial Audio"
                    className="w-full px-4 py-3 rounded-xl bg-[#03030A] border border-white/[0.08] text-sm text-[#F5F5FA] focus:outline-none focus:border-[#39D9FF]"
                  />
                </div>
              </div>

              <button
                type="submit"
                onMouseEnter={() => setCursorLabel('TRANSMIT')}
                onMouseLeave={() => setCursorLabel(null)}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#39D9FF] text-[#03030A] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-95 transition-opacity"
              >
                <span>Submit Guild Nomination</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
