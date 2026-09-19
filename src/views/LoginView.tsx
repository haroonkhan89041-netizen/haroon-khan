import React, { useState } from 'react';
import { useNexus } from '../context/NexusContext';
import { Shield, Key, ArrowRight, Check, Terminal, Radio, LogOut } from 'lucide-react';

export const LoginView: React.FC = () => {
  const { userSession, loginUser, logoutUser, navigate, setCursorLabel } = useNexus();
  const [handle, setHandle] = useState('@pioneer_explorer');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      loginUser(handle.startsWith('@') ? handle : `@${handle}`);
      setIsAuthenticating(false);
      navigate('/create');
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-28 relative overflow-hidden">
      {/* Background lens glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#7C5CFF]/10 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-md w-full p-8 md:p-10 rounded-3xl bg-[#0A0A14]/90 backdrop-blur-2xl border border-[#7C5CFF]/30 shadow-[0_10px_50px_rgba(0,0,0,0.7)]">
        {userSession ? (
          /* Already Signed In */
          <div className="text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#03030A] border border-[#39D9FF]/50 mx-auto flex items-center justify-center text-[#39D9FF] shadow-[0_0_25px_rgba(57,217,255,0.3)]">
              <Shield className="w-8 h-8" />
            </div>

            <div>
              <div className="font-mono text-xs text-[#39D9FF] tracking-widest uppercase mb-1">
                IDENTITY SYNCHRONIZED
              </div>
              <h2 className="font-display font-bold text-3xl text-[#F5F5FA]">
                {userSession.handle}
              </h2>
              <p className="font-sans text-xs text-[#9292A5] mt-1">
                Role: {userSession.role} // Passkey: {userSession.quantumId}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#03030A] border border-white/[0.06] font-mono text-xs text-left space-y-2 text-[#9292A5]">
              <div className="flex justify-between">
                <span>STATUS:</span>
                <span className="text-[#00F5D4]">ACTIVE NODE</span>
              </div>
              <div className="flex justify-between">
                <span>ENCRYPTION:</span>
                <span className="text-[#F5F5FA]">QUANTUM 4096-BIT</span>
              </div>
              <div className="flex justify-between">
                <span>RESONANCE:</span>
                <span className="text-[#39D9FF]">99.98%</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={() => navigate('/create')}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#39D9FF] text-[#03030A] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Enter Generative Lab</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={logoutUser}
                className="w-full py-3 rounded-xl bg-[#121222] border border-white/[0.08] text-xs font-mono text-[#FF5C8D] hover:bg-[#FF5C8D]/10 flex items-center justify-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Disconnect Neural Session</span>
              </button>
            </div>
          </div>
        ) : (
          /* Sign In Form */
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#03030A] border border-[#7C5CFF]/40 mx-auto flex items-center justify-center text-[#7C5CFF] mb-4 shadow-[0_0_20px_rgba(124,92,255,0.2)]">
                <Key className="w-6 h-6 text-[#39D9FF]" />
              </div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-[#F5F5FA]">
                Enter NEXUS
              </h2>
              <p className="font-sans text-xs text-[#9292A5] mt-1">
                Synchronize your neural identity with the creative network.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="login-handle" className="block font-mono text-xs text-[#9292A5] mb-1.5 uppercase tracking-wider">
                  TRANSMITTER ALIAS
                </label>
                <input
                  id="login-handle"
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="@your_alias"
                  className="w-full px-4 py-3 rounded-xl bg-[#03030A] border border-[#7C5CFF]/30 text-sm text-[#F5F5FA] focus:outline-none focus:border-[#39D9FF]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isAuthenticating}
                onMouseEnter={() => setCursorLabel('CONNECT')}
                onMouseLeave={() => setCursorLabel(null)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#39D9FF] text-[#03030A] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(124,92,255,0.4)] hover:opacity-95 disabled:opacity-50 transition-all"
              >
                {isAuthenticating ? (
                  <span>SYNCHRONIZING HARMONICS…</span>
                ) : (
                  <>
                    <span>Link Quantum Signature</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-4 border-t border-white/[0.06] text-center">
              <button
                onClick={() => {
                  loginUser('@guest_explorer');
                  navigate('/explore');
                }}
                className="font-mono text-xs text-[#9292A5] hover:text-[#39D9FF] transition-colors"
              >
                Enter as anonymous observer →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
