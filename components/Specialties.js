"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";

const specialties = [
  {
    n: "01",
    title: "Luxury honeymoons",
    description: "Curated romance and exclusive stays, designed for two.",
  },
  {
    n: "02",
    title: "Ziara VIP, Iraq",
    description: "Najaf, Karbala, Baghdad, and Samarra, arranged with care.",
  },
  {
    n: "03",
    title: "Medical and beauty tourism",
    description: "Trusted, discreet guidance for travel to Lebanon.",
  },
  {
    n: "04",
    title: "Corporate travel",
    description: "Priority, discretion, and luxury transfers for business.",
  },
];

export default function Specialties() {
  const [open, setOpen] = useState(0);

  return (
    <section id="specialties" className="relative overflow-hidden bg-surface px-6 py-28 text-fg">
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-30" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 60% at 15% 0%, rgba(198,161,91,0.14) 0%, rgba(34,31,29,0) 45%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl">
        <SectionHeading eyebrow="SPECIALTIES" title="What sets us apart" />

        <div className="mt-16 divide-y divide-gold/15 border-y border-gold/15">
          {specialties.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.title}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-5 py-7 text-left transition-colors duration-300 hover:bg-gold/[0.04] sm:gap-8 sm:px-3"
                >
                  <span
                    className={`font-display text-3xl transition-colors duration-300 sm:text-4xl ${
                      isOpen ? "text-gold" : "text-gold/25"
                    }`}
                  >
                    {item.n}
                  </span>
                  <span
                    className={`flex-1 font-display text-lg transition-colors duration-300 sm:text-2xl ${
                      isOpen ? "text-gold" : "text-fg"
                    }`}
                  >
                    {item.title}
                  </span>
                  <span
                    className={`flex h-9 w-9 shrink-0 rotate-0 items-center justify-center rounded-full border text-lg transition-all duration-300 ${
                      isOpen
                        ? "rotate-45 border-gold text-gold"
                        : "border-edge/25 text-fg/50"
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-[420ms] ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`max-w-xl pb-8 pr-10 text-sm leading-relaxed text-fg/60 transition-all duration-300 sm:pl-[4.75rem] ${
                        isOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
