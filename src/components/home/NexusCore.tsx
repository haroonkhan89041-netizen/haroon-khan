import React, { useRef, useEffect, useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { Activity, Disc, Zap, Radio } from 'lucide-react';

type CoreMode = 'HARMONIC' | 'QUANTUM' | 'SYNTHESIS' | 'NEURAL';

export const NexusCore: React.FC = () => {
  const { setCursorLabel, reducedMotion } = useNexus();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeMode, setActiveMode] = useState<CoreMode>('HARMONIC');
  const [pulseCount, setPulseCount] = useState(0);

  // Mouse tilt state
  const mouseRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    isHovered: false,
  });

  const shockwavesRef = useRef<Array<{ radius: number; maxRadius: number; alpha: number; color: string }>>([]);

  const handlePulse = () => {
    setPulseCount((c) => c + 1);
    const colors = {
      HARMONIC: 'rgba(124, 92, 255, 0.8)',
      QUANTUM: 'rgba(57, 217, 255, 0.8)',
      SYNTHESIS: 'rgba(216, 92, 255, 0.8)',
      NEURAL: 'rgba(0, 245, 212, 0.8)',
    };
    shockwavesRef.current.push({
      radius: 40,
      maxRadius: 280,
      alpha: 0.9,
      color: colors[activeMode],
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Satellites orbiting around the core
    const satellites = Array.from({ length: 9 }).map((_, i) => ({
      orbitRadius: 100 + i * 22,
      orbitSpeed: (0.008 + (i % 3) * 0.005) * (i % 2 === 0 ? 1 : -1),
      angle: (i * Math.PI * 2) / 9,
      inclination: (i * Math.PI) / 6 - Math.PI / 4,
      size: 2 + (i % 3) * 1.5,
      hueOffset: i * 35,
    }));

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Mouse lerp
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.06;
      m.y += (m.targetY - m.y) * 0.06;

      const tiltX = m.x * 24;
      const tiltY = m.y * 24;

      // Mode configuration
      let primaryColor = '124, 92, 255';
      let secondaryColor = '57, 217, 255';
      if (activeMode === 'QUANTUM') {
        primaryColor = '57, 217, 255';
        secondaryColor = '0, 245, 212';
      } else if (activeMode === 'SYNTHESIS') {
        primaryColor = '216, 92, 255';
        secondaryColor = '124, 92, 255';
      } else if (activeMode === 'NEURAL') {
        primaryColor = '0, 245, 212';
        secondaryColor = '57, 217, 255';
      }

      // Draw outer ambient glow
      const glowGrad = ctx.createRadialGradient(
        centerX + tiltX,
        centerY + tiltY,
        20,
        centerX,
        centerY,
        260
      );
      glowGrad.addColorStop(0, `rgba(${primaryColor}, ${m.isHovered ? 0.35 : 0.22})`);
      glowGrad.addColorStop(0.5, `rgba(${secondaryColor}, ${m.isHovered ? 0.15 : 0.08})`);
      glowGrad.addColorStop(1, 'rgba(3, 3, 10, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 260, 0, Math.PI * 2);
      ctx.fill();

      // Draw shockwaves
      for (let i = shockwavesRef.current.length - 1; i >= 0; i--) {
        const sw = shockwavesRef.current[i];
        sw.radius += 4.5;
        sw.alpha *= 0.95;

        ctx.beginPath();
        ctx.arc(centerX + tiltX, centerY + tiltY, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = sw.color.replace('0.8', `${sw.alpha}`);
        ctx.lineWidth = 2.5;
        ctx.stroke();

        if (sw.radius >= sw.maxRadius || sw.alpha < 0.02) {
          shockwavesRef.current.splice(i, 1);
        }
      }

      // Draw layered elliptical orbital rings with perspective tilt
      const ringConfigs = [
        { rx: 190, ry: 70, angle: time * 0.4 + m.x * 0.5, alpha: 0.3, width: 1.2 },
        { rx: 160, ry: 90, angle: -time * 0.3 + m.y * 0.5, alpha: 0.4, width: 1.5 },
        { rx: 220, ry: 50, angle: time * 0.2 + 0.8, alpha: 0.25, width: 1.0 },
        { rx: 130, ry: 110, angle: -time * 0.5 + 1.2, alpha: 0.35, width: 1.4 },
      ];

      ringConfigs.forEach((ring) => {
        ctx.save();
        ctx.translate(centerX + tiltX * 0.5, centerY + tiltY * 0.5);
        ctx.rotate(ring.angle);

        ctx.beginPath();
        ctx.ellipse(0, 0, ring.rx, ring.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${primaryColor}, ${ring.alpha})`;
        ctx.lineWidth = ring.width;
        ctx.setLineDash([8, 14]);
        ctx.stroke();

        // Counter-rotating accent tick
        const tickAngle = time * 2;
        const tx = Math.cos(tickAngle) * ring.rx;
        const ty = Math.sin(tickAngle) * ring.ry;
        ctx.beginPath();
        ctx.arc(tx, ty, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${secondaryColor}, 0.9)`;
        ctx.fill();

        ctx.restore();
      });

      // Draw orbiting satellites & energy lines
      satellites.forEach((sat) => {
        sat.angle += sat.orbitSpeed;
        const x = centerX + Math.cos(sat.angle) * sat.orbitRadius + tiltX;
        const y = centerY + Math.sin(sat.angle) * (sat.orbitRadius * 0.45) + tiltY;

        // Energy beam connecting satellite to core
        ctx.beginPath();
        ctx.moveTo(centerX + tiltX, centerY + tiltY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(${secondaryColor}, 0.08)`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Satellite point
        ctx.beginPath();
        ctx.arc(x, y, sat.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${secondaryColor}, 0.85)`;
        ctx.shadowColor = `rgba(${secondaryColor}, 1)`;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Core living sphere
      const coreRadius = 55 + Math.sin(time * 3) * 3 + (m.isHovered ? 8 : 0);

      // Inner refractive core gradient
      const coreGrad = ctx.createRadialGradient(
        centerX + tiltX - coreRadius * 0.3,
        centerY + tiltY - coreRadius * 0.3,
        4,
        centerX + tiltX,
        centerY + tiltY,
        coreRadius
      );
      coreGrad.addColorStop(0, '#FFFFFF');
      coreGrad.addColorStop(0.2, `rgba(${secondaryColor}, 0.95)`);
      coreGrad.addColorStop(0.65, `rgba(${primaryColor}, 0.8)`);
      coreGrad.addColorStop(1, 'rgba(10, 10, 20, 0.9)');

      ctx.beginPath();
      ctx.arc(centerX + tiltX, centerY + tiltY, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.shadowColor = `rgba(${primaryColor}, 0.9)`;
      ctx.shadowBlur = 30;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Surface energy lattice rings
      for (let j = 0; j < 3; j++) {
        ctx.save();
        ctx.translate(centerX + tiltX, centerY + tiltY);
        ctx.rotate(time * (1 + j * 0.5) * (j % 2 === 0 ? 1 : -1));
        ctx.beginPath();
        ctx.ellipse(0, 0, coreRadius * 0.95, coreRadius * 0.35, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.35 - j * 0.08})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.stroke();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeMode]);

  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseRef.current.targetX = nx * 2;
    mouseRef.current.targetY = ny * 2;
    mouseRef.current.isHovered = true;
  };

  const handleContainerMouseLeave = () => {
    mouseRef.current.targetX = 0;
    mouseRef.current.targetY = 0;
    mouseRef.current.isHovered = false;
    setCursorLabel(null);
  };

  return (
    <section className="relative py-16 px-6 md:px-10 overflow-hidden" aria-label="Interactive NEXUS Core">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Core Eyebrow & Status */}
        <div className="flex items-center gap-3 mb-4 font-mono text-[11px] text-[#9292A5] tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-[#7C5CFF] animate-ping" />
          <span>LIVING COMPUTATIONAL NUCLEUS // LEVEL 0</span>
        </div>

        <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight text-center text-[#F5F5FA] mb-2">
          THE NEXUS CORE
        </h2>
        <p className="font-sans text-sm md:text-base text-[#9292A5] max-w-xl text-center mb-8">
          A living digital singularity orchestrating spatial geometries, neural synthesis, and multidimensional ideation in real-time.
        </p>

        {/* Interactive Mode Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 p-1.5 rounded-full bg-[#0A0A14]/80 backdrop-blur-md border border-[#7C5CFF]/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          {(['HARMONIC', 'QUANTUM', 'SYNTHESIS', 'NEURAL'] as CoreMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveMode(mode)}
              onMouseEnter={() => setCursorLabel('TUNE')}
              onMouseLeave={() => setCursorLabel(null)}
              className={`px-4 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#39D9FF] ${
                activeMode === mode
                  ? 'bg-gradient-to-r from-[#7C5CFF] to-[#39D9FF] text-[#03030A] font-bold shadow-[0_0_15px_rgba(124,92,255,0.4)]'
                  : 'text-[#9292A5] hover:text-[#F5F5FA] hover:bg-white/[0.04]'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Core Canvas Interactive Stage */}
        <div
          ref={containerRef}
          onMouseMove={handleContainerMouseMove}
          onMouseEnter={() => setCursorLabel('INTERACT')}
          onMouseLeave={handleContainerMouseLeave}
          onClick={handlePulse}
          className="relative w-full max-w-3xl h-[420px] md:h-[500px] flex items-center justify-center rounded-3xl border border-[#7C5CFF]/15 bg-[#0A0A14]/40 backdrop-blur-sm cursor-pointer overflow-hidden group shadow-[inset_0_0_80px_rgba(124,92,255,0.06)]"
        >
          {/* Subtle grid backdrop inside core vessel */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, #7C5CFF 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />

          <canvas ref={canvasRef} className="w-full h-full relative z-10" />

          {/* Interactive instruction tooltip */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#03030A]/80 border border-[#7C5CFF]/30 font-mono text-[11px] text-[#9292A5] tracking-wider pointer-events-none transition-opacity duration-300 group-hover:border-[#39D9FF]">
            <Radio className="w-3.5 h-3.5 text-[#39D9FF] animate-pulse" />
            <span>Click core to emit harmonic shockwave ({pulseCount})</span>
          </div>

          {/* Telemetry Corner Badges */}
          <div className="absolute top-4 left-5 z-20 font-mono text-[10px] text-[#9292A5]/70 flex flex-col gap-1">
            <span className="text-[#39D9FF] font-semibold">RESONANCE FREQ: 432.8 Hz</span>
            <span>COHERENCE: 99.98%</span>
          </div>
          <div className="absolute top-4 right-5 z-20 font-mono text-[10px] text-[#9292A5]/70 flex flex-col items-end gap-1">
            <span className="text-[#D85CFF] font-semibold">TENSOR FLUX: 14.8 T</span>
            <span>TOPOLOGY: POINCARÉ 4D</span>
          </div>
        </div>
      </div>
    </section>
  );
};
