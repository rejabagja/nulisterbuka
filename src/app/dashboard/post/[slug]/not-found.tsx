import { Button } from '@/components/ui/button';
import React from 'react';

export default function NotFoundPostPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="container flex flex-col justify-center items-center">
        <h1 className="text-base lg:text-xl text-red-500">
          404 | Post tidak ditemukan{' '}
          <span className="animate-bounce inline-block">😪</span>
        </h1>
        <Button className="mt-4" variant={'outline'} asChild>
          <a href="/dashboard/post">Kembali ke Daftar Post</a>
        </Button>
      </div>
    </div>
  );
}
