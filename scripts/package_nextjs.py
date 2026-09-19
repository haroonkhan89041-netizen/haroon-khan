import os
import re
import shutil
import zipfile

WORKSPACE_ROOT = os.getcwd()
STAGE_DIR = os.path.join(WORKSPACE_ROOT, '.stage_nextjs')
ZIP_OUT_PUBLIC = os.path.join(WORKSPACE_ROOT, 'public', 'nexus-creative-universe.zip')
ZIP_OUT_ROOT = os.path.join(WORKSPACE_ROOT, 'nexus-creative-universe.zip')

if os.path.exists(STAGE_DIR):
    shutil.rmtree(STAGE_DIR)

# Create folders
dirs = [
    'app/explore',
    'app/create',
    'app/discover',
    'app/intelligence',
    'app/community',
    'app/login',
    'app/project/[slug]',
    'components/common',
    'components/home',
    'data',
    'lib/context',
    'types',
    'public',
]

for d in dirs:
    os.makedirs(os.path.join(STAGE_DIR, d), exist_ok=True)

def write_dest(rel_path, content):
    full = os.path.join(STAGE_DIR, rel_path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, 'w', encoding='utf-8') as f:
        f.write(content.strip() + '\n')
    print(f"Generated: {rel_path}")

def transform_imports(code):
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

print("--- Building Next.js + TS + Tailwind + GSAP project ---")

# 1. package.json
write_dest('package.json', """{
  "name": "nexus-creative-universe",
  "version": "1.0.0",
  "private": true,
  "description": "NEXUS — Ideas become worlds. Next.js 14, Tailwind CSS, GSAP, and TypeScript",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.13",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.446.0",
    "gsap": "^3.12.5",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.2"
  },
  "devDependencies": {
    "@types/node": "^20.16.5",
    "@types/react": "^18.3.8",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.11",
    "typescript": "^5.6.2",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.13"
  }
}""")

# 2. tsconfig.json
write_dest('tsconfig.json', """{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}""")

# 3. next.config.mjs
write_dest('next.config.mjs', """/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
""")

# 4. postcss.config.mjs
write_dest('postcss.config.mjs', """export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
""")

# 5. tailwind.config.ts
write_dest('tailwind.config.ts', """import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#03030A",
        foreground: "#F5F5FA",
        nexus: {
          dark: "#03030A",
          card: "#0A0A14",
          elevated: "#121222",
          violet: "#7C5CFF",
          cyan: "#39D9FF",
          magenta: "#D85CFF",
          teal: "#00F5D4",
          muted: "#9292A5",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
""")

# 6. .gitignore
write_dest('.gitignore', """# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
""")

# 7. README.md
write_dest('README.md', """# NEXUS — Creative Intelligence Universe

> **“Ideas become worlds.”**

A complete, production-ready creative intelligence universe web application built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **GSAP (GreenSock)** animations.

## Architecture & Core Systems
* **Framework**: Next.js 14 (App Router with Server & Client components)
* **Animation Suite**: GSAP (GreenSock) for fluid magnetic interactions, dynamic entrance timelines, and reactive state morphing
* **Generative Systems**: Dynamic Canvas Particle Physics, non-Euclidean Core geometry, and Synaptic Neural Graph
* **Sound & Haptics**: Built-in Web Audio synthesis (harmonic chords, frequency pulses, resonance click haptics)
* **Spatial Creative Lab**: Prompt engine with Coherence & Entropy dials, multi-dimensional presets, step-by-step synthesis, and local persistence
* **Live Broadcast Ticker**: Real-time synapsing telemetry and community generation broadcasts
* **Creator Guild**: Community nomination protocol and resonant creator subscription channels

---

## Getting Started

### 1. Extract & Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm start
```

---

## File Structure
```
nexus-creative-universe/
├── app/
│   ├── layout.tsx              # Root Layout (Fonts, Context, Audio, Particles)
│   ├── page.tsx                # Home Universe View
│   ├── globals.css             # Tailwind base, utilities & dark theme
│   ├── explore/page.tsx        # 4 Dimensional Sectors
│   ├── create/page.tsx         # Generative Spatial Lab
│   ├── discover/page.tsx       # Asymmetrical Editorial Universe & Search
│   ├── intelligence/page.tsx   # Synaptic Graph & Axioms
│   ├── community/page.tsx      # Creator Guild & Transmissions
│   ├── login/page.tsx          # Neural Signature Auth
│   └── project/[slug]/page.tsx # Full-bleed interactive project
├── components/
│   ├── common/                 # MagneticButton, Navbar, Footer, CustomCursor, etc.
│   └── home/                   # Hero, NexusCore, LiveBoard, CreativeLab, etc.
├── data/                       # nexusData.ts complete universe datasets
├── lib/                        # utils.ts & NexusContext state manager
├── types/                      # index.ts complete TypeScript types
└── public/                     # Static assets
```
""")

