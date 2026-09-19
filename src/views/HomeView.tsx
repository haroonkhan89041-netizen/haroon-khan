import React from 'react';
import { Hero } from '../components/home/Hero';
import { NexusCore } from '../components/home/NexusCore';
import { ExploreSection } from '../components/home/ExploreSection';
import { LiveBoard } from '../components/home/LiveBoard';
import { CreativeLab } from '../components/home/CreativeLab';
import { DiscoveryUniverse } from '../components/home/DiscoveryUniverse';
import { IntelligenceGraph } from '../components/home/IntelligenceGraph';
import { CommunitySection } from '../components/home/CommunitySection';
import { FinalCTA } from '../components/home/FinalCTA';

export const HomeView: React.FC = () => {
  return (
    <div className="relative w-full">
      <Hero />
      <NexusCore />
      <ExploreSection />
      <LiveBoard />
      <CreativeLab />
      <DiscoveryUniverse />
      <IntelligenceGraph />
      <CommunitySection />
      <FinalCTA />
    </div>
  );
};
