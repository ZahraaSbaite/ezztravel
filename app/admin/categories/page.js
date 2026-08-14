"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { slugify } from "@/lib/slugify";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(null);
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState(null);

  async function load() {
    const { data, error: loadError } = await supabase
      .from("categories")
      .select("id, name, slug")
      .order("name");
    if (loadError) setError(loadError.message);
    setCategories(data || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    setError("");
    const name = newName.trim();
    if (!name) return;

    setAdding(true);
    const { error: addError } = await supabase
      .from("categories")
      .insert({ name, slug: slugify(name) });
    setAdding(false);

    if (addError) {
      setError(addError.message);
      return;
    }
    setNewName("");
    load();
  }

  function updateLocalName(id, name) {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, name } : c)));
  }

  async function handleSave(category) {
    setError("");
    setSavingId(category.id);
    const { error: saveError } = await supabase
      .from("categories")
      .update({ name: category.name, slug: slugify(category.name) })
      .eq("id", category.id);
    setSavingId(null);
    if (saveError) setError(saveError.message);
    else load();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this category? Posts using it will become uncategorized.")) return;
    const { error: deleteError } = await supabase.from("categories").delete().eq("id", id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-fg">Categories</h1>

      <form onSubmit={handleAdd} className="mt-8 flex gap-3">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New category name"
          maxLength={40}
          className="flex-1 rounded-sm border border-edge/20 bg-transparent px-3 py-2 text-sm text-fg outline-none transition-colors focus:border-gold"
        />
        <button
          type="submit"
          disabled={adding || !newName.trim()}
          className="rounded-sm bg-gold px-6 py-2 text-sm font-medium text-night transition-all hover:bg-gold-light disabled:opacity-60"
        >
          {adding ? "Adding…" : "Add"}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      {categories === null && <p className="mt-8 text-sm text-fg/50">Loading…</p>}
      {categories && categories.length === 0 && (
        <p className="mt-8 text-sm text-fg/50">No categories yet.</p>
      )}

      {categories && categories.length > 0 && (
        <div className="mt-8 divide-y divide-edge/10 rounded-lg border border-edge/10">
          {categories.map((c) => (
            <div key={c.id} className="flex flex-wrap items-center gap-3 px-5 py-4">
              <input
                value={c.name}
                onChange={(e) => updateLocalName(c.id, e.target.value)}
                className="flex-1 rounded-sm border border-transparent bg-transparent px-2 py-1 text-sm text-fg outline-none transition-colors focus:border-gold"
              />
              <span className="text-xs text-fg/40">/{c.slug}</span>
              <button
                type="button"
                onClick={() => handleSave(c)}
                disabled={savingId === c.id}
                className="text-sm text-gold hover:text-gold-light disabled:opacity-60"
              >
                {savingId === c.id ? "Saving…" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => handleDelete(c.id)}
                className="text-sm text-red-400 hover:text-red-300"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
