import React, { useState, useRef, useEffect } from 'react';
import { useNexus } from '../../context/NexusContext';
import { CREATIVE_PROMPT_PRESETS } from '../../data/nexusData';
import { GeneratedArtifact } from '../../types';
import { Sparkles, ArrowRight, RefreshCw, Bookmark, Share2, Eye, Check, Layers, Sliders } from 'lucide-react';

interface CreativeLabProps {
  standalone?: boolean;
}

export const CreativeLab: React.FC<CreativeLabProps> = ({ standalone = false }) => {
  const { setCursorLabel, saveCreation, triggerNotification } = useNexus();
  const [prompt, setPrompt] = useState('');
  const [coherence, setCoherence] = useState(94);
  const [entropy, setEntropy] = useState(38);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [artifact, setArtifact] = useState<GeneratedArtifact | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const generationSteps = [
    'Parsing conceptual tensor field…',
    'Synthesizing non-Euclidean spatial topology…',
    'Rendering quantum lightfield interference…',
    'Materializing coherent digital universe…',
  ];

  const handleSelectPreset = (preset: string) => {
    setPrompt(preset);
  };

  const handleStartGeneration = () => {
    const inputPrompt = prompt.trim() || CREATIVE_PROMPT_PRESETS[0];
    setIsGenerating(true);
    setGenerationStep(0);
    setGenerationProgress(10);
    setArtifact(null);
    setSaved(false);

    // Multi-phase generation progression simulation
    let currentProg = 10;
    const interval = setInterval(() => {
      currentProg += Math.floor(Math.random() * 15 + 12);
      if (currentProg >= 100) {
        clearInterval(interval);
        setGenerationProgress(100);
        setGenerationStep(3);

        setTimeout(() => {
          // Generate realistic artifact
          const archetypeTypes = ['Bio-Kinetic Matrix', 'Hyperbolic Sanctuary', 'Acoustic Singularity', 'Quantum Glass Canopy'];
          const chosenArchetype = archetypeTypes[Math.floor(Math.random() * archetypeTypes.length)];

          const newArtifact: GeneratedArtifact = {
            id: `artifact-${Date.now()}`,
            prompt: inputPrompt,
            title: deriveTitleFromPrompt(inputPrompt),
            dimension: 'SECTOR 01 — CREATE',
            archetype: chosenArchetype,
            generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            coherenceScore: coherence + (Math.random() * 4 - 2),
            entropyMetric: `${entropy}% Curvature`,
            spatialResolution: '16,384³ Voxel Lattice',
            palette: ['#7C5CFF', '#39D9FF', '#D85CFF', '#00F5D4'],
            conceptualArchitecture: `A self-regulating dynamic structure manifesting ${inputPrompt.toLowerCase()}. Driven by non-linear acoustic fields and ambient light refraction.`,
            manifesto: 'Form emerges purely from psychological and ecological equilibrium. The boundaries between observer and architecture are dissolved.',
            interactiveSpecs: {
              vertices: 48000,
              lightPoles: 12,
              resonanceHz: 432,
            },
          };

          setArtifact(newArtifact);
          setIsGenerating(false);
          triggerNotification(`World "${newArtifact.title}" successfully synthesized.`);
        }, 500);
      } else {
        setGenerationProgress(currentProg);
        if (currentProg > 75) setGenerationStep(3);
        else if (currentProg > 45) setGenerationStep(2);
        else if (currentProg > 20) setGenerationStep(1);
      }
    }, 180);
  };

  const deriveTitleFromPrompt = (str: string) => {
    const words = str.split(' ').filter((w) => w.length > 4);
    if (words.length >= 2) {
      return `${capitalize(words[0])} of ${capitalize(words[1])}`;
    }
    return 'Resonant Worldform';
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  // Dynamic canvas preview for generated artifact
  useEffect(() => {
    if (!artifact) return;
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 300);

    let t = 0;
    const render = () => {
      t += 0.03;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Draw generative geometric wave rings based on generated artifact
      const numRings = 7;
      for (let r = 1; r <= numRings; r++) {
        ctx.beginPath();
        const baseRadius = r * 18;
        for (let a = 0; a <= Math.PI * 2; a += 0.1) {
          const distortion = Math.sin(a * 4 + t * 2 + r) * 9;
          const x = cx + Math.cos(a) * (baseRadius + distortion);
          const y = cy + Math.sin(a) * (baseRadius + distortion);
          if (a === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = `hsla(${240 + r * 15}, 85%, 65%, ${0.6 - r * 0.06})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      // Center glowing core
      ctx.beginPath();
      ctx.arc(cx, cy, 8 + Math.sin(t * 3) * 2, 0, Math.PI * 2);
      ctx.fillStyle = '#39D9FF';
      ctx.shadowColor = '#39D9FF';
      ctx.shadowBlur = 15;
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [artifact]);

  const handleSave = () => {
    if (!artifact) return;
    saveCreation(artifact);
    setSaved(true);
  };

  const handleShare = () => {
    if (!artifact) return;
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    triggerNotification('World coordinate link copied to clipboard.');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className={`relative px-6 md:px-10 ${standalone ? 'py-12' : 'py-28 border-t border-white/[0.04]'}`} aria-label="The Creative Lab">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#9292A5] tracking-[0.25em] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#39D9FF]" />
            GENERATIVE SPATIAL PROTOCOL
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-[#F5F5FA] mb-4">
            THE CREATIVE LAB
          </h2>
          <p className="font-sans text-base text-[#9292A5]">
            Articulate an abstract idea, spatial hypothesis, or sonic realm. Watch the NEXUS generative engine materialize a multi-dimensional universe.
          </p>
        </div>

        {/* The Prompt & Engine Surface */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#0A0A14]/80 backdrop-blur-xl border border-[#7C5CFF]/30 p-6 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
          {/* Preset Prompts Pills */}
          <div className="mb-6">
            <span className="font-mono text-[11px] text-[#9292A5] tracking-wider uppercase block mb-3">
              SYNTACTIC SEED PRESETS:
            </span>
            <div className="flex flex-wrap gap-2">
              {CREATIVE_PROMPT_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  onMouseEnter={() => setCursorLabel('USE SEED')}
                  onMouseLeave={() => setCursorLabel(null)}
                  className="px-3.5 py-1.5 rounded-full bg-[#121222]/80 border border-white/[0.06] hover:border-[#7C5CFF]/60 text-xs font-sans text-[#9292A5] hover:text-[#F5F5FA] text-left transition-colors truncate max-w-full md:max-w-md"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Main Large Input Area */}
          <div className="relative mb-6">
            <label htmlFor="lab-prompt-input" className="font-mono text-xs text-[#39D9FF] tracking-wider uppercase block mb-2">
              WHAT DO YOU WANT TO CREATE?
            </label>
            <textarea
              id="lab-prompt-input"
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="“A futuristic city where architecture responds to human emotion with kinetic glass petals…”"
              className="w-full rounded-2xl bg-[#03030A] border border-[#7C5CFF]/40 px-5 py-4 text-base md:text-lg text-[#F5F5FA] placeholder-[#9292A5]/50 focus:outline-none focus:border-[#39D9FF] focus:ring-1 focus:ring-[#39D9FF] transition-all resize-none font-sans"
              disabled={isGenerating}
            />
          </div>

          {/* Parameters Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-xl bg-[#03030A]/60 border border-white/[0.04] mb-8">
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-[#9292A5]">DIMENSIONAL COHERENCE</span>
                <span className="text-[#39D9FF]">{coherence}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="99"
                value={coherence}
                onChange={(e) => setCoherence(Number(e.target.value))}
                className="w-full accent-[#39D9FF] cursor-pointer"
                disabled={isGenerating}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-[#9292A5]">SPATIAL ENTROPY</span>
                <span className="text-[#D85CFF]">{entropy}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                value={entropy}
                onChange={(e) => setEntropy(Number(e.target.value))}
                className="w-full accent-[#D85CFF] cursor-pointer"
                disabled={isGenerating}
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex justify-end">
            <button
              onClick={handleStartGeneration}
              disabled={isGenerating}
              onMouseEnter={() => setCursorLabel('SYNTHESIZE')}
              onMouseLeave={() => setCursorLabel(null)}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#7C5CFF] via-[#8D70FF] to-[#39D9FF] text-[#03030A] font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-3 shadow-[0_0_30px_rgba(124,92,255,0.45)] hover:shadow-[0_0_40px_rgba(57,217,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#03030A]" />
                  <span>SYNTHESIZING REALITY…</span>
                </>
              ) : (
                <>
                  <span>CREATE →</span>
                  <Sparkles className="w-4 h-4 text-[#03030A]" />
                </>
              )}
            </button>
          </div>

          {/* In-Progress State */}
          {isGenerating && (
            <div className="mt-8 pt-8 border-t border-white/[0.08] space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#39D9FF] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#39D9FF] animate-ping" />
                  {generationSteps[generationStep]}
                </span>
                <span className="text-[#9292A5]">{generationProgress}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#03030A] overflow-hidden border border-white/[0.06]">
                <div
                  className="h-full bg-gradient-to-r from-[#7C5CFF] via-[#39D9FF] to-[#D85CFF] transition-all duration-200"
                  style={{ width: `${generationProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Result Preview Box */}
          {artifact && !isGenerating && (
            <div className="mt-10 pt-8 border-t border-white/[0.08] animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[#00F5D4] tracking-wider uppercase flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#00F5D4]" />
                  WORLD SYNTHESIS COMPLETE
                </span>
                <span className="font-mono text-xs text-[#9292A5]">
                  ID: {artifact.id.slice(-6).toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#03030A] p-6 rounded-2xl border border-[#7C5CFF]/30">
                {/* Visualizer canvas */}
                <div className="md:col-span-5 relative flex items-center justify-center min-h-[220px] rounded-xl bg-[#0A0A14] border border-white/[0.06] overflow-hidden">
                  <canvas ref={previewCanvasRef} className="w-full h-full" />
                  <span className="absolute bottom-2 left-3 font-mono text-[9px] text-[#9292A5]">
                    LATTICE TOPOLOGY PREVIEW
                  </span>
                </div>

                {/* Conceptual metadata */}
                <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="font-mono text-[10px] text-[#D85CFF] tracking-wider uppercase">
                      {artifact.archetype}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-[#F5F5FA] mt-1 mb-2">
                      {artifact.title}
                    </h3>
                    <p className="font-sans text-xs text-[#9292A5] leading-relaxed mb-3">
                      {artifact.conceptualArchitecture}
                    </p>
                    <div className="font-mono text-[11px] text-[#9292A5] italic border-l-2 border-[#7C5CFF] pl-3 py-1">
                      “{artifact.manifesto}”
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.06] font-mono text-[10px]">
                    <div>
                      <div className="text-[#9292A5]">COHERENCE</div>
                      <div className="text-[#39D9FF] font-semibold">{artifact.coherenceScore.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-[#9292A5]">VERTICES</div>
                      <div className="text-[#F5F5FA] font-semibold">{artifact.interactiveSpecs.vertices.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-[#9292A5]">RESONANCE</div>
                      <div className="text-[#00F5D4] font-semibold">{artifact.interactiveSpecs.resonanceHz} Hz</div>
                    </div>
                  </div>

                  {/* Actions: Save, Share, Regenerate */}
                  <div className="flex items-center gap-3 pt-3">
                    <button
                      onClick={handleSave}
                      disabled={saved}
                      onMouseEnter={() => setCursorLabel('SAVE')}
                      onMouseLeave={() => setCursorLabel(null)}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-[#121222] border border-[#7C5CFF]/40 text-xs font-mono text-[#F5F5FA] hover:bg-[#7C5CFF]/20 flex items-center justify-center gap-2 transition-colors"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-[#39D9FF]" />
                      {saved ? 'SAVED TO ARCHIVE' : 'SAVE CREATION'}
                    </button>

                    <button
                      onClick={handleShare}
                      onMouseEnter={() => setCursorLabel('SHARE')}
                      onMouseLeave={() => setCursorLabel(null)}
                      className="py-2.5 px-4 rounded-xl bg-[#121222] border border-white/[0.08] text-xs font-mono text-[#9292A5] hover:text-[#F5F5FA] flex items-center justify-center gap-2 transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5 text-[#D85CFF]" />
                      {copied ? 'COPIED' : 'SHARE'}
                    </button>

                    <button
                      onClick={handleStartGeneration}
                      onMouseEnter={() => setCursorLabel('RE-ROLL')}
                      onMouseLeave={() => setCursorLabel(null)}
                      className="py-2.5 px-4 rounded-xl bg-[#121222] border border-white/[0.08] text-xs font-mono text-[#9292A5] hover:text-[#F5F5FA] flex items-center justify-center transition-colors"
                      title="Regenerate"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
