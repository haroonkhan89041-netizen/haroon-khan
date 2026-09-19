import React from 'react';
import { useNexus } from '../context/NexusContext';
import { PROJECTS_DATA } from '../data/nexusData';
import { ProjectDetailModal } from '../components/common/ProjectDetailModal';
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';

interface ProjectDetailViewProps {
  slug?: string;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ slug }) => {
  const { activeProjectSlug, closeProject, navigate } = useNexus();

  const currentSlug = slug || activeProjectSlug;
  const project = PROJECTS_DATA.find((p) => p.slug === currentSlug);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#0A0A14] border border-[#FF5C8D]/40 flex items-center justify-center text-[#FF5C8D] mb-6 shadow-[0_0_30px_rgba(255,92,141,0.2)]">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="font-mono text-xs text-[#FF5C8D] tracking-widest uppercase mb-2">
          ANOMALY DETECTED // 404
        </div>

        <h1 className="font-display font-bold text-3xl md:text-5xl text-[#F5F5FA] mb-4">
          Something slipped outside the NEXUS.
        </h1>

        <p className="font-sans text-sm md:text-base text-[#9292A5] max-w-md mb-8">
          The requested coordinate or reality sector has undergone quantum decancellation and cannot be located in the current dimensional index.
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-full bg-[#121222] border border-white/[0.08] text-xs font-mono text-[#F5F5FA] hover:border-[#39D9FF] flex items-center gap-2 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#39D9FF] text-[#03030A] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </button>
        </div>
      </div>
    );
  }

  return <ProjectDetailModal project={project} onClose={closeProject} />;
};
