"use client";

export default function UsernameDisplay() {
  return (
    <div className="text-center">
      <h1
        className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--on-surface)]"
        style={{ animation: "glitch-text 4s ease-in-out infinite" }}
      >
        Kem0n0Neco
      </h1>
      <p className="mt-1 font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.2em] text-[var(--on-surface-variant)]">
        fursuiter &bull; developer &bull; gamer
      </p>
    </div>
  );
}
