"use client";

import { useEffect } from "react";
import SpecialtyCard from "./SpecialtyCard";

export default function SpecialtyModal({ item, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-night/85 p-4 backdrop-blur-md animate-fade-up"
      style={{ animationDuration: "200ms" }}
      onClick={onClose}
    >
      <div className="w-full max-w-xl" onClick={(e) => e.stopPropagation()}>
        <SpecialtyCard item={item} onClose={onClose} />
      </div>
    </div>
  );
}
