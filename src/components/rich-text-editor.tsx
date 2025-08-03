'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import MenuBar from './menubar-editor';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  className?: string;
  content?: string;
  onChange?: (content: string) => void;
  editable?: boolean;
}

const RichTextEditor = ({
  className = '',
  content = '',
  onChange = () => {},
  editable = true,
}: RichTextEditorProps) => {
  const editor = useEditor({
    editable: editable,
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc ml-4',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal ml-4',
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: 'border-l-[3px] my-6 border-gray-300 pl-4 py-4 bg-gray-50',
          },
        },
        horizontalRule: {
          HTMLAttributes: {
            class: 'my-4 border-gray-300 border-t cursor-pointer',
          },
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: 'bg-yellow-300 p-1 rounded',
        },
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          'p-3 border border-input focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none rounded-md min-h-[250px] max-h-[400px] overflow-y-auto bg-slate-50',
          className
        ),
      },
    },
    enableContentCheck: true,
    emitContentError: true,
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div>
      {editable && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
