import Link from "next/link";

export default function BlogCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-gold/15 bg-panel shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-card-hover"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-surface-2">
        <img
          src={post.thumbnail_url}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {post.video_url && (
          <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-night/70 text-ink backdrop-blur-sm">
            <svg viewBox="0 0 24 24" className="ml-0.5 h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7Z" />
            </svg>
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        {post.categories?.name && (
          <span className="mb-3 inline-block w-fit rounded-full border border-gold/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-gold">
            {post.categories.name}
          </span>
        )}
        <div className="flex-1">
          <h3 className="font-display text-lg text-fg transition-colors group-hover:text-gold">
            {post.title}
          </h3>
          {post.subtitle && (
            <p className="mt-2 text-sm leading-relaxed text-fg/60">{post.subtitle}</p>
          )}
        </div>
        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-gold">
          Read more
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
