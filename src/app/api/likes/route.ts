import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const { postId, userId, action } = await req.json();

  if (action === 'like') {
    try {
      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          likedBy: {
            push: userId,
          },
        },
      });
      return NextResponse.json({ status: 'success', message: 'Post Liked' });
    } catch (error) {
      return NextResponse.json(
        { status: 'fail', message: 'Error liking post' },
        { status: 500 }
      );
    }
  } else if (action === 'unlike') {
    try {
      const postLike = await prisma.post.findUnique({
        where: {
          id: postId,
        },
        select: {
          likedBy: true,
        },
      });
      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          likedBy: {
            set: postLike!.likedBy.filter((id) => id !== userId),
          },
        },
      });
      return NextResponse.json({ status: 'success', message: 'Post Unliked' });
    } catch (error) {
      return NextResponse.json(
        { status: 'fail', message: 'Error unliking post' },
        { status: 500 }
      );
    }
  }
  return NextResponse.json(
    { status: 'error', message: 'Invalid action' },
    { status: 400 }
  );
}
