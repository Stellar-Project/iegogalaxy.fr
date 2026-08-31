import { api } from "@/api/client";
import type { TimelineEvent } from "@/api/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CrudResource, { type FieldDef } from "@/components/admin/CrudResource";
import { Pencil, Trash2 } from "lucide-react";

const fields: FieldDef<TimelineEvent>[] = [
  { key: "date", label: "Date", type: "text", placeholder: "Janvier 2024" },
  { key: "title", label: "Titre", type: "text", placeholder: "Titre" },
  { key: "sortOrder", label: "Ordre", type: "number", placeholder: "Ordre" },
  { key: "description", label: "Description", type: "textarea", placeholder: "Description" },
];

export default function TimelineAdmin() {
  return (
    <CrudResource<TimelineEvent>
      title="Timeline"
      fields={fields}
      makeDefault={() => ({ id: "", date: "", title: "", description: "", sortOrder: 0 })}
      load={api.getTimeline}
      create={(data) => api.createTimelineEvent(data)}
      update={(id, data) => api.updateTimelineEvent(id, data)}
      remove={(id) => api.deleteTimelineEvent(id)}
      renderItem={(e, ctx) => (
        <Card key={e.id} className="bg-slate-900/50 border-white/10">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-yellow-400 font-mono font-bold">{e.date}</span>
              <span className="text-white font-bold ml-3">{e.title}</span>
              <p className="text-slate-400 text-sm mt-1">{e.description}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button size="icon" variant="ghost" className="text-slate-300" onClick={() => ctx.edit(e)}><Pencil size={16} /></Button>
              <Button size="icon" variant="ghost" className="text-red-400" onClick={() => ctx.remove(e.id)}><Trash2 size={16} /></Button>
            </div>
          </CardContent>
        </Card>
      )}
    />
  );
}
