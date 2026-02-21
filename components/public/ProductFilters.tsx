"use client";

import { useRouter } from "next/navigation";

interface Props {
  categories: { id: string; slug: string; name: string; emoji: string | null }[];
  currentCategory?: string;
}

export default function ProductFilters({ categories, currentCategory }: Props) {
  const router = useRouter();

  return (
    <div className="flex gap-2 flex-wrap mb-10">
      <button
        onClick={() => router.push("/productos")}
        className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
          !currentCategory
            ? "bg-primary text-white border-primary"
            : "bg-white border-border text-text hover:border-accent"
        }`}
      >
        Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => router.push(`/productos?categoria=${cat.slug}`)}
          className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
            currentCategory === cat.slug
              ? "bg-primary text-white border-primary"
              : "bg-white border-border text-text hover:border-accent"
          }`}
        >
          {cat.emoji} {cat.name}
        </button>
      ))}
    </div>
  );
}
