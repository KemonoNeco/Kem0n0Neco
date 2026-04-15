"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  size: number;
  depth: number;
}

const COLORS = ["#ff6900", "#FF00FF", "#00FFFF", "#ff690066", "#FF00FF44", "#00FFFF44"];

function createParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: Math.random() * 0.4 + 0.05,
    size: Math.random() * 2.5 + 0.5,
    depth: Math.random() * 0.5 + 0.5,
  };
}

export default function PunkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let mouse = { x: 0, y: 0 };
    let smoothMouse = { x: 0, y: 0 };

    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 120 : 300;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();

    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle(canvas.width, canvas.height));
    }

    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function draw() {
      if (!ctx || !canvas) return;

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      // Smooth mouse lerp
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.06;
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.06;

      const offsetX = (smoothMouse.x - cx) / cx;
      const offsetY = (smoothMouse.y - cy) / cy;

      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        if (p.alpha < 0.02) continue;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Parallax offset based on depth
        const parallaxX = offsetX * 30 * p.depth;
        const parallaxY = offsetY * 30 * p.depth;

        // Mouse scatter
        const dx = p.x - smoothMouse.x;
        const dy = p.y - smoothMouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let scatterX = 0;
        let scatterY = 0;
        if (dist < 120) {
          const force = (120 - dist) / 120;
          scatterX = (dx / dist) * force * 3;
          scatterY = (dy / dist) * force * 3;
        }

        const drawX = p.x + parallaxX + scatterX;
        const drawY = p.y + parallaxY + scatterY;

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", resize);
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}
