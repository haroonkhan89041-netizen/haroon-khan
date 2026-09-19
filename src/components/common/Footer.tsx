import React from 'react';
import { useNexus } from '../../context/NexusContext';
import { ArrowUpRight, Globe, Shield, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, setCursorLabel } = useNexus();

  const handleLinkClick = (route: string) => {
    navigate(route);
  };

  return (
    <footer className="relative border-t border-[#7C5CFF]/15 bg-[#03030A] pt-20 pb-12 overflow-hidden">
      {/* Subtle background ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#7C5CFF]/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#7C5CFF]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.05]">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 shrink-0 group/footer-logo">
                <span className="absolute -inset-2 rounded-full bg-[#7C5CFF]/10 blur-md opacity-70 group-hover/footer-logo:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                <img src="/nexus-logo.svg" alt="" aria-hidden="true" className="relative w-full h-full drop-shadow-[0_0_10px_rgba(124,92,255,0.3)] group-hover/footer-logo:drop-shadow-[0_0_15px_rgba(57,217,255,0.5)] transition-[filter] duration-500" />
              </div>
              <span className="font-display font-bold text-xl tracking-[0.25em] text-[#F5F5FA]">
                NEXUS
              </span>
            </div>
            <p className="font-display text-lg text-[#9292A5] max-w-sm leading-relaxed">
              “Ideas become worlds.”
            </p>
            <p className="font-sans text-xs text-[#9292A5]/70 max-w-sm leading-relaxed">
              A creative intelligence platform uniting human imagination, synthetic reasoning, non-Euclidean spatial computation, and collaborative worldbuilding.
            </p>
            <div className="pt-2 flex items-center gap-3 font-mono text-[11px] text-[#39D9FF]">
              <span className="w-2 h-2 rounded-full bg-[#39D9FF] animate-pulse" />
              <span>QUANTUM MESH ONLINE // 99.98% COHERENCE</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#F5F5FA]">Platform</h4>
            <ul className="space-y-2.5 font-sans text-sm text-[#9292A5]">
              {['Explore', 'Create', 'Discover', 'Intelligence', 'Community'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleLinkClick(`/${item.toLowerCase()}`)}
                    onMouseEnter={() => setCursorLabel('GO')}
                    onMouseLeave={() => setCursorLabel(null)}
                    className="hover:text-[#39D9FF] transition-colors focus:outline-none focus-visible:underline"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Protocol & Community */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#F5F5FA]">Dimensions</h4>
            <ul className="space-y-2.5 font-sans text-sm text-[#9292A5]">
              <li>
                <button onClick={() => handleLinkClick('/explore')} className="hover:text-[#39D9FF] transition-colors">
                  Spatial Engine
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/create')} className="hover:text-[#39D9FF] transition-colors">
                  Generative Lab
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/intelligence')} className="hover:text-[#39D9FF] transition-colors">
                  Neural Graph
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/community')} className="hover:text-[#39D9FF] transition-colors">
                  Creator Guild
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#F5F5FA]">Governance</h4>
            <ul className="space-y-2.5 font-sans text-sm text-[#9292A5]">
              <li>
                <span className="hover:text-[#F5F5FA] cursor-default transition-colors">About Protocol</span>
              </li>
              <li>
                <span className="hover:text-[#F5F5FA] cursor-default transition-colors">Neural Privacy Policy</span>
              </li>
              <li>
                <span className="hover:text-[#F5F5FA] cursor-default transition-colors">Synthesis Terms of Service</span>
              </li>
              <li>
                <span className="hover:text-[#F5F5FA] cursor-default transition-colors">Quantum Contact // 2026</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#9292A5]/60">
          <div>© 2026 NEXUS. All dimensions reserved.</div>
          <div className="flex items-center gap-6">
            <span>TERRA PRIME // 101.44°E</span>
            <span>LATENCY: 14MS</span>
            <span className="text-[#7C5CFF]">VER 6.4.0-ASTRA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
