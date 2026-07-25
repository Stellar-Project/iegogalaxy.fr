import { useEffect, useState } from "react";
import { api } from "@/api/client";
import type { PatchVersion } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";

export default function PatchesAdmin() {
  const [patches, setPatches] = useState<PatchVersion[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ version: "", date: "", size: "", supernovaLink: "", bigbangLink: "", changelog: "", isLatest: false });

  useEffect(() => { load(); }, []);

  const load = async () => setPatches(await api.getPatches());

  const resetForm = () => setForm({ version: "", date: "", size: "", supernovaLink: "", bigbangLink: "", changelog: "", isLatest: false });

  const startEdit = (p?: PatchVersion) => {
    if (p) {
      setEditing(p.id);
      setForm({ version: p.version, date: p.date, size: p.size, supernovaLink: p.supernovaLink || "", bigbangLink: p.bigbangLink || "", changelog: p.changelog.join("\n"), isLatest: p.isLatest });
    } else {
      setEditing("new");
      resetForm();
    }
  };

  const save = async () => {
    const data = { ...form, changelog: form.changelog.split("\n").filter(Boolean) };
    if (editing === "new") await api.createPatch(data);
    else if (editing) await api.updatePatch(editing, data);
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (confirm("Supprimer cette version ?")) { await api.deletePatch(id); load(); }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Patches</h2>
        <Button onClick={() => startEdit()} size="sm" className="bg-blue-600 hover:bg-blue-500 text-white"><Plus size={16} className="mr-1" /> Ajouter</Button>
      </div>

      {editing && (
        <Card className="bg-slate-900 border-white/10">
          <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Version (ex: 1.0)" value={form.version} onChange={(e) => setForm({ ...form, version: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
              <Input placeholder="Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
              <Input placeholder="Taille" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
              <label className="flex items-center gap-2 text-sm text-slate-400"><input type="checkbox" checked={form.isLatest} onChange={(e) => setForm({ ...form, isLatest: e.target.checked })} /> Dernière version</label>
              <Input placeholder="Lien Supernova" value={form.supernovaLink} onChange={(e) => setForm({ ...form, supernovaLink: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
              <Input placeholder="Lien Big Bang" value={form.bigbangLink} onChange={(e) => setForm({ ...form, bigbangLink: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
            </div>
            <textarea placeholder="Changelog (une ligne par changement)" value={form.changelog} onChange={(e) => setForm({ ...form, changelog: e.target.value })} className="w-full bg-slate-800 border border-white/10 rounded-lg p-2 text-sm text-white h-24" />
            <div className="flex gap-2">
              <Button size="sm" onClick={save} className="bg-blue-600 hover:bg-blue-500 text-white"><Check size={16} className="mr-1" /> Sauvegarder</Button>
              <Button size="sm" variant="outline" onClick={() => setEditing(null)}><X size={16} className="mr-1" /> Annuler</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {patches.map((p) => (
          <Card key={p.id} className="bg-slate-900/50 border-white/10">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <span className="font-bold text-white">v{p.version}</span>
                <span className="text-slate-400 text-sm ml-3">{p.date} — {p.size}</span>
                {p.isLatest && <span className="ml-2 text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">latest</span>}
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
