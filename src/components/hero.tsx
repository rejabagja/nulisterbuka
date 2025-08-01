import { MoveRight, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export const Hero = () => (
  <div className="w-full">
    <div className="container">
      <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
        <div>
          <Badge variant="outline">Tempatmu Berekspresi!</Badge>
        </div>
        <div className="flex gap-4 flex-col">
          <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
            Tuangkan Kata, Bebaskan Ide.
          </h1>
          <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
            Tulis apa saja, temukan inspirasi, dan baca beragam perspektif tanpa
            batasan. Di sini, tulisanmu berarti.
          </p>
        </div>
        <div className="flex flex-row gap-3">
          <Button size="lg" className="gap-4" variant="outline" asChild>
            <Link href="/blog">
              Jelajahi Tulisan <Compass className="w-4 h-4" />
            </Link>
          </Button>
          <Button size="lg" className="gap-4">
            Mulai Menulis <MoveRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default Hero;
