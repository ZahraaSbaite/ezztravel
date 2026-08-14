"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminSpecialtiesPage() {
  const [specialties, setSpecialties] = useState(null);
  const [error, setError] = useState("");

  async function load() {
    const { data, error: loadError } = await supabase
      .from("specialties")
      .select("id, title, position, published")
      .order("position", { ascending: true });
    if (loadError) setError(loadError.message);
    setSpecialties(data || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this specialty? This cannot be undone.")) return;
    const { error: deleteError } = await supabase.from("specialties").delete().eq("id", id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    setSpecialties((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-2xl text-fg">Specialties</h1>
        <a
          href="/admin/specialties/new"
          className="rounded-sm bg-gold px-5 py-2 text-sm font-medium text-night transition-all hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-gold-glow"
        >
          New specialty
        </a>
      </div>

      {error && <p className="mt-6 text-sm text-red-400">{error}</p>}
      {specialties === null && <p className="mt-8 text-sm text-fg/50">Loading…</p>}
      {specialties && specialties.length === 0 && (
        <p className="mt-8 text-sm text-fg/50">No specialties yet. Add your first one.</p>
      )}

      {specialties && specialties.length > 0 && (
        <div className="mt-8 divide-y divide-edge/10 rounded-lg border border-edge/10">
          {specialties.map((specialty) => (
            <div
              key={specialty.id}
              className="flex flex-wrap items-center justify-between gap-4 px-5 py-4"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-fg/40">#{specialty.position}</span>
                  <p className="truncate font-display text-base text-fg">{specialty.title}</p>
                  {!specialty.published && (
                    <span className="rounded-full border border-edge/20 px-2 py-0.5 text-[10px] uppercase tracking-wide text-fg/50">
                      Hidden
                    </span>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-4 text-sm">
                <a
                  href={`/admin/specialties/${specialty.id}/edit`}
                  className="text-gold hover:text-gold-light"
                >
                  Edit
                </a>
                <button
                  type="button"
                  onClick={() => handleDelete(specialty.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
