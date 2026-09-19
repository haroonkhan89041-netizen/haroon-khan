import React, { useState, useRef, useEffect } from 'react';
import { useNexus } from '../../context/NexusContext';
import { WORLD_DIMENSIONS } from '../../data/nexusData';
import { ArrowUpRight, Sparkles, Brain, Eye, Share2 } from 'lucide-react';

export const ExploreSection: React.FC = () => {
  const { navigate, setCursorLabel, reducedMotion } = useNexus();
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeDimension = WORLD_DIMENSIONS[activeIdx];

  // Dynamic canvas preview generator for active world
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      time += 0.025;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      if (activeIdx === 0) {
        // CREATE: Dynamic materializing 3D wireframe cube / crystalline polyhedra
        const size = Math.min(width, height) * 0.28;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(time * 0.4);

        const points = [
          [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
          [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
        ];

        // 3D projection
        const projected = points.map(([px, py, pz]) => {
          const rotY = px * Math.cos(time) - pz * Math.sin(time);
          const rotZ = px * Math.sin(time) + pz * Math.cos(time);
          const rotX = py * Math.cos(time * 0.7) - rotZ * Math.sin(time * 0.7);
          const depth = rotX * Math.sin(time * 0.7) + rotZ * Math.cos(time * 0.7) + 3;
          return {
            x: (rotY / depth) * size * 2.2,
            y: (rotX / depth) * size * 2.2,
          };
        });

        const edges = [
          [0,1],[1,2],[2,3],[3,0],
          [4,5],[5,6],[6,7],[7,4],
          [0,4],[1,5],[2,6],[3,7]
        ];

        ctx.strokeStyle = '#7C5CFF';
        ctx.lineWidth = 1.6;
        edges.forEach(([i1, i2]) => {
          ctx.beginPath();
          ctx.moveTo(projected[i1].x, projected[i1].y);
          ctx.lineTo(projected[i2].x, projected[i2].y);
          ctx.stroke();
        });

        // Vertex sparks
        projected.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#39D9FF';
          ctx.shadowColor = '#39D9FF';
          ctx.shadowBlur = 8;
          ctx.fill();
        });
        ctx.restore();

      } else if (activeIdx === 1) {
        // THINK: Emergent neural network / synaptic cluster
        const nodesCount = 14;
        const nodes = Array.from({ length: nodesCount }).map((_, i) => {
          const angle = (i * Math.PI * 2) / nodesCount + time * 0.2;
          const r = 60 + Math.sin(time * 1.5 + i) * 35;
          return {
            x: cx + Math.cos(angle) * r,
            y: cy + Math.sin(angle) * r,
          };
        });

        // Center hub
        ctx.beginPath();
        ctx.arc(cx, cy, 12, 0, Math.PI * 2);
        ctx.fillStyle = '#39D9FF';
        ctx.shadowColor = '#39D9FF';
        ctx.shadowBlur = 15;
        ctx.fill();

        // Synaptic connections
        for (let i = 0; i < nodes.length; i++) {
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(nodes[i].x, nodes[i].y);
          ctx.strokeStyle = 'rgba(57, 217, 255, 0.4)';
          ctx.lineWidth = 1.2;
          ctx.stroke();

          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            if (dx * dx + dy * dy < 8000) {
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.strokeStyle = 'rgba(124, 92, 255, 0.3)';
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }

          ctx.beginPath();
          ctx.arc(nodes[i].x, nodes[i].y, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#D85CFF';
          ctx.fill();
        }

      } else if (activeIdx === 2) {
        // VISUALIZE: Optical prism dispersion & chromatic spectrum ribbons
        const bands = 12;
        for (let b = 0; b < bands; b++) {
          ctx.beginPath();
          ctx.moveTo(cx - 140, cy);
          for (let x = -140; x <= 140; x += 10) {
            const y = Math.sin((x * 0.03) + time * 2 + (b * 0.3)) * (20 + b * 2);
            ctx.lineTo(cx + x, cy + y);
          }
          ctx.strokeStyle = `hsla(${280 + b * 15}, 85%, 65%, 0.55)`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

      } else {
        // CONNECT: Interconnected planetary orbital mesh
        const rings = 4;
        for (let r = 1; r <= rings; r++) {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(time * (0.3 / r) * (r % 2 === 0 ? 1 : -1));
          ctx.beginPath();
          ctx.ellipse(0, 0, r * 38, r * 22, 0, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(0, 245, 212, 0.4)';
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // node along ring
          const rx = Math.cos(time * 2 + r) * (r * 38);
          const ry = Math.sin(time * 2 + r) * (r * 22);
          ctx.beginPath();
          ctx.arc(rx, ry, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#00F5D4';
          ctx.shadowColor = '#00F5D4';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeIdx]);

  return (
    <section className="relative py-28 px-6 md:px-10 border-t border-white/[0.04] overflow-hidden" aria-label="Explore The Unknown">
      {/* Dynamic ambient color glow responding to hovered world */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 pointer-events-none transition-all duration-700 -z-10"
        style={{ backgroundColor: activeDimension.accentColor }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="font-mono text-xs text-[#9292A5] tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#39D9FF]" />
              DIMENSIONAL MATRIX
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-[#F5F5FA]">
              EXPLORE THE UNKNOWN
            </h2>
          </div>
          <button
            onClick={() => navigate('/explore')}
            onMouseEnter={() => setCursorLabel('EXPLORE')}
            onMouseLeave={() => setCursorLabel(null)}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#39D9FF] hover:text-[#F5F5FA] group transition-colors self-start md:self-auto"
          >
            <span>Enter Dimensional Atlas</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Interactive 4-Worlds Split Architecture (Not 4 boring cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive World Index Accordion */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
            {WORLD_DIMENSIONS.map((world, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={world.id}
                  id={`world-selector-${world.id}`}
                  onMouseEnter={() => {
                    setActiveIdx(idx);
                    setCursorLabel(world.title);
                  }}
                  onMouseLeave={() => setCursorLabel(null)}
                  onClick={() => {
                    setActiveIdx(idx);
                    navigate(`/explore?sector=${world.id}`);
                  }}
                  className={`group relative p-6 md:p-8 rounded-2xl transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? 'bg-[#0A0A14] border-[#7C5CFF]/50 shadow-[0_0_35px_rgba(124,92,255,0.15)]'
                      : 'bg-[#0A0A14]/30 border-white/[0.04] hover:border-white/[0.12] hover:bg-[#0A0A14]/60'
                  }`}
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <div className="flex items-center gap-4">
                      <span
                        className="font-mono text-sm tracking-widest font-bold transition-colors"
                        style={{ color: isActive ? world.accentColor : '#9292A5' }}
                      >
                        {world.number} —
                      </span>
                      <h3
                        className={`font-display text-2xl md:text-3xl font-bold tracking-tight transition-transform duration-300 ${
                          isActive ? 'text-[#F5F5FA] translate-x-1' : 'text-[#9292A5] group-hover:text-[#F5F5FA]'
                        }`}
                      >
                        {world.title}
                      </h3>
                    </div>

                    <ArrowUpRight
                      className={`w-5 h-5 transition-all duration-300 ${
                        isActive
                          ? 'opacity-100 translate-x-0 text-[#39D9FF]'
                          : 'opacity-0 -translate-x-2 text-[#9292A5] group-hover:opacity-100 group-hover:translate-x-0'
                      }`}
                    />
                  </div>

                  <p className="font-display text-base md:text-lg text-[#F5F5FA]/90 mb-3 font-medium">
                    {world.subtitle}
                  </p>

                  <p
                    className={`font-sans text-sm text-[#9292A5] leading-relaxed transition-all duration-300 ${
                      isActive ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0 overflow-hidden md:max-h-12 md:opacity-60'
                    }`}
                  >
                    {world.summary}
                  </p>

                  {/* Capabilities tags */}
                  {isActive && (
                    <div className="mt-4 pt-4 border-t border-white/[0.06] flex flex-wrap gap-2 animate-in fade-in duration-300">
                      {world.capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#121222] text-[#39D9FF] border border-[#39D9FF]/20"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Living Dimensional Preview Viewport */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center p-8 rounded-3xl bg-[#0A0A14]/80 backdrop-blur-md border border-[#7C5CFF]/20 min-h-[420px] overflow-hidden">
            {/* Viewport Top Metadata */}
            <div className="w-full flex items-center justify-between font-mono text-[11px] text-[#9292A5] border-b border-white/[0.06] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full animate-ping"
                  style={{ backgroundColor: activeDimension.accentColor }}
                />
                <span className="text-[#F5F5FA] font-semibold">SECTOR {activeDimension.number}</span>
              </div>
              <span className="tracking-wider text-[#39D9FF]">SYNTHESIS ACTIVE</span>
            </div>

            {/* Canvas stage */}
            <div className="relative w-full h-64 flex items-center justify-center">
              <canvas ref={canvasRef} className="w-full h-full" />
            </div>

            {/* Viewport Bottom Spec & Callout */}
            <div className="w-full mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <div className="font-mono text-xs text-[#9292A5]">
                {activeDimension.interactionPrompt}
              </div>
              <button
                onClick={() => navigate(`/explore?sector=${activeDimension.id}`)}
                className="p-2 rounded-full bg-[#121222] border border-[#7C5CFF]/30 text-[#39D9FF] hover:bg-[#7C5CFF] hover:text-[#03030A] transition-colors"
                aria-label={`Enter dimension ${activeDimension.title}`}
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
