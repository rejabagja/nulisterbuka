import Hero from '@/components/hero';
import Features from '@/components/features';
import LatestBlog from '@/components/latest-blog';

export default function Home() {
  return (
    <div className="min-h-screen pt-20 md:pt-0">
      <Hero />
      <Features />
      <LatestBlog />
    </div>
  );
}
