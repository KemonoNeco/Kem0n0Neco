"use client";

import { useEffect, useState, useCallback } from "react";

export interface SteamData {
  personaname: string;
  personastate: number;
  gameextrainfo?: string;
  gameid?: string;
  avatarfull: string;
  profileurl: string;
}

const STATUS_MAP: Record<number, string> = {
  0: "Offline",
  1: "Online",
  2: "Busy",
  3: "Away",
  4: "Snooze",
  5: "Looking to Trade",
  6: "Looking to Play",
};

export function useSteamPresence() {
  const [data, setData] = useState<SteamData | null>(null);
  const [connected, setConnected] = useState(false);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/steam");
      if (!res.ok) return;
      const json = await res.json();
      setData(json);
      setConnected(true);
    } catch {
      setConnected(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  const statusText = data
    ? data.gameextrainfo
      ? `Playing ${data.gameextrainfo}`
      : STATUS_MAP[data.personastate] ?? "Unknown"
    : null;

  return { data, statusText, connected };
}
