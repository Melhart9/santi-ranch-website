import Link from "next/link";
import { formatPrice, statusLabels, statusColors } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    price: number | null;
    status: string;
    featured: boolean;
    image?: string | null;
    category: { name: string; emoji: string | null; slug: string };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const isReserved = product.status === "RESERVADO";

  return (
    <Link href={`/productos/${product.slug}`} className="card group cursor-pointer">
      <div
        className={`h-56 relative flex items-center justify-center text-6xl ${
          isReserved ? "bg-yellow-50" : "bg-cream-warm"
        }`}
      >
        {product.featured && (
          <span className="absolute top-3 left-3 z-10 bg-accent text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded">
            Destacado
          </span>
        )}
        {isReserved && (
          <span className="absolute top-3 left-3 z-10 bg-yellow-100 text-yellow-800 text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded">
            Reservado
          </span>
        )}
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <span>{product.category.emoji || "📦"}</span>
        )}
      </div>
      <div className="p-6">
        <div className="text-[11px] font-semibold uppercase tracking-[1.5px] text-accent mb-2">
          {product.category.name}
        </div>
        <h3 className="font-serif text-xl font-medium mb-2 leading-snug group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-primary">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs font-semibold text-accent uppercase tracking-wider">
            Ver Detalles →
          </span>
        </div>
      </div>
    </Link>
  );
}
