import { Editor } from '@tiptap/react';
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  BrushCleaning,
  CodeIcon,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  ItalicIcon,
  List,
  ListOrdered,
  MessageSquareQuote,
  MinusIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from 'lucide-react';
import { Toggle } from './ui/toggle';
import { Button } from './ui/button';
const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const Options = [
    {
      title: 'Heading 1',
      icon: <Heading1 className="size-4" />,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      presed: editor.isActive('heading', { level: 1 }),
    },
    {
      title: 'Heading 2',
      icon: <Heading2 className="size-4" />,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      presed: editor.isActive('heading', { level: 2 }),
    },
    {
      title: 'Heading 3',
      icon: <Heading3 className="size-4" />,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      presed: editor.isActive('heading', { level: 3 }),
    },
    {
      title: 'Bold',
      icon: <BoldIcon className="size-4" />,
      action: () => editor.chain().focus().toggleBold().run(),
      presed: editor.isActive('bold'),
    },
    {
      title: 'Italic',
      icon: <ItalicIcon className="size-4" />,
      action: () => editor.chain().focus().toggleItalic().run(),
      presed: editor.isActive('italic'),
    },
    {
      title: 'Highlight',
      icon: <Highlighter className="size-4" />,
      action: () => editor.chain().focus().toggleHighlight().run(),
      presed: editor.isActive('highlight'),
    },
    {
      title: 'Strikethrough',
      icon: <StrikethroughIcon className="size-4" />,
      action: () => editor.chain().focus().toggleStrike().run(),
      presed: editor.isActive('strike'),
    },
    {
      title: 'Horizontal Rule',
      icon: <MinusIcon className="size-4" />,
      action: () => editor.chain().focus().setHorizontalRule().run(),
      presed: editor.isActive('horizontalRule'),
    },
    {
      title: 'Underline',
      icon: <UnderlineIcon className="size-4" />,
      action: () => editor.chain().focus().toggleUnderline().run(),
      presed: editor.isActive('underline'),
    },
    {
      title: 'Code Block',
      icon: <CodeIcon className="size-4" />,
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      presed: editor.isActive('codeBlock'),
    },
    {
      title: 'Blockquote',
      icon: <MessageSquareQuote className="size-4" />,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      presed: editor.isActive('blockquote'),
    },
    {
      title: 'Bullet List',
      icon: <List className="size-4" />,
      action: () => editor.chain().focus().toggleBulletList().run(),
      presed: editor.isActive('bulletList'),
    },
    {
      title: 'Ordered List',
      icon: <ListOrdered className="size-4" />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      presed: editor.isActive('orderedList'),
    },
    {
      title: 'Align Left',
      icon: <AlignLeftIcon className="size-4" />,
      action: () => editor.chain().focus().toggleTextAlign('left').run(),
      presed: editor.isActive({ 'text-align': 'left' }),
    },
    {
      title: 'Align Center',
      icon: <AlignCenterIcon className="size-4" />,
      action: () => editor.chain().focus().toggleTextAlign('center').run(),
      presed: editor.isActive({ 'text-align': 'center' }),
    },
    {
      title: 'Align Right',
      icon: <AlignRightIcon className="size-4" />,
      action: () => editor.chain().focus().toggleTextAlign('right').run(),
      presed: editor.isActive({ 'text-align': 'right' }),
    },
    {
      title: 'Align Justify',
      icon: <AlignJustifyIcon className="size-4" />,
      action: () => editor.chain().focus().toggleTextAlign('justify').run(),
      presed: editor.isActive({ 'text-align': 'justify' }),
    },
  ];

  return (
    <div className="p-1 rounded-md border bg-slate-50 space-x-2 mb-2">
      <Button
        onClick={() => editor.chain().focus().clearContent().run()}
        title="Clear Content"
        className="cursor-pointer mr-4 bg-transparent text-red-300 hover:bg-red-50 hover:text-red-400"
      >
        <BrushCleaning className="size-4" />
      </Button>
      {Options.map((option, index) => (
        <Toggle
          key={index}
          pressed={option.presed}
          onClick={option.action}
          title={option.title}
          className="cursor-pointer"
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
};

export default MenuBar;
