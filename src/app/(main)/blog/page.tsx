import BlogList from '@/components/blog/blog-list';
import { Badge } from '@/components/ui/badge';
import { prisma } from '@/lib/prisma';

export default async function BlogPage() {
  const blogPosts = await prisma.post.findMany({
    include: {
      author: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
  return (
    <div>
      <section className="py-32">
        <div className="container flex flex-col items-center gap-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6">
              temukan inspirasi terkini
            </Badge>
            <h2 className="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
              Blog Posts
            </h2>
            <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
              Lihat apa yang sedang hangat di nulisterbuka atau temukan kisah
              baru yang menginspirasi.
            </p>
          </div>
          <BlogList posts={blogPosts} />
        </div>
      </section>
    </div>
  );
}
