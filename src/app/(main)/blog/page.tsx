import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function BlogPage() {
  const blogPosts = await prisma.post.findMany({
    include: {
      author: true,
    },
    omit: {
      id: true,
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
          <div className="grid gap-6 md:grid-cols-2">
            {blogPosts.map((post) => (
              <Card
                key={post.slug}
                className="hover:shadow-md transition-all gap-4"
              >
                <CardHeader>
                  <CardTitle
                    className="text-xl font-semibold line-clamp-2"
                    title={post.title}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="cursor-pointer hover:underline underline-offset-4"
                    >
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    @{post.author.username}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="line-clamp-3 text-muted-foreground text-sm">
                    {post.content.replace(/<[^>]+>/g, '')}
                  </p>
                </CardContent>
                <CardFooter>
                  <span className="inline-block text-muted-foreground text-sm">
                    Disukai {post.likedBy.length}
                  </span>
                  <span className="text-sm text-muted-foreground inline-block ml-auto">
                    {new Date(post.updatedAt).toLocaleString('id-ID', {
                      hour: 'numeric',
                      minute: 'numeric',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
