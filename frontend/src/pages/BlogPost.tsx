import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { api } from "@/api/client";
import type { Post } from "@/api/types";
import { Badge } from "@/components/ui/badge";
import Loading from "@/components/Loading";
import { useMeta } from "@/lib/useMeta";
import { sanitize } from "@/lib/sanitize";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    let isMounted = true;

    api
      .getPost(slug)
      .then((data) => {
        if (isMounted) setPost(data);
      })
      .catch(() => {
        if (isMounted) setPost(null);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  useMeta({
    title: post?.title || "Actualité",
    description: post?.excerpt || undefined,
  });

  if (loading) {
    return <Loading fullScreen message="Chargement de l'article..." />;
  }

  if (!post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-muted-foreground gap-4 px-4 text-center">
        <p className="text-base text-foreground font-black">Article introuvable</p>
        <p className="text-xs">L'article recherché n'existe pas ou a été supprimé.</p>
        <Link
          to="/"
          className="text-xs text-primary hover:underline flex items-center gap-1.5 font-black mt-2 cursor-pointer"
        >
          <ArrowLeft size={14} /> Revenir à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground py-16 sm:py-24 px-4 sm:px-6">
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-muted-foreground hover:text-primary transition-colors group cursor-pointer"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Retour aux actualités
        </Link>

        <div className="space-y-3 border-b border-border pb-6">
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground">
            {post.category && (
              <Badge
                variant="outline"
                className="bg-primary/10 border-primary/20 text-primary text-[10px] font-black gap-1"
              >
                <Tag size={10} />
                {post.category}
              </Badge>
            )}
            <span className="flex items-center gap-1.5 font-mono">
              <Calendar size={13} className="text-accent" />
              {new Date(post.createdAt).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed italic pt-1">
              {post.excerpt}
            </p>
          )}
        </div>

        <article
          className="prose prose-invert max-w-none 
            [&_h1]:text-2xl [&_h1]:font-black [&_h1]:tracking-tight [&_h1]:text-foreground [&_h1]:mt-8 [&_h1]:mb-4
            [&_h2]:text-xl [&_h2]:font-black [&_h2]:tracking-tight [&_h2]:text-accent [&_h2]:mt-6 [&_h2]:mb-3
            [&_h3]:text-lg [&_h3]:font-black [&_h3]:tracking-tight [&_h3]:text-foreground [&_h3]:mt-5 [&_h3]:mb-2
            [&_p]:text-muted-foreground [&_p]:text-sm [&_p]:sm:text-base [&_p]:leading-relaxed [&_p]:mb-4
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_ul]:mb-4
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1.5 [&_ol]:mb-4
            [&_li]:text-muted-foreground [&_li]:text-sm [&_li]:sm:text-base
            [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-primary/80
            [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:bg-secondary/30 [&_blockquote]:py-2
            [&_pre]:bg-card [&_pre]:border [&_pre]:border-border [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:text-xs [&_pre]:font-mono [&_pre]:overflow-x-auto
            [&_code]:bg-secondary [&_code]:text-foreground [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:text-xs [&_code]:font-mono [&_code]:border [&_code]:border-border
            [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:border-0
            [&_img]:max-w-full [&_img]:rounded-lg [&_img]:my-6 [&_img]:border [&_img]:border-border
            [&_hr]:border-border [&_hr]:my-8
            [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_table]:text-xs [&_table]:sm:text-sm
            [&_th]:border [&_th]:border-border [&_th]:p-2.5 [&_th]:bg-secondary/50 [&_th]:text-left [&_th]:font-black [&_th]:text-accent
            [&_td]:border [&_td]:border-border [&_td]:p-2.5 [&_td]:text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: sanitize(post.content) }}
        />
      </div>
    </div>
  );
}