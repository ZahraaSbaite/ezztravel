const paths = {
  crown: (
    <path d="M4 18h16M5 18l-1.5-9L9 12l3-6 3 6 5.5-3L19 18M5 18l14 0" />
  ),
  heart: (
    <path d="M12 20s-7-4.35-9.5-8.7C.8 8.1 2.2 4.8 5.4 4.1 7.6 3.6 9.8 4.6 12 7c2.2-2.4 4.4-3.4 6.6-2.9 3.2.7 4.6 4 2.9 7.2C19 15.65 12 20 12 20Z" />
  ),
  concierge: (
    <path d="M3 19h18M4 19a8 8 0 0 1 16 0M12 11V8m-3 0h6M12 8V6" />
  ),
  car: (
    <path d="M4 16V11l2-5h12l2 5v5M4 16h16M4 16a2 2 0 1 0 4 0M16 16a2 2 0 1 0 4 0M6 11h12" />
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9l-2 6-6 2 2-6 6-2Z" />
    </>
  ),
  shield: (
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
  ),
  medical: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  bed: (
    <path d="M3 19v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 19v-2h18v2M3 19h18M6 10V7a2 2 0 0 1 2-2h3v5" />
  ),
  lock: (
    <path d="M6 11V8a6 6 0 0 1 12 0v3M5 11h14v9H5v-9Z" />
  ),
  briefcase: (
    <path d="M4 8h16v11H4V8Zm4 0V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M4 13h16" />
  ),
  headset: (
    <path d="M4 13a8 8 0 0 1 16 0v4a2 2 0 0 1-2 2h-1v-6h3M4 13v4a2 2 0 0 0 2 2h1v-6H4Z" />
  ),
};

export const ICON_NAMES = Object.keys(paths);

export default function SpecialtyIcon({ name, className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.compass}
    </svg>
  );
}
