import { supabase } from "@/lib/supabaseClient";

export default async function About() {
  const { data: about } = await supabase.from("about_content").select("*").eq("id", 1).maybeSingle();
  if (!about) return null;

  const headingLines = (about.heading || "").split("\n");
  const stats = about.stats?.length ? about.stats : [];

  return (
    <section id="about" className="relative overflow-hidden bg-surface px-6 py-28">
      {/* oversized quotation glyph */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none font-display text-[13rem] leading-none text-fg/[0.045] md:text-[18rem]"
      >
        &rdquo;
      </span>

      <div className="relative mx-auto grid max-w-6xl gap-14 md:grid-cols-12 md:gap-x-16">
        {/* left rail: heading, pull-quote, stats */}
        <div className="md:sticky md:top-28 md:col-span-4 md:self-start">
          <div className="flex items-center gap-3 text-gold/70">
            <span className="h-px w-10 bg-current opacity-50" />
            <span className="font-mono text-[11px] tracking-[0.35em] text-gold">
              {about.eyebrow}
            </span>
          </div>
          <h2 className="mt-4 font-display text-4xl leading-[1.1] text-fg">
            {headingLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < headingLines.length - 1 && <br />}
              </span>
            ))}
          </h2>

          <p className="mt-7 border-l-2 border-gold/50 pl-5 font-display text-xl italic leading-relaxed text-fg/75">
            {about.pull_quote}
          </p>

          <div className="mt-12 space-y-5">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="flex items-baseline gap-4 border-b border-edge/10 pb-4"
                style={{ marginLeft: `${i * 14}px` }}
              >
                <p className="font-display text-3xl text-gold">{s.value}</p>
                <p className="text-xs uppercase tracking-[0.15em] text-fg/50">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* right column: narrative */}
        <div className="md:col-span-8 md:pt-3">
          <p className="leading-[1.9] text-fg/70">
            <span className="float-left mr-3 mt-1 font-display text-7xl font-bold leading-[0.8] text-gold">
              E
            </span>
            {about.paragraph_1}
          </p>

          <p className="mt-6 leading-[1.9] text-fg/70">{about.paragraph_2}</p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-gold/40 via-gold/10 to-transparent" />
            <a
              href={about.whatsapp_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-gold/40 px-5 py-2.5 text-sm text-fg transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold hover:shadow-gold-glow"
            >
              {about.whatsapp_label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
