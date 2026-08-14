"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState("");

  async function load() {
    const { data, error: loadError } = await supabase
      .from("posts")
      .select("id, title, slug, published, created_at, categories(name)")
      .order("created_at", { ascending: false });
    if (loadError) setError(loadError.message);
    setPosts(data || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    const { error: deleteError } = await supabase.from("posts").delete().eq("id", id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-2xl text-fg">Posts</h1>
        <a
          href="/admin/posts/new"
          className="rounded-sm bg-gold px-5 py-2 text-sm font-medium text-night transition-all hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-gold-glow"
        >
          New post
        </a>
      </div>

      {error && <p className="mt-6 text-sm text-red-400">{error}</p>}

      {posts === null && <p className="mt-8 text-sm text-fg/50">Loading…</p>}

      {posts && posts.length === 0 && (
        <p className="mt-8 text-sm text-fg/50">No posts yet. Create your first one.</p>
      )}

      {posts && posts.length > 0 && (
        <div className="mt-8 divide-y divide-edge/10 rounded-lg border border-edge/10">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-wrap items-center justify-between gap-4 px-5 py-4"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate font-display text-base text-fg">{post.title}</p>
                  {!post.published && (
                    <span className="rounded-full border border-edge/20 px-2 py-0.5 text-[10px] uppercase tracking-wide text-fg/50">
                      Draft
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-fg/40">
                  {post.categories?.name || "Uncategorized"} · /blog/{post.slug}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-4 text-sm">
                <a href={`/admin/posts/${post.id}/edit`} className="text-gold hover:text-gold-light">
                  Edit
                </a>
                <button
                  type="button"
                  onClick={() => handleDelete(post.id)}
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
