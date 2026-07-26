import { useEffect, useState } from "react";
import { api } from "@/api/client";
import type { WikiTool, WikiPage } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import TiptapEditor from "@/components/admin/TiptapEditor";
import { Plus, Pencil, Trash2, Check, X, FileText, Eye, Edit3 } from "lucide-react";

export default function WikiAdmin() {
  const [tools, setTools] = useState<WikiTool[]>([]);
  const [pages, setPages] = useState<WikiPage[]>([]);

  useEffect(() => { loadTools(); loadPages(); }, []);

  const loadTools = async () => setTools(await api.getWikiTools(true));
  const loadPages = async () => setPages(await api.getWikiPages());

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Wiki</h2>
      <MergedView tools={tools} pages={pages} onRefreshTools={loadTools} onRefreshPages={loadPages} />
    </div>
  );
}

function MergedView({ tools, pages, onRefreshTools, onRefreshPages }: { tools: WikiTool[]; pages: WikiPage[]; onRefreshTools: () => void; onRefreshPages: () => void }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedPageId, setSelectedPageId] = useState<string>("");
  const [preview, setPreview] = useState(false);
  const [mode, setMode] = useState<"idle" | "create" | "edit" | "addpage">("idle");
  const [toolName, setToolName] = useState("");
  const [form, setForm] = useState({ name: "", slug: "", description: "", link: "", imagePath: "", tags: "", sortOrder: 0, content: "", published: false });

  const toSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const openCreate = () => {
    setEditingId(null); setSelectedPageId(""); setMode("create"); setPreview(false); setToolName("");
    setForm({ name: "", slug: "", description: "", link: "", imagePath: "", tags: "", sortOrder: tools.length, content: "", published: false });
  };

  const editTool = (t: WikiTool, pageId?: string) => {
    const tp = pages.filter((p) => p.toolId === t.id);
    const target = pageId ? tp.find((p) => p.id === pageId) : tp[0];
    setEditingId(t.id); setSelectedPageId(target?.id || ""); setMode("edit"); setPreview(false); setToolName(t.name);
    setForm({
      name: t.name,
      slug: target?.slug || toSlug(t.name),
      description: t.description,
      link: t.link || "",
      imagePath: t.imagePath || "",
      tags: t.tags.join(", "),
      sortOrder: t.sortOrder,
      content: target?.content || "",
      published: target?.published || false,
    });
  };

  const openAddPage = (toolId: string) => {
    const t = tools.find((x) => x.id === toolId);
    setEditingId(toolId); setSelectedPageId(""); setMode("addpage"); setPreview(false); setToolName(t?.name || "");
    setForm({ name: "", slug: "", description: "", link: "", imagePath: "", tags: "", sortOrder: 0, content: "", published: false });
  };

  const switchPage = (pageId: string) => {
    const p = pages.find((x) => x.id === pageId);
    if (!p) return;
    setSelectedPageId(pageId);
    setForm((f) => ({ ...f, slug: p.slug, content: p.content, published: p.published }));
  };

  const close = () => { setEditingId(null); setMode("idle"); setToolName(""); };

  const removeTool = async (id: string) => {
    if (confirm("Supprimer cet outil et ses pages ?")) { await api.deleteWikiTool(id); onRefreshTools(); onRefreshPages(); }
  };

  const removePage = async (id: string) => {
    if (confirm("Supprimer ?")) { await api.deleteWikiPage(id); onRefreshPages(); }
  };

  const save = async () => {
    const tags = form.tags.split(",").map((s) => s.trim()).filter(Boolean);
    const slug = form.slug || toSlug(form.name);
    if (mode === "addpage" && editingId) {
      await api.createWikiPage({ slug, title: form.name || form.slug, content: form.content, toolId: editingId, published: form.published });
    } else if (mode === "create") {
      const tool = await api.createWikiTool({ name: form.name, description: form.description, link: form.link || null, imagePath: form.imagePath || null, tags, sortOrder: form.sortOrder });
      await api.createWikiPage({ slug, title: form.name, content: form.content, toolId: tool.id, published: form.published });
    } else if (mode === "edit" && editingId) {
      await api.updateWikiTool(editingId, { name: form.name, description: form.description, link: form.link || null, imagePath: form.imagePath || null, tags, sortOrder: form.sortOrder });
      if (selectedPageId) {
        await api.updateWikiPage(selectedPageId, { slug, title: form.name, content: form.content, published: form.published });
      } else {
        const existing = pages.filter((p) => p.toolId === editingId);
        if (existing.length > 0) {
          await api.updateWikiPage(existing[0].id, { slug, title: form.name, content: form.content, published: form.published });
        } else {
          await api.createWikiPage({ slug, title: form.name, content: form.content, toolId: editingId, published: form.published });
        }
      }
    }
    close(); onRefreshTools(); onRefreshPages();
  };

  const pagesByTool = (toolId: string) => pages.filter((p) => p.toolId === toolId);
  return (
    <div className="space-y-4">
      <Button onClick={openCreate} size="sm" className="bg-blue-600 hover:bg-blue-500 text-white"><Plus size={16} className="mr-1" /> Ajouter un wiki</Button>

      {mode !== "idle" && (
        <Card className="bg-slate-900 border-white/10">
          <CardContent className="p-4 space-y-4">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
              {mode === "create" ? "Nouveau wiki" : mode === "addpage" ? "Nouvelle page" : `Modifier : ${form.name}`}
            </h3>

            {mode !== "addpage" && (
              <div className="border border-white/10 rounded-lg p-3 space-y-3">
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Informations de l'outil</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Input placeholder="Nom (ex: Kuriimu1)" value={form.name} onChange={(e) => {
                      const n = e.target.value;
                      setForm({ ...form, name: n, slug: form.slug === toSlug(form.name) || !form.slug ? toSlug(n) : form.slug });
                    }} className="bg-slate-800 border-white/10 text-white" />
                    <p className="text-[10px] text-slate-500 mt-1">Slug : <span className="text-slate-400">{form.slug || toSlug(form.name)}</span></p>
                  </div>
                  <Input placeholder="Tags (séparés par des virgules)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
                  <Input placeholder="URL de l'icône" value={form.imagePath} onChange={(e) => setForm({ ...form, imagePath: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
                  <Input type="number" placeholder="Ordre d'affichage" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} className="bg-slate-800 border-white/10 text-white" />
                  <Input placeholder="Lien externe (optionnel)" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
                </div>
                <textarea placeholder="Description de l'outil" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full bg-slate-800 border border-white/10 rounded-lg p-2 text-sm text-white h-16" />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => window.open(`/wiki`, "_blank")} className="text-white">Voir l'outil dans le wiki</Button>
                  <Button size="sm" disabled={!form.slug && !toSlug(form.name)} onClick={() => window.open(`/wiki/${form.slug || toSlug(form.name)}`, "_blank")} className="text-white">Voir la page</Button>
                </div>
              </div>
            )}

            {mode === "addpage" && (
              <div className="border border-white/10 rounded-lg p-3 space-y-2">
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Nouvelle page pour : {toolName}</p>
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Slug (ex: kuriimu1-guide)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
                  <Input placeholder="Titre de la page" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: e.target.value ? toSlug(e.target.value) : form.slug })} className="bg-slate-800 border-white/10 text-white" />
                </div>
              </div>
            )}

            {mode === "edit" && editingId && (
              <div className="flex items-center gap-2 border border-white/10 rounded-lg p-3">
                <FileText size={14} className="text-slate-500 shrink-0" />
                <select value={selectedPageId} onChange={(e) => switchPage(e.target.value)}
                  className="bg-slate-800 border border-white/10 rounded text-sm text-slate-300 px-2 py-1 flex-1">
                  {pagesByTool(editingId).map((p) => (
                    <option key={p.id} value={p.id}>{p.title} {!p.published ? "(brouillon)" : ""}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="border border-white/10 rounded-lg p-3 space-y-3">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Édition de la page</p>
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <button type="button" onClick={() => setPreview(false)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors ${!preview ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}>
                  <Edit3 size={14} /> Éditer
                </button>
                <button type="button" onClick={() => setPreview(true)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors ${preview ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}>
                  <Eye size={14} /> Aperçu
                </button>
                <label className="flex items-center gap-1.5 ml-auto text-xs text-slate-400 cursor-pointer">
                  <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Publiée
                </label>
              </div>
              {preview ? (
                <div className="bg-slate-950 rounded-lg p-6 border border-white/5 text-slate-200">
                  <PagePreview title={form.name || form.slug} content={form.content} />
                </div>
              ) : (
                <TiptapEditor content={form.content} onChange={(html) => setForm({ ...form, content: html })} placeholder="Contenu de la page..." />
              )}
            </div>

            <div className="flex gap-2">
              <Button size="sm" onClick={save} className="bg-blue-600 hover:bg-blue-500 text-white"><Check size={16} className="mr-1" /> Sauvegarder</Button>
              <Button size="sm" variant="outline" onClick={close}><X size={16} className="mr-1" /> Annuler</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {tools.map((t) => {
          const tp = pagesByTool(t.id);
          return (
            <Card key={t.id} className="bg-slate-900/50 border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {t.imagePath && <img src={t.imagePath} alt="" className="w-8 h-8 object-contain" />
                    }<div>
                      <span className="font-bold text-white">{t.name}</span>
                      <div className="flex gap-1 mt-1">{t.tags.map((tag) => <span key={tag} className="text-[10px] bg-white/10 text-slate-400 px-1.5 py-0.5 rounded">{tag}</span>)}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button size="sm" variant="ghost" className="text-blue-400" onClick={() => openAddPage(t.id)}><Plus size={14} className="mr-1" /> Page</Button>
                    <Button size="icon" variant="ghost" className="text-slate-300" onClick={() => editTool(t)}><Pencil size={16} /></Button>
                    <Button size="icon" variant="ghost" className="text-red-400" onClick={() => removeTool(t.id)}><Trash2 size={16} /></Button>
                  </div>
                </div>
                {tp.length === 0 && <p className="text-xs text-slate-500 italic">Aucune page</p>}
                {tp.map((p) => (
                  <div key={p.id} className="flex items-center justify-between py-2 border-t border-white/5 hover:bg-white/5 cursor-pointer" onClick={() => editTool(t, p.id)}>
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText size={14} className="text-slate-500 shrink-0" />
                      <span className="text-sm text-white truncate">{p.title}</span>
                      <span className="text-xs text-slate-500 shrink-0">/{p.slug}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button type="button" onClick={(e) => { e.stopPropagation(); api.updateWikiPage(p.id, { published: !p.published }).then(() => onRefreshPages()); }}
                        className={`text-[10px] px-1.5 py-0.5 rounded-full shrink-0 cursor-pointer transition-colors ${p.published ? "bg-green-500/20 text-green-400 hover:bg-green-500/30" : "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"}`}>
                        {p.published ? "publié" : "brouillon"}
                      </button>
                      <Button size="icon" variant="ghost" className="text-red-400 h-7 w-7" onClick={(e) => { e.stopPropagation(); removePage(p.id); }}><Trash2 size={12} /></Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

    </div>
  );
}

function parseHeadings(html: string): { id: string; text: string; level: number }[] {
  const regex = /<h([2-3])([^>]*)>(.*?)<\/h\1>/gi;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = match[3].replace(/<[^>]*>/g, "");
    const existingId = match[2].match(/id="([^"]+)"/);
    const id = existingId ? existingId[1] : text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    headings.push({ id, text, level: parseInt(match[1]) });
  }
  return headings;
}

function addHeadingIds(html: string): string {
  return html.replace(/<h([2-3])([^>]*)>(.*?)<\/h\1>/gi, (_, level, attrs, text) => {
    if (/id=/.test(attrs)) return `<h${level}${attrs}>${text}</h${level}>`;
    const clean = text.replace(/<[^>]*>/g, "");
    const id = clean.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
  });
}

function readingTime(html: string): number {
  const words = html.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function PagePreview({ title, content, createdAt, tool }: { title: string; content: string; createdAt?: string; tool?: WikiTool | null }) {
  const headings = parseHeadings(content);
  const html = addHeadingIds(content);
  const mins = readingTime(content);

  return (
    <div className="text-slate-200 max-w-none
      [&_h2]:text-yellow-400 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:scroll-mt-24
      [&_h3]:text-yellow-300 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:scroll-mt-24
      [&_a]:text-blue-400 [&_a:hover]:text-blue-300 [&_a]:underline
      [&_code]:bg-slate-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm
      [&_pre]:bg-slate-900 [&_pre]:border [&_pre]:border-white/10 [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto
      [&_img]:rounded-lg [&_img]:max-w-full [&_img]:mx-auto [&_img]:my-8
      [&_blockquote]:border-l-2 [&_blockquote]:border-yellow-500 [&_blockquote]:pl-4 [&_blockquote]:text-slate-400 [&_blockquote]:italic
      [&_table]:w-full [&_table]:border-collapse [&_th]:text-left [&_th]:text-yellow-400 [&_th]:border-b [&_th]:border-white/20 [&_th]:p-2
      [&_td]:border-b [&_td]:border-white/10 [&_td]:p-2 [&_tr:last-child_td]:border-b-0
      [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1
      [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1
      [&_hr]:border-white/10 [&_hr]:my-8
      [&_p]:leading-relaxed [&_p]:my-4">
      <h1 className="!text-white !text-3xl md:!text-4xl !font-extrabold !mb-3 !mt-0">{title}</h1>
      <div className="flex items-center gap-2 text-sm text-slate-400 !mb-8 !mt-0">
        {createdAt && <time>{new Date(createdAt).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}</time>}
        {!createdAt && <span>Date non définie</span>}
        <span>·</span>
        <span>{mins} min de lecture</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {tool && (
        <div className="!mt-12 !pt-8 border-t border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500">Outil associé :</span>
          <span className="inline-flex items-center gap-1 text-sm bg-white/5 text-slate-300 px-3 py-1 rounded-full">{tool.name}</span>
        </div>
      )}
    </div>
  );
}


