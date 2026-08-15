const BASE_URL = "https://www.ezztravel.agency";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/admin",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
