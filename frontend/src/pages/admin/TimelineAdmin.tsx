import { api } from "@/api/client";
import type { TimelineEvent } from "@/api/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CrudResource, { type FieldDef } from "@/components/admin/CrudResource";
import { Pencil, Trash2, Clock } from "lucide-react";

const fields: FieldDef<TimelineEvent>[] = [
  { key: "date", label: "Date / Période", type: "text", placeholder: "Ex: Janvier 2024 ou Été 2023" },
  { key: "title", label: "Titre de l'étape", type: "text", placeholder: "Ex: Sortie de la traduction V1.0" },
  { key: "sortOrder", label: "Ordre chronologique", type: "number", placeholder: "0" },
  { key: "description", label: "Description de l'événement", type: "textarea", placeholder: "Détaillez les avancées ou moments clés...", span: 2 },
];

export default function TimelineAdmin() {
  return (
    <CrudResource<TimelineEvent>
      title="Frise Chronologique (Timeline)"
      fields={fields}
      makeDefault={() => ({
        id: "",
        date: "",
        title: "",
        description: "",
        sortOrder: 0,
      })}
      load={api.getTimeline}
      create={(data) => api.createTimelineEvent(data)}
      update={(id, data) => api.updateTimelineEvent(id, data)}
      remove={(id) => api.deleteTimelineEvent(id)}
      renderItem={(e, ctx) => (
        <Card key={e.id} className="bg-card border-border hover:border-primary/40 transition-colors">
          <CardContent className="p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="p-2 rounded-xl bg-secondary text-accent border border-border shrink-0 mt-0.5 shadow-xs">
                <Clock size={18} />
              </div>

              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="border-accent/40 bg-accent/10 text-accent font-mono text-[11px] font-black uppercase tracking-wider">
                    {e.date || "Date non définie"}
                  </Badge>
                  <span className="font-black text-foreground text-sm tracking-tight truncate">{e.title || "Événement sans titre"}</span>
                </div>

                {e.description && (
                  <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line font-medium">
                    {e.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
              <Button
                size="icon"
                variant="ghost"
                className="text-muted-foreground hover:text-foreground h-8 w-8 cursor-pointer"
                onClick={() => ctx.edit(e)}
                title="Modifier"
              >
                <Pencil size={15} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-destructive hover:bg-destructive/10 h-8 w-8 cursor-pointer"
                onClick={() => {
                  if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'événement « ${e.title || e.date} » ?`)) {
                    ctx.remove(e.id);
                  }
                }}
                title="Supprimer"
              >
                <Trash2 size={15} />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    />
  );
}