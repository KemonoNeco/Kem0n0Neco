"use client";

import { useState } from "react";
import SplashScreen from "./components/splash-screen";
import ProfileCard from "./components/profile-card";
import StickerLayer from "./components/sticker-layer";
import PunkCanvas from "./background/punk-canvas";

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [splashFading, setSplashFading] = useState(false);

  function handleEnter() {
    setSplashFading(true);
    setTimeout(() => setEntered(true), 600);
  }

  return (
    <>
      <PunkCanvas />

      {/* Splash screen */}
      {!entered && (
        <div
          style={{
            transition: "opacity 0.6s ease",
            opacity: splashFading ? 0 : 1,
          }}
        >
          <SplashScreen onEnter={handleEnter} />
        </div>
      )}

      {/* Main content */}
      {entered && (
        <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-12">
          <div className="relative animate-fade-in-up">
            {/* Sticker overlays */}
            <StickerLayer />
            {/* Profile card */}
            <ProfileCard />
          </div>
        </main>
      )}
    </>
  );
}