# 8. lib/utils.ts
write_dest('lib/utils.ts', """import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
""")

# 9. types/index.ts
with open('src/types.ts', 'r', encoding='utf-8') as f:
    types_content = f.read()
write_dest('types/index.ts', types_content)

# 10. data/nexusData.ts
with open('src/data/nexusData.ts', 'r', encoding='utf-8') as f:
    data_content = f.read()
data_content = data_content.replace("from '../types'", "from '@/types'")
write_dest('data/nexusData.ts', data_content)

# 11. lib/context/NexusContext.tsx
with open('src/context/NexusContext.tsx', 'r', encoding='utf-8') as f:
    context_content = f.read()
context_content = "'use client';\n\n" + context_content.replace("from '../types'", "from '@/types'")
write_dest('lib/context/NexusContext.tsx', context_content)

# 12. app/globals.css
write_dest('app/globals.css', """@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --font-inter: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    --font-space-grotesk: "Space Grotesk", sans-serif;
    --font-ibm-plex-mono: "IBM Plex Mono", monospace;
  }
}

body {
  background-color: #03030A;
  color: #F5F5FA;
  overflow-x: hidden;
}

/* Custom futuristic scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #03030A;
}
::-webkit-scrollbar-thumb {
  background: rgba(124, 92, 255, 0.25);
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(57, 217, 255, 0.5);
}
""")

# 13. app/layout.tsx
write_dest('app/layout.tsx', """import type { Metadata } from 'next';
import './globals.css';
import { NexusProvider } from '@/lib/context/NexusContext';
import { CustomCursor } from '@/components/common/CustomCursor';
import { ParticleField } from '@/components/common/ParticleField';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'NEXUS — Ideas become worlds',
  description: 'A futuristic digital universe where creativity, intelligence, exploration, and technology meet.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#03030A] text-[#F5F5FA] font-sans antialiased selection:bg-[#7C5CFF]/30 selection:text-[#39D9FF] overflow-x-hidden min-h-screen">
        <NexusProvider>
          <CustomCursor />
          <ParticleField />
          <Navbar />
          <main className="relative z-10 min-h-screen">{children}</main>
          <Footer />
        </NexusProvider>
      </body>
    </html>
  );
}
""")

# 14. components/common
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
    if os.path.exists(src_path):
        with open(src_path, 'r', encoding='utf-8') as f:
            c = f.read()
        c = "'use client';\n\n" + transform_imports(c)
        write_dest(f'components/common/{cf}', c)

