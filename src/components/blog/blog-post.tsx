'use client';

import Link from 'next/link';
import RichTextEditor from '@/components/rich-text-editor';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PencilIcon, HeartIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function BlogPost({ post }: any) {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState<boolean>(
    post.likedBy.includes(session?.user?.id)
  );
  const [likeCount, setLikeCount] = useState<number>(post.likedBy.length);
  const toggleLike = async () => {
    if (!session) {
      toast.error('Kamu harus login terlebih dahulu', {
        position: 'top-center',
      });
      return;
    }
    if (isLiked) {
      try {
        setIsLiked(false);
        setLikeCount(likeCount - 1);
        const response = await fetch(`/api/likes`, {
          body: JSON.stringify({
            postId: post.id,
            userId: session?.user?.id,
            action: 'unlike',
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
        const { status, message } = await response.json();
        if (status === 'fail') {
          setIsLiked(true);
          setLikeCount(likeCount + 1);
          toast.error(message, { position: 'top-center' });
        }
      } catch (error) {
        console.error('Error unliking post:', error);
      }
    } else {
      try {
        setIsLiked(true);
        setLikeCount(likeCount + 1);
        const response = await fetch(`/api/likes`, {
          body: JSON.stringify({
            postId: post.id,
            userId: session?.user?.id,
            action: 'like',
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
        const { status, message } = await response.json();
        if (status === 'fail') {
          setIsLiked(false);
          setLikeCount(likeCount - 1);
          toast.error(message, { position: 'top-center' });
        }
      } catch (error) {
        console.error('Error liking post:', error);
      }
    }
  };

  return (
    <div className="min-h-[60vh] py-5 rounded-xl">
      <div className="mb-6 flex justify-between">
        <Button className="" variant={'ghost'} asChild>
          <Link href="/blog">
            <ArrowLeft className="size-4" />
            Kembali ke Blog
          </Link>
        </Button>
        {session?.user?.id === post.author.id && (
          <Button size={'sm'} variant={'outline'} asChild>
            <Link href={`/dashboard/post/${post.slug}/edit`}>
              <PencilIcon className="size-4" /> Edit Post
            </Link>
          </Button>
        )}
      </div>
      <header className="space-y-2 p-4 bg-slate-100 rounded-xl shadow mb-6">
        <h1 className="text-3xl font-semibold">{post.title}</h1>
        <span className="text-slate-800 inline-block">
          @{post.author.username}
        </span>
        <p className="text-gray-600 text-sm">
          Terakhir diperbarui{' '}
          {post.updatedAt.toLocaleString('id-ID', {
            hour: 'numeric',
            minute: 'numeric',
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
        <div className="flex items-center">
          <span className="inline-block text-muted-foreground text-sm mr-2">
            Disukai {likeCount}
          </span>
          <Button
            className="ml-auto border-0 shadow-none"
            variant={isLiked ? 'destructive' : 'outline'}
            size={'icon'}
            onClick={toggleLike}
          >
            {isLiked ? (
              <HeartIcon className="size-4" />
            ) : (
              <HeartIcon className="size-4" />
            )}
          </Button>
        </div>
        <div>
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>
      <article>
        <RichTextEditor
          editable={false}
          className="bg-transparent border-0 shadow-none overflow-visible"
          content={post.content}
        />
      </article>
    </div>
  );
}
