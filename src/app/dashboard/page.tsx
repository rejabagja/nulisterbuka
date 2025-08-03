import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const session = await auth();
  const posts = await prisma.post.findMany({
    where: {
      authorId: session?.user?.id,
    },
  });
  const totalLikes = posts.reduce((acc, post) => acc + post.likedBy.length, 0);
  return (
    <div className="min-h-screen pt-16">
      <div className="container py-10 min-w-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Stats Cards */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Total Posts</h3>
            <p className="text-2xl font-bold">{posts.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Total Likes</h3>
            <p className="text-2xl font-bold">{totalLikes}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Button
                  className="w-full bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
                  asChild
                >
                  <Link href="/dashboard/post/create">Create Post</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
