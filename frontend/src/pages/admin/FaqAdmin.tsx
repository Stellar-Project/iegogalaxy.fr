import { useState } from "react";
import { api } from "@/api/client";
import type { FaqItem } from "@/api/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CrudResource, { type FieldDef } from "@/components/admin/CrudResource";
import { Pencil, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const fields: FieldDef<FaqItem>[] = [
  { key: "question", label: "Question", type: "text", placeholder: "Ex: Comment installer le patch sur Citra / 3DS ?", span: 2 },
  { key: "answer", label: "Réponse détaillée", type: "textarea", placeholder: "Expliquez la marche à suivre...", span: 2 },
  { key: "category", label: "Catégorie", type: "text", placeholder: "general, installation, technique, sauvegardes" },
  { key: "sortOrder", label: "Ordre d'affichage", type: "number", placeholder: "0" },
  { key: "published", label: "Publié publiquement", type: "switch" },
];

export default function FaqAdmin() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <CrudResource<FaqItem>
      title="Foire Aux Questions (FAQ)"
      fields={fields}
      makeDefault={() => ({
        id: "",
        question: "",
        answer: "",
        category: "general",
        sortOrder: 0,
        published: false,
        createdAt: "",
        updatedAt: "",
      })}
      load={api.getFaqAll}
      create={(data) => api.createFaq(data)}
      update={(id, data) => api.updateFaq(id, data)}
      remove={(id) => api.deleteFaq(id)}
      renderItem={(item, ctx) => {
        const isExpanded = expandedId === item.id;

        return (
          <Card key={item.id} className="bg-card/70 border-border hover:border-primary/40 transition-colors backdrop-blur-md shadow-xs">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-black text-foreground text-sm leading-snug tracking-tight">{item.question}</span>
                    {!item.published ? (
                      <Badge variant="outline" className="border-accent/40 bg-accent/10 text-accent text-[10px] font-black uppercase tracking-wider">
                        brouillon
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider">
                        publié
                      </Badge>
                    )}
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground font-mono font-bold border border-border/60">
                      {item.category || "general"}
                    </span>
                  </div>

                  <p className={`text-xs text-muted-foreground leading-relaxed font-medium ${isExpanded ? "whitespace-pre-line" : "line-clamp-2"}`}>
                    {item.answer || <span className="italic">Aucune réponse rédigée.</span>}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {item.answer && item.answer.length > 100 && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-muted-foreground hover:text-foreground h-8 w-8 cursor-pointer"
                      onClick={() => toggleExpand(item.id)}
                      title={isExpanded ? "Réduire" : "Déplier la réponse"}
                    >
                      {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </Button>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground h-8 w-8 cursor-pointer"
                    onClick={() => ctx.edit(item)}
                    title="Modifier"
                  >
                    <Pencil size={15} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive hover:bg-destructive/10 h-8 w-8 cursor-pointer"
                    onClick={() => {
                      if (window.confirm("Êtes-vous sûr de vouloir supprimer cette question/réponse ?")) {
                        ctx.remove(item.id);
                      }
                    }}
                    title="Supprimer"
                  >
                    <Trash2 size={15} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      }}
    />
  );
}