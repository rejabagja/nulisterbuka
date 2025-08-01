'use server';

import { prisma, Prisma } from '@/lib/prisma';

interface PostPayload {
  title: string;
  tags: string[];
  content: string;
  authorId: string;
}

export async function createPost(payload: PostPayload) {
  try {
    await prisma.post.create({
      data: {
        title: payload.title,
        slug: payload.title.toLowerCase().replace(/\s+/g, '-'),
        tags: payload.tags,
        content: payload.content,
        author: {
          connect: {
            id: payload.authorId,
          },
        },
      },
    });

    return { status: 'success', message: 'Post created successfully' };
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Failed to create post');
  }
}