# 15. components/common/MagneticButton.tsx with GSAP
write_dest('components/common/MagneticButton.tsx', """'use client';

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

# 16. components/home
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
    if os.path.exists(src_path):
        with open(src_path, 'r', encoding='utf-8') as f:
            c = f.read()
        c = "'use client';\n\n" + transform_imports(c)
        write_dest(f'components/home/{hf}', c)

# 17. Hero with GSAP
with open('src/components/home/Hero.tsx', 'r', encoding='utf-8') as f:
    hero_code = f.read()

hero_code = transform_imports(hero_code)
hero_code = "'use client';\n\nimport gsap from 'gsap';\n" + hero_code
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
    }, heroRef);
    return () => ctx.revert();
  }, []);"""
    hero_code = hero_code.replace("const [hoverWord, setHoverWord] = useState<string | null>(null);", gsap_hook)
    hero_code = hero_code.replace('<section className="relative min-h-[92vh]', '<section ref={heroRef} className="relative min-h-[92vh]')
    hero_code = hero_code.replace('className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0A0A14]/80', 'className="hero-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0A0A14]/80')
    hero_code = hero_code.replace('className="font-display font-black text-6xl', 'className="hero-title-line font-display font-black text-6xl')
    hero_code = hero_code.replace('className="font-sans text-base md:text-xl text-[#9292A5]', 'className="hero-desc font-sans text-base md:text-xl text-[#9292A5]')

write_dest('components/home/Hero.tsx', hero_code)

# 18. Views to Next.js App Router
# app/page.tsx
with open('src/views/HomeView.tsx', 'r', encoding='utf-8') as f:
    home_view = f.read()
home_view = "'use client';\n\n" + transform_imports(home_view)
home_view = home_view.replace("export const HomeView: React.FC = () => {", "export default function HomePage() {")
write_dest('app/page.tsx', home_view)

# app/explore/page.tsx
with open('src/views/ExploreView.tsx', 'r', encoding='utf-8') as f:
    explore_view = f.read()
explore_view = "'use client';\n\n" + transform_imports(explore_view)
explore_view = explore_view.replace("export const ExploreView: React.FC = () => {", "export default function ExplorePage() {")
write_dest('app/explore/page.tsx', explore_view)

# app/create/page.tsx
with open('src/views/CreateView.tsx', 'r', encoding='utf-8') as f:
    create_view = f.read()
create_view = "'use client';\n\n" + transform_imports(create_view)
create_view = create_view.replace("export const CreateView: React.FC = () => {", "export default function CreatePage() {")
write_dest('app/create/page.tsx', create_view)

# app/discover/page.tsx
with open('src/views/DiscoverView.tsx', 'r', encoding='utf-8') as f:
    discover_view = f.read()
discover_view = "'use client';\n\n" + transform_imports(discover_view)
discover_view = discover_view.replace("export const DiscoverView: React.FC = () => {", "export default function DiscoverPage() {")
write_dest('app/discover/page.tsx', discover_view)

# app/intelligence/page.tsx
with open('src/views/IntelligenceView.tsx', 'r', encoding='utf-8') as f:
    intel_view = f.read()
intel_view = "'use client';\n\n" + transform_imports(intel_view)
intel_view = intel_view.replace("export const IntelligenceView: React.FC = () => {", "export default function IntelligencePage() {")
write_dest('app/intelligence/page.tsx', intel_view)

# app/community/page.tsx
with open('src/views/CommunityView.tsx', 'r', encoding='utf-8') as f:
    comm_view = f.read()
comm_view = "'use client';\n\n" + transform_imports(comm_view)
comm_view = comm_view.replace("export const CommunityView: React.FC = () => {", "export default function CommunityPage() {")
write_dest('app/community/page.tsx', comm_view)

# app/login/page.tsx
with open('src/views/LoginView.tsx', 'r', encoding='utf-8') as f:
    login_view = f.read()
login_view = "'use client';\n\n" + transform_imports(login_view)
login_view = login_view.replace("export const LoginView: React.FC = () => {", "export default function LoginPage() {")
write_dest('app/login/page.tsx', login_view)

# app/project/[slug]/page.tsx
with open('src/views/ProjectDetailView.tsx', 'r', encoding='utf-8') as f:
    proj_view = f.read()
proj_view = "'use client';\n\n" + transform_imports(proj_view)
proj_view = proj_view.replace(
    "export const ProjectDetailView: React.FC<{ slug: string }> = ({ slug }) => {",
    "export default function ProjectPage({ params }: { params: { slug: string } }) {\n  const slug = params.slug;"
)
write_dest('app/project/[slug]/page.tsx', proj_view)

# 19. Public assets
write_dest('public/robots.txt', "User-agent: *\nAllow: /\n")

print("All Next.js files staged successfully in:", STAGE_DIR)

# 20. Package into ZIP
for out_path in [ZIP_OUT_PUBLIC, ZIP_OUT_ROOT]:
    with zipfile.ZipFile(out_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(STAGE_DIR):
            for file in files:
                file_path = os.path.join(root, file)
                rel_path = os.path.relpath(file_path, STAGE_DIR)
                zipf.write(file_path, rel_path)
    print(f"Generated ZIP: {out_path} (Size: {os.path.getsize(out_path)} bytes)")

# Clean up staging directory
shutil.rmtree(STAGE_DIR)
print("Staging directory cleaned up. Done!")
