"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import PostForm from "@/components/PostForm";

export default function EditPostPage({ params }) {
  const [post, setPost] = useState(undefined);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase
      .from("posts")
      .select("id, title, subtitle, slug, thumbnail_url, content, video_url, category_id, published")
      .eq("id", params.id)
      .maybeSingle()
      .then(({ data, error: loadError }) => {
        if (loadError) setError(loadError.message);
        setPost(data || null);
      });
  }, [params.id]);

  return (
    <div>
      <h1 className="mb-8 font-display text-2xl text-fg">Edit post</h1>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {post === undefined && <p className="text-sm text-fg/50">Loading…</p>}
      {post === null && !error && <p className="text-sm text-fg/50">Post not found.</p>}
      {post && <PostForm post={post} />}
    </div>
  );
}
