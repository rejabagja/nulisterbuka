import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import FormEditPost from '@/components/form-edit-post';
import { auth } from '@/auth';

export default async function SinglePostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth();
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: {
      slug,
      authorId: session!.user!.id,
    },
  });

  if (!post) {
    return notFound();
  }

  return (
    <div className="pt-16 min-h-screen min-w-lg bg-background overflow-x-auto">
      <div className="container py-10">
        <div>
          <Button className="mb-4 rounded-[3px]" variant={'ghost'} asChild>
            <Link href="/dashboard/post">
              <ArrowLeft className="size-4" />
              Kembali ke Daftar Post
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Edit Post</h1>
          <p className="text-gray-600 text-lg">
            Isi form dibawah ini untuk mengedit post
          </p>
          <hr className="my-4" />
        </div>
        <div className="p-5">
          <Suspense fallback={<div>Loading...</div>}>
            <FormEditPost post={post} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
