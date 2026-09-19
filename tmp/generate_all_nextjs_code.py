import os
import re
import zipfile

TARGET = '/tmp/nexus-creative-universe'

# 1. types/index.ts
with open('src/types.ts', 'r', encoding='utf-8') as f:
    types_content = f.read()

with open(f'{TARGET}/types/index.ts', 'w', encoding='utf-8') as f:
    f.write(types_content)
print("types/index.ts written")

# 2. data/nexusData.ts
with open('src/data/nexusData.ts', 'r', encoding='utf-8') as f:
    data_content = f.read()

# replace relative import with @/types
data_content = data_content.replace("from '../types'", "from '@/types'")
with open(f'{TARGET}/data/nexusData.ts', 'w', encoding='utf-8') as f:
    f.write(data_content)
print("data/nexusData.ts written")

# 3. lib/context/NexusContext.tsx
with open('src/context/NexusContext.tsx', 'r', encoding='utf-8') as f:
    context_content = f.read()

context_content = "'use client';\n\n" + context_content.replace("from '../types'", "from '@/types'")
with open(f'{TARGET}/lib/context/NexusContext.tsx', 'w', encoding='utf-8') as f:
    f.write(context_content)
print("lib/context/NexusContext.tsx written")

# 4. app/globals.css
with open(f'{TARGET}/app/globals.css', 'w', encoding='utf-8') as f:
    f.write("""@tailwind base;
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
print("app/globals.css written")

# 5. app/layout.tsx
with open(f'{TARGET}/app/layout.tsx', 'w', encoding='utf-8') as f:
    f.write("""import type { Metadata } from 'next';
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
print("app/layout.tsx written")

print("Stage 1 complete.")
