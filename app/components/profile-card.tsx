"use client";

import AvatarSection from "./avatar-section";
import UsernameDisplay from "./username-display";
import DiscordPresence from "./discord-presence";
import SteamPresence from "./steam-presence";
import SocialLinks from "./social-links";
import FursuitSection from "./fursuit-section";
import GithubShowcase from "./github-showcase";

export default function ProfileCard() {
  return (
    <div className="glass-card w-full max-w-[440px] overflow-visible">
      {/* Avatar + Username */}
      <div className="px-6 pt-8 pb-6 flex flex-col items-center gap-4">
        <AvatarSection />
        <UsernameDisplay />
      </div>

      {/* Presence section */}
      <div className="px-6 py-4 bg-[var(--surface-lowest)]">
        <DiscordPresence />
        <div className="mt-3">
          <SteamPresence />
        </div>
      </div>

      {/* Jagged separator */}
      <div className="jagged-edge-top" />

      {/* Fursuit + Social */}
      <div className="px-6 py-5 flex flex-col gap-5">
        <FursuitSection />
        <SocialLinks />
      </div>

      {/* GitHub section */}
      <div className="px-6 py-5 bg-[var(--surface-lowest)]">
        <GithubShowcase />
      </div>
    </div>
  );
}
