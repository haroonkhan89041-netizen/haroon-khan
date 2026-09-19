import os
import zipfile
import shutil

BASE_DIR = '/tmp/nexus-nextjs'
os.makedirs(BASE_DIR, exist_ok=True)

def write_f(rel_path, content):
    full_path = os.path.join(BASE_DIR, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content.strip() + '\n')
    print(f"OK: {rel_path}")

# 1. package.json
write_f('package.json', """{
  "name": "nexus-creative-universe",
  "version": "1.0.0",
  "private": true,
  "description": "NEXUS — Ideas become worlds. Next.js, Tailwind, GSAP, and TypeScript",
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
write_f('tsconfig.json', """{
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
write_f('next.config.mjs', """/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
""")

# 4. postcss.config.mjs
write_f('postcss.config.mjs', """export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
""")

# 5. tailwind.config.ts
write_f('tailwind.config.ts', """import type { Config } from "tailwindcss";

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
    },
  },
  plugins: [],
};
export default config;
""")

# 6. .gitignore
write_f('.gitignore', """# dependencies
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
write_f('README.md', """# NEXUS — Creative Intelligence Universe

> **“Ideas become worlds.”**

A complete, production-grade creative intelligence universe application built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **GSAP (GreenSock)** animations.

## Highlights
- **Framework**: Next.js 14 (App Router, Server & Client Components)
- **Animation Engine**: GSAP (GreenSock) for magnetic buttons, timelines, text reveals, and interactive dynamics
- **Interactive Canvases**: Dynamic non-Euclidean Core, physics-driven cosmic Particle Field, and animated Intelligence Synapse Graph
- **Sound & Haptics**: Web Audio synthetic harmonic feedback (chords, pulses, resonance clicks)
- **Spatial Generative Lab**: Generative prompt engine with seed presets, coherence/entropy sliders, step-by-step synthesis, and local artifact persistence
- **Live Global Ticker**: Real-time synapsing feed with submission broadcast
- **Creator Guild**: Resonant subscription model and guild nomination protocol

---

## Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience the universe.

### 3. Build for Production
```bash
npm run build
npm start
```

---

## Project Structure
```
nexus-creative-universe/
├── app/
│   ├── layout.tsx              # Root Next.js layout (Fonts, Providers, Cursor, ParticleField)
│   ├── page.tsx                # Dynamic Home view (Hero, NexusCore, Explore, LiveBoard, etc.)
│   ├── globals.css             # Global Tailwind directives & dark sci-fi styling
│   ├── explore/page.tsx        # 4 Dimensional Sectors
│   ├── create/page.tsx         # Generative Spatial Lab & Artifacts
│   ├── discover/page.tsx       # Asymmetrical Editorial Universe & Search
│   ├── intelligence/page.tsx   # Synaptic Graph & Axioms
│   ├── community/page.tsx      # Creator Guild & Transmissions
│   ├── login/page.tsx          # Neural Signature Auth
│   └── project/[slug]/page.tsx # Full-bleed project experience
├── components/
│   ├── common/                 # Navbar, Footer, CustomCursor, ParticleField, MagneticButton, etc.
│   └── home/                   # Hero, NexusCore, LiveBoard, CreativeLab, IntelligenceGraph, etc.
├── data/                       # Rich dataset for projects, dimensions, nodes, and creators
├── lib/                        # Context state management & utility helpers
├── types/                      # Complete TypeScript definitions
└── public/                     # Static assets & icons
```

Built for visionary creators and future explorers.
""")

print("Config and root files created successfully.")
