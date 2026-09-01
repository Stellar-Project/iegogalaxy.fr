import { api } from "@/api/client";
import type { Screenshot } from "@/api/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CrudResource, { type FieldDef } from "@/components/admin/CrudResource";
import { Pencil, Trash2, ExternalLink, ImageIcon } from "lucide-react";

const fields: FieldDef<Screenshot>[] = [
  { key: "imageUrl", label: "Capture d'écran", type: "image", placeholder: "URL de l'image (ex: /assets/global/screenshots/...)", span: 2 },
  { key: "sortOrder", label: "Ordre d'affichage", type: "number", placeholder: "0" },
];

export default function ScreenshotsAdmin() {
  return (
    <CrudResource<Screenshot>
      title="Captures d'écran (Screenshots)"
      fields={fields}
      makeDefault={() => ({ id: "", imageUrl: "", sortOrder: 0 })}
      load={api.getScreenshots}
      create={(data) => api.createScreenshot(data)}
      update={(id, data) => api.updateScreenshot(id, data)}
      remove={(id) => api.deleteScreenshot(id)}
      renderItem={(s, ctx) => (
        <Card key={s.id} className="bg-card border-border overflow-hidden group hover:border-primary/40 transition-colors">
          <div className="aspect-video bg-secondary/40 relative overflow-hidden flex items-center justify-center">
            {s.imageUrl ? (
              <img
                src={s.imageUrl}
                alt="Capture de jeu"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center text-muted-foreground">
                <ImageIcon size={28} />
              </div>
            )}

            <Badge
              variant="outline"
              className="absolute top-2.5 left-2.5 bg-background/80 border-border text-foreground font-mono font-black text-[11px]"
            >
              #{s.sortOrder + 1}
            </Badge>

            <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
              {s.imageUrl && (
                <Button
                  size="icon"
                  variant="ghost"
                  asChild
                  className="h-8 w-8 bg-background/80 text-foreground hover:bg-background cursor-pointer"
                >
                  <a href={s.imageUrl} target="_blank" rel="noopener noreferrer" title="Voir l'image originale">
                    <ExternalLink size={14} />
                  </a>
                </Button>
              )}
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 bg-background/80 text-foreground hover:bg-background cursor-pointer"
                onClick={() => ctx.edit(s)}
                title="Modifier"
              >
                <Pencil size={14} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 bg-background/80 text-destructive hover:bg-destructive/10 cursor-pointer"
                onClick={() => {
                  if (window.confirm("Êtes-vous sûr de vouloir supprimer cette capture d'écran ?")) {
                    ctx.remove(s.id);
                  }
                }}
                title="Supprimer"
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </div>

          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground font-mono font-bold truncate" title={s.imageUrl}>
              {s.imageUrl || <span className="italic font-normal">Aucune URL définie</span>}
            </p>
          </CardContent>
        </Card>
      )}
    />
  );
}