import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getEmbedUrl } from "@/lib/videoEmbed";

export const revalidate = 0;

async function getPost(slug) {
  const { data } = await supabase
    .from("posts")
    .select("id, title, subtitle, slug, thumbnail_url, content, video_url, created_at, categories(name, slug)")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return data;
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return { title: "Post not found — Ezz Travel" };
  return {
    title: `${post.title} — Ezz Travel Blog`,
    description: post.content.replace(/\s+/g, " ").trim().slice(0, 160),
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const embedUrl = getEmbedUrl(post.video_url);
  const paragraphs = post.content.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const date = new Date(post.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main>
      <Nav />
      <article className="bg-surface px-6 py-20 text-fg">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-fg/50 transition-colors hover:text-gold"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            Back to blog
          </Link>

          <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start">
            <div className="w-full shrink-0 overflow-hidden rounded-lg border border-gold/15 sm:w-56 md:w-64">
              <img src={post.thumbnail_url} alt="" className="aspect-[4/5] w-full object-cover" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                {post.categories?.name && (
                  <span className="rounded-full border border-gold/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-gold">
                    {post.categories.name}
                  </span>
                )}
                <span className="text-xs text-fg/40">{date}</span>
              </div>

              <h1 className="mt-4 font-display text-2xl font-bold leading-tight text-fg md:text-3xl">
                {post.title}
              </h1>

              {post.subtitle && (
                <p className="mt-3 text-lg italic leading-relaxed text-fg/80">
                  {post.subtitle}
                </p>
              )}

              <div className="mt-5 space-y-4 text-[15px] font-normal leading-[1.9] text-fg/70">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>

          {post.video_url && (
            <div className="mt-12">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
                Watch
              </p>
              {embedUrl ? (
                <div className="aspect-video w-full overflow-hidden rounded-lg border border-gold/15">
                  <iframe
                    src={embedUrl}
                    title={post.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <a
                  href={post.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm border border-gold px-6 py-3 text-sm text-gold transition-all hover:bg-gold hover:text-night hover:shadow-gold-glow"
                >
                  Watch the video
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7Z" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </article>
      <Footer />
    </main>
  );
}
