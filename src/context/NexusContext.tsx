import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GeneratedArtifact } from '../types';

interface UserSession {
  authenticated: boolean;
  handle: string;
  name: string;
  role: string;
  quantumId: string;
  joinedAt: string;
}

interface NexusContextType {
  currentRoute: string;
  navigate: (route: string) => void;
  activeProjectSlug: string | null;
  openProject: (slug: string) => void;
  closeProject: () => void;
  cursorLabel: string | null;
  setCursorLabel: (label: string | null) => void;
  savedCreations: GeneratedArtifact[];
  saveCreation: (artifact: GeneratedArtifact) => void;
  followingCreators: string[];
  toggleFollowCreator: (creatorId: string) => void;
  userSession: UserSession | null;
  loginUser: (handle?: string) => void;
  logoutUser: () => void;
  reducedMotion: boolean;
  notification: string | null;
  triggerNotification: (msg: string) => void;
}

const NexusContext = createContext<NexusContextType | undefined>(undefined);

const normalizeRoute = (pathname: string) => {
  const clean = pathname.split('?')[0].split('#')[0];
  return clean || '/';
};

const getProjectSlug = (pathname: string) => {
  const match = pathname.match(/^/project/([^/]+)/);
  return match ? decodeURIComponent(match[1]) : null;
};

export const NexusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    if (typeof window === 'undefined') return '/';
    return normalizeRoute(window.location.pathname);
  });

  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return getProjectSlug(window.location.pathname);
  });

  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [savedCreations, setSavedCreations] = useState<GeneratedArtifact[]>(() => {
    try {
      const stored = localStorage.getItem('nexus_saved_creations');
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const [followingCreators, setFollowingCreators] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('nexus_following_creators');
      return stored ? JSON.parse(stored) : ['creator-2', 'creator-4'];
    } catch { return ['creator-2', 'creator-4']; }
  });

  const [userSession, setUserSession] = useState<UserSession | null>(() => {
    try {
      const stored = localStorage.getItem('nexus_user_session');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  const [reducedMotion, setReducedMotion] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = (e?: MediaQueryListEvent) => setReducedMotion(e ? e.matches : mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setActiveProjectSlug(getProjectSlug(path));
      setCurrentRoute(normalizeRoute(path));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: string) => {
    const [path] = route.split(/[?#]/);
    const normalized = path || '/';
    setActiveProjectSlug(getProjectSlug(normalized));
    setCurrentRoute(normalizeRoute(normalized));
    window.history.pushState(null, '', route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProject = (slug: string) => navigate('/project/' + encodeURIComponent(slug));

  const closeProject = () => navigate('/discover');

  const saveCreation = (artifact: GeneratedArtifact) => {
    setSavedCreations((prev) => {
      const updated = [artifact, ...prev.filter((item) => item.id !== artifact.id)];
      try { localStorage.setItem('nexus_saved_creations', JSON.stringify(updated)); } catch {}
      return updated;
    });
    triggerNotification('Artifact saved to your local NEXUS repository.');
  };

  const toggleFollowCreator = (creatorId: string) => {
    setFollowingCreators((prev) => {
      const next = prev.includes(creatorId) ? prev.filter((id) => id !== creatorId) : [...prev, creatorId];
      try { localStorage.setItem('nexus_following_creators', JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const loginUser = (handle = '@pioneer_explorer') => {
    const session: UserSession = {
      authenticated: true,
      handle,
      name: 'Pioneer Node',
      role: 'Creative Cartographer',
      quantumId: `QX-${Math.floor(100000 + Math.random() * 900000)}`,
      joinedAt: 'SEP 2026',
    };
    setUserSession(session);
    try { localStorage.setItem('nexus_user_session', JSON.stringify(session)); } catch {}
    triggerNotification('Neural Identity synchronized with NEXUS.');
  };

  const logoutUser = () => {
    setUserSession(null);
    try { localStorage.removeItem('nexus_user_session'); } catch {}
    triggerNotification('Session disconnected.');
  };

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    window.setTimeout(() => setNotification((curr) => curr === msg ? null : curr), 4200);
  };

  return (
    <NexusContext.Provider value={{
      currentRoute, navigate, activeProjectSlug, openProject, closeProject,
      cursorLabel, setCursorLabel, savedCreations, saveCreation,
      followingCreators, toggleFollowCreator, userSession, loginUser,
      logoutUser, reducedMotion, notification, triggerNotification,
    }}>
      {children}
    </NexusContext.Provider>
  );
};

export const useNexus = (): NexusContextType => {
  const context = useContext(NexusContext);
  if (!context) throw new Error('useNexus must be used within a NexusProvider');
  return context;
};
