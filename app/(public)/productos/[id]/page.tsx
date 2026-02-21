import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/actions/products";
import { formatPrice } from "@/lib/utils";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const specs = product.specs as Record<string, string> | null;

  return (
    <div className="page-enter pt-32">
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24">
        <Link href="/productos" className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-text mb-8 font-medium transition-colors">
          ← Volver a Productos
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="bg-cream-warm rounded-2xl aspect-square flex items-center justify-center text-8xl">
            {product.category.emoji || "📦"}
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[2px] text-accent mb-3">
              {product.category.name}
            </div>
            <h1 className="font-serif text-[clamp(28px,3.5vw,42px)] font-normal mb-4 leading-tight">
              {product.name}
            </h1>
            <div className="text-3xl font-semibold text-primary mb-6">
              {formatPrice(product.price)}
            </div>
            <p className="text-base text-[var(--text-muted)] leading-relaxed mb-8 font-light">
              {product.description}
            </p>

            {specs && Object.keys(specs).length > 0 && (
              <div className="grid grid-cols-2 gap-px bg-border rounded-xl overflow-hidden mb-8">
                {Object.entries(specs).map(([key, val]) => (
                  <div key={key} className="bg-white p-4">
                    <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-1">{key}</div>
                    <div className="text-sm font-medium">{val}</div>
                  </div>
                ))}
              </div>
            )}

            <Link
              href="/contacto"
              className="block w-full text-center bg-accent text-white py-4 rounded-lg text-sm font-semibold uppercase tracking-wider hover:bg-accent-light transition-all"
            >
              Consultar sobre este {product.category.slug === "servicios" ? "Servicio" : "Producto"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
