'use server';

import { prisma, Prisma } from '@/lib/prisma';
import slugify from 'slugify';

interface PostPayload {
  title: string;
  tags: string[];
  content: string;
  authorId: string;
}

export async function createPost(payload: PostPayload) {
  try {
    const slug = await generateSlug(payload.title);

    await prisma.post.create({
      data: {
        title: payload.title,
        slug,
        tags: payload.tags.length === 0 ? ['general'] : payload.tags,
        content: payload.content,
        author: {
          connect: {
            id: payload.authorId,
          },
        },
      },
    });

    return { status: 'success', message: 'Berhasil membuat post' };
  } catch (error) {
    console.error('Error creating post:', error);
    return { status: 'fail', message: 'Gagal membuat post' };
  }
}
export async function editPost(postId: string, payload: PostPayload) {
  try {
    const slug = await updateSlug(postId, payload);

    await prisma.post.update({
      data: {
        title: payload.title,
        slug,
        tags: payload.tags.length === 0 ? ['general'] : payload.tags,
        content: payload.content,
      },
      where: {
        id: postId,
      },
    });

    return { status: 'success', message: 'Post berhasil diperbarui' };
  } catch (error) {
    console.error('Error updating post:', error);
    return { status: 'fail', message: 'Gagal memperbarui post' };
  }
}

export async function deletePost(postId: string) {
  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return { status: 'success', message: 'Post berhasil dihapus' };
  } catch (error) {
    console.error('Error deleting post:', error);
    return { status: 'fail', message: 'Gagal menghapus post' };
  }
}

async function generateSlug(text: string) {
  const slug = slugify(text, { lower: true });
  const existingSlugs = await prisma.post.findMany({
    where: {
      slug: {
        startsWith: slug,
      },
    },
  });

  if (existingSlugs.length === 0) {
    return slug;
  }

  let count = 1;
  while (existingSlugs.find((post) => post.slug === `${slug}-${count}`)) {
    count++;
  }

  return `${slug}-${count}`;
}

async function updateSlug(postId: string, payload: PostPayload) {
  const existingPost = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (existingPost!.title === payload.title) {
    return existingPost!.slug;
  }

  const newSlug = await generateSlug(payload.title);
  return newSlug;
}
