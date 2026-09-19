import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  hue: number; // 240 (blue) to 280 (violet/cyan)
  pulseSpeed: number;
  pulseOffset: number;
}

export const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number; active: boolean }>({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Subtle particle count tuned for elegance (not cheap noise)
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 35 : 90;

    const particles: Particle[] = [];
    const hues = [255, 275, 195, 290]; // electric violet, deep blue, cyan, subtle magenta

    for (let i = 0; i < count; i++) {
      const baseAlpha = 0.12 + Math.random() * 0.28;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: 0.8 + Math.random() * 1.8,
        alpha: baseAlpha,
        baseAlpha,
        hue: hues[Math.floor(Math.random() * hues.length)],
        pulseSpeed: 0.01 + Math.random() * 0.02,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse damping
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Draw subtle ambient connection filaments between nearby particles
      const maxConnectDist = isMobile ? 60 : 105;
      const maxConnectDistSq = maxConnectDist * maxConnectDist;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Organic positional drift
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Wrap around boundaries smoothly
        if (p1.x < -20) p1.x = width + 20;
        if (p1.x > width + 20) p1.x = -20;
        if (p1.y < -20) p1.y = height + 20;
        if (p1.y > height + 20) p1.y = -20;

        // Mouse displacement: gentle organic wave repulsion
        if (mouse.active) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const radius = 180;
          if (distSq < radius * radius && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / radius) * 0.85;
            p1.x += (dx / dist) * force;
            p1.y += (dy / dist) * force;
          }
        }

        // Ambient twinkle/pulse
        const pulse = Math.sin(time * p1.pulseSpeed * 60 + p1.pulseOffset);
        p1.alpha = p1.baseAlpha * (0.75 + 0.35 * pulse);

        // Draw particle with gentle glow
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p1.hue}, 85%, 65%, ${p1.alpha})`;
        ctx.shadowColor = `hsla(${p1.hue}, 90%, 60%, 0.4)`;
        ctx.shadowBlur = p1.size * 3;
        ctx.fill();

        // Draw connection filaments
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p1.x - p2.x;
          const cdy = p1.y - p2.y;
          const cDistSq = cdx * cdx + cdy * cdy;

          if (cDistSq < maxConnectDistSq) {
            const alphaLine = (1 - cDistSq / maxConnectDistSq) * 0.12 * Math.min(p1.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `hsla(${p1.hue}, 80%, 65%, ${alphaLine})`;
            ctx.shadowBlur = 0;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
};
