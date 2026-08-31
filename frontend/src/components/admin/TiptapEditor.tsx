import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import TableOfContents from "@tiptap/extension-table-of-contents";
import { common, createLowlight } from "lowlight";
import { useEffect, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code,
  Heading1, Heading2, Heading3, Quote, Minus,
  List, ListOrdered, Code2, Link, Image, Table as TableIcon,
  AlignLeft, AlignCenter, AlignRight,
  Undo2, Redo2,
  ListTodo,
} from "lucide-react";

const lowlight = createLowlight(common);

interface Props {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function TiptapEditor({ content, onChange, placeholder }: Props) {
const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false, heading: { levels: [1, 2, 3] }, link: false, underline: false }),
      Underline,
      LinkExtension.configure({ openOnClick: false }),
      ImageExtension,
      CodeBlockLowlight.configure({ lowlight }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: placeholder || "Écrivez votre contenu ici..." }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      TableOfContents.configure({ HTMLTag: "nav" }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: { class: "prose prose-invert max-w-none focus:outline-none min-h-[300px] p-4" },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content]);

  const addLink = useCallback(() => {
    const url = prompt("URL du lien :");
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  const addImage = useCallback(() => {
    const url = prompt("URL de l'image :");
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addTable = useCallback(() => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  const addTOC = useCallback(() => {
    editor?.chain().focus().insertTableOfContents().run();
  }, [editor]);

  const ToolBtn = ({ onClick, active, label, children }: { onClick: () => void; active?: boolean; label: string; children: React.ReactNode }) => (
    <Button type="button" size="icon" variant="ghost" onClick={onClick}
      className={`h-8 w-8 ${active ? "bg-blue-600/40 text-blue-300 hover:bg-blue-600/40" : "text-slate-300 hover:bg-white/10"}`}
      title={label}>
      {children}
    </Button>
  );

  const Divider = () => <div className="w-px h-5 bg-white/10" />;

  if (!editor) return null;

  return (
    <div className="bg-slate-800 border border-white/10 rounded-lg overflow-hidden">
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-white/10 bg-slate-900/50 sticky top-0 z-10">
        <ToolBtn onClick={() => editor.chain().focus().undo().run()} label="Annuler"><Undo2 size={16} /></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().redo().run()} label="Refaire"><Redo2 size={16} /></ToolBtn>

        <Divider />

        <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} label="Gras"><Bold size={16} /></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} label="Italique"><Italic size={16} /></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} label="Souligné"><UnderlineIcon size={16} /></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} label="Barré"><Strikethrough size={16} /></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} label="Code"><Code size={16} /></ToolBtn>

        <Divider />

        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} label="Titre 1"><Heading1 size={16} /></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} label="Titre 2"><Heading2 size={16} /></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} label="Titre 3"><Heading3 size={16} /></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} label="Citation"><Quote size={16} /></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} label="Ligne"><Minus size={16} /></ToolBtn>

        <Divider />

        <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} label="Liste"><List size={16} /></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} label="Liste numérotée"><ListOrdered size={16} /></ToolBtn>

        <Divider />

        <ToolBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} label="Bloc de code"><Code2 size={16} /></ToolBtn>
        <ToolBtn onClick={addLink} active={editor.isActive("link")} label="Lien"><Link size={16} /></ToolBtn>
        <ToolBtn onClick={addImage} label="Image"><Image size={16} /></ToolBtn>
        <ToolBtn onClick={addTable} label="Tableau"><TableIcon size={16} /></ToolBtn>
        <ToolBtn onClick={addTOC} label="Table des matières"><ListTodo size={16} /></ToolBtn>

        <Divider />

        <ToolBtn onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} label="Aligné gauche"><AlignLeft size={16} /></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} label="Centré"><AlignCenter size={16} /></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} label="Aligné droite"><AlignRight size={16} /></ToolBtn>
      </div>
      <EditorContent editor={editor} className="text-white [&_.ProseMirror]:min-h-[300px] [&_.ProseMirror]:p-4 [&_.ProseMirror]:outline-none [&_.ProseMirror_p]:my-1 [&_.ProseMirror_h1]:text-2xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h2]:text-xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h3]:text-lg [&_.ProseMirror_h3]:font-bold [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-blue-500 [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:text-slate-400 [&_.ProseMirror_pre]:bg-slate-950 [&_.ProseMirror_pre]:rounded [&_.ProseMirror_pre]:p-3 [&_.ProseMirror_pre]:text-sm [&_.ProseMirror_pre]:font-mono [&_.ProseMirror_code]:bg-slate-700 [&_.ProseMirror_code]:px-1 [&_.ProseMirror_code]:rounded [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6 [&_.ProseMirror_a]:text-blue-400 [&_.ProseMirror_a]:underline [&_.ProseMirror_table]:w-full [&_.ProseMirror_table]:border-collapse [&_.ProseMirror_th]:border [&_.ProseMirror_th]:border-white/20 [&_.ProseMirror_th]:p-2 [&_.ProseMirror_th]:bg-slate-700 [&_.ProseMirror_td]:border [&_.ProseMirror_td]:border-white/20 [&_.ProseMirror_td]:p-2 [&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:rounded [&_.ProseMirror_hr]:border-white/20 [&_.ProseMirror_hr]:my-4 [&_.ProseMirror_ul]:space-y-1 [&_.ProseMirror_ol]:space-y-1 [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-slate-500 [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0" />
    </div>
  );
}
