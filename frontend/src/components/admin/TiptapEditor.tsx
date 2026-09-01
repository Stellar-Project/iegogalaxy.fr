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
import { useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Minus,
  List,
  ListOrdered,
  Code2,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo2,
  Redo2,
  Trash,
} from "lucide-react";

const lowlight = createLowlight(common);

interface Props {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

interface ToolBtnProps {
  onClick: () => void;
  active?: boolean;
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
}

function ToolBtn({ onClick, active, label, children, disabled = false }: ToolBtnProps) {
  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      onClick={onClick}
      disabled={disabled}
      className={`h-8 w-8 cursor-pointer transition-colors ${
        active
          ? "bg-primary/20 text-primary font-black hover:bg-primary/30"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
      }`}
      title={label}
    >
      {children}
    </Button>
  );
}

function Divider() {
  return <div className="w-px h-5 bg-border mx-0.5" />;
}

export default function TiptapEditor({ content, onChange, placeholder }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: { levels: [1, 2, 3] },
        link: false,
        underline: false,
      }),
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
      TableOfContents,
    ],
    content,
    onUpdate: ({ editor: ed }) => onChange(ed.getHTML()),
    editorProps: {
      attributes: { class: "focus:outline-none min-h-75 p-4 text-foreground font-medium" },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const addLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL du lien :", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt("URL de l'image (ex: /assets/... ou https://...) :");
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addTable = useCallback(() => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  if (!editor) return null;

  const isInTable = editor.isActive("table");

  return (
    <div className="bg-card/80 border border-border rounded-xl overflow-hidden shadow-xs backdrop-blur-md">
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-border bg-secondary/40 backdrop-blur-md sticky top-0 z-10">
        <ToolBtn onClick={() => editor.chain().focus().undo().run()} label="Annuler">
          <Undo2 size={16} />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().redo().run()} label="Refaire">
          <Redo2 size={16} />
        </ToolBtn>

        <Divider />

        <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} label="Gras">
          <Bold size={16} />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} label="Italique">
          <Italic size={16} />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} label="Souligné">
          <UnderlineIcon size={16} />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} label="Barré">
          <Strikethrough size={16} />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} label="Code en ligne">
          <Code size={16} />
        </ToolBtn>

        <Divider />

        <ToolBtn
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive("heading", { level: 1 })}
          label="Titre 1"
        >
          <Heading1 size={16} />
        </ToolBtn>
        <ToolBtn
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          label="Titre 2"
        >
          <Heading2 size={16} />
        </ToolBtn>
        <ToolBtn
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          label="Titre 3"
        >
          <Heading3 size={16} />
        </ToolBtn>
        <ToolBtn
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          label="Citation"
        >
          <Quote size={16} />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} label="Séparateur horizontal">
          <Minus size={16} />
        </ToolBtn>

        <Divider />

        <ToolBtn
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          label="Liste à puces"
        >
          <List size={16} />
        </ToolBtn>
        <ToolBtn
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          label="Liste numérotée"
        >
          <ListOrdered size={16} />
        </ToolBtn>

        <Divider />

        <ToolBtn
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
          label="Bloc de code"
        >
          <Code2 size={16} />
        </ToolBtn>
        <ToolBtn onClick={addLink} active={editor.isActive("link")} label="Lien hypertexte">
          <LinkIcon size={16} />
        </ToolBtn>
        <ToolBtn onClick={addImage} label="Image">
          <ImageIcon size={16} />
        </ToolBtn>
        <ToolBtn onClick={addTable} active={isInTable} label="Insérer un tableau">
          <TableIcon size={16} />
        </ToolBtn>

        <Divider />

        <ToolBtn
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
          label="Aligner à gauche"
        >
          <AlignLeft size={16} />
        </ToolBtn>
        <ToolBtn
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
          label="Centrer"
        >
          <AlignCenter size={16} />
        </ToolBtn>
        <ToolBtn
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
          label="Aligner à droite"
        >
          <AlignRight size={16} />
        </ToolBtn>

        {isInTable && (
          <>
            <Divider />
            <div className="flex items-center gap-0.5 bg-secondary/50 rounded-lg p-0.5">
              <ToolBtn onClick={() => editor.chain().focus().addColumnAfter().run()} label="Ajouter colonne">
                <span className="text-[10px] font-black font-mono">+Col</span>
              </ToolBtn>
              <ToolBtn onClick={() => editor.chain().focus().addRowAfter().run()} label="Ajouter ligne">
                <span className="text-[10px] font-black font-mono">+Lig</span>
              </ToolBtn>
              <ToolBtn onClick={() => editor.chain().focus().deleteColumn().run()} label="Supprimer colonne">
                <span className="text-[10px] font-black font-mono text-destructive">-Col</span>
              </ToolBtn>
              <ToolBtn onClick={() => editor.chain().focus().deleteRow().run()} label="Supprimer ligne">
                <span className="text-[10px] font-black font-mono text-destructive">-Lig</span>
              </ToolBtn>
              <ToolBtn onClick={() => editor.chain().focus().deleteTable().run()} label="Supprimer tableau">
                <Trash size={14} className="text-destructive" />
              </ToolBtn>
            </div>
          </>
        )}
      </div>

      <EditorContent
        editor={editor}
        className="text-foreground [&_.ProseMirror]:min-h-75 [&_.ProseMirror]:p-4 [&_.ProseMirror]:outline-none [&_.ProseMirror_p]:my-2 [&_.ProseMirror_p]:leading-relaxed [&_.ProseMirror_h1]:text-2xl [&_.ProseMirror_h1]:font-black [&_.ProseMirror_h1]:text-foreground [&_.ProseMirror_h1]:tracking-tight [&_.ProseMirror_h1]:mt-6 [&_.ProseMirror_h1]:mb-3 [&_.ProseMirror_h2]:text-xl [&_.ProseMirror_h2]:font-black [&_.ProseMirror_h2]:text-foreground [&_.ProseMirror_h2]:tracking-tight [&_.ProseMirror_h2]:mt-5 [&_.ProseMirror_h2]:mb-2 [&_.ProseMirror_h3]:text-lg [&_.ProseMirror_h3]:font-black [&_.ProseMirror_h3]:text-foreground [&_.ProseMirror_h3]:tracking-tight [&_.ProseMirror_h3]:mt-4 [&_.ProseMirror_h3]:mb-2 [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-primary [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:text-muted-foreground [&_.ProseMirror_blockquote]:my-4 [&_.ProseMirror_pre]:bg-secondary/70 [&_.ProseMirror_pre]:border [&_.ProseMirror_pre]:border-border [&_.ProseMirror_pre]:rounded-lg [&_.ProseMirror_pre]:p-3.5 [&_.ProseMirror_pre]:text-xs [&_.ProseMirror_pre]:font-mono [&_.ProseMirror_code]:bg-secondary [&_.ProseMirror_code]:text-accent [&_.ProseMirror_code]:px-1.5 [&_.ProseMirror_code]:py-0.5 [&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:text-xs [&_.ProseMirror_code]:font-mono [&_.ProseMirror_code]:font-bold [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6 [&_.ProseMirror_a]:text-primary [&_.ProseMirror_a]:underline [&_.ProseMirror_a]:underline-offset-2 [&_.ProseMirror_table]:w-full [&_.ProseMirror_table]:border-collapse [&_.ProseMirror_table]:my-4 [&_.ProseMirror_th]:border [&_.ProseMirror_th]:border-border [&_.ProseMirror_th]:p-2.5 [&_.ProseMirror_th]:bg-secondary/60 [&_.ProseMirror_th]:font-black [&_.ProseMirror_th]:text-left [&_.ProseMirror_td]:border [&_.ProseMirror_td]:border-border [&_.ProseMirror_td]:p-2.5 [&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:rounded-lg [&_.ProseMirror_img]:border [&_.ProseMirror_img]:border-border [&_.ProseMirror_hr]:border-border [&_.ProseMirror_hr]:my-6 [&_.ProseMirror_ul]:space-y-1.5 [&_.ProseMirror_ol]:space-y-1.5 [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0"
      />
    </div>
  );
}