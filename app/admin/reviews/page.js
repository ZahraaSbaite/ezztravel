"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState("");

  async function load() {
    const { data, error: loadError } = await supabase
      .from("reviews")
      .select("id, name, rating, comment, approved, created_at")
      .order("created_at", { ascending: false });
    if (loadError) setError(loadError.message);
    setReviews(data || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this review? This cannot be undone.")) return;
    const { error: deleteError } = await supabase.from("reviews").delete().eq("id", id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    setReviews((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-fg">Reviews</h1>

      {error && <p className="mt-6 text-sm text-red-400">{error}</p>}

      {reviews === null && <p className="mt-8 text-sm text-fg/50">Loading…</p>}

      {reviews && reviews.length === 0 && (
        <p className="mt-8 text-sm text-fg/50">No reviews yet.</p>
      )}

      {reviews && reviews.length > 0 && (
        <div className="mt-8 divide-y divide-edge/10 rounded-lg border border-edge/10">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-wrap items-start justify-between gap-4 px-5 py-4"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-display text-base text-fg">{review.name}</p>
                  <span className="text-xs text-gold">{"★".repeat(review.rating)}</span>
                  {!review.approved && (
                    <span className="rounded-full border border-edge/20 px-2 py-0.5 text-[10px] uppercase tracking-wide text-fg/50">
                      Unapproved
                    </span>
                  )}
                </div>
                <p className="mt-1 max-w-2xl text-sm text-fg/70">{review.comment}</p>
                <p className="mt-1 text-xs text-fg/40">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(review.id)}
                className="shrink-0 text-sm text-red-400 hover:text-red-300"
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
