import React, { useState } from 'react';
import { Project } from '../../types';
import { useNexus } from '../../context/NexusContext';
import { PROJECTS_DATA } from '../../data/nexusData';
import { ArrowLeft, ArrowUpRight, Heart, Share2, Eye, Sparkles, Check, Layers, Cpu, Compass } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const { setCursorLabel, openProject, triggerNotification } = useNexus();
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'CONCEPT' | 'PROCESS' | 'TELEMETRY'>('OVERVIEW');

  const relatedProjects = PROJECTS_DATA.filter((p) => p.id !== project.id).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    triggerNotification(`Copied frequency link for ${project.title}.`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    setLiked(!liked);
    triggerNotification(liked ? 'Removed from your resonant favorites.' : 'Saved to your resonant favorites.');
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#03030A]/95 backdrop-blur-2xl animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      {/* Top Floating Control Bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between px-6 md:px-12 py-5 bg-[#03030A]/85 backdrop-blur-xl border-b border-[#7C5CFF]/15">
        <button
          onClick={onClose}
          onMouseEnter={() => setCursorLabel('RETURN')}
          onMouseLeave={() => setCursorLabel(null)}
          className="flex items-center gap-2 font-mono text-xs text-[#9292A5] hover:text-[#F5F5FA] uppercase tracking-widest transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#39D9FF]" />
          <span>← Back to NEXUS</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleLike}
            className={`p-2.5 rounded-full border transition-all ${
              liked
                ? 'bg-[#FF5C8D]/20 border-[#FF5C8D] text-[#FF5C8D]'
                : 'bg-[#0A0A14] border-white/[0.08] text-[#9292A5] hover:text-[#F5F5FA]'
            }`}
            aria-label="Like project"
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleShare}
            className="p-2.5 rounded-full bg-[#0A0A14] border border-white/[0.08] text-[#9292A5] hover:text-[#F5F5FA] transition-colors"
            aria-label="Share project"
          >
            {copied ? <Check className="w-4 h-4 text-[#00F5D4]" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12">
        {/* Project Header */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span
              className="px-3 py-1 rounded-full font-bold uppercase tracking-wider border"
              style={{
                color: project.accentColor,
                backgroundColor: `${project.visualColor}15`,
                borderColor: `${project.visualColor}40`,
              }}
            >
              {project.category}
            </span>
            <span className="text-[#9292A5]">DATE // {project.date}</span>
            <span className="text-[#9292A5]">ID // {project.slug}</span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl text-[#F5F5FA] tracking-tight">
            {project.title}
          </h1>

          <p className="font-display text-xl md:text-2xl text-[#9292A5] font-light max-w-3xl leading-relaxed">
            {project.subtitle}
          </p>

          {/* Creator Profile Chip */}
          <div className="pt-2 flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-[#F5F5FA] border shadow-[0_0_15px_rgba(124,92,255,0.3)]"
              style={{
                backgroundColor: '#0A0A14',
                borderColor: project.creator.avatarGlow,
              }}
            >
              {project.creator.name.charAt(0)}
            </div>
            <div>
              <div className="font-display font-medium text-[#F5F5FA] text-sm">
                {project.creator.name}
              </div>
              <div className="font-mono text-xs text-[#39D9FF]">
                {project.creator.handle}
              </div>
            </div>
          </div>
        </div>

        {/* Visual Showcase Stage */}
        <div className="relative w-full h-80 sm:h-96 md:h-[480px] rounded-3xl overflow-hidden mb-12 border border-[#7C5CFF]/30 bg-[#0A0A14] flex items-center justify-center shadow-[0_0_50px_rgba(3,3,10,0.8)]">
          {/* Subtle cosmic particle gradient */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              background: `radial-gradient(circle at 60% 40%, ${project.visualColor} 0%, transparent 65%)`,
            }}
          />

          {/* Kinetic topological decorative visualization */}
          <div className="relative z-10 flex flex-col items-center text-center p-8">
            <div
              className="w-32 h-32 rounded-full border border-dashed animate-spin mb-6 flex items-center justify-center"
              style={{
                borderColor: project.accentColor,
                animationDuration: '24s',
              }}
            >
              <div
                className="w-20 h-20 rounded-full blur-xs animate-pulse"
                style={{ backgroundColor: `${project.visualColor}60` }}
              />
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#F5F5FA] mb-2">
              VOLUMETRIC ARTIFACT MANIFEST
            </div>
            <p className="font-sans text-xs text-[#9292A5] max-w-md">
              Full sensory telemetry rendered through {project.technology.join(', ')}.
            </p>
          </div>

          {/* Live telemetry layer markers */}
          <div className="absolute bottom-6 left-6 right-6 hidden md:grid grid-cols-3 gap-4">
            {project.showcaseLayers.map((layer) => (
              <div
                key={layer.title}
                className="p-3.5 rounded-xl bg-[#03030A]/85 backdrop-blur-md border border-white/[0.08]"
              >
                <div className="font-mono text-[10px] text-[#39D9FF] tracking-wider uppercase mb-1">
                  {layer.title}
                </div>
                <div className="font-display text-sm font-semibold text-[#F5F5FA]">
                  {layer.metric}
                </div>
                <div className="font-sans text-[11px] text-[#9292A5] truncate mt-0.5">
                  {layer.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/[0.08] mb-8 gap-4 font-mono text-xs">
          {(['OVERVIEW', 'CONCEPT', 'PROCESS', 'TELEMETRY'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 border-b-2 tracking-wider transition-colors ${
                activeTab === tab
                  ? 'border-[#39D9FF] text-[#F5F5FA] font-bold'
                  : 'border-transparent text-[#9292A5] hover:text-[#F5F5FA]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        {activeTab === 'OVERVIEW' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
            <div className="md:col-span-8 space-y-6">
              <h2 className="font-display text-2xl font-bold text-[#F5F5FA]">Description</h2>
              <p className="font-sans text-base text-[#9292A5] leading-relaxed">
                {project.description}
              </p>
              <h3 className="font-display text-xl font-bold text-[#F5F5FA] pt-4">Concept Rationale</h3>
              <p className="font-sans text-sm text-[#9292A5] leading-relaxed">
                {project.concept}
              </p>
            </div>

            <div className="md:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-[#0A0A14] border border-[#7C5CFF]/20 space-y-4">
                <h3 className="font-mono text-xs text-[#F5F5FA] uppercase tracking-wider">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technology.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-[#121222] border border-white/[0.06] font-mono text-[11px] text-[#39D9FF]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/[0.06] space-y-2 font-mono text-xs text-[#9292A5]">
                  <div className="flex justify-between">
                    <span>Views</span>
                    <span className="text-[#F5F5FA]">{project.stats.views}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resonances</span>
                    <span className="text-[#F5F5FA]">{project.stats.likes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remixes</span>
                    <span className="text-[#F5F5FA]">{project.stats.remixes}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'CONCEPT' && (
          <div className="space-y-6 mb-16 max-w-3xl">
            <h2 className="font-display text-3xl font-bold text-[#F5F5FA]">Conceptual Architecture</h2>
            <p className="font-sans text-base text-[#9292A5] leading-relaxed">
              {project.concept}
            </p>
            <div className="p-6 rounded-2xl bg-[#0A0A14] border-l-4 border-[#7C5CFF]">
              <div className="font-mono text-xs text-[#39D9FF] uppercase tracking-wider mb-1">
                FIRST PRINCIPLE
              </div>
              <p className="font-display text-lg text-[#F5F5FA]">
                “Structure is not static geometry; it is frozen temporal intention awaiting resonant observation.”
              </p>
            </div>
          </div>
        )}

        {activeTab === 'PROCESS' && (
          <div className="space-y-6 mb-16 max-w-3xl">
            <h2 className="font-display text-3xl font-bold text-[#F5F5FA]">Methodological Sequence</h2>
            <div className="space-y-4 font-sans">
              {project.process.map((step, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-[#0A0A14] border border-white/[0.06]">
                  <span className="font-mono text-sm text-[#39D9FF] font-bold">0{idx + 1}</span>
                  <span className="text-sm text-[#9292A5]">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'TELEMETRY' && (
          <div className="space-y-6 mb-16 max-w-3xl">
            <h2 className="font-display text-3xl font-bold text-[#F5F5FA]">Sensor & Performance Metrics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.showcaseLayers.map((layer) => (
                <div key={layer.title} className="p-5 rounded-2xl bg-[#0A0A14] border border-[#7C5CFF]/30">
                  <div className="font-mono text-xs text-[#39D9FF] mb-2">{layer.title}</div>
                  <div className="font-display text-2xl font-bold text-[#F5F5FA] mb-1">{layer.metric}</div>
                  <div className="font-sans text-xs text-[#9292A5]">{layer.detail}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Projects Section */}
        <div className="pt-12 border-t border-white/[0.08]">
          <h2 className="font-mono text-xs text-[#9292A5] tracking-[0.2em] uppercase mb-6">
            CONNECTED RESONANCES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((rel) => (
              <div
                key={rel.id}
                onClick={() => openProject(rel.slug)}
                onMouseEnter={() => setCursorLabel('OPEN')}
                onMouseLeave={() => setCursorLabel(null)}
                className="group p-5 rounded-2xl bg-[#0A0A14] border border-white/[0.06] hover:border-[#39D9FF]/50 transition-all cursor-pointer"
              >
                <div className="font-mono text-[10px] text-[#39D9FF] mb-1">{rel.category}</div>
                <div className="font-display text-lg font-bold text-[#F5F5FA] group-hover:text-[#39D9FF] transition-colors mb-1">
                  {rel.title}
                </div>
                <div className="font-sans text-xs text-[#9292A5] line-clamp-2">
                  {rel.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
