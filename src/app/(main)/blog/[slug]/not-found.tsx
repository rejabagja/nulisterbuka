import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function NotFoundPostPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="container flex flex-col justify-center items-center">
        <h1 className="text-base lg:text-xl text-red-500 font-semibold">
          404 | Post tidak ditemukan{' '}
          <span className="animate-bounce inline-block">😪</span>
        </h1>
        <Button className="mt-4" variant={'outline'} asChild>
          <Link href="/blog">Kembali ke Daftar Blog</Link>
        </Button>
      </div>
    </div>
  );
}
