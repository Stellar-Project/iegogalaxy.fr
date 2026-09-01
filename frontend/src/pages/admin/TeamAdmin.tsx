import { api } from "@/api/client";
import type { TeamMember } from "@/api/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CrudResource, { type FieldDef } from "@/components/admin/CrudResource";
import { Pencil, Trash2, Hash } from "lucide-react";

const CATEGORY_LABELS: Record<string, { label: string; className: string }> = {
  lead: { label: "Direction / Lead", className: "border-primary/40 bg-primary/10 text-primary" },
  dev: { label: "Développement", className: "border-accent/40 bg-accent/10 text-accent" },
  trans: { label: "Traduction", className: "border-supernova/40 bg-supernova/10 text-supernova" },
  art: { label: "Graphismes & Art", className: "border-bigbang/40 bg-bigbang/10 text-bigbang" },
};

const fields: FieldDef<TeamMember>[] = [
  { key: "name", label: "Nom ou Pseudo", type: "text", placeholder: "Ex: Rinzler" },
  { key: "role", label: "Rôle / Spécialité", type: "text", placeholder: "Ex: Traducteur Dialogue & UI" },
  {
    key: "category",
    label: "Catégorie d'équipe",
    type: "select",
    options: [
      { value: "lead", label: "Direction / Lead" },
      { value: "dev", label: "Développement" },
      { value: "trans", label: "Traduction" },
      { value: "art", label: "Graphismes & Art" },
    ],
  },
  { key: "discordId", label: "Identifiant Discord (ID)", type: "text", placeholder: "Ex: 284729103847291029" },
  { key: "avatarUrl", label: "URL de l'Avatar", type: "text", placeholder: "https://... ou /assets/avatars/..." },
  { key: "sortOrder", label: "Ordre d'affichage", type: "number", placeholder: "0" },
];

export default function TeamAdmin() {
  return (
    <CrudResource<TeamMember>
      title="Membres de l'Équipe"
      fields={fields}
      makeDefault={() => ({
        id: "",
        name: "",
        role: "",
        category: "trans",
        discordId: "",
        avatarUrl: "",
        sortOrder: 0,
      })}
      load={api.getTeam}
      create={(data) => api.createTeamMember(data)}
      update={(id, data) => api.updateTeamMember(id, data)}
      remove={(id) => api.deleteTeamMember(id)}
      renderItem={(m, ctx) => {
        const catInfo = CATEGORY_LABELS[m.category] || {
          label: m.category,
          className: "border-border bg-secondary text-muted-foreground",
        };
        const initial = m.name?.trim() ? m.name.trim()[0].toUpperCase() : "?";

        return (
          <Card key={m.id} className="bg-card/70 border-border hover:border-primary/40 transition-colors backdrop-blur-md shadow-xs">
            <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center shrink-0 overflow-hidden font-black text-foreground shadow-xs">
                  {m.avatarUrl ? (
                    <img
                      src={m.avatarUrl}
                      alt={m.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <span>{initial}</span>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <span className="font-black text-foreground tracking-tight truncate">{m.name || "Sans nom"}</span>
                    <Badge variant="outline" className={`text-[10px] font-black uppercase tracking-wider ${catInfo.className}`}>
                      {catInfo.label}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground font-medium">
                    <span>{m.role || "Membre"}</span>
                    {m.discordId && (
                      <span className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground/80 font-bold">
                        <Hash size={11} />
                        {m.discordId}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground h-8 w-8 cursor-pointer"
                  onClick={() => ctx.edit(m)}
                  title="Modifier"
                >
                  <Pencil size={15} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-destructive hover:bg-destructive/10 h-8 w-8 cursor-pointer"
                  onClick={() => {
                    if (window.confirm(`Êtes-vous sûr de vouloir retirer ${m.name || "ce membre"} de l'équipe ?`)) {
                      ctx.remove(m.id);
                    }
                  }}
                  title="Supprimer"
                >
                  <Trash2 size={15} />
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      }}
    />
  );
}