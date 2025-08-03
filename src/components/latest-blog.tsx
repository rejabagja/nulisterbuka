'use client';

import Link from 'next/link';
import BlogList from './blog/blog-list';

export default function LatestBlog({ posts }: { posts: any }) {
  return (
    <section className="w-full py-20 lg:py-32">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter">
              Jelajahi Tulisan Terbaru
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Lihat apa yang sedang hangat di nulisterbuka atau temukan kisah
              baru yang menginspirasi.
            </p>
          </div>
          <div>
            <BlogList posts={posts} />
          </div>
          <div className="pt-8">
            <Link
              href="/blog"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Lihat Semua Tulisan
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-move-right ml-2"
              >
                <path d="M18 8L22 12L18 16" />
                <path d="M2 12H22" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
