"use client";

import { useLanyard } from "../hooks/use-lanyard";

const DISCORD_ID = process.env.NEXT_PUBLIC_DISCORD_ID ?? "";

const STATUS_COLORS: Record<string, string> = {
  online: "var(--status-online)",
  idle: "var(--status-idle)",
  dnd: "var(--status-dnd)",
  offline: "var(--status-offline)",
};

export default function DiscordPresence() {
  const { data, connected } = useLanyard(DISCORD_ID);

  if (!DISCORD_ID) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-[var(--status-offline)]" />
        <span className="font-[family-name:var(--font-display)] text-xs text-[var(--on-surface-variant)]">
          Discord not configured
        </span>
      </div>
    );
  }

  if (!connected || !data) {
    return (
      <div className="flex items-center gap-3">
        <div
          className="w-2 h-2 rounded-full bg-[var(--on-surface-variant)]"
          style={{ animation: "pulse-glow 1.5s ease-in-out infinite" }}
        />
        <span className="font-[family-name:var(--font-display)] text-xs text-[var(--on-surface-variant)]">
          Loading Discord presence...
        </span>
      </div>
    );
  }

  const activity = data.activities.find((a) => a.type === 0);
  const displayName = data.discord_user.global_name ?? data.discord_user.username;

  return (
    <div className="flex items-start gap-3">
      {/* Status dot */}
      <div
        className="w-2 h-2 rounded-full mt-1.5 shrink-0"
        style={{ backgroundColor: STATUS_COLORS[data.discord_status] }}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-[family-name:var(--font-display)] text-sm font-medium text-[var(--on-surface)]">
            {displayName}
          </span>
          <span className="font-[family-name:var(--font-display)] text-xs text-[var(--on-surface-variant)] capitalize">
            {data.discord_status}
          </span>
        </div>

        {activity && (
          <p className="text-xs text-[var(--primary)] truncate mt-0.5">
            {activity.name}
            {activity.details && (
              <span className="text-[var(--on-surface-variant)]">
                {" "}— {activity.details}
              </span>
            )}
          </p>
        )}

        {data.listening_to_spotify && data.spotify && (
          <p className="text-xs text-[var(--status-online)] truncate mt-0.5">
            🎵 {data.spotify.song} — {data.spotify.artist}
          </p>
        )}
      </div>
    </div>
  );
}
