import React, { useState, useRef, useEffect } from 'react';
import { useNexus } from '../../context/NexusContext';
import { INTELLIGENCE_NODES } from '../../data/nexusData';
import { IntelligenceNode } from '../../types';
import { Cpu, Zap, Radio, Sparkles, Layers, Info } from 'lucide-react';

export const IntelligenceGraph: React.FC = () => {
  const { setCursorLabel } = useNexus();
  const [selectedNode, setSelectedNode] = useState<IntelligenceNode>(INTELLIGENCE_NODES[0]);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animated signal pulses traveling along connection edges
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Prepare node absolute coordinates
    const nodeCoords = new Map<string, { x: number; y: number }>();
    INTELLIGENCE_NODES.forEach((n) => {
      nodeCoords.set(n.id, {
        x: (n.x / 100) * width,
        y: (n.y / 100) * height,
      });
    });

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Re-evaluate node coords on dimension changes
      INTELLIGENCE_NODES.forEach((n) => {
        nodeCoords.set(n.id, {
          x: (n.x / 100) * width,
          y: (n.y / 100) * height,
        });
      });

      // Draw lines and animated signal packets
      INTELLIGENCE_NODES.forEach((node) => {
        const p1 = nodeCoords.get(node.id);
        if (!p1) return;

        node.connectedIds.forEach((targetId) => {
          const p2 = nodeCoords.get(targetId);
          if (!p2) return;

          const isConnectedToSelected =
            selectedNode.id === node.id || selectedNode.id === targetId;

          // Draw base filament line
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = isConnectedToSelected
            ? 'rgba(57, 217, 255, 0.45)'
            : 'rgba(124, 92, 255, 0.16)';
          ctx.lineWidth = isConnectedToSelected ? 1.8 : 0.9;
          ctx.stroke();

          // Animated energy pulse traveling along the line
          const pulseProgress = (time * 0.8 + (p1.x + p2.y) * 0.005) % 1;
          const px = p1.x + (p2.x - p1.x) * pulseProgress;
          const py = p1.y + (p2.y - p1.y) * pulseProgress;

          ctx.beginPath();
          ctx.arc(px, py, isConnectedToSelected ? 2.8 : 1.8, 0, Math.PI * 2);
          ctx.fillStyle = isConnectedToSelected ? '#39D9FF' : '#7C5CFF';
          ctx.shadowColor = '#39D9FF';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedNode]);

  return (
    <section className="relative py-28 px-6 md:px-10 border-t border-white/[0.04] overflow-hidden" aria-label="Intelligence Section">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#7C5CFF]/8 blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#9292A5] tracking-[0.25em] uppercase mb-4">
            <Cpu className="w-3.5 h-3.5 text-[#39D9FF]" />
            CONVERGENT ARCHITECTURE
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-[#F5F5FA] mb-4">
            INTELLIGENCE WITHOUT LIMITS.
          </h2>
          <p className="font-sans text-base text-[#9292A5] leading-relaxed">
            NEXUS does not treat artificial cognition as a replacement for human expression, but as an expansive harmonic amplifier connecting all creative faculties.
          </p>
        </div>

        {/* The Animated Node Network Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Canvas Interactive Diagram */}
          <div className="lg:col-span-8 relative w-full h-[480px] md:h-[580px] rounded-3xl bg-[#0A0A14]/70 backdrop-blur-md border border-[#7C5CFF]/20 overflow-hidden flex items-center justify-center shadow-[inset_0_0_80px_rgba(124,92,255,0.06)]">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

            {/* Clickable Node Buttons positioned over canvas */}
            {INTELLIGENCE_NODES.map((node) => {
              const isSelected = selectedNode.id === node.id;
              const isHovered = hoveredNodeId === node.id;

              return (
                <button
                  key={node.id}
                  id={`intel-node-${node.id}`}
                  onClick={() => setSelectedNode(node)}
                  onMouseEnter={() => {
                    setHoveredNodeId(node.id);
                    setCursorLabel('INSPECT');
                  }}
                  onMouseLeave={() => {
                    setHoveredNodeId(null);
                    setCursorLabel(null);
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39D9FF] rounded-full transition-transform duration-300"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                  }}
                  aria-label={`Inspect ${node.label}`}
                >
                  <div className="relative flex flex-col items-center">
                    {/* Node Circle */}
                    <div
                      className={`rounded-full flex items-center justify-center transition-all duration-300 ${
                        node.id === 'node-core' ? 'w-16 h-16 md:w-20 md:h-20' : 'w-12 h-12 md:w-14 md:h-14'
                      } ${
                        isSelected
                          ? 'border-2 border-[#39D9FF] shadow-[0_0_30px_rgba(57,217,255,0.7)] scale-110'
                          : 'border border-white/20 bg-[#0A0A14] hover:scale-105'
                      }`}
                      style={{
                        backgroundColor: isSelected ? '#0A0A14' : '#03030A',
                      }}
                    >
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: node.color }}
                      />
                    </div>

                    {/* Node Label Floating Tag */}
                    <span
                      className={`mt-2 font-mono text-[10px] md:text-[11px] font-semibold tracking-wider whitespace-nowrap px-2.5 py-1 rounded-full border transition-all ${
                        isSelected
                          ? 'bg-[#39D9FF]/20 text-[#F5F5FA] border-[#39D9FF]/60 shadow-[0_0_15px_rgba(57,217,255,0.3)]'
                          : 'bg-[#03030A]/90 text-[#9292A5] border-white/[0.08] group-hover:text-[#F5F5FA]'
                      }`}
                    >
                      {node.label}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Instruction tooltip */}
            <div className="absolute bottom-4 left-6 font-mono text-[10px] text-[#9292A5] flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-[#39D9FF] animate-pulse" />
              <span>Select any concept node to reveal resonant telemetry</span>
            </div>
          </div>

          {/* Node Detail Telemetry Panel */}
          <div className="lg:col-span-4 p-8 rounded-3xl bg-[#0A0A14] border border-[#7C5CFF]/30 space-y-6">
            <div className="flex items-center justify-between font-mono text-xs border-b border-white/[0.06] pb-4">
              <span className="text-[#39D9FF] uppercase tracking-wider">{selectedNode.category}</span>
              <span className="text-[#9292A5]">{selectedNode.metric}</span>
            </div>

            <div>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-[#F5F5FA] mb-3">
                {selectedNode.label}
              </h3>
              <p className="font-sans text-sm text-[#9292A5] leading-relaxed">
                {selectedNode.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] space-y-3">
              <div className="font-mono text-xs text-[#9292A5] uppercase tracking-wider">
                SYNAPTIC INTERFACES ({selectedNode.connectedIds.length})
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedNode.connectedIds.map((cid) => {
                  const target = INTELLIGENCE_NODES.find((n) => n.id === cid);
                  if (!target) return null;
                  return (
                    <button
                      key={cid}
                      onClick={() => setSelectedNode(target)}
                      className="px-3 py-1 rounded-full bg-[#121222] border border-[#7C5CFF]/30 hover:border-[#39D9FF] font-mono text-[11px] text-[#39D9FF] transition-colors"
                    >
                      {target.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#03030A] border border-white/[0.04] font-mono text-[11px] text-[#9292A5]">
              <span className="text-[#00F5D4] font-semibold">TENSOR WEIGHT:</span> 1.000 // HARMONIC LOCK
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
