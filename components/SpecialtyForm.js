"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import SpecialtyIcon, { ICON_NAMES } from "./SpecialtyIcon";

const emptyFeature = { icon: ICON_NAMES[0], title: "", description: "" };

export default function SpecialtyForm({ specialty = null }) {
  const router = useRouter();
  const isEdit = Boolean(specialty);

  const [title, setTitle] = useState(specialty?.title || "");
  const [description, setDescription] = useState(specialty?.description || "");
  const [subtitle, setSubtitle] = useState(specialty?.subtitle || "");
  const [longDescription, setLongDescription] = useState(specialty?.long_description || "");
  const [cta, setCta] = useState(specialty?.cta || "Learn more");
  const [position, setPosition] = useState(specialty?.position ?? 0);
  const [published, setPublished] = useState(specialty ? specialty.published : true);
  const [features, setFeatures] = useState(
    specialty?.features?.length ? specialty.features : [{ ...emptyFeature }]
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const inputClass =
    "w-full rounded-sm border border-edge/20 bg-transparent px-3 py-2 text-sm text-fg outline-none transition-colors focus:border-gold";

  function updateFeature(i, field, value) {
    setFeatures((prev) => prev.map((f, idx) => (idx === i ? { ...f, [field]: value } : f)));
  }

  function addFeature() {
    setFeatures((prev) => [...prev, { ...emptyFeature }]);
  }

  function removeFeature(i) {
    setFeatures((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    const cleanFeatures = features
      .map((f) => ({ icon: f.icon, title: f.title.trim(), description: f.description.trim() }))
      .filter((f) => f.title || f.description);

    setSaving(true);
    const payload = {
      title: title.trim(),
      description: description.trim(),
      subtitle: subtitle.trim(),
      long_description: longDescription.trim(),
      cta: cta.trim() || "Learn more",
      position: Number(position) || 0,
      published,
      features: cleanFeatures,
    };

    const { error: saveError } = isEdit
      ? await supabase.from("specialties").update(payload).eq("id", specialty.id)
      : await supabase.from("specialties").insert(payload);

    if (saveError) {
      setError(saveError.message);
      setSaving(false);
      return;
    }
    router.push("/admin/specialties");
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm("Delete this specialty? This cannot be undone.")) return;
    setSaving(true);
    const { error: deleteError } = await supabase
      .from("specialties")
      .delete()
      .eq("id", specialty.id);
    if (deleteError) {
      setError(deleteError.message);
      setSaving(false);
      return;
    }
    router.push("/admin/specialties");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-gold/20 bg-panel p-8">
      <div>
        <label className="mb-1 block text-sm text-fg/70" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={80}
          className={inputClass}
          placeholder="Luxury honeymoons"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-fg/70" htmlFor="description">
          Short description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={200}
          rows={2}
          className={inputClass}
          placeholder="Shown in the list row, e.g. “Curated romance and exclusive stays, designed for two.”"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-fg/70" htmlFor="subtitle">
            Card subtitle
          </label>
          <input
            id="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            maxLength={80}
            className={inputClass}
            placeholder="Curated for two"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-fg/70" htmlFor="cta">
            Button text
          </label>
          <input
            id="cta"
            value={cta}
            onChange={(e) => setCta(e.target.value)}
            maxLength={40}
            className={inputClass}
            placeholder="Plan your honeymoon"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-fg/70" htmlFor="longDescription">
          Card description
        </label>
        <textarea
          id="longDescription"
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
          rows={4}
          className={inputClass}
          placeholder="The longer paragraph shown on the detail card."
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm text-fg/70">Features</p>
          <button
            type="button"
            onClick={addFeature}
            className="text-xs text-gold hover:text-gold-light"
          >
            + Add feature
          </button>
        </div>
        <div className="space-y-4">
          {features.map((f, i) => (
            <div key={i} className="rounded-lg border border-edge/15 p-4">
              <div className="flex items-start gap-3">
                <div className="w-32 shrink-0">
                  <select
                    value={f.icon}
                    onChange={(e) => updateFeature(i, "icon", e.target.value)}
                    className={inputClass}
                  >
                    {ICON_NAMES.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <div className="mt-2 flex h-10 w-10 items-center justify-center rounded-lg border border-gold/30 text-gold">
                    <SpecialtyIcon name={f.icon} />
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <input
                    value={f.title}
                    onChange={(e) => updateFeature(i, "title", e.target.value)}
                    placeholder="Feature title"
                    className={inputClass}
                  />
                  <textarea
                    value={f.description}
                    onChange={(e) => updateFeature(i, "description", e.target.value)}
                    placeholder="Feature description"
                    rows={2}
                    className={inputClass}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeFeature(i)}
                  aria-label="Remove feature"
                  className="shrink-0 text-sm text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          {features.length === 0 && (
            <p className="text-sm text-fg/40">No features yet.</p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-fg/70" htmlFor="position">
            Display order
          </label>
          <input
            id="position"
            type="number"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className={inputClass}
          />
          <p className="mt-1 text-xs text-fg/40">Lower numbers show first.</p>
        </div>

        <label className="flex items-center gap-2 self-end pb-2.5 text-sm text-fg/70">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="h-4 w-4 accent-[#C6A15B]"
          />
          Published (visible on the site)
        </label>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-edge/10 pt-6">
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-sm bg-gold px-6 py-2.5 text-sm font-medium text-night transition-all hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-gold-glow disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {saving ? "Saving…" : isEdit ? "Save changes" : "Add specialty"}
          </button>
          <a
            href="/admin/specialties"
            className="rounded-sm border border-edge/20 px-6 py-2.5 text-sm text-fg/70 transition-colors hover:border-gold hover:text-gold"
          >
            Cancel
          </a>
        </div>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={saving}
            className="text-sm text-red-400 transition-colors hover:text-red-300 disabled:opacity-60"
          >
            Delete specialty
          </button>
        )}
      </div>
    </form>
  );
}
