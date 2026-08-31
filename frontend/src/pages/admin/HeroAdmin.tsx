import { api } from "@/api/client";
import type { HeroBackground } from "@/api/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CrudResource, { type FieldDef } from "@/components/admin/CrudResource";
import { Pencil, Trash2 } from "lucide-react";

const fields: FieldDef<HeroBackground>[] = [
  { key: "imageUrl", label: "Image", type: "image", placeholder: "URL de l'image", span: 2 },
  { key: "sortOrder", label: "Ordre", type: "number", placeholder: "Ordre" },
];

export default function HeroAdmin() {
  return (
    <CrudResource<HeroBackground>
      title="Fond Hero"
      fields={fields}
      makeDefault={() => ({ id: "", imageUrl: "", sortOrder: 0 })}
      load={api.getHero}
      create={(data) => api.createHero(data)}
      update={(id, data) => api.updateHero(id, data)}
      remove={(id) => api.deleteHero(id)}
      renderItem={(s, ctx) => (
        <Card key={s.id} className="bg-slate-900/50 border-white/10 overflow-hidden group">
          <div className="aspect-video bg-slate-800 relative">
            <img src={s.imageUrl} alt="" className="w-full h-full object-contain" />
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="icon" variant="ghost" className="h-8 w-8 bg-black/50 text-slate-300" onClick={() => ctx.edit(s)}><Pencil size={14} /></Button>
              <Button size="icon" variant="ghost" className="h-8 w-8 bg-black/50 text-red-400" onClick={() => ctx.remove(s.id)}><Trash2 size={14} /></Button>
            </div>
          </div>
          <CardContent className="p-2 text-xs text-slate-500 truncate">{s.imageUrl}</CardContent>
        </Card>
      )}
    />
  );
}
