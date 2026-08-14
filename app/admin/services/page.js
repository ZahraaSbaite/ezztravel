"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminServicesPage() {
  const [services, setServices] = useState(null);
  const [error, setError] = useState("");

  async function load() {
    const { data, error: loadError } = await supabase
      .from("services")
      .select("id, title, position, published")
      .order("position", { ascending: true });
    if (loadError) setError(loadError.message);
    setServices(data || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this service? This cannot be undone.")) return;
    const { error: deleteError } = await supabase.from("services").delete().eq("id", id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    setServices((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-2xl text-fg">Services</h1>
        <a
          href="/admin/services/new"
          className="rounded-sm bg-gold px-5 py-2 text-sm font-medium text-night transition-all hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-gold-glow"
        >
          New service
        </a>
      </div>

      {error && <p className="mt-6 text-sm text-red-400">{error}</p>}
      {services === null && <p className="mt-8 text-sm text-fg/50">Loading…</p>}
      {services && services.length === 0 && (
        <p className="mt-8 text-sm text-fg/50">No services yet. Add your first one.</p>
      )}

      {services && services.length > 0 && (
        <div className="mt-8 divide-y divide-edge/10 rounded-lg border border-edge/10">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-wrap items-center justify-between gap-4 px-5 py-4"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-fg/40">#{service.position}</span>
                  <p className="truncate font-display text-base text-fg">{service.title}</p>
                  {!service.published && (
                    <span className="rounded-full border border-edge/20 px-2 py-0.5 text-[10px] uppercase tracking-wide text-fg/50">
                      Hidden
                    </span>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-4 text-sm">
                <a href={`/admin/services/${service.id}/edit`} className="text-gold hover:text-gold-light">
                  Edit
                </a>
                <button
                  type="button"
                  onClick={() => handleDelete(service.id)}
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
