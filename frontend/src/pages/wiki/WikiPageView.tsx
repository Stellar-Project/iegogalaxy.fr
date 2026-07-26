import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/api/client";
import type { WikiPage } from "@/api/types";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Loading from "@/components/Loading";

interface Heading { id: string; text: string; level: number }

function parseHeadings(html: string): Heading[] {
  const regex = /<h([2-3])([^>]*)>(.*?)<\/h\1>/gi;
  const headings: Heading[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = match[3].replace(/<[^>]*>/g, "");
    const existingId = match[2].match(/id="([^"]+)"/);
    const id = existingId ? existingId[1] : text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    headings.push({ id, text, level: parseInt(match[1]) });
  }
  return headings;
}

function addHeadingIds(html: string): string {
  return html.replace(/<h([2-3])([^>]*)>(.*?)<\/h\1>/gi, (_, level, attrs, text) => {
    if (/id=/.test(attrs)) return `<h${level}${attrs}>${text}</h${level}>`;
    const clean = text.replace(/<[^>]*>/g, "");
    const id = clean.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
  });
}

function readingTime(html: string): number {
  const words = html.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function WikiPageView() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<WikiPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api.getWikiPage(slug).then(setPage).catch(() => setPage(null)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="relative min-h-screen bg-slate-950 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="relative min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center text-slate-500 space-y-4 px-4">
        <p className="text-lg">Cette page n'est pas encore disponible.</p>
        <p className="text-sm">Contacte l'administrateur si tu penses qu'il s'agit d'une erreur.</p>
        <Link to="/wiki" className="text-yellow-400 hover:underline">Retour au wiki</Link>
      </div>
    );
  }

  const headings = parseHeadings(page.content || "");
  const html = addHeadingIds(page.content || "");
  const mins = readingTime(page.content || "");

  return (
    <div className="relative min-h-screen text-slate-200 bg-slate-950 px-4 py-20">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/90 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
          <ChevronRight size={14} />
          <Link to="/wiki" className="hover:text-white transition-colors">Wiki</Link>
          <ChevronRight size={14} />
          <span className="text-white">{page.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-10">
          <article className="min-w-0">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">{page.title}</h1>
              <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
                <time dateTime={page.createdAt}>
                  {new Date(page.createdAt).toLocaleDateString("fr-FR", {
                    year: "numeric", month: "long", day: "numeric"
                  })}
                </time>
                <span aria-hidden="true">·</span>
                <span>{mins} min de lecture</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="wiki-content prose prose-invert max-w-none
                [&_h2]:text-yellow-400 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:scroll-mt-24
                [&_h3]:text-yellow-300 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:scroll-mt-24
                [&_a]:text-blue-400 [&_a:hover]:text-blue-300 [&_a]:underline
                [&_code]:bg-slate-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm
                [&_pre]:bg-slate-900 [&_pre]:border [&_pre]:border-white/10 [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto
                [&_img]:rounded-lg [&_img]:max-w-full [&_img]:mx-auto [&_img]:my-8
                [&_blockquote]:border-l-2 [&_blockquote]:border-yellow-500 [&_blockquote]:pl-4 [&_blockquote]:text-slate-400 [&_blockquote]:italic
                [&_table]:w-full [&_table]:border-collapse [&_th]:text-left [&_th]:text-yellow-400 [&_th]:border-b [&_th]:border-white/20 [&_th]:p-2
                [&_td]:border-b [&_td]:border-white/10 [&_td]:p-2 [&_tr:last-child_td]:border-b-0
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1
                [&_hr]:border-white/10 [&_hr]:my-8
                [&_p]:leading-relaxed [&_p]:my-4"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            {page.tool && (
              <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-500">Outil associé :</span>
                <Link to="/wiki" className="inline-flex items-center gap-1 text-sm bg-white/5 hover:bg-white/10 text-slate-300 px-3 py-1 rounded-full transition-colors">
                  {page.tool.name}
                </Link>
              </div>
            )}
          </article>

          {headings.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
                  Sur cette page
                </h4>
                <nav className="space-y-1">
                  {headings.map((h) => (
                    <a key={h.id} href={`#${h.id}`}
                      className={`block text-sm leading-snug py-1 transition-colors hover:text-white
                        ${h.level === 2
                          ? "text-slate-300 border-l-2 border-yellow-500/60 pl-3"
                          : "text-slate-500 pl-6 border-l-2 border-transparent hover:border-yellow-500/40"
                        }`}
                    >
                      {h.text}
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
