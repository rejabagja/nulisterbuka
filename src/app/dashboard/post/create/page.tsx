import FormCreatePost from '@/components/form-create-post';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function PostCreatePage() {
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
          <h1 className="text-2xl font-bold">Create Post</h1>
          <p className="text-gray-600 text-lg">
            Isi form dibawah ini untuk membuat post
          </p>
          <hr className="my-4" />
        </div>
        <div className="p-5">
          <FormCreatePost />
        </div>
      </div>
    </div>
  );
}
