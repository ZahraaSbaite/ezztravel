import { supabase } from "@/lib/supabaseClient";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import BlogCard from "@/components/BlogCard";
import CategoryFilter from "@/components/CategoryFilter";

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
            <CategoryFilter categories={categories} activeSlug={activeCategory?.slug || ""} />
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
