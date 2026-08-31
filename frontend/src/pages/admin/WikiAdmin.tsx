import { useEffect, useState } from "react";
import { api } from "@/api/client";
import type { WikiTool, WikiPage } from "@/api/types";
import ToolList from "./ToolList";
import PageEditor from "./PageEditor";
import { toast } from "sonner";

export default function WikiAdmin() {
  const [tools, setTools] = useState<WikiTool[]>([]);
  const [pages, setPages] = useState<WikiPage[]>([]);

  useEffect(() => { loadTools(); loadPages(); }, []);

  const loadTools = async () => setTools(await api.getWikiTools(true));
  const loadPages = async () => setPages(await api.getWikiPages());

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Wiki</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ToolList
            tools={tools}
            pages={pages}
            onRefreshTools={loadTools}
            onRefreshPages={loadPages}
            onSelectTool={(tool) => {}}
            onCreatePage={(tool) => {}}
          />
        </div>
        <div className="lg:col-span-2">
          <PageEditor
            tools={tools}
            pages={pages}
            onRefreshPages={loadPages}
          />
        </div>
      </div>
    </div>
  );
}