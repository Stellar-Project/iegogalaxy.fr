interface CategoryFilterProps {
  categories: string[];
  active: string | null;
  onChange: (cat: string | null) => void;
  color?: "blue" | "yellow";
}

export default function CategoryFilter({ categories, active, onChange, color = "blue" }: CategoryFilterProps) {
  if (categories.length <= 1) return null;
  const accent = color === "blue"
    ? { active: "bg-blue-500/20 text-blue-400 border-blue-500/30" }
    : { active: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" };

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <button onClick={() => onChange(null)}
        className={`text-xs px-3 py-1.5 rounded-full transition-colors border ${!active ? accent.active : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20"}`}>
        Toutes
      </button>
      {categories.map((cat) => (
        <button key={cat} onClick={() => onChange(active === cat ? null : cat)}
          className={`text-xs px-3 py-1.5 rounded-full transition-colors border ${active === cat ? accent.active : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20"}`}>
          {cat}
        </button>
      ))}
    </div>
  );
}
