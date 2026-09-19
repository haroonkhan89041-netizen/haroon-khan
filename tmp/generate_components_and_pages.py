import os
import re

TARGET = '/tmp/nexus-creative-universe'

def transform_imports(code):
    # Fix import paths to @/
    code = re.sub(r"from\s+['\"][.\/]+context\/NexusContext['\"]", "from '@/lib/context/NexusContext'", code)
    code = re.sub(r"from\s+['\"][.\/]+data\/nexusData['\"]", "from '@/data/nexusData'", code)
    code = re.sub(r"from\s+['\"][.\/]+types['\"]", "from '@/types'", code)
    code = re.sub(r"from\s+['\"][.\/]+components\/common\/([^'\"]+)['\"]", r"from '@/components/common/\1'", code)
    code = re.sub(r"from\s+['\"][.\/]+components\/home\/([^'\"]+)['\"]", r"from '@/components/home/\1'", code)
    code = re.sub(r"from\s+['\"]\.\.\/common\/([^'\"]+)['\"]", r"from '@/components/common/\1'", code)
    code = re.sub(r"from\s+['\"]\.\.\/home\/([^'\"]+)['\"]", r"from '@/components/home/\1'", code)
    code = re.sub(r"from\s+['\"]\.\/common\/([^'\"]+)['\"]", r"from '@/components/common/\1'", code)
    code = re.sub(r"from\s+['\"]\.\/home\/([^'\"]+)['\"]", r"from '@/components/home/\1'", code)
    return code

# Common components
common_files = [
    'CustomCursor.tsx',
    'Footer.tsx',
    'LoadingScreen.tsx',
    'Navbar.tsx',
    'ParticleField.tsx',
    'ProjectDetailModal.tsx',
]

for cf in common_files:
    src_path = f'src/components/common/{cf}'
    dest_path = f'{TARGET}/components/common/{cf}'
    if os.path.exists(src_path):
        with open(src_path, 'r', encoding='utf-8') as f:
            c = f.read()
        c = "'use client';\n\n" + transform_imports(c)
        with open(dest_path, 'w', encoding='utf-8') as f:
            f.write(c)
        print(f"Written: components/common/{cf}")

# MagneticButton with GSAP
with open(f'{TARGET}/components/common/MagneticButton.tsx', 'w', encoding='utf-8') as f:
    f.write("""'use client';

import React, { useRef } from 'react';
import { useNexus } from '@/lib/context/NexusContext';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost';
  cursorLabel?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  id?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  cursorLabel = 'SELECT',
  disabled = false,
  type = 'button',
  ariaLabel,
  id,
}) => {
  const { setCursorLabel, reducedMotion } = useNexus();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reducedMotion || disabled || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.32;
    const deltaY = (e.clientY - centerY) * 0.32;

    gsap.to(buttonRef.current, {
      x: deltaX,
      y: deltaY,
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  const handleMouseEnter = () => {
    if (cursorLabel) setCursorLabel(cursorLabel);
  };

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      });
    }
    setCursorLabel(null);
  };

  let baseStyles =
    'relative inline-flex items-center justify-center font-mono text-xs uppercase tracking-widest transition-colors duration-300 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39D9FF] disabled:opacity-40 disabled:cursor-not-allowed';

  let variantStyles = '';
  switch (variant) {
    case 'primary':
      variantStyles =
        'px-6 py-3 rounded-full bg-[#7C5CFF] text-[#F5F5FA] font-semibold shadow-[0_0_30px_rgba(124,92,255,0.4)] hover:bg-[#8D70FF] hover:shadow-[0_0_40px_rgba(124,92,255,0.6)] border border-[#7C5CFF]/60';
      break;
    case 'secondary':
      variantStyles =
        'px-6 py-3 rounded-full bg-[#0A0A14] text-[#F5F5FA] border border-[#7C5CFF]/30 hover:border-[#39D9FF]/70 hover:bg-[#121222] hover:shadow-[0_0_25px_rgba(57,217,255,0.25)]';
      break;
    case 'glass':
      variantStyles =
        'px-5 py-2.5 rounded-full bg-[#0A0A14]/70 backdrop-blur-md text-[#F5F5FA] border border-[#7C5CFF]/20 hover:border-[#39D9FF]/50 hover:bg-[#151528]/80';
      break;
    case 'ghost':
      variantStyles =
        'px-4 py-2 text-[#9292A5] hover:text-[#39D9FF] border border-transparent hover:border-[#39D9FF]/30 rounded-full';
      break;
  }

  return (
    <button
      ref={buttonRef}
      id={id}
      type={type}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};
""")
print("Written: components/common/MagneticButton.tsx with GSAP")

# Home components
home_files = [
    'CommunitySection.tsx',
    'CreativeLab.tsx',
    'DiscoveryUniverse.tsx',
    'ExploreSection.tsx',
    'FinalCTA.tsx',
    'IntelligenceGraph.tsx',
    'LiveBoard.tsx',
    'NexusCore.tsx',
]

for hf in home_files:
    src_path = f'src/components/home/{hf}'
    dest_path = f'{TARGET}/components/home/{hf}'
    if os.path.exists(src_path):
        with open(src_path, 'r', encoding='utf-8') as f:
            c = f.read()
        c = "'use client';\n\n" + transform_imports(c)
        with open(dest_path, 'w', encoding='utf-8') as f:
            f.write(c)
        print(f"Written: components/home/{hf}")

# Hero with GSAP timeline
with open('src/components/home/Hero.tsx', 'r', encoding='utf-8') as f:
    hero_code = f.read()

