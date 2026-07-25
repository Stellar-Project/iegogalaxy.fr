import { useEffect, useState } from "react";
import { api } from "@/api/client";
import type { WikiTool, WikiPage } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TiptapEditor from "@/components/admin/TiptapEditor";
import { Plus, Pencil, Trash2, Check, X, BookOpen, FileText } from "lucide-react";

export default function WikiAdmin() {
  const [tools, setTools] = useState<WikiTool[]>([]);
  const [pages, setPages] = useState<WikiPage[]>([]);
  const [activeTab, setActiveTab] = useState("tools");

  useEffect(() => { loadTools(); loadPages(); }, []);

  const loadTools = async () => setTools(await api.getWikiTools());
  const loadPages = async () => setPages(await api.getWikiPages());

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Wiki</h2>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-slate-900 border-white/10">
          <TabsTrigger value="tools" className="data-[state=active]:bg-blue-600"><BookOpen size={16} className="mr-1" /> Outils</TabsTrigger>
          <TabsTrigger value="pages" className="data-[state=active]:bg-blue-600"><FileText size={16} className="mr-1" /> Pages</TabsTrigger>
        </TabsList>

        <TabsContent value="tools" className="mt-4">
          <ToolsSection tools={tools} onRefresh={loadTools} />
        </TabsContent>
        <TabsContent value="pages" className="mt-4">
          <PagesSection pages={pages} tools={tools} onRefresh={loadPages} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ToolsSection({ tools, onRefresh }: { tools: WikiTool[]; onRefresh: () => void }) {
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", description: "", imagePath: "", link: "", tags: "", sortOrder: 0, visible: true });

  const startEdit = (t?: WikiTool) => {
    if (t) { setEditing(t.id); setForm({ name: t.name, description: t.description, imagePath: t.imagePath || "", link: t.link || "", tags: t.tags.join(", "), sortOrder: t.sortOrder, visible: t.visible ?? true }); }
    else { setEditing("new"); setForm({ name: "", description: "", imagePath: "", link: "", tags: "", sortOrder: tools.length, visible: true }); }
  };

  const save = async () => {
    const data = { ...form, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean) };
    if (editing === "new") await api.createWikiTool(data);
    else if (editing) await api.updateWikiTool(editing, data);
    setEditing(null); onRefresh();
  };

  const remove = async (id: string) => {
    if (confirm("Supprimer ?")) { await api.deleteWikiTool(id); onRefresh(); }
  };

  return (
    <div className="space-y-4">
      <Button onClick={() => startEdit()} size="sm" className="bg-blue-600 hover:bg-blue-500 text-white"><Plus size={16} className="mr-1" /> Ajouter un outil</Button>
      {editing && (
        <Card className="bg-slate-900 border-white/10">
          <CardContent className="p-4 space-y-3">
            <Input placeholder="Nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
            <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full bg-slate-800 border border-white/10 rounded-lg p-2 text-sm text-white h-20" />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="URL de l'icône" value={form.imagePath} onChange={(e) => setForm({ ...form, imagePath: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
              <Input placeholder="Lien wiki" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
              <Input placeholder="Tags (séparés par des virgules)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
              <Input type="number" placeholder="Ordre d'affichage" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} className="bg-slate-800 border-white/10 text-white" />
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-400">
              <input type="checkbox" checked={form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} /> Visible sur le site
            </label>
            <div className="flex gap-2">
              <Button size="sm" onClick={save} className="bg-blue-600 hover:bg-blue-500 text-white"><Check size={16} className="mr-1" /> Sauvegarder</Button>
              <Button size="sm" variant="outline" onClick={() => setEditing(null)}><X size={16} className="mr-1" /> Annuler</Button>
            </div>
          </CardContent>
        </Card>
      )}
      <div className="grid md:grid-cols-2 gap-4">
        {tools.map((t) => (
          <Card key={t.id} className={`bg-slate-900/50 border-white/10 ${!t.visible ? "opacity-50" : ""}`}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {t.imagePath && <img src={t.imagePath} alt="" className="w-8 h-8 object-contain" />}
                <div>
                  <span className="font-bold text-white">{t.name}</span>
                  <div className="flex gap-1 mt-1">{t.tags.map((tag) => <span key={tag} className="text-[10px] bg-white/10 text-slate-400 px-1.5 py-0.5 rounded">{tag}</span>)}</div>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="icon" variant="ghost" className="text-slate-300" onClick={() => startEdit(t)}><Pencil size={16} /></Button>
                <Button size="icon" variant="ghost" className="text-red-400" onClick={() => remove(t.id)}><Trash2 size={16} /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function PagesSection({ pages, tools, onRefresh }: { pages: WikiPage[]; tools: WikiTool[]; onRefresh: () => void }) {
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ slug: "", title: "", content: "", toolId: "", published: false });

  const startEdit = (p?: WikiPage) => {
    if (p) { setEditing(p.id); setForm({ slug: p.slug, title: p.title, content: p.content, toolId: p.toolId || "", published: p.published }); }
    else { setEditing("new"); setForm({ slug: "", title: "", content: "", toolId: "", published: false }); }
  };

  const save = async () => {
    const data = { ...form, toolId: form.toolId || null };
    if (editing === "new") await api.createWikiPage(data);
    else if (editing) await api.updateWikiPage(editing, data);
    setEditing(null); onRefresh();
  };

  const remove = async (id: string) => {
    if (confirm("Supprimer ?")) { await api.deleteWikiPage(id); onRefresh(); }
  };

  return (
    <div className="space-y-4">
      <Button onClick={() => startEdit()} size="sm" className="bg-blue-600 hover:bg-blue-500 text-white"><Plus size={16} className="mr-1" /> Ajouter une page</Button>
      {editing && (
        <Card className="bg-slate-900 border-white/10">
          <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Slug (ex: kuriimu1)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
              <Input placeholder="Titre" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
              <select value={form.toolId} onChange={(e) => setForm({ ...form, toolId: e.target.value })} className="bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white">
                <option value="">Aucun outil lié</option>
                {tools.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
              <label className="flex items-center gap-2 text-sm text-slate-400"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Publiée</label>
            </div>
            <TiptapEditor content={form.content} onChange={(html) => setForm({ ...form, content: html })} placeholder="Contenu de la page..." />
            <div className="flex gap-2">
              <Button size="sm" onClick={save} className="bg-blue-600 hover:bg-blue-500 text-white"><Check size={16} className="mr-1" /> Sauvegarder</Button>
              <Button size="sm" variant="outline" onClick={() => setEditing(null)}><X size={16} className="mr-1" /> Annuler</Button>
            </div>
          </CardContent>
        </Card>
      )}
      <div className="space-y-2">
        {pages.map((p) => (
          <Card key={p.id} className="bg-slate-900/50 border-white/10">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <span className="font-bold text-white">{p.title}</span>
                <span className="text-slate-400 text-sm ml-2">/{p.slug}</span>
                {p.tool && <span className="text-xs text-blue-400 ml-2">({p.tool.name})</span>}
                {!p.published && <span className="ml-2 text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">brouillon</span>}
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" className="text-slate-300" onClick={() => startEdit(p)}><Pencil size={16} /></Button>
                <Button size="icon" variant="ghost" className="text-red-400" onClick={() => remove(p.id)}><Trash2 size={16} /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
