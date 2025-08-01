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

export default async function MyPostPage() {
  const session = await auth();
  const blogPosts = await prisma.post.findMany({
    where: {
      authorId: session?.user?.id,
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
        <div className="py-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
            {blogPosts.length > 0 ? (
              blogPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-xl transition-all">
                  <CardHeader className="">
                    <CardTitle
                      className="text-xl font-semibold line-clamp-2"
                      title={post.title}
                    >
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {post.tags.join(', ')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-4">{post.content}</p>
                  </CardContent>
                  <CardFooter>
                    <span className="text-sm">
                      {new Date(post.createdAt).toLocaleString('id-ID', {
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
