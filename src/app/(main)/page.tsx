import Hero from '@/components/hero';
import Features from '@/components/features';
import LatestBlog from '@/components/latest-blog';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  const blogPosts = await prisma.post.findMany({
    include: {
      author: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
    take: 4,
  });
  return (
    <div className="min-h-screen pt-20 md:pt-0">
      <Hero />
      <Features />
      <LatestBlog posts={blogPosts} />
    </div>
  );
}
