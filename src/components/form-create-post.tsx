'use client';

import DOMPurify from 'dompurify';
import RichTextEditor from './rich-text-editor';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { createPost } from '@/actions/post';
import { useRouter } from 'next/navigation';

export default function FormCreatePost() {
  const { data: session } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [content, setContent] = useState<string>('');
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
      const response = await createPost(payload);
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
      <div className="flex justify-end space-x-2">
        <Button
          className="mt-4 rounded-[3px]"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Simpan'}
        </Button>
      </div>
    </div>
  );
}
