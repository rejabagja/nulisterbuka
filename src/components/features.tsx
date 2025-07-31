'use client';

import { Lightbulb, Pencil, Users } from 'lucide-react';
import React from 'react';

export default function Features() {
  return (
    <section id="about" className="w-full py-20 lg:py-32 bg-gray-50">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter">
              Mengapa nulisterbuka?
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Platform kasual yang memudahkanmu berbagi dan menemukan cerita.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-3 lg:gap-12 w-full max-w-4xl">
            <div className="flex flex-col items-center space-y-3">
              <div className="p-4 bg-primary rounded-full text-primary-foreground">
                <Pencil className="size-6" />
              </div>
              <h3 className="text-xl font-bold">Tulis Apa Saja</h3>
              <p className="text-muted-foreground">
                Dari pengalaman pribadi hingga fiksi imajinatif, semua tulisanmu
                punya tempat di sini.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="p-4 bg-primary rounded-full text-primary-foreground">
                <Lightbulb className="size-6" />
              </div>
              <h3 className="text-xl font-bold">Temukan Inspirasi</h3>
              <p className="text-muted-foreground">
                Jelajahi beragam perspektif dan ide dari penulis lain di seluruh
                nusantara.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="p-4 bg-primary rounded-full text-primary-foreground">
                <Users className="size-6" />
              </div>
              <h3 className="text-xl font-bold">Terhubung & Berdiskusi</h3>
              <p className="text-muted-foreground">
                Bagikan pandanganmu, berikan umpan balik, dan jalin koneksi
                dengan sesama penulis dan pembaca.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
