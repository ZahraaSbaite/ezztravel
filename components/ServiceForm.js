"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ServiceForm({ service = null }) {
  const router = useRouter();
  const isEdit = Boolean(service);

  const [title, setTitle] = useState(service?.title || "");
  const [description, setDescription] = useState(service?.description || "");
  const [position, setPosition] = useState(service?.position ?? 0);
  const [published, setPublished] = useState(service ? service.published : true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const inputClass =
    "w-full rounded-sm border border-edge/20 bg-transparent px-3 py-2 text-sm text-fg outline-none transition-colors focus:border-gold";

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    setSaving(true);
    const payload = {
      title: title.trim(),
      description: description.trim(),
      position: Number(position) || 0,
      published,
    };

    const { error: saveError } = isEdit
      ? await supabase.from("services").update(payload).eq("id", service.id)
      : await supabase.from("services").insert(payload);

    if (saveError) {
      setError(saveError.message);
      setSaving(false);
      return;
    }
    router.push("/admin/services");
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm("Delete this service? This cannot be undone.")) return;
    setSaving(true);
    const { error: deleteError } = await supabase.from("services").delete().eq("id", service.id);
    if (deleteError) {
      setError(deleteError.message);
      setSaving(false);
      return;
    }
    router.push("/admin/services");
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
          placeholder="First-class ticketing"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-fg/70" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={200}
          rows={2}
          className={inputClass}
          placeholder="Personalized flight booking and reservations."
        />
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
            {saving ? "Saving…" : isEdit ? "Save changes" : "Add service"}
          </button>
          <a
            href="/admin/services"
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
            Delete service
          </button>
        )}
      </div>
    </form>
  );
}
