import { useCallback, useEffect, useState } from "react";
import { api } from "@/api/client";
import type { WikiTool, WikiPage } from "@/api/types";
import ToolList from "./ToolList";
import PageEditor from "./PageEditor";

export default function WikiAdmin() {
  const [tools, setTools] = useState<WikiTool[]>([]);
  const [pages, setPages] = useState<WikiPage[]>([]);

  const loadTools = useCallback(async () => {
    const data = await api.getWikiTools(true);
    setTools(data);
  }, []);

  const loadPages = useCallback(async () => {
    const data = await api.getWikiPages();
    setPages(data);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const [toolsData, pagesData] = await Promise.all([
        api.getWikiTools(true),
        api.getWikiPages(),
      ]);

      if (isMounted) {
        setTools(toolsData);
        setPages(pagesData);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Wiki</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ToolList
            tools={tools}
            onRefreshTools={loadTools}
            onRefreshPages={loadPages}
            onSelectTool={() => {}}
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