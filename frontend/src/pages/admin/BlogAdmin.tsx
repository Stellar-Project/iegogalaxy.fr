import { useEffect, useState } from "react";
import { api } from "@/api/client";
import type { Post, PostInput } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import TiptapEditor from "@/components/admin/TiptapEditor";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";

export default function BlogAdmin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<PostInput>({ title: "", slug: "", excerpt: "", content: "", category: "non-classé", published: false });

  useEffect(() => { load(); }, []);

  const load = async () => setPosts(await api.getPosts(true));

  const startEdit = (p?: Post) => {
    if (p) { setEditing(p.id); setForm({ title: p.title, slug: p.slug, excerpt: p.excerpt || "", content: p.content, category: p.category, published: p.published }); }
    else { setEditing("new"); setForm({ title: "", slug: "", excerpt: "", content: "", category: "non-classé", published: false }); }
  };

  const save = async () => {
    if (editing === "new") await api.createPost(form);
    else if (editing) await api.updatePost(editing, form);
    setEditing(null); load();
  };

  const remove = async (id: string) => {
    if (confirm("Supprimer ?")) { await api.deletePost(id); load(); }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Actualités</h2>
        <Button onClick={() => startEdit()} size="sm" className="bg-blue-600 hover:bg-blue-500 text-white"><Plus size={16} className="mr-1" /> Nouvel article</Button>
      </div>

      {editing && (
        <Card className="bg-slate-900 border-white/10">
          <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Titre" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
              <Input placeholder="Slug (ex: nouvelle-version)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Catégorie (ex: technique, annonce)" value={form.category || ""} onChange={(e) => setForm({ ...form, category: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
              <Input placeholder="Extrait (optionnel)" value={form.excerpt || ""} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
            </div>
            <TiptapEditor content={form.content} onChange={(html) => setForm({ ...form, content: html })} placeholder="Contenu de l'article..." />
            <label className="flex items-center gap-2 text-sm text-slate-400"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Publié</label>
            <div className="flex gap-2">
              <Button size="sm" onClick={save} className="bg-blue-600 hover:bg-blue-500 text-white"><Check size={16} className="mr-1" /> Sauvegarder</Button>
              <Button size="sm" variant="outline" onClick={() => setEditing(null)}><X size={16} className="mr-1" /> Annuler</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {posts.map((p) => (
          <Card key={p.id} className="bg-slate-900/50 border-white/10">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white truncate">{p.title}</span>
                  {!p.published && <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full shrink-0">brouillon</span>}
                  <span className="text-[10px] text-slate-500 shrink-0">[{p.category}]</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">/{p.slug} — {new Date(p.createdAt).toLocaleDateString("fr-FR")}</p>
              </div>
              <div className="flex gap-2 shrink-0 ml-4">
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