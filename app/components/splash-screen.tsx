"use client";

import { useCallback } from "react";

export default function SplashScreen({ onEnter }: { onEnter: () => void }) {
  const handleClick = useCallback(() => {
    onEnter();
  }, [onEnter]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer bg-[var(--bg)]"
      onClick={handleClick}
    >
      <h1
        className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-[var(--on-surface)]"
        style={{ animation: "glitch-text 3s ease-in-out infinite" }}
      >
        Kem0n0Neco
      </h1>
      <p
        className="mt-6 font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.3em] text-[var(--on-surface-variant)]"
        style={{ animation: "breathe 2.5s ease-in-out infinite" }}
      >
        click to enter
      </p>
    </div>
  );
}
