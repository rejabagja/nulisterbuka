'use client';

import Link from 'next/link';
import RichTextEditor from '@/components/rich-text-editor';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PencilIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function BlogPost({ post }: any) {
  const { data: session } = useSession();

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
