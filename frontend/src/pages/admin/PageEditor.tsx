import { useState, useEffect } from "react";
import { api } from "@/api/client";
import type { WikiTool, WikiPage } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TiptapEditor from "@/components/admin/TiptapEditor";
import { Plus, Pencil, Trash2, Check, X, FileText, Eye, ChevronUp, ChevronDown } from "lucide-react";
import { toast } from "sonner";

interface PageEditorProps {
  tools: WikiTool[];
  pages: WikiPage[];
  onRefreshPages: () => void;
}

export default function PageEditor({ tools, pages, onRefreshPages }: PageEditorProps) {
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [form, setForm] = useState({
    slug: "", name: "", content: "", toolId: "",
    supernovaLink: "", bigbangLink: "",
    supernovaRomLink: "", bigbangRomLink: "",
    supernovaRomSize: "", bigbangRomSize: "",
    published: true,
  });

  const selectedTool = tools.find(t => t.id === form.toolId);

  useEffect(() => {
    if (tools.length > 0 && !form.toolId) {
      setForm(prev => ({ ...prev, toolId: tools[0].id }));
    }
  }, [tools]);

  const pagesByTool = (toolId: string) => pages.filter((p) => p.toolId === toolId);

  const close = () => {
    setEditingPageId(null);
    setPreview(false);
    setMode("create");
    setForm({ slug: "", name: "", content: "", toolId: form.toolId, supernovaLink: "", bigbangLink: "", supernovaRomLink: "", bigbangRomLink: "", supernovaRomSize: "", bigbangRomSize: "", published: true });
  };

  const startEdit = (page?: WikiPage) => {
    if (page) {
      setEditingPageId(page.id);
      setMode("edit");
      setForm({
        slug: page.slug,
        name: page.title,
        content: page.content || "",
        toolId: page.toolId,
        supernovaLink: page.supernovaLink || "",
        bigbangLink: page.bigbangLink || "",
        supernovaRomLink: page.supernovaRomLink || "",
        bigbangRomLink: page.bigbangRomLink || "",
        supernovaRomSize: page.supernovaRomSize || "",
        bigbangRomSize: page.bigbangRomSize || "",
        published: page.published,
      });
    } else {
      setEditingPageId("new");
      setMode("create");
      setForm(prev => ({ ...prev, slug: "", name: "", content: "", published: true }));
    }
  };

  const save = async () => {
    const data = {
      slug: form.slug,
      title: form.name,
      content: form.content,
      toolId: form.toolId,
      supernovaLink: form.supernovaLink || null,
      bigbangLink: form.bigbangLink || null,
      supernovaRomLink: form.supernovaRomLink || null,
      bigbangRomLink: form.bigbangRomLink || null,
      supernovaRomSize: form.supernovaRomSize || null,
      bigbangRomSize: form.bigbangRomSize || null,
      published: form.published,
    };

    if (mode === "create") await api.createWikiPage(data);
    else if (editingPageId) await api.updateWikiPage(editingPageId, data);

    close();
    onRefreshPages();
  };

  const remove = async (id: string) => {
    if (confirm("Supprimer cette page ?")) {
      await api.deleteWikiPage(id);
      toast.success("Page supprimée");
      onRefreshPages();
    }
  };

  const movePage = async (id: string, direction: "up" | "down") => {
    const toolPages = pagesByTool(form.toolId).sort((a, b) => a.sortOrder - b.sortOrder);
    const idx = toolPages.findIndex((p) => p.id === id);
    if (idx === -1) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= toolPages.length) return;
    const current = toolPages[idx];
    const other = toolPages[swapIdx];
    await api.updateWikiPage(current.id, { sortOrder: other.sortOrder });
    await api.updateWikiPage(other.id, { sortOrder: current.sortOrder });
    onRefreshPages();
  };

  if (!selectedTool) return null;

  const toolPages = pagesByTool(selectedTool.id);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-xl font-bold text-white">Pages de l'outil : {selectedTool.name}</h3>
        <div className="flex gap-2">
          <Select value={form.toolId} onValueChange={v => { setForm(prev => ({ ...prev, toolId: v })); setEditingPageId(null); }}>
            <SelectTrigger className="w-[200px] bg-slate-800 border-white/10 text-white"><SelectValue /></SelectTrigger>
            <SelectContent>
              {tools.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button onClick={() => startEdit()} size="sm" className="bg-blue-600 hover:bg-blue-500 text-white"><Plus size={16} className="mr-1" /> Ajouter</Button>
        </div>
      </div>

      {editingPageId && (
        <Card className="bg-slate-900 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg text-white">{mode === "create" ? "Nouvelle page" : "Modifier la page"}</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={preview ? "default" : "outline"}
                className={preview ? "bg-blue-600 text-white" : "text-slate-300 hover:text-white"}
                onClick={() => setPreview(!preview)}
              ><Eye size={14} /> Aperçu</Button>
              <Label className="flex items-center gap-1.5 ml-auto text-xs text-slate-300">
                <Switch checked={form.published} onCheckedChange={v => setForm({...form, published: v})} size="sm" /> Publiée
              </Label>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Slug (url)" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="bg-slate-800 border-white/10 text-white" required />
              <Input placeholder="Titre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="bg-slate-800 border-white/10 text-white" required />
            </div>
            {preview ? (
              <div className="bg-background rounded-lg p-6 border border-white/5 text-slate-200 prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: form.content }} />
            ) : (
              <TiptapEditor content={form.content} onChange={html => setForm({...form, content: html})} placeholder="Contenu de la page..." />
            )}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Input placeholder="Lien patch Supernova (optionnel)" value={form.supernovaLink} onChange={e => setForm({...form, supernovaLink: e.target.value})} className="bg-slate-800 border-white/10 text-white" />
              <Input placeholder="Lien patch Big Bang (optionnel)" value={form.bigbangLink} onChange={e => setForm({...form, bigbangLink: e.target.value})} className="bg-slate-800 border-white/10 text-white" />
              <Input placeholder="Lien ROM Supernova (optionnel)" value={form.supernovaRomLink} onChange={e => setForm({...form, supernovaRomLink: e.target.value})} className="bg-slate-800 border-white/10 text-white" />
              <Input placeholder="Taille ROM Supernova" value={form.supernovaRomSize} onChange={e => setForm({...form, supernovaRomSize: e.target.value})} className="bg-slate-800 border-white/10 text-white" />
              <Input placeholder="Lien ROM Big Bang (optionnel)" value={form.bigbangRomLink} onChange={e => setForm({...form, bigbangRomLink: e.target.value})} className="bg-slate-800 border-white/10 text-white" />
              <Input placeholder="Taille ROM Big Bang" value={form.bigbangRomSize} onChange={e => setForm({...form, bigbangRomSize: e.target.value})} className="bg-slate-800 border-white/10 text-white" />
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={save} className="bg-blue-600 hover:bg-blue-500 text-white"><Check size={16} className="mr-1" /> Sauvegarder</Button>
              <Button variant="outline" onClick={close}><X size={16} className="mr-1" /> Annuler</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {toolPages.length === 0 ? (
          <p className="text-slate-500 text-center py-8">Aucune page pour cet outil. Cliquez sur "Ajouter".</p>
        ) : (
          toolPages.map((p) => (
            <Card key={p.id} className="bg-slate-900/50 border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-white truncate">{p.title}</span>
                    {p.published === false && <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded">Brouillon</span>}
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" className="text-slate-300" onClick={() => startEdit(p)}><Pencil size={16} /></Button>
                    <Button size="icon" variant="ghost" className="text-blue-400" onClick={() => movePage(p.id, "up")} title="Monter"><ChevronUp size={16} /></Button>
                    <Button size="icon" variant="ghost" className="text-blue-400" onClick={() => movePage(p.id, "down")} title="Descendre"><ChevronDown size={16} /></Button>
                    <Button size="icon" variant="ghost" className="text-red-400" onClick={() => remove(p.id)}><Trash2 size={16} /></Button>
                  </div>
                </div>
                <p className="text-sm text-slate-400 truncate">{p.slug}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}