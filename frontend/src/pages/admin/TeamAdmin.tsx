import { api } from "@/api/client";
import type { TeamMember } from "@/api/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CrudResource, { type FieldDef } from "@/components/admin/CrudResource";
import { Pencil, Trash2 } from "lucide-react";

const fields: FieldDef<TeamMember>[] = [
  { key: "name", label: "Nom", type: "text", placeholder: "Nom" },
  { key: "role", label: "Rôle", type: "text", placeholder: "Rôle" },
  { key: "category", label: "Catégorie", type: "select", options: [
    { value: "lead", label: "Lead" },
    { value: "dev", label: "Dev" },
    { value: "trans", label: "Trans" },
    { value: "art", label: "Art" },
  ]},
  { key: "discordId", label: "Discord ID", type: "text", placeholder: "Discord ID" },
  { key: "avatarUrl", label: "Avatar URL", type: "text", placeholder: "Avatar URL" },
  { key: "sortOrder", label: "Ordre", type: "number", placeholder: "Ordre" },
];

export default function TeamAdmin() {
  return (
    <CrudResource<TeamMember>
      title="Équipe"
      fields={fields}
      makeDefault={() => ({ id: "", name: "", role: "", category: "trans", discordId: "", avatarUrl: "", sortOrder: 0 })}
      load={api.getTeam}
      create={(data) => api.createTeamMember(data)}
      update={(id, data) => api.updateTeamMember(id, data)}
      remove={(id) => api.deleteTeamMember(id)}
      renderItem={(m, ctx) => (
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
              <Button size="icon" variant="ghost" className="text-slate-300" onClick={() => ctx.edit(m)}><Pencil size={16} /></Button>
              <Button size="icon" variant="ghost" className="text-red-400" onClick={() => ctx.remove(m.id)}><Trash2 size={16} /></Button>
            </div>
          </CardContent>
        </Card>
      )}
    />
  );
}
