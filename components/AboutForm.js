"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const emptyStat = { value: "", label: "" };

export default function AboutForm({ about }) {
  const router = useRouter();

  const [eyebrow, setEyebrow] = useState(about.eyebrow || "");
  const [heading, setHeading] = useState(about.heading || "");
  const [pullQuote, setPullQuote] = useState(about.pull_quote || "");
  const [paragraph1, setParagraph1] = useState(about.paragraph_1 || "");
  const [paragraph2, setParagraph2] = useState(about.paragraph_2 || "");
  const [stats, setStats] = useState(about.stats?.length ? about.stats : [{ ...emptyStat }]);
  const [whatsappLink, setWhatsappLink] = useState(about.whatsapp_link || "");
  const [whatsappLabel, setWhatsappLabel] = useState(about.whatsapp_label || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const inputClass =
    "w-full rounded-sm border border-edge/20 bg-transparent px-3 py-2 text-sm text-fg outline-none transition-colors focus:border-gold";

  function updateStat(i, field, value) {
    setStats((prev) => prev.map((s, idx) => (idx === i ? { ...s, [field]: value } : s)));
  }

  function addStat() {
    setStats((prev) => [...prev, { ...emptyStat }]);
  }

  function removeStat(i) {
    setStats((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaved(false);

    if (!heading.trim() || !paragraph1.trim()) {
      setError("Heading and the first paragraph are required.");
      return;
    }

    const cleanStats = stats
      .map((s) => ({ value: s.value.trim(), label: s.label.trim() }))
      .filter((s) => s.value || s.label);

    setSaving(true);
    const payload = {
      eyebrow: eyebrow.trim() || "ABOUT",
      heading: heading.trim(),
      pull_quote: pullQuote.trim(),
      paragraph_1: paragraph1.trim(),
      paragraph_2: paragraph2.trim(),
      stats: cleanStats,
      whatsapp_link: whatsappLink.trim(),
      whatsapp_label: whatsappLabel.trim(),
      updated_at: new Date().toISOString(),
    };

    const { error: saveError } = await supabase.from("about_content").update(payload).eq("id", 1);

    setSaving(false);
    if (saveError) {
      setError(saveError.message);
      return;
    }
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-gold/20 bg-panel p-8">
      <div>
        <label className="mb-1 block text-sm text-fg/70" htmlFor="eyebrow">
          Eyebrow label
        </label>
        <input
          id="eyebrow"
          value={eyebrow}
          onChange={(e) => setEyebrow(e.target.value)}
          maxLength={40}
          className={inputClass}
          placeholder="ABOUT"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-fg/70" htmlFor="heading">
          Heading
        </label>
        <textarea
          id="heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          rows={2}
          className={inputClass}
          placeholder={"Built on trust,\nnot popularity"}
        />
        <p className="mt-1 text-xs text-fg/40">Each line becomes a new line in the heading.</p>
      </div>

      <div>
        <label className="mb-1 block text-sm text-fg/70" htmlFor="pullQuote">
          Pull quote
        </label>
        <textarea
          id="pullQuote"
          value={pullQuote}
          onChange={(e) => setPullQuote(e.target.value)}
          rows={2}
          className={inputClass}
          placeholder="Discover the world with discretion, comfort, and priority."
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-fg/70" htmlFor="paragraph1">
          First paragraph
        </label>
        <textarea
          id="paragraph1"
          value={paragraph1}
          onChange={(e) => setParagraph1(e.target.value)}
          rows={5}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-fg/70" htmlFor="paragraph2">
          Second paragraph
        </label>
        <textarea
          id="paragraph2"
          value={paragraph2}
          onChange={(e) => setParagraph2(e.target.value)}
          rows={5}
          className={inputClass}
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm text-fg/70">Stats</p>
          <button type="button" onClick={addStat} className="text-xs text-gold hover:text-gold-light">
            + Add stat
          </button>
        </div>
        <div className="space-y-3">
          {stats.map((s, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-edge/15 p-4">
              <div className="flex-1 space-y-2">
                <input
                  value={s.value}
                  onChange={(e) => updateStat(i, "value", e.target.value)}
                  placeholder="20+"
                  className={inputClass}
                />
                <input
                  value={s.label}
                  onChange={(e) => updateStat(i, "label", e.target.value)}
                  placeholder="Years of experience"
                  className={inputClass}
                />
              </div>
              <button
                type="button"
                onClick={() => removeStat(i)}
                aria-label="Remove stat"
                className="shrink-0 text-sm text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </div>
          ))}
          {stats.length === 0 && <p className="text-sm text-fg/40">No stats yet.</p>}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-fg/70" htmlFor="whatsappLink">
            WhatsApp link
          </label>
          <input
            id="whatsappLink"
            value={whatsappLink}
            onChange={(e) => setWhatsappLink(e.target.value)}
            className={inputClass}
            placeholder="https://wa.me/96181839155"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-fg/70" htmlFor="whatsappLabel">
            WhatsApp button text
          </label>
          <input
            id="whatsappLabel"
            value={whatsappLabel}
            onChange={(e) => setWhatsappLabel(e.target.value)}
            className={inputClass}
            placeholder="WhatsApp +961 81 839 155"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
      {saved && !error && <p className="text-sm text-emerald-400">Saved.</p>}

      <div className="flex items-center gap-3 border-t border-edge/10 pt-6">
        <button
          type="submit"
          disabled={saving}
          className="rounded-sm bg-gold px-6 py-2.5 text-sm font-medium text-night transition-all hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-gold-glow disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-fg/60 hover:text-gold"
        >
          View section ↗
        </a>
      </div>
    </form>
  );
}
