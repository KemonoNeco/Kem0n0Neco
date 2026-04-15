"use client";

const stickers = [
  {
    emoji: "🐾",
    top: "-12px",
    right: "-16px",
    rotation: "3deg",
    size: "32px",
  },
  {
    emoji: "⚡",
    bottom: "60px",
    left: "-20px",
    rotation: "-4deg",
    size: "28px",
  },
  {
    emoji: "★",
    top: "120px",
    right: "-22px",
    rotation: "6deg",
    size: "24px",
    color: "var(--primary)",
  },
  {
    emoji: "✦",
    bottom: "180px",
    left: "-18px",
    rotation: "-2deg",
    size: "20px",
    color: "var(--secondary)",
  },
  {
    emoji: "🎮",
    top: "280px",
    right: "-14px",
    rotation: "5deg",
    size: "26px",
  },
];

export default function StickerLayer() {
  return (
    <>
      {stickers.map((s, i) => (
        <div
          key={i}
          className="absolute select-none pointer-events-none sticker z-10"
          style={
            {
              top: s.top,
              bottom: (s as { bottom?: string }).bottom,
              left: s.left,
              right: s.right,
              "--rotation": s.rotation,
              transform: `rotate(${s.rotation})`,
              fontSize: s.size,
              color: s.color,
              filter:
                "drop-shadow(0 0 4px rgba(0,0,0,0.6)) drop-shadow(0 0 1px white)",
            } as React.CSSProperties
          }
        >
          {s.emoji}
        </div>
      ))}
    </>
  );
}
