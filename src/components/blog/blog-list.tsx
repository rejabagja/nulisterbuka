'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function BlogList({ posts }: { posts: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map((post: any) => (
        <Card key={post.slug} className="hover:shadow-md transition-all gap-4">
          <CardHeader>
            <CardTitle
              className="text-xl font-semibold line-clamp-2"
              title={post.title}
            >
              <Link href={`/blog/${post.slug}`} className="cursor-pointer">
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
  );
}
