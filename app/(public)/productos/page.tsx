import { getProducts } from "@/lib/actions/products";
import { getCategories } from "@/lib/actions/categories";
import ProductCard from "@/components/public/ProductCard";
import ProductFilters from "@/components/public/ProductFilters";

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ categoria?: string }> }) {
  const params = await searchParams;
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  const filtered = params.categoria
    ? products.filter((p) => p.category.slug === params.categoria)
    : products;

  return (
    <div className="page-enter">
      <div className="bg-primary text-white text-center pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg%20width=%2240%22%20height=%2240%22%20viewBox=%220%200%2040%2040%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22%23fff%22%20fill-opacity=%220.4%22%3E%3Cpath%20d=%22M0%2040L40%200H20L0%2020M40%2040V20L20%2040%22/%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="section-label !text-accent-light">Catálogo</p>
          <h1 className="font-serif text-[clamp(36px,5vw,60px)] font-normal mb-4">Nuestros Productos y Servicios</h1>
          <p className="text-lg text-white/75 font-light">
            Desde ganadería premium hasta productos artesanales del campo — explora todo lo que Dos Arroyos tiene para ofrecer.
          </p>
        </div>
      </div>

      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        <ProductFilters categories={categories} currentCategory={params.categoria} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[var(--text-muted)]">
            No se encontraron productos en esta categoría.
          </div>
        )}
      </section>
    </div>
  );
}
