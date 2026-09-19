import os
import re
import shutil
import zipfile

SOURCE_DIR = 'src'
TARGET_DIR = '/tmp/nexus-creative-universe'

if os.path.exists(TARGET_DIR):
    shutil.rmtree(TARGET_DIR)

os.makedirs(f"{TARGET_DIR}/app/explore", exist_ok=True)
os.makedirs(f"{TARGET_DIR}/app/create", exist_ok=True)
os.makedirs(f"{TARGET_DIR}/app/discover", exist_ok=True)
os.makedirs(f"{TARGET_DIR}/app/intelligence", exist_ok=True)
os.makedirs(f"{TARGET_DIR}/app/community", exist_ok=True)
os.makedirs(f"{TARGET_DIR}/app/login", exist_ok=True)
os.makedirs(f"{TARGET_DIR}/app/project/[slug]", exist_ok=True)
os.makedirs(f"{TARGET_DIR}/components/common", exist_ok=True)
os.makedirs(f"{TARGET_DIR}/components/home", exist_ok=True)
os.makedirs(f"{TARGET_DIR}/data", exist_ok=True)
os.makedirs(f"{TARGET_DIR}/lib/context", exist_ok=True)
os.makedirs(f"{TARGET_DIR}/types", exist_ok=True)
os.makedirs(f"{TARGET_DIR}/public", exist_ok=True)

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content.strip() + '\n')

print("Generating Next.js + TS + Tailwind + GSAP project...")

# 1. package.json
write_file(f"{TARGET_DIR}/package.json", """{
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
write_file(f"{TARGET_DIR}/tsconfig.json", """{
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
write_file(f"{TARGET_DIR}/next.config.mjs", """/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
""")

# 4. postcss.config.mjs
write_file(f"{TARGET_DIR}/postcss.config.mjs", """export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
""")

# 5. tailwind.config.ts
write_file(f"{TARGET_DIR}/tailwind.config.ts", """import type { Config } from "tailwindcss";

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
write_file(f"{TARGET_DIR}/.gitignore", """# dependencies
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
write_file(f"{TARGET_DIR}/README.md", """# NEXUS — Creative Intelligence Universe

> **“Ideas become worlds.”**

A complete, production-ready creative intelligence universe web application built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **GSAP (GreenSock)** animations.

## Architecture & Features
* **Framework**: Next.js 14 (App Router, Server & Client architecture)
* **Animation Suite**: GSAP (GreenSock) for magnetic interaction pulls, entrance timelines, and reactive state morphing
* **Generative Systems**: Dynamic Canvas Particle Physics, non-Euclidean Core geometry, and Synaptic Neural Graph
* **Sound Design**: Built-in Web Audio synthesis (harmonic chords, frequency pulses, resonance click haptics)
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
├── data/                       # nexusData.ts complete mock universe datasets
├── lib/                        # utils.ts & NexusContext state manager
├── types/                      # index.ts complete TypeScript types
└── public/                     # Static assets
```
""")

# 8. lib/utils.ts
write_file(f"{TARGET_DIR}/lib/utils.ts", """import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
""")

print("Base Next.js configurations generated.")
