import { supabase } from "@/lib/supabaseClient";

const BASE_URL = "https://www.ezztravel.agency";

export default async function sitemap() {
  const staticRoutes = ["", "/blog"].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const { data: posts } = await supabase
    .from("posts")
    .select("slug, created_at")
    .eq("published", true);

  const postRoutes = (posts || []).map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.created_at,
  }));

  return [...staticRoutes, ...postRoutes];
}
