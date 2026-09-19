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

export const NexusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Sync with browser URL / hash for reliable single-page routing
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path && path !== '/' && path.startsWith('/')) {
        return path;
      }
      const hash = window.location.hash.replace('#', '');
      return hash ? (hash.startsWith('/') ? hash : `/${hash}`) : '/';
    }
    return '/';
  });

  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const match = window.location.pathname.match(/\/project\/([^/]+)/);
      return match ? match[1] : null;
    }
    return null;
  });

  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [savedCreations, setSavedCreations] = useState<GeneratedArtifact[]>(() => {
    try {
      const stored = localStorage.getItem('nexus_saved_creations');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [followingCreators, setFollowingCreators] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('nexus_following_creators');
      return stored ? JSON.parse(stored) : ['creator-2', 'creator-4'];
    } catch {
      return ['creator-2', 'creator-4'];
    }
  });

  const [userSession, setUserSession] = useState<UserSession | null>(() => {
    try {
      const stored = localStorage.getItem('nexus_user_session');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mq.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const match = path.match(/\/project\/([^/]+)/);
      if (match) {
        setActiveProjectSlug(match[1]);
        setCurrentRoute(`/project/${match[1]}`);
      } else {
        setActiveProjectSlug(null);
        setCurrentRoute(path || '/');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: string) => {
    setCurrentRoute(route);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openProject = (slug: string) => {
    setActiveProjectSlug(slug);
    navigate(`/project/${slug}`);
  };

  const closeProject = () => {
    setActiveProjectSlug(null);
    navigate('/discover');
  };

  const saveCreation = (artifact: GeneratedArtifact) => {
    setSavedCreations((prev) => {
      const updated = [artifact, ...prev.filter((item) => item.id !== artifact.id)];
      try {
        localStorage.setItem('nexus_saved_creations', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    triggerNotification(`Artifact "${artifact.title}" saved to your local nexus repository.`);
  };

  const toggleFollowCreator = (creatorId: string) => {
    setFollowingCreators((prev) => {
      const next = prev.includes(creatorId)
        ? prev.filter((id) => id !== creatorId)
        : [...prev, creatorId];
      try {
        localStorage.setItem('nexus_following_creators', JSON.stringify(next));
      } catch {
        // ignore
      }
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
    try {
      localStorage.setItem('nexus_user_session', JSON.stringify(session));
    } catch {
      // ignore
    }
    triggerNotification('Neural Identity Synchronized with NEXUS network.');
  };

  const logoutUser = () => {
    setUserSession(null);
    try {
      localStorage.removeItem('nexus_user_session');
    } catch {
      // ignore
    }
    triggerNotification('Session disconnected.');
  };

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 4200);
  };

  return (
    <NexusContext.Provider
      value={{
        currentRoute,
        navigate,
        activeProjectSlug,
        openProject,
        closeProject,
        cursorLabel,
        setCursorLabel,
        savedCreations,
        saveCreation,
        followingCreators,
        toggleFollowCreator,
        userSession,
        loginUser,
        logoutUser,
        reducedMotion,
        notification,
        triggerNotification,
      }}
    >
      {children}
    </NexusContext.Provider>
  );
};

export const useNexus = (): NexusContextType => {
  const context = useContext(NexusContext);
  if (!context) {
    throw new Error('useNexus must be used within a NexusProvider');
  }
  return context;
};
