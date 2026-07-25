import { useEffect, useState } from "react";
import { api } from "@/api/client";
import type { TeamMember } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";

export default function TeamAdmin() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", role: "", category: "trans", discordId: "", avatarUrl: "", sortOrder: 0 });

  useEffect(() => { load(); }, []);

  const load = async () => setMembers(await api.getTeam());

  const startEdit = (m?: TeamMember) => {
    if (m) { setEditing(m.id); setForm(m); }
    else { setEditing("new"); setForm({ name: "", role: "", category: "trans", discordId: "", avatarUrl: "", sortOrder: members.length }); }
  };

  const save = async () => {
    if (editing === "new") await api.createTeamMember(form);
    else if (editing) await api.updateTeamMember(editing, form);
    setEditing(null); load();
  };

  const remove = async (id: string) => {
    if (confirm("Supprimer ce membre ?")) { await api.deleteTeamMember(id); load(); }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Équipe</h2>
        <Button onClick={() => startEdit()} size="sm" className="bg-blue-600 hover:bg-blue-500 text-white"><Plus size={16} className="mr-1" /> Ajouter</Button>
      </div>

      {editing && (
        <Card className="bg-slate-900 border-white/10">
          <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
              <Input placeholder="Rôle" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white">
                <option value="lead">Lead</option><option value="dev">Dev</option><option value="trans">Trans</option><option value="art">Art</option>
              </select>
              <Input placeholder="Discord ID" value={form.discordId || ""} onChange={(e) => setForm({ ...form, discordId: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
              <Input placeholder="Avatar URL" value={form.avatarUrl || ""} onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
              <Input type="number" placeholder="Ordre" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} className="bg-slate-800 border-white/10 text-white" />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={save} className="bg-blue-600 hover:bg-blue-500 text-white"><Check size={16} className="mr-1" /> Sauvegarder</Button>
              <Button size="sm" variant="outline" onClick={() => setEditing(null)}><X size={16} className="mr-1" /> Annuler</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {members.map((m) => (
          <Card key={m.id} className="bg-slate-900/50 border-white/10">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-white">{m.name[0]}</div>
                <div>
                  <span className="font-bold text-white">{m.name}</span>
                  <span className="text-slate-400 text-sm ml-2">{m.role}</span>
                  <span className="text-xs text-slate-500 ml-2">({m.category})</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" className="text-slate-300" onClick={() => startEdit(m)}><Pencil size={16} /></Button>
                <Button size="icon" variant="ghost" className="text-red-400" onClick={() => remove(m.id)}><Trash2 size={16} /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
