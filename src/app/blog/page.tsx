import { allPosts } from "@/content/blog/index";

export const metadata = {
  title: "Blog | Dhebobrotha Dhibo",
  description: "Articles and insights on Cybersecurity, threat detection, and IT systems.",
};

const categoryColorMap: Record<string, string> = {
  blue:   "bg-[#1D2433] text-[#8BBDFF]",
  yellow: "bg-[#332B1D] text-[#FFB800]",
  purple: "bg-[#2B1D33] text-[#D18BFF]",
  green:  "bg-primary/10 text-primary",
};

export default function BlogPage() {
  return (
    <main id="blog-page" className="mx-auto w-full max-w-[1440px] px-4 py-16 lg:px-[110px]">

      {/* ── Page Heading ──────────────────────────────────────── */}
      <h1 id="blog-page-heading" className="mb-4 font-mono text-[32px] font-bold text-primary">
        {`> blog`}
      </h1>
      <p id="blog-page-description" className="mb-12 font-mono text-muted-foreground lg:max-w-[700px]">
        {/* Edit this text directly in this file ↓ */}
        Insights and updates on Web3, blockchain innovations, and modern web development trends.
      </p>

      {/* ── All Blog Posts ────────────────────────────────────── */}
      {/* Edit posts: src/content/blog/[post-slug]/config.ts     */}
      {/* Add/remove: src/content/blog/index.ts                  */}
      <div id="blog-page-list" className="flex flex-col gap-6">
        {allPosts.map((post) => (
          <a
            key={post.id}
            href={post.url}
            id={`blog-page-item-${post.id}`}
            className="group border border-primary p-8 transition-colors hover:bg-primary/5 block"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

              {/* Left: title + excerpt */}
              <div className="flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  {/* Category badge */}
                  <span className={`rounded-[4px] px-2 py-0.5 font-mono text-xs ${categoryColorMap[post.categoryColor] ?? categoryColorMap.green}`}>
                    {post.category}
                  </span>
                  {/* Read time */}
                  <span className="font-mono text-xs text-muted-foreground">{post.readTime}</span>
                  {/* Date */}
                  <span className="font-mono text-xs text-muted-foreground">{post.publishedAt}</span>
                </div>

                {/* Title */}
                <h2 className="mb-2 font-mono text-xl font-bold text-primary group-hover:underline">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="font-mono text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
              </div>

              {/* Right: arrow */}
              <div className="hidden font-mono text-primary sm:block">→</div>
            </div>
          </a>
        ))}
      </div>

    </main>
  );
}
