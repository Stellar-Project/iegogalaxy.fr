import { api } from "@/api/client";
import type { FaqItem } from "@/api/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CrudResource, { type FieldDef } from "@/components/admin/CrudResource";
import { Pencil, Trash2 } from "lucide-react";

const fields: FieldDef<FaqItem>[] = [
  { key: "question", label: "Question", type: "text", placeholder: "Question", span: 2 },
  { key: "answer", label: "Réponse", type: "textarea", placeholder: "Réponse" },
  { key: "category", label: "Catégorie", type: "text", placeholder: "Catégorie (ex: technique)" },
  { key: "sortOrder", label: "Ordre", type: "number", placeholder: "Ordre" },
  { key: "published", label: "Publié", type: "switch" },
];

export default function FaqAdmin() {
  return (
    <CrudResource<FaqItem>
      title="FAQ"
      fields={fields}
      makeDefault={() => ({ id: "", question: "", answer: "", category: "general", sortOrder: 0, published: false, createdAt: "", updatedAt: "" })}
      load={api.getFaqAll}
      create={(data) => api.createFaq(data)}
      update={(id, data) => api.updateFaq(id, data)}
      remove={(id) => api.deleteFaq(id)}
      renderItem={(item, ctx) => (
        <Card key={item.id} className="bg-slate-900/50 border-white/10">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white truncate">{item.question}</span>
                {!item.published && <Badge variant="outline" className="border-yellow-500/30 text-yellow-400 shrink-0">brouillon</Badge>}
                <span className="text-[10px] text-slate-500 shrink-0">[{item.category}]</span>
              </div>
            </div>
            <div className="flex gap-2 shrink-0 ml-4">
              <Button size="icon" variant="ghost" className="text-slate-300" onClick={() => ctx.edit(item)}><Pencil size={16} /></Button>
              <Button size="icon" variant="ghost" className="text-red-400" onClick={() => ctx.remove(item.id)}><Trash2 size={16} /></Button>
            </div>
          </CardContent>
        </Card>
      )}
    />
  );
}
