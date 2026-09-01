import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/api/client";
import type { WikiPage } from "@/api/types";
import { motion } from "framer-motion";
import { ChevronRight, Clock, ArrowLeft, Wrench, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Loading from "@/components/Loading";
import { useMeta } from "@/lib/useMeta";
import { sanitize } from "@/lib/sanitize";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function readingTime(html: string): number {
  const words = html.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function processContentAndHeadings(rawHtml: string): { processedHtml: string; headings: TocItem[] } {
  if (typeof window === "undefined") {
    return { processedHtml: rawHtml, headings: [] };
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHtml, "text/html");
  const headingElements = doc.querySelectorAll("h2, h3");
  const headings: TocItem[] = [];

  headingElements.forEach((el, index) => {
    const text = el.textContent?.trim() || "";
    if (!text) return;

    let id = el.id;
    if (!id) {
      id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      if (!id) id = `section-${index + 1}`;
      el.id = id;
    }

    const level = el.tagName.toLowerCase() === "h2" ? 2 : 3;
    headings.push({ id, text, level });
  });

  return {
    processedHtml: doc.body.innerHTML,
    headings,
  };
}

export default function WikiPageView() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<WikiPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    let isMounted = true;

    const fetchPage = async () => {
      try {
        const data = await api.getWikiPage(slug);
        if (isMounted) {
          setPage(data);
        }
      } catch {
        if (isMounted) {
          setPage(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPage();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const sanitizedContent = useMemo(() => sanitize(page?.content || ""), [page?.content]);

  const { processedHtml, headings: tocList } = useMemo(
    () => processContentAndHeadings(sanitizedContent),
    [sanitizedContent]
  );

  const mins = useMemo(() => readingTime(sanitizedContent), [sanitizedContent]);

  useMeta({
    title: page?.title || "Page wiki",
    description: page?.content
      ? page.content.replace(/<[^>]*>/g, "").slice(0, 160)
      : undefined,
  });

  if (loading) {
    return <Loading fullScreen message="Chargement du guide..." />;
  }

  if (!page) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center text-muted-foreground space-y-4 px-4">
        <BookOpen size={48} className="opacity-30 mb-2" />
        <p className="text-base font-black text-foreground">Cette page wiki est introuvable</p>
        <p className="text-xs">Le guide demandé n'a pas encore été rédigé ou a été déplacé.</p>
        <Link
          to="/wiki"
          className="text-xs font-black text-primary hover:underline inline-flex items-center gap-1 mt-2 cursor-pointer"
        >
          <ArrowLeft size={14} /> Retour à l'index du Wiki
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-foreground bg-background px-4 sm:px-6 py-16 sm:py-24">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-background via-background/95 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)/0.03,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors cursor-pointer">
            Accueil
          </Link>
          <ChevronRight size={14} />
          <Link to="/wiki" className="hover:text-primary transition-colors cursor-pointer">
            Wiki
          </Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-black truncate max-w-50 sm:max-w-none">
            {page.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-10 lg:gap-12">
          <article className="min-w-0 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-3 border-b border-border pb-6"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight">
                {page.title}
              </h1>

              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-muted-foreground font-mono pt-1">
                <time dateTime={page.createdAt}>
                  {new Date(page.createdAt).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock size={13} /> {mins} min de lecture
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="wiki-content prose prose-invert max-w-none
                [&_h2]:text-accent [&_h2]:text-2xl [&_h2]:font-black [&_h2]:tracking-tight [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:scroll-mt-28 [&_h2]:border-b [&_h2]:border-border/60 [&_h2]:pb-2
                [&_h3]:text-foreground [&_h3]:text-xl [&_h3]:font-black [&_h3]:tracking-tight [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:scroll-mt-28
                [&_p]:text-muted-foreground [&_p]:text-sm [&_p]:sm:text-base [&_p]:leading-relaxed [&_p]:my-4
                [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-primary/80
                [&_code]:bg-secondary [&_code]:text-foreground [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:text-xs [&_code]:font-mono [&_code]:border [&_code]:border-border
                [&_pre]:bg-card [&_pre]:border [&_pre]:border-border [&_pre]:rounded-2xl [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:text-xs [&_pre]:font-mono
                [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:border-0
                [&_img]:rounded-xl [&_img]:max-w-full [&_img]:mx-auto [&_img]:my-6 [&_img]:border [&_img]:border-border [&_img]:shadow-md
                [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:bg-secondary/30 [&_blockquote]:py-2.5 [&_blockquote]:pl-4 [&_blockquote]:pr-3 [&_blockquote]:rounded-r-xl [&_blockquote]:text-muted-foreground [&_blockquote]:italic
                [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_table]:text-xs [&_table]:sm:text-sm
                [&_th]:text-left [&_th]:text-accent [&_th]:border-b [&_th]:border-border [&_th]:p-3 [&_th]:bg-secondary/50 [&_th]:font-black
                [&_td]:border-b [&_td]:border-border/60 [&_td]:p-3 [&_td]:text-muted-foreground [&_tr:last-child_td]:border-b-0
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_ul]:my-4
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1.5 [&_ol]:my-4
                [&_li]:text-muted-foreground [&_li]:text-sm [&_li]:sm:text-base
                [&_hr]:border-border [&_hr]:my-8"
              dangerouslySetInnerHTML={{ __html: processedHtml }}
            />

            {page.tool && (
              <div className="mt-12 pt-6 border-t border-border flex flex-wrap items-center gap-3">
                <span className="text-xs font-black text-muted-foreground uppercase tracking-wider">
                  Outil associé :
                </span>
                <Badge
                  variant="outline"
                  asChild
                  className="bg-card/70 border-border hover:border-primary/40 text-foreground px-3 py-1 text-xs gap-1.5 cursor-pointer shadow-xs transition-colors font-black"
                >
                  <Link to="/wiki">
                    <Wrench size={12} className="text-accent" />
                    {page.tool.name}
                  </Link>
                </Badge>
              </div>
            )}
          </article>

          {tocList.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24 bg-card/70 backdrop-blur-md border border-border rounded-2xl p-4 space-y-3 shadow-xs">
                <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                  Sur cette page
                </h4>
                <nav className="space-y-1 max-h-[calc(100vh-160px)] overflow-y-auto pr-1">
                  {tocList.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-xs leading-snug py-1.5 transition-colors hover:text-foreground cursor-pointer ${
                        item.level === 2
                          ? "text-muted-foreground font-black border-l-2 border-accent/60 pl-2.5 hover:border-accent"
                          : "text-muted-foreground/80 pl-5 border-l-2 border-transparent hover:border-accent/40 font-medium"
                      }`}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}