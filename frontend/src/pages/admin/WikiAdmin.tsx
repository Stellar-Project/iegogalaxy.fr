import { useCallback, useEffect, useState } from "react";
import { api } from "@/api/client";
import type { WikiTool, WikiPage } from "@/api/types";
import ToolList from "./ToolList";
import PageEditor from "./PageEditor";
import { BookOpen, Loader2 } from "lucide-react";

export default function WikiAdmin() {
  const [tools, setTools] = useState<WikiTool[]>([]);
  const [pages, setPages] = useState<WikiPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedToolId, setSelectedToolId] = useState<string>("");

  const loadTools = useCallback(async () => {
    try {
      const data = await api.getWikiTools(true);
      setTools(data);
      if (data.length > 0 && !selectedToolId) {
        setSelectedToolId(data[0].id);
      }
    } catch {
      // Erreur gérée
    }
  }, [selectedToolId]);

  const loadPages = useCallback(async () => {
    try {
      const data = await api.getWikiPages();
      setPages(data);
    } catch {
      // Erreur gérée
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      api.getWikiTools(true),
      api.getWikiPages(),
    ])
      .then(([toolsData, pagesData]) => {
        if (isMounted) {
          setTools(toolsData);
          setPages(pagesData);
          if (toolsData.length > 0) {
            setSelectedToolId(toolsData[0].id);
          }
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectTool = (tool: WikiTool) => {
    setSelectedToolId(tool.id);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3 min-h-75">
        <Loader2 size={32} className="animate-spin text-primary" />
        <p className="text-sm font-medium">Chargement de la documentation et des outils...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
            <BookOpen size={20} />
          </div>
          <h2 className="text-2xl font-black text-foreground tracking-tight">Gestion du Wiki</h2>
        </div>
        <p className="text-sm text-muted-foreground mt-1 font-medium">
          Structurez les catégories d'outils de modding et rédigez les pages documentaires associées.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <ToolList
            tools={tools}
            onRefreshTools={loadTools}
            onRefreshPages={loadPages}
            onSelectTool={handleSelectTool}
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