"use client";

export default function AvatarSection() {
  return (
    <div className="relative flex justify-center">
      {/* Avatar container */}
      <div className="relative">
        <div
          className="w-28 h-28 rounded-full overflow-hidden"
          style={{
            boxShadow: "0 0 30px rgba(255, 105, 0, 0.2), 0 0 60px rgba(255, 105, 0, 0.1)",
          }}
        >
          {/* Placeholder avatar — gradient ring */}
          <div className="w-full h-full bg-gradient-to-br from-[var(--primary)] via-[var(--secondary)] to-[var(--tertiary)] flex items-center justify-center">
            <span className="text-4xl font-bold text-black font-[family-name:var(--font-display)]">
              K
            </span>
          </div>
        </div>
        {/* Online indicator dot */}
        <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[var(--status-online)] border-2 border-[var(--bg)]" />
      </div>
    </div>
  );
}
