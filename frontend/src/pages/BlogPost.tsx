import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/api/client";
import type { Post } from "@/api/types";
import { ArrowLeft, Calendar } from "lucide-react";
import Loading from "@/components/Loading";
import { useMeta } from "@/lib/useMeta";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    api.getPost(slug).then(setPost).catch(() => setPost(null)).finally(() => setLoading(false));
  }, [slug]);

  useMeta({ title: post?.title || "Actualité", description: post?.excerpt || undefined });

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center"><Loading /></div>;

  if (!post) return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-4">
      <p>Article introuvable</p>
      <Link to="/" className="text-blue-400 hover:text-blue-300 flex items-center gap-1"><ArrowLeft size={14} /> Retour à l'accueil</Link>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-3xl mx-auto px-4 py-20">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={14} /> Retour
        </Link>
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
          <Calendar size={14} />
          {new Date(post.createdAt).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
        <div className="prose prose-invert max-w-none [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:text-slate-300 [&_p]:mb-2 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1 [&_li]:text-slate-300 [&_a]:text-blue-400 [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-400 [&_pre]:bg-slate-900 [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:text-sm [&_pre]:font-mono [&_pre]:overflow-x-auto [&_code]:bg-slate-700 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_img]:max-w-full [&_img]:rounded-lg [&_img]:my-4 [&_hr]:border-white/20 [&_hr]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:my-4 [&_th]:border [&_th]:border-white/20 [&_th]:p-2 [&_th]:bg-slate-800 [&_th]:text-left [&_td]:border [&_td]:border-white/20 [&_td]:p-2" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </main>
  );
}