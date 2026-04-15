"use client";

import { useSteamPresence } from "../hooks/use-steam-presence";

export default function SteamPresence() {
  const { data, statusText, connected } = useSteamPresence();

  if (!connected || !data) {
    return (
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[var(--on-surface-variant)]">
          <path d="M11.979 0C5.678 0 .511 4.86.022 10.96l6.432 2.658a3.387 3.387 0 011.912-.586c.064 0 .127.002.19.006l2.861-4.142V8.86a4.495 4.495 0 014.501-4.494 4.495 4.495 0 014.501 4.494 4.495 4.495 0 01-4.501 4.494h-.105l-4.076 2.907c0 .052.004.105.004.159 0 1.869-1.52 3.388-3.388 3.388a3.393 3.393 0 01-3.349-2.868L.093 15.146C1.476 20.236 6.283 24 11.979 24c6.627 0 12.001-5.373 12.001-12S18.606 0 11.979 0z" />
        </svg>
        <span className="font-[family-name:var(--font-display)] text-xs text-[var(--on-surface-variant)]">
          Steam not configured
        </span>
      </div>
    );
  }

  const isPlaying = !!data.gameextrainfo;

  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0 text-[var(--tertiary)]">
        <path d="M11.979 0C5.678 0 .511 4.86.022 10.96l6.432 2.658a3.387 3.387 0 011.912-.586c.064 0 .127.002.19.006l2.861-4.142V8.86a4.495 4.495 0 014.501-4.494 4.495 4.495 0 014.501 4.494 4.495 4.495 0 01-4.501 4.494h-.105l-4.076 2.907c0 .052.004.105.004.159 0 1.869-1.52 3.388-3.388 3.388a3.393 3.393 0 01-3.349-2.868L.093 15.146C1.476 20.236 6.283 24 11.979 24c6.627 0 12.001-5.373 12.001-12S18.606 0 11.979 0z" />
      </svg>
      <div className="min-w-0 flex-1">
        <span
          className="font-[family-name:var(--font-display)] text-xs truncate block"
          style={{ color: isPlaying ? "var(--tertiary)" : "var(--on-surface-variant)" }}
        >
          {statusText}
        </span>
      </div>
    </div>
  );
}
