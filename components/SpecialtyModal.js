"use client";

import { useEffect } from "react";
import SpecialtyCard from "./SpecialtyCard";

export default function SpecialtyModal({ item, onClose, onPrev, onNext, position }) {
  useEffect(() => {
    // This modal is only meant to be visible below the lg breakpoint (it's
    // hidden with a CSS class on larger screens), but it still mounts there.
    // Skip the scroll lock on desktop or it stays locked with nothing visible
    // to close it.
    if (window.matchMedia("(min-width: 1024px)").matches) return;

    document.body.style.overflow = "hidden";
    function handleKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-night/85 p-4 backdrop-blur-md animate-fade-up"
      style={{ animationDuration: "200ms" }}
      onClick={onClose}
    >
      <div className="w-full max-w-xl" onClick={(e) => e.stopPropagation()}>
        <SpecialtyCard item={item} onClose={onClose} onPrev={onPrev} onNext={onNext} position={position} />
      </div>
    </div>
  );
}
