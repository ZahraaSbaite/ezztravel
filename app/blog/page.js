import { supabase } from "@/lib/supabaseClient";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import BlogCard from "@/components/BlogCard";

export const metadata = {
  title: "Blog — Ezz Travel",
  description:
    "Travel tips, destination guides, and stories from Ezz Travel — Beirut and Abidjan.",
};

export const revalidate = 0;

export default async function BlogPage({ searchParams }) {
  const activeSlug = searchParams?.category || "";

  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("name");

  const activeCategory = categories?.find((c) => c.slug === activeSlug) || null;

  let query = supabase
    .from("posts")
    .select("id, title, slug, thumbnail_url, content, video_url, created_at, categories(name, slug)")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (activeCategory) query = query.eq("category_id", activeCategory.id);

  const { data: posts, error } = await query;

  return (
    <main>
      <Nav />
      <section className="relative overflow-hidden bg-surface px-6 py-28 text-fg">
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-30" />
        <div className="relative mx-auto max-w-6xl">
          <SectionHeading eyebrow="BLOG" title="Stories from the road" />

          {categories && categories.length > 0 && (
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              <a
                href="/blog"
                className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.1em] transition-colors ${
                  !activeCategory
                    ? "border-gold bg-gold text-night"
                    : "border-edge/20 text-fg/60 hover:border-gold hover:text-gold"
                }`}
              >
                All
              </a>
              {categories.map((c) => (
                <a
                  key={c.id}
                  href={`/blog?category=${c.slug}`}
                  className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.1em] transition-colors ${
                    activeCategory?.id === c.id
                      ? "border-gold bg-gold text-night"
                      : "border-edge/20 text-fg/60 hover:border-gold hover:text-gold"
                  }`}
                >
                  {c.name}
                </a>
              ))}
            </div>
          )}

          {error && (
            <p className="mt-16 text-center text-sm text-red-400">
              Couldn't load posts. Please try again shortly.
            </p>
          )}

          {!error && posts && posts.length === 0 && (
            <div className="mt-16 rounded-lg border border-dashed border-edge/20 px-6 py-16 text-center">
              <p className="font-display text-lg text-fg/70">
                {activeCategory ? "No posts in this category yet" : "No posts yet"}
              </p>
              <p className="mt-2 text-sm text-fg/50">Check back soon.</p>
            </div>
          )}

          {!error && posts && posts.length > 0 && (
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
