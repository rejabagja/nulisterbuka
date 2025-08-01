import { Button } from '@/components/ui/button';
import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-2 p-5 text-center">
      <h1 className="text-2xl lg:text-3xl font-bold mb-4 font-serif">
        nulisterbuka.
      </h1>
      <h2 className="text-xl lg:text-2xl font-semibold text-destructive font-mono">
        404 Not Found <span className="animate-bounce inline-block">😪</span>
      </h2>
      <p className="text-base lg:text-lg font-mono">
        Halaman atau url yang kamu cari tidak ditemukan.
      </p>
      <Button className="mt-4" variant={'outline'} asChild>
        <Link href={'/'}>Go Back to Home</Link>
      </Button>
    </div>
  );
}
