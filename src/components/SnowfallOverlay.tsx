import { useEffect, useRef } from "react";

interface Flake {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  driftX: number;
  alpha: number;
  phase: number;
}

export function SnowfallOverlay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let width = 0;
    let height = 0;
    let flakes: Flake[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 640 ? 18 : 30;
      flakes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1 + Math.random() * 2.1,
        speedY: 0.28 + Math.random() * 0.45,
        driftX: (Math.random() - 0.5) * 0.25,
        alpha: 0.16 + Math.random() * 0.34,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      if (document.hidden) {
        rafId = window.requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      for (const flake of flakes) {
        flake.phase += 0.012;
        flake.y += flake.speedY;
        flake.x += flake.driftX + Math.sin(flake.phase) * 0.22;

        if (flake.y > height + 6) {
          flake.y = -6;
          flake.x = Math.random() * width;
        }
        if (flake.x > width + 6) flake.x = -6;
        if (flake.x < -6) flake.x = width + 6;

        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 245, 230, ${flake.alpha})`;
        ctx.fill();
      }
      rafId = window.requestAnimationFrame(draw);
    };

    resize();
    rafId = window.requestAnimationFrame(draw);

    const onMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        window.cancelAnimationFrame(rafId);
        ctx.clearRect(0, 0, width, height);
      }
    };

    window.addEventListener("resize", resize);
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}