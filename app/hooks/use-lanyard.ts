"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface LanyardActivity {
  name: string;
  state?: string;
  details?: string;
  type: number;
  application_id?: string;
  timestamps?: { start?: number; end?: number };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
}

export interface LanyardData {
  discord_user: {
    id: string;
    username: string;
    display_name?: string;
    avatar: string;
    global_name?: string;
  };
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: LanyardActivity[];
  listening_to_spotify: boolean;
  spotify?: {
    song: string;
    artist: string;
    album: string;
    album_art_url: string;
    timestamps: { start: number; end: number };
  };
}

export function useLanyard(discordId: string) {
  const [data, setData] = useState<LanyardData | null>(null);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const connect = useCallback(() => {
    if (!discordId) return;

    const ws = new WebSocket("wss://api.lanyard.rest/socket");
    wsRef.current = ws;

    ws.onopen = () => setConnected(true);

    ws.onmessage = (event) => {
      let msg;
      try {
        msg = JSON.parse(event.data);
      } catch {
        return;
      }

      if (msg.op === 1) {
        // Hello — start heartbeat and subscribe
        const interval = msg.d.heartbeat_interval;
        heartbeatRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ op: 3 }));
          }
        }, interval);

        ws.send(
          JSON.stringify({
            op: 2,
            d: { subscribe_to_id: discordId },
          })
        );
      }

      if (msg.op === 0) {
        // Event — INIT_STATE or PRESENCE_UPDATE
        if (msg.t === "INIT_STATE" || msg.t === "PRESENCE_UPDATE") {
          setData(msg.d);
        }
      }
    };

    ws.onclose = () => {
      setConnected(false);
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
      reconnectTimeoutRef.current = setTimeout(connect, 5000);
    };

    ws.onerror = () => ws.close();
  }, [discordId]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    };
  }, [connect]);

  return { data, connected };
}
