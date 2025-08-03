import Post from '@/components/post';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: true },
  });

  if (!post) {
    return notFound();
  }

  return (
    <div className="pt-20 min-h-screen w-full">
      <div className="container bg-slate-50">
        <Post post={post} />
      </div>
    </div>
  );
}
