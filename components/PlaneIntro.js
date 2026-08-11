"use client";

import { useEffect, useRef, useState } from "react";

const FADE_MS = 850;

export default function PlaneIntro() {
  const [phase, setPhase] = useState("flying"); // flying -> leaving -> done
  const playedOnceRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) {
      const t = setTimeout(finish, 400);
      return () => clearTimeout(t);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finish() {
    setPhase("done");
    document.body.style.overflow = "";
  }

  function leave() {
    setPhase("leaving");
    setTimeout(finish, FADE_MS);
  }

  function handleEnded() {
    playedOnceRef.current = true;
    leave();
  }

  function handlePlay(e) {
    // guard against any re-trigger (e.g. dev hot-reload remount) replaying it
    if (playedOnceRef.current) {
      e.currentTarget.pause();
      return;
    }
    playedOnceRef.current = true;
  }

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] overflow-hidden bg-charcoal-dark transition-opacity duration-[850ms] ease-out ${
        phase === "leaving" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(120% 90% at 50% 118%, rgba(198,161,91,0.28) 0%, rgba(198,161,91,0.08) 22%, rgba(34,31,29,0) 45%), linear-gradient(180deg, #131110 0%, #221F1D 55%, #2c2723 100%)",
      }}
    >
      {/* stars — static, no motion */}
      <div className="absolute inset-0">
        {[...Array(28)].map((_, i) => (
          <span
            key={i}
            className="absolute block rounded-full bg-ink/70"
            style={{
              width: `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
              left: `${(i * 37) % 100}%`,
              top: `${(i * 19) % 60}%`,
              opacity: 0.5 + ((i % 4) * 0.5) / 4,
            }}
          />
        ))}
      </div>

      {/* horizon glow line */}
      <div className="absolute inset-x-0 bottom-[26%] h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

      {/* far cloud layer — static */}
      <div className="absolute inset-x-[-15%] bottom-[8%] h-40 opacity-30">
        <CloudBand tone="#5FA0C4" />
      </div>
      {/* near cloud layer — static */}
      <div className="absolute inset-x-[-15%] bottom-0 h-56 opacity-40">
        <CloudBand tone="#332F2B" />
      </div>

      {/* the plane: real footage, chroma-keyed transparent. Plays once, then reveals Home. */}
      <div className="absolute inset-0 flex items-center justify-center">
        <video
          src="/plane-intro.webm"
          autoPlay
          muted
          playsInline
          preload="auto"
          onPlay={handlePlay}
          onEnded={handleEnded}
          onError={finish}
          className="h-screen w-screen object-cover drop-shadow-[0_24px_70px_rgba(0,0,0,0.6)]"
        />
      </div>

      <button
        type="button"
        onClick={leave}
        className="absolute bottom-6 right-6 z-10 rounded-sm border border-ink/20 px-4 py-2 font-mono text-[11px] tracking-[0.2em] text-ink/60 backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
      >
        SKIP
      </button>
    </div>
  );
}

function CloudBand({ tone }) {
  return (
    <svg viewBox="0 0 1000 160" className="h-full w-full" preserveAspectRatio="none">
      <path
        d="M0,140 Q60,80 140,120 Q200,70 280,110 Q340,60 430,105 Q500,70 580,110 Q660,75 740,115 Q820,80 900,118 Q960,95 1000,120 L1000,160 L0,160 Z"
        fill={tone}
      />
    </svg>
  );
}
