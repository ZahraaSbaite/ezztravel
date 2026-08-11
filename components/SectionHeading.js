export default function SectionHeading({ eyebrow, title, align = "center" }) {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "text-center" : "text-left"}>
      <div className={`ornament ${isCenter ? "" : "justify-start before:hidden"}`}>
        <span className="font-mono text-[11px] tracking-[0.35em] text-gold">
          {eyebrow}
        </span>
      </div>
      <h2 className="mt-4 font-display text-3xl text-fg md:text-4xl">
        {title}
      </h2>
    </div>
  );
}
