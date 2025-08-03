import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { ClipboardPen } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { Badge } from '@/components/ui/badge';

export default async function MyPostPage() {
  const session = await auth();
  const blogPosts = await prisma.post.findMany({
    where: {
      authorId: session?.user?.id,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
  return (
    <div className="pt-16 min-h-screen">
      <div className="container py-10">
        <div>
          <h1 className="text-2xl font-bold">My Post</h1>
          <p className="text-gray-600 text-lg">Ini adalah kumpulan tulisanku</p>
          <hr className="my-4" />
          <Button className="mb-4 rounded-[3px]" asChild>
            <Link href="/dashboard/post/create">
              <ClipboardPen className="size-4" />
              Buat Post
            </Link>
          </Button>
        </div>
        <div className="py-5">
          <div className="grid gap-6 md:grid-cols-2 w-full max-w-5xl">
            {blogPosts.length > 0 ? (
              blogPosts.map((post) => (
                <Card
                  key={post.id}
                  className="hover:shadow-md transition-all gap-4"
                >
                  <CardHeader>
                    <CardTitle
                      className="text-xl font-semibold line-clamp-2"
                      title={post.title}
                    >
                      <Link
                        href={`/dashboard/post/${post.slug}/edit`}
                        className="hover:underline underline-offset-4"
                      >
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="mr-2 bg-slate-50"
                          variant={'outline'}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="line-clamp-3 text-muted-foreground text-sm">
                      {post.content.replace(/<[^>]+>/g, '')}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">
                      Disukai{' '}
                      <span className="font-semibold">
                        {post.likedBy.length}
                      </span>{' '}
                    </p>
                    <span className="text-sm text-muted-foreground font-medium inline-block ml-auto">
                      Diperbarui{' '}
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
              ))
            ) : (
              <p className="text-muted-foreground text-base">
                Belum ada tulisan, silahkan buat terlebih dahulu...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
