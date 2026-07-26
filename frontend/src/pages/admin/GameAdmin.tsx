import { useEffect, useState, useRef } from "react";
import { api } from "@/api/client";
import type { Game } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Check, X, Gamepad2, Upload, ExternalLink, Download } from "lucide-react";

export default function GameAdmin() {
  const [games, setGames] = useState<Game[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ slug: "", name: "", description: "", imageUrl: "", status: "0%", releaseDate: "", downloadUrl: "", fileSize: "", sortOrder: 0, published: false, filePath: "" });

  useEffect(() => { load(); }, []);

  const load = async () => setGames(await api.getGames());

  const startEdit = (g?: Game) => {
    if (g) {
      setEditing(g.id);
      setForm({ slug: g.slug, name: g.name, description: g.description, imageUrl: g.imageUrl || "", status: g.status, releaseDate: g.releaseDate || "", downloadUrl: g.downloadUrl || "", fileSize: g.fileSize || "", sortOrder: g.sortOrder, published: g.published, filePath: g.filePath || "" });
    } else {
      setEditing("new");
      setForm({ slug: "", name: "", description: "", imageUrl: "", status: "0%", releaseDate: "", downloadUrl: "", fileSize: "", sortOrder: games.length, published: false, filePath: "" });
    }
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    try {
      const { url } = await api.uploadFile(file);
      setForm({ ...form, filePath: url.replace("/uploads/", ""), fileSize: (file.size / 1024 / 1024).toFixed(1) + " Mo" });
    } catch { alert("Upload echoue"); }
    setUploading(false);
  };

  const save = async () => {
    const data: any = { slug: form.slug, name: form.name, description: form.description, imageUrl: form.imageUrl || null, status: form.status, releaseDate: form.releaseDate || null, downloadUrl: form.downloadUrl || null, filePath: form.filePath || null, fileSize: form.fileSize || null, sortOrder: form.sortOrder, published: form.published };
    if (editing === "new") await api.createGame(data);
    else if (editing) await api.updateGame(editing, data);
    setEditing(null); load();
  };

  const remove = async (id: string) => {
    if (confirm("Supprimer ce jeu ?")) { await api.deleteGame(id); load(); }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Jeux / Mods</h2>
        <Button onClick={() => startEdit()} size="sm" className="bg-blue-600 hover:bg-blue-500 text-white"><Plus size={16} className="mr-1" /> Ajouter</Button>
      </div>

      {editing && (
        <Card className="bg-slate-900 border-white/10">
          <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Nom" value={form.name} onChange={(e) => {
                const n = e.target.value;
                setForm({ ...form, name: n, slug: form.slug === form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") || !form.slug ? n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : form.slug });
              }} className="bg-slate-800 border-white/10 text-white" />
              <Input placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
              <Input placeholder="Statut (ex: 75%)" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
              <Input placeholder="Date de sortie" value={form.releaseDate} onChange={(e) => setForm({ ...form, releaseDate: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
              <Input placeholder="URL de l'image" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
              <Input type="number" placeholder="Ordre" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} className="bg-slate-800 border-white/10 text-white" />
            </div>
            <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full bg-slate-800 border border-white/10 rounded-lg p-2 text-sm text-white h-20" />

            <div className="border border-white/10 rounded-lg p-3 space-y-3">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Fichier du mod</p>
              <Input placeholder="Lien externe (Google Drive, Mega, etc.)" value={form.downloadUrl} onChange={(e) => setForm({ ...form, downloadUrl: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs text-slate-600">OU</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
              <div className="flex items-center gap-3">
                <input ref={fileRef} type="file" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(f); }} />
                <Button size="sm" variant="outline" onClick={() => fileRef.current?.click()} disabled={uploading} className="text-slate-300">
                  <Upload size={14} className="mr-1" /> {uploading ? "Upload..." : "Uploader un fichier"}
                </Button>
                {form.filePath && <span className="text-xs text-green-400">{form.fileSize || "Fichier uploadé"}</span>}
                {form.downloadUrl && <span className="text-xs text-blue-400 truncate flex-1">{form.downloadUrl}</span>}
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-400"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Publie</label>
            <div className="flex gap-2">
              <Button size="sm" onClick={save} className="bg-blue-600 hover:bg-blue-500 text-white"><Check size={16} className="mr-1" /> Sauvegarder</Button>
              <Button size="sm" variant="outline" onClick={() => setEditing(null)}><X size={16} className="mr-1" /> Annuler</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {games.map((g) => (
          <Card key={g.id} className="bg-slate-900/50 border-white/10">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {g.imageUrl && <img src={g.imageUrl} alt="" className="w-10 h-10 object-contain rounded shrink-0" />}
                {!g.imageUrl && <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center shrink-0"><Gamepad2 size={18} className="text-slate-500" /></div>}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white truncate">{g.name}</span>
                    {!g.published && <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full shrink-0">brouillon</span>}
                    <span className="text-xs text-slate-500 shrink-0">/{g.slug}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                    <span>{g.status}</span>
                    {g.downloadUrl && <span className="flex items-center gap-1 text-blue-400"><ExternalLink size={10} /> Lien externe</span>}
                    {g.filePath && <span className="flex items-center gap-1 text-green-400"><Download size={10} /> Fichier {g.fileSize || ""}</span>}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 shrink-0 ml-4">
                <Button size="icon" variant="ghost" className="text-slate-300" onClick={() => startEdit(g)}><Pencil size={16} /></Button>
                <Button size="icon" variant="ghost" className="text-red-400" onClick={() => remove(g.id)}><Trash2 size={16} /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {games.length === 0 && <p className="text-slate-500 text-sm text-center py-8">Aucun jeu pour le moment.</p>}
      </div>
    </div>
  );
}
