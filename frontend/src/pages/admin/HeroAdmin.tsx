import { useEffect, useState } from "react";
import { api } from "@/api/client";
import type { HeroBackground } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";

export default function HeroAdmin() {
  const [items, setItems] = useState<HeroBackground[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ imageUrl: "", sortOrder: 0 });
  const [uploading, setUploading] = useState(false);

  useEffect(() => { load(); }, []);

  const load = async () => setItems(await api.getHero());

  const startEdit = (s?: HeroBackground) => {
    if (s) { setEditing(s.id); setForm({ imageUrl: s.imageUrl, sortOrder: s.sortOrder }); }
    else { setEditing("new"); setForm({ imageUrl: "", sortOrder: items.length }); }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try { const { url } = await api.uploadFile(file); setForm((f) => ({ ...f, imageUrl: url })); } catch { alert("Upload failed"); }
    setUploading(false);
  };

  const save = async () => {
    if (editing === "new") await api.createHero(form);
    else if (editing) await api.updateHero(editing, form);
    setEditing(null); load();
  };

  const remove = async (id: string) => {
    if (confirm("Delete?")) { await api.deleteHero(id); load(); }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Hero Backgrounds</h2>
        <Button onClick={() => startEdit()} size="sm"><Plus size={16} className="mr-1" /> Add</Button>
      </div>

      {editing && (
        <Card className="bg-slate-900 border-white/10">
          <CardContent className="p-4 space-y-3">
            <div className="flex gap-2">
              <Input placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="bg-slate-800 border-white/10 text-white flex-1" />
              <label className="shrink-0 cursor-pointer">
                <span className="inline-flex items-center gap-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm rounded-lg border border-white/10">{uploading ? "..." : "Upload"}</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
              </label>
            </div>
            <Input type="number" placeholder="Sort order" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} className="bg-slate-800 border-white/10 text-white" />
            {form.imageUrl && <img src={form.imageUrl} alt="preview" className="h-32 object-contain rounded bg-slate-800" />}
            <div className="flex gap-2">
              <Button size="sm" onClick={save}><Check size={16} className="mr-1" /> Save</Button>
              <Button size="sm" variant="ghost" onClick={() => setEditing(null)}><X size={16} className="mr-1" /> Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((s) => (
          <Card key={s.id} className="bg-slate-900/50 border-white/10 overflow-hidden group">
            <div className="aspect-video bg-slate-800 relative">
              <img src={s.imageUrl} alt="" className="w-full h-full object-contain" />
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="ghost" className="h-8 w-8 bg-black/50 text-slate-300" onClick={() => startEdit(s)}><Pencil size={14} /></Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 bg-black/50 text-red-400" onClick={() => remove(s.id)}><Trash2 size={14} /></Button>
              </div>
            </div>
            <CardContent className="p-2 text-xs text-slate-500 truncate">{s.imageUrl}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}