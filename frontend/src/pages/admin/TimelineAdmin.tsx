import { useEffect, useState } from "react";
import { api } from "@/api/client";
import type { TimelineEvent } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";

export default function TimelineAdmin() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ date: "", title: "", description: "", sortOrder: 0 });

  useEffect(() => { load(); }, []);

  const load = async () => setEvents(await api.getTimeline());

  const startEdit = (e?: TimelineEvent) => {
    if (e) { setEditing(e.id); setForm({ date: e.date, title: e.title, description: e.description, sortOrder: e.sortOrder }); }
    else { setEditing("new"); setForm({ date: "", title: "", description: "", sortOrder: events.length }); }
  };

  const save = async () => {
    if (editing === "new") await api.createTimelineEvent(form);
    else if (editing) await api.updateTimelineEvent(editing, form);
    setEditing(null); load();
  };

  const remove = async (id: string) => {
    if (confirm("Supprimer ?")) { await api.deleteTimelineEvent(id); load(); }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Timeline</h2>
        <Button onClick={() => startEdit()} size="sm"><Plus size={16} className="mr-1" /> Ajouter</Button>
      </div>

      {editing && (
        <Card className="bg-slate-900 border-white/10">
          <CardContent className="p-4 space-y-3">
            <Input placeholder="Date (ex: Janvier 2024)" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
            <Input placeholder="Titre" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
            <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full bg-slate-800 border border-white/10 rounded-lg p-2 text-sm text-white h-20" />
            <Input type="number" placeholder="Ordre" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} className="bg-slate-800 border-white/10 text-white" />
            <div className="flex gap-2">
              <Button size="sm" onClick={save}><Check size={16} className="mr-1" /> Sauvegarder</Button>
              <Button size="sm" variant="ghost" onClick={() => setEditing(null)}><X size={16} className="mr-1" /> Annuler</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {events.map((e) => (
          <Card key={e.id} className="bg-slate-900/50 border-white/10">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <span className="text-yellow-400 font-mono font-bold">{e.date}</span>
                <span className="text-white font-bold ml-3">{e.title}</span>
                <p className="text-slate-400 text-sm mt-1">{e.description}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="icon" variant="ghost" className="text-slate-300" onClick={() => startEdit(e)}><Pencil size={16} /></Button>
                <Button size="icon" variant="ghost" className="text-red-400" onClick={() => remove(e.id)}><Trash2 size={16} /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
