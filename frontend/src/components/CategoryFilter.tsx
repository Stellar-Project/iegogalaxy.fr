interface CategoryFilterProps {
  categories: string[];
  active: string | null;
  onChange: (cat: string | null) => void;
  color?: "primary" | "accent" | "supernova" | "bigbang";
  className?: string;
}

export default function CategoryFilter({
  categories,
  active,
  onChange,
  color = "primary",
  className = "",
}: CategoryFilterProps) {
  if (categories.length <= 1) return null;

  const colorStyles: Record<string, string> = {
    primary: "bg-primary/15 text-primary border-primary/40 shadow-xs font-black",
    accent: "bg-accent/15 text-accent border-accent/40 shadow-xs font-black",
    supernova: "bg-supernova/15 text-supernova border-supernova/40 shadow-xs font-black",
    bigbang: "bg-bigbang/15 text-bigbang border-bigbang/40 shadow-xs font-black",
  };

  const activeClasses = colorStyles[color] || colorStyles.primary;

  const inactiveClasses =
    "bg-secondary/40 text-muted-foreground border-border hover:text-foreground hover:bg-secondary/80 hover:border-border/80 font-medium";

  return (
    <div className={`flex flex-wrap justify-center items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={() => onChange(null)}
        aria-pressed={!active}
        className={`text-xs px-3.5 py-1.5 rounded-full transition-all duration-200 border cursor-pointer ${
          !active ? activeClasses : inactiveClasses
        }`}
      >
        Toutes
      </button>

      {categories.map((cat) => {
        const isSelected = active === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(isSelected ? null : cat)}
            aria-pressed={isSelected}
            className={`text-xs px-3.5 py-1.5 rounded-full transition-all duration-200 border cursor-pointer ${
              isSelected ? activeClasses : inactiveClasses
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}