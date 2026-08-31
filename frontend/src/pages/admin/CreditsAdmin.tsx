import { useEffect, useState } from "react";
import { api } from "@/api/client";
import type { Credit } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { toast } from "sonner";

export default function CreditsAdmin() {
  const [credits, setCredits] = useState<Credit[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ category: "Graphismes & Visuels", personName: "", task: "", socialLink: "", sortOrder: 0 });

  useEffect(() => { load(); }, []);

  const load = async () => setCredits(await api.getCredits());

  const startEdit = (c?: Credit) => {
    if (c) {
      setEditing(c.id);
      setForm({ category: c.category, personName: c.personName, task: c.task || "", socialLink: c.socialLink || "", sortOrder: c.sortOrder });
    } else {
      setEditing("new");
      setForm({ category: "Graphismes & Visuels", personName: "", task: "", socialLink: "", sortOrder: credits.length });
    }
  };

  const save = async () => {
    if (editing === "new") await api.createCredit(form);
    else if (editing) await api.updateCredit(editing, form);
    setEditing(null); load();
  };

  const remove = async (id: string) => {
    await api.deleteCredit(id);
    toast.success("Crédit supprimé");
    load();
  };

  const categories = ["Graphismes & Visuels", "Anciens Traducteurs", "Remerciements Spéciaux"];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Crédits</h2>
        <Button onClick={() => startEdit()} size="sm" className="bg-blue-600 hover:bg-blue-500 text-white"><Plus size={16} className="mr-1" /> Ajouter</Button>
      </div>

      {editing && (
        <Card className="bg-slate-900 border-white/10">
          <CardContent className="p-4 space-y-3">
            <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
              <SelectTrigger className="w-full bg-slate-800 border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10 text-white">
                {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Nom" value={form.personName} onChange={(e) => setForm({ ...form, personName: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
              <Input placeholder="Rôle / Tâche" value={form.task} onChange={(e) => setForm({ ...form, task: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
              <Input placeholder="Lien social" value={form.socialLink || ""} onChange={(e) => setForm({ ...form, socialLink: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
              <Input type="number" placeholder="Ordre" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} className="bg-slate-800 border-white/10 text-white" />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={save} className="bg-blue-600 hover:bg-blue-500 text-white"><Check size={16} className="mr-1" /> Sauvegarder</Button>
              <Button size="sm" variant="outline" onClick={() => setEditing(null)}><X size={16} className="mr-1" /> Annuler</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {categories.map((cat) => {
        const items = credits.filter((c) => c.category === cat);
        if (!items.length) return null;
        return (
          <div key={cat}>
            <h3 className="text-lg font-semibold text-slate-300 mb-2">{cat}</h3>
            <div className="space-y-2">
              {items.map((c) => (
                <Card key={c.id} className="bg-slate-900/50 border-white/10">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white">{c.personName}</span>
                      {c.task && <span className="text-slate-400 text-sm ml-2">— {c.task}</span>}
                    </div>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" className="text-slate-300" onClick={() => startEdit(c)}><Pencil size={16} /></Button>
                      <Button size="icon" variant="ghost" className="text-red-400" onClick={() => remove(c.id)}><Trash2 size={16} /></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
