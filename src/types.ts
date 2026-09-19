/**
 * Core type definitions for NEXUS
 * "Ideas become worlds."
 */

export type Category = 
  | 'All'
  | 'Design'
  | 'Technology'
  | 'Architecture'
  | 'AI'
  | 'Music'
  | 'Science'
  | 'Culture'
  | 'Games';

export interface ShowcaseLayer {
  title: string;
  detail: string;
  metric?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  creator: {
    name: string;
    handle: string;
    avatarGlow: string;
  };
  category: Category;
  description: string;
  visualColor: string;
  accentColor: string;
  visualType: 'nebula' | 'geometry' | 'topography' | 'biomorphic' | 'acoustic' | 'kinetic';
  concept: string;
  process: string[];
  technology: string[];
  tags: string[];
  stats: {
    views: string;
    likes: string;
    remixes: string;
  };
  date: string;
  size: 'large' | 'medium' | 'panoramic' | 'compact';
  showcaseLayers: ShowcaseLayer[];
  interactiveMode?: string;
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  role: string;
  specialty: string;
  avatarBg: string;
  avatarGlow: string;
  bio: string;
  projectsCount: number;
  followersCount: string;
  following: boolean;
  featuredWork: string;
  quote: string;
  tags: string[];
}

export interface LiveEvent {
  id: string;
  timestamp: string;
  code: string;
  type: 'LIVE' | 'PROJECT' | 'DISCOVERY' | 'SYNTHESIS' | 'TELEMETRY';
  title: string;
  subtitle?: string;
  tags?: string[];
  vector: string;
}

export interface IntelligenceNode {
  id: string;
  label: string;
  category: string;
  description: string;
  metric: string;
  connectedIds: string[];
  x: number; // percentage in view
  y: number;
  color: string;
  radius: number;
}

export interface WorldDimension {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  accentColor: string;
  secondaryColor: string;
  capabilities: string[];
  interactionPrompt: string;
}

export interface GeneratedArtifact {
  id: string;
  prompt: string;
  title: string;
  dimension: string;
  archetype: string;
  generatedAt: string;
  coherenceScore: number;
  entropyMetric: string;
  spatialResolution: string;
  palette: string[];
  conceptualArchitecture: string;
  manifesto: string;
  interactiveSpecs: {
    vertices: number;
    lightPoles: number;
    resonanceHz: number;
  };
}
