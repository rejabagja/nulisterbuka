'use client';

import DOMPurify from 'dompurify';
import RichTextEditor from './rich-text-editor';
import { Input } from './ui/input';
import { Button, buttonVariants } from './ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { editPost, deletePost } from '@/actions/post';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { cn } from '@/lib/utils';
import { PencilLine, Trash2 } from 'lucide-react';

export default function FormEditPost({ post }: { post: any }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState<string>(post.title);
  const [tags, setTags] = useState<string>(post.tags.join(', '));
  const [content, setContent] = useState<string>(post.content);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    const sanitizedContent = DOMPurify.sanitize(content, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    }).trim();
    const sanitizedTags = tags.split(',').map((tag) => tag.trim());
    const sanitizedTitle = title.trim();

    if (sanitizedTitle && sanitizedContent) {
      const payload = {
        title: sanitizedTitle,
        tags:
          sanitizedTags.length === 1 && sanitizedTags[0] === ''
            ? []
            : sanitizedTags,
        content,
        authorId: session!.user!.id,
      };
      setIsLoading(true);
      const response = await editPost(post.id, payload);
      setIsLoading(false);
      if (response.status === 'success') {
        toast.success(response.message, { position: 'top-center' });
        router.push('/dashboard/post');
      } else {
        toast.error(response.message, { position: 'top-center' });
      }
      return;
    }
    toast.error('Judul dan Content Post tidak boleh kosong', {
      position: 'top-center',
    });
  };

  return (
    <div>
      <Input
        placeholder="Judul Post"
        className="mb-4 bg-slate-50"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        placeholder="Tags: pisahkan dengan koma (,) untuk menambahkan lebih dari satu tag"
        className="mb-4 bg-slate-50"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <RichTextEditor content={content} onChange={setContent} />
      <div className="flex justify-end items-center space-x-2 mt-4">
        <DeletePostButton
          className="rounded-[3px]"
          variant={'destructive'}
          postId={post.id}
          size={'sm'}
        >
          Delete
        </DeletePostButton>
        <Button
          className="rounded-[3px]"
          onClick={handleSubmit}
          disabled={isLoading}
          size={'sm'}
        >
          <PencilLine className="size-4" />
          {isLoading ? 'Loading...' : 'Update Post'}
        </Button>
      </div>
    </div>
  );
}

export function DeletePostButton({
  postId,
  className,
  children,
  ...props
}: {
  postId: string;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}) {
  const router = useRouter();
  const handleDelete = async () => {
    const response = await deletePost(postId);
    if (response.status === 'success') {
      toast.success(response.message, { position: 'top-center' });
      router.push('/dashboard/post');
    } else {
      toast.error(response.message, { position: 'top-center' });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={cn(buttonVariants({ variant: props.variant }), className)}
          {...props}
        >
          <Trash2 className="size-4" />
          {children}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">
            Apakah kamu yakin ingin menghapus post ini?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batalkan</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Iya</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
