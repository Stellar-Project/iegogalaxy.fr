import { useEffect, useState } from "react";
import { api } from "@/api/client";
import type { FaqItem } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";

export default function FaqAdmin() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ question: "", answer: "", category: "general", sortOrder: 0, published: false });

  useEffect(() => { load(); }, []);

  const load = async () => setItems(await api.getFaqAll());

  const startEdit = (item?: FaqItem) => {
    if (item) { setEditing(item.id); setForm({ question: item.question, answer: item.answer, category: item.category, sortOrder: item.sortOrder, published: item.published }); }
    else { setEditing("new"); setForm({ question: "", answer: "", category: "general", sortOrder: items.length, published: false }); }
  };

  const save = async () => {
    if (editing === "new") await api.createFaq(form);
    else if (editing) await api.updateFaq(editing, form);
    setEditing(null); load();
  };

  const remove = async (id: string) => {
    if (confirm("Supprimer ?")) { await api.deleteFaq(id); load(); }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">FAQ</h2>
        <Button onClick={() => startEdit()} size="sm" className="bg-blue-600 hover:bg-blue-500 text-white"><Plus size={16} className="mr-1" /> Ajouter une question</Button>
      </div>

      {editing && (
        <Card className="bg-slate-900 border-white/10">
          <CardContent className="p-4 space-y-3">
            <Input placeholder="Question" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
            <textarea placeholder="Réponse" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} className="w-full bg-slate-800 border border-white/10 rounded-lg p-2 text-sm text-white h-24" />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Catégorie (ex: technique)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
              <Input type="number" placeholder="Ordre" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} className="bg-slate-800 border-white/10 text-white" />
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-400"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Publié</label>
            <div className="flex gap-2">
              <Button size="sm" onClick={save} className="bg-blue-600 hover:bg-blue-500 text-white"><Check size={16} className="mr-1" /> Sauvegarder</Button>
              <Button size="sm" variant="outline" onClick={() => setEditing(null)}><X size={16} className="mr-1" /> Annuler</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {items.map((item) => (
          <Card key={item.id} className="bg-slate-900/50 border-white/10">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white truncate">{item.question}</span>
                  {!item.published && <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full shrink-0">brouillon</span>}
                  <span className="text-[10px] text-slate-500 shrink-0">[{item.category}]</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0 ml-4">
                <Button size="icon" variant="ghost" className="text-slate-300" onClick={() => startEdit(item)}><Pencil size={16} /></Button>
                <Button size="icon" variant="ghost" className="text-red-400" onClick={() => remove(item.id)}><Trash2 size={16} /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {items.length === 0 && <p className="text-slate-500 text-sm text-center py-8">Aucune question.</p>}
      </div>
    </div>
  );
}
