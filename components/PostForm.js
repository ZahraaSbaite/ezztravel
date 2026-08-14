"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { slugify } from "@/lib/slugify";

async function uploadThumbnail(file) {
  const ext = file.name.split(".").pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from("post-thumbnails").upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from("post-thumbnails").getPublicUrl(path);
  return data.publicUrl;
}

export default function PostForm({ post = null }) {
  const router = useRouter();
  const isEdit = Boolean(post);

  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [categoryId, setCategoryId] = useState(post?.category_id || "");
  const [content, setContent] = useState(post?.content || "");
  const [videoUrl, setVideoUrl] = useState(post?.video_url || "");
  const [published, setPublished] = useState(post ? post.published : true);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(post?.thumbnail_url || "");
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const slugTouched = useRef(isEdit);

  useEffect(() => {
    supabase
      .from("categories")
      .select("id, name")
      .order("name")
      .then(({ data }) => setCategories(data || []));
  }, []);

  function handleTitleChange(value) {
    setTitle(value);
    if (!slugTouched.current) setSlug(slugify(value));
  }

  function handleSlugChange(value) {
    slugTouched.current = true;
    setSlug(value);
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!title.trim() || !slug.trim() || !content.trim()) {
      setError("Title, slug, and content are required.");
      return;
    }
    if (!thumbnailFile && !thumbnailPreview) {
      setError("Choose a thumbnail image.");
      return;
    }

    setSaving(true);
    try {
      let thumbnailUrl = post?.thumbnail_url || "";
      if (thumbnailFile) {
        thumbnailUrl = await uploadThumbnail(thumbnailFile);
      }

      const payload = {
        title: title.trim(),
        slug: slugify(slug),
        content: content.trim(),
        video_url: videoUrl.trim() || null,
        category_id: categoryId || null,
        thumbnail_url: thumbnailUrl,
        published,
      };

      const { error: saveError } = isEdit
        ? await supabase.from("posts").update(payload).eq("id", post.id)
        : await supabase.from("posts").insert(payload);

      if (saveError) throw saveError;
      router.push("/admin/posts");
      router.refresh();
    } catch (err) {
      setError(err.message || "Could not save post.");
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setSaving(true);
    const { error: deleteError } = await supabase.from("posts").delete().eq("id", post.id);
    if (deleteError) {
      setError(deleteError.message);
      setSaving(false);
      return;
    }
    router.push("/admin/posts");
    router.refresh();
  }

  const inputClass =
    "w-full rounded-sm border border-edge/20 bg-transparent px-3 py-2 text-sm text-fg outline-none transition-colors focus:border-gold";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-gold/20 bg-panel p-8">
      <div>
        <label className="mb-1 block text-sm text-fg/70" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          maxLength={140}
          className={inputClass}
          placeholder="A weekend in the Bekaa Valley"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-fg/70" htmlFor="slug">
          URL slug
        </label>
        <input
          id="slug"
          value={slug}
          onChange={(e) => handleSlugChange(e.target.value)}
          className={inputClass}
          placeholder="a-weekend-in-the-bekaa-valley"
        />
        <p className="mt-1 text-xs text-fg/40">/blog/{slug || "your-slug"}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-fg/70" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className={inputClass}
          >
            <option value="">No category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm text-fg/70" htmlFor="video">
            Video link (optional)
          </label>
          <input
            id="video"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className={inputClass}
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-fg/70" htmlFor="thumbnail">
          Thumbnail
        </label>
        {thumbnailPreview && (
          <img
            src={thumbnailPreview}
            alt=""
            className="mb-3 h-40 w-full max-w-sm rounded-sm border border-edge/15 object-cover"
          />
        )}
        <input
          id="thumbnail"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-fg/70 file:mr-4 file:rounded-sm file:border file:border-gold/30 file:bg-transparent file:px-4 file:py-2 file:text-sm file:text-gold file:transition-colors hover:file:border-gold"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-fg/70" htmlFor="content">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className={inputClass}
          placeholder="Write the post. Leave a blank line between paragraphs."
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-fg/70">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="h-4 w-4 accent-[#C6A15B]"
        />
        Published (visible on the public blog)
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-edge/10 pt-6">
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-sm bg-gold px-6 py-2.5 text-sm font-medium text-night transition-all hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-gold-glow disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {saving ? "Saving…" : isEdit ? "Save changes" : "Publish post"}
          </button>
          <a
            href="/admin/posts"
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
            Delete post
          </button>
        )}
      </div>
    </form>
  );
}
