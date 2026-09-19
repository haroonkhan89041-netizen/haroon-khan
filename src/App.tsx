import React, { useEffect, useState } from 'react';
import { NexusProvider, useNexus } from './context/NexusContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CustomCursor } from './components/common/CustomCursor';
import { ParticleField } from './components/common/ParticleField';
import { LoadingScreen } from './components/common/LoadingScreen';
import { ProjectDetailModal } from './components/common/ProjectDetailModal';
import { HomeView } from './views/HomeView';
import { ExploreView } from './views/ExploreView';
import { CreateView } from './views/CreateView';
import { DiscoverView } from './views/DiscoverView';
import { IntelligenceView } from './views/IntelligenceView';
import { CommunityView } from './views/CommunityView';
import { ProjectDetailView } from './views/ProjectDetailView';
import { LoginView } from './views/LoginView';
import { PROJECTS_DATA } from './data/nexusData';
import { Sparkles, Radio, Check } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    currentRoute,
    activeProjectSlug,
    closeProject,
    notification,
  } = useNexus();

  const [isLoading, setIsLoading] = useState(true);

  // Render view depending on router state
  const renderView = () => {
    if (currentRoute.startsWith('/project/')) {
      const slug = currentRoute.replace('/project/', '');
      return <ProjectDetailView slug={slug} />;
    }

    switch (currentRoute) {
      case '/explore':
        return <ExploreView />;
      case '/create':
        return <CreateView />;
      case '/discover':
        return <DiscoverView />;
      case '/intelligence':
        return <IntelligenceView />;
      case '/community':
        return <CommunityView />;
      case '/login':
        return <LoginView />;
      case '/':
      default:
        return <HomeView />;
    }
  };

  // Find currently opened modal project if any
  const modalProject = activeProjectSlug
    ? PROJECTS_DATA.find((p) => p.slug === activeProjectSlug)
    : null;

  return (
    <div className="relative min-h-screen bg-[#03030A] text-[#F5F5FA] font-sans selection:bg-[#7C5CFF]/30 selection:text-[#39D9FF] overflow-x-hidden">
      {/* Branded Loading Sequence on initial boot */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Reactive Particle Cosmic Field */}
      <ParticleField />

      {/* Custom Context-Aware Magnetic Cursor */}
      <CustomCursor />

      {/* Fixed Futuristic Header Navigation */}
      <Navbar />

      {/* Main Routed Page Surface */}
      <main className="relative z-10 w-full min-h-screen">
        {renderView()}
      </main>

      {/* Global Project Detail Cinematic Modal */}
      {modalProject && (
        <ProjectDetailModal
          project={modalProject}
          onClose={closeProject}
        />
      )}

      {/* Persistent Atmospheric Footer */}
      <Footer />

      {/* Global Signal Toast Notification */}
      {notification && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-[#0A0A14]/95 backdrop-blur-xl border border-[#7C5CFF]/40 text-xs font-mono text-[#F5F5FA] shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300"
        >
          <span className="w-2 h-2 rounded-full bg-[#39D9FF] animate-pulse" />
          <span>{notification}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <NexusProvider>
      <AppContent />
    </NexusProvider>
  );
}
