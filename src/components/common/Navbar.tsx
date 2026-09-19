import React, { useState, useEffect } from 'react';
import { useNexus } from '../../context/NexusContext';
import { MagneticButton } from './MagneticButton';
import { Sparkles, Menu, X, ArrowUpRight, Compass, Cpu, Palette, Users, Shield, Terminal } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentRoute, navigate, userSession, setCursorLabel } = useNexus();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Explore', route: '/explore', icon: Compass },
    { label: 'Create', route: '/create', icon: Palette },
    { label: 'Discover', route: '/discover', icon: Sparkles },
    { label: 'Intelligence', route: '/intelligence', icon: Cpu },
    { label: 'Community', route: '/community', icon: Users },
  ];

  const handleNavigate = (route: string) => {
    navigate(route);
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'py-3.5 bg-[#03030A]/85 backdrop-blur-xl border-b border-[#7C5CFF]/15 shadow-[0_10px_30px_rgba(3,3,10,0.8)]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <button
            id="nav-logo"
            onClick={() => handleNavigate('/')}
            onMouseEnter={() => setCursorLabel('HOME')}
            onMouseLeave={() => setCursorLabel(null)}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39D9FF] rounded-lg p-1"
            aria-label="NEXUS Home"
          >
            <div className="relative w-9 h-9 shrink-0 transition-transform duration-500 group-hover:scale-105">
              <img src="/nexus-logo.svg" alt="" aria-hidden="true" className="w-full h-full" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-lg tracking-[0.25em] text-[#F5F5FA] group-hover:text-[#39D9FF] transition-colors">
                NEXUS
              </span>
              <span className="font-mono text-[9px] text-[#9292A5] tracking-widest hidden sm:inline-block">
                SYSTEM // 2026
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-[#0A0A14]/70 backdrop-blur-md border border-[#7C5CFF]/20 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  id={`nav-link-${link.label.toLowerCase()}`}
                  onClick={() => handleNavigate(link.route)}
                  onMouseEnter={() => setCursorLabel(link.label.toUpperCase())}
                  onMouseLeave={() => setCursorLabel(null)}
                  className={`relative px-4 py-2 rounded-full font-mono text-xs tracking-wider transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#39D9FF] ${
                    isActive
                      ? 'text-[#F5F5FA] bg-[#7C5CFF]/20 shadow-[0_0_15px_rgba(124,92,255,0.3)] border border-[#7C5CFF]/40'
                      : 'text-[#9292A5] hover:text-[#F5F5FA] hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#39D9FF]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {userSession ? (
              <button
                id="nav-user-session"
                onClick={() => handleNavigate('/login')}
                onMouseEnter={() => setCursorLabel('IDENTITY')}
                onMouseLeave={() => setCursorLabel(null)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A0A14] border border-[#39D9FF]/40 text-xs font-mono text-[#39D9FF] hover:bg-[#39D9FF]/10 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-[#39D9FF] animate-pulse" />
                <span>{userSession.handle}</span>
              </button>
            ) : (
              <button
                id="nav-signin"
                onClick={() => handleNavigate('/login')}
                onMouseEnter={() => setCursorLabel('AUTH')}
                onMouseLeave={() => setCursorLabel(null)}
                className="font-mono text-xs text-[#9292A5] hover:text-[#F5F5FA] px-3 py-1.5 tracking-wider transition-colors"
              >
                Sign In
              </button>
            )}

            <MagneticButton
              id="nav-enter-cta"
              variant="primary"
              cursorLabel="ENTER"
              onClick={() => handleNavigate('/create')}
            >
              Enter NEXUS
              <ArrowUpRight className="w-3.5 h-3.5" />
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2.5 rounded-lg bg-[#0A0A14] border border-[#7C5CFF]/30 text-[#F5F5FA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39D9FF]"
              aria-label={mobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5 text-[#39D9FF]" /> : <Menu className="w-5 h-5 text-[#F5F5FA]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Bespoke Mobile Navigation Experience */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="fixed inset-0 z-30 lg:hidden bg-[#03030A]/95 backdrop-blur-2xl pt-24 pb-8 px-6 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200"
        >
          <div className="space-y-6">
            <div className="pb-4 border-b border-[#7C5CFF]/20 flex items-center justify-between">
              <span className="font-mono text-xs text-[#9292A5] tracking-widest">
                SYSTEM SECTORS
              </span>
              <span className="font-mono text-[10px] text-[#39D9FF] px-2 py-0.5 rounded bg-[#39D9FF]/10 border border-[#39D9FF]/30">
                ACTIVE
              </span>
            </div>

            <nav className="flex flex-col gap-2">
              {navLinks.map((link, idx) => {
                const Icon = link.icon;
                const isActive = currentRoute === link.route;
                return (
                  <button
                    key={link.route}
                    onClick={() => handleNavigate(link.route)}
                    className={`flex items-center justify-between p-4 rounded-xl text-left font-display text-lg tracking-wide transition-all ${
                      isActive
                        ? 'bg-[#7C5CFF]/20 text-[#39D9FF] border border-[#7C5CFF]/40'
                        : 'bg-[#0A0A14]/60 text-[#F5F5FA] border border-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isActive ? 'bg-[#39D9FF]/20 text-[#39D9FF]' : 'bg-[#121222] text-[#9292A5]'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold">{link.label}</div>
                        <div className="font-mono text-[11px] text-[#9292A5]">0{idx + 1} — DIMENSION</div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 opacity-60" />
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="space-y-3 pt-6 border-t border-[#7C5CFF]/20">
            <button
              onClick={() => handleNavigate('/login')}
              className="w-full py-3.5 rounded-xl bg-[#0A0A14] border border-[#7C5CFF]/40 text-[#F5F5FA] font-mono text-xs tracking-wider flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-[#39D9FF]" />
              {userSession ? `Profile: ${userSession.handle}` : 'Sign In / Identity Link'}
            </button>

            <button
              onClick={() => handleNavigate('/create')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#39D9FF] text-[#03030A] font-display font-bold tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(124,92,255,0.4)]"
            >
              Enter NEXUS
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