hero_code = transform_imports(hero_code)
# Add GSAP import and entrance animation
hero_code = "'use client';\n\nimport gsap from 'gsap';\n" + hero_code
# Insert GSAP entrance animation in Hero
if "const [hoverWord, setHoverWord] = useState<string | null>(null);" in hero_code:
    gsap_hook = """const [hoverWord, setHoverWord] = useState<string | null>(null);
  const heroRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-badge', {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
      gsap.from('.hero-title-line', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.2,
      });
      gsap.from('.hero-desc', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.7,
      });
      gsap.from('.hero-cta', {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        delay: 0.9,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);"""
    hero_code = hero_code.replace("const [hoverWord, setHoverWord] = useState<string | null>(null);", gsap_hook)
    hero_code = hero_code.replace('<section className="relative min-h-[92vh]', '<section ref={heroRef} className="relative min-h-[92vh]')
    hero_code = hero_code.replace('className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0A0A14]/80', 'className="hero-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0A0A14]/80')
    hero_code = hero_code.replace('className="font-display font-black text-6xl', 'className="hero-title-line font-display font-black text-6xl')
    hero_code = hero_code.replace('className="font-sans text-base md:text-xl text-[#9292A5]', 'className="hero-desc font-sans text-base md:text-xl text-[#9292A5]')

with open(f'{TARGET}/components/home/Hero.tsx', 'w', encoding='utf-8') as f:
    f.write(hero_code)
print("Written: components/home/Hero.tsx with GSAP timeline")

# Views into App Router pages
# 1. app/page.tsx
with open('src/views/HomeView.tsx', 'r', encoding='utf-8') as f:
    home_view = f.read()
home_view = "'use client';\n\n" + transform_imports(home_view)
home_view = home_view.replace("export const HomeView: React.FC = () => {", "export default function HomePage() {")
with open(f'{TARGET}/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(home_view)
print("Written: app/page.tsx")

# 2. app/explore/page.tsx
with open('src/views/ExploreView.tsx', 'r', encoding='utf-8') as f:
    explore_view = f.read()
explore_view = "'use client';\n\n" + transform_imports(explore_view)
explore_view = explore_view.replace("export const ExploreView: React.FC = () => {", "export default function ExplorePage() {")
with open(f'{TARGET}/app/explore/page.tsx', 'w', encoding='utf-8') as f:
    f.write(explore_view)
print("Written: app/explore/page.tsx")

# 3. app/create/page.tsx
with open('src/views/CreateView.tsx', 'r', encoding='utf-8') as f:
    create_view = f.read()
create_view = "'use client';\n\n" + transform_imports(create_view)
create_view = create_view.replace("export const CreateView: React.FC = () => {", "export default function CreatePage() {")
with open(f'{TARGET}/app/create/page.tsx', 'w', encoding='utf-8') as f:
    f.write(create_view)
print("Written: app/create/page.tsx")

# 4. app/discover/page.tsx
with open('src/views/DiscoverView.tsx', 'r', encoding='utf-8') as f:
    discover_view = f.read()
discover_view = "'use client';\n\n" + transform_imports(discover_view)
discover_view = discover_view.replace("export const DiscoverView: React.FC = () => {", "export default function DiscoverPage() {")
with open(f'{TARGET}/app/discover/page.tsx', 'w', encoding='utf-8') as f:
    f.write(discover_view)
print("Written: app/discover/page.tsx")

# 5. app/intelligence/page.tsx
with open('src/views/IntelligenceView.tsx', 'r', encoding='utf-8') as f:
    intel_view = f.read()
intel_view = "'use client';\n\n" + transform_imports(intel_view)
intel_view = intel_view.replace("export const IntelligenceView: React.FC = () => {", "export default function IntelligencePage() {")
with open(f'{TARGET}/app/intelligence/page.tsx', 'w', encoding='utf-8') as f:
    f.write(intel_view)
print("Written: app/intelligence/page.tsx")

# 6. app/community/page.tsx
with open('src/views/CommunityView.tsx', 'r', encoding='utf-8') as f:
    comm_view = f.read()
comm_view = "'use client';\n\n" + transform_imports(comm_view)
comm_view = comm_view.replace("export const CommunityView: React.FC = () => {", "export default function CommunityPage() {")
with open(f'{TARGET}/app/community/page.tsx', 'w', encoding='utf-8') as f:
    f.write(comm_view)
print("Written: app/community/page.tsx")

# 7. app/login/page.tsx
with open('src/views/LoginView.tsx', 'r', encoding='utf-8') as f:
    login_view = f.read()
login_view = "'use client';\n\n" + transform_imports(login_view)
login_view = login_view.replace("export const LoginView: React.FC = () => {", "export default function LoginPage() {")
with open(f'{TARGET}/app/login/page.tsx', 'w', encoding='utf-8') as f:
    f.write(login_view)
print("Written: app/login/page.tsx")

# 8. app/project/[slug]/page.tsx
with open('src/views/ProjectDetailView.tsx', 'r', encoding='utf-8') as f:
    proj_view = f.read()
proj_view = "'use client';\n\n" + transform_imports(proj_view)
proj_view = proj_view.replace("export const ProjectDetailView: React.FC<{ slug: string }> = ({ slug }) => {", "export default function ProjectPage({ params }: { params: { slug: string } }) {\n  const slug = params.slug;")
with open(f'{TARGET}/app/project/[slug]/page.tsx', 'w', encoding='utf-8') as f:
    f.write(proj_view)
print("Written: app/project/[slug]/page.tsx")

print("All components and pages generated successfully!")
