import { getProducts } from "@/lib/actions/products";
import { getCategories } from "@/lib/actions/categories";
import { formatPrice, statusLabels, statusColors } from "@/lib/utils";
import AdminProductActions from "@/components/admin/AdminProductActions";
import AdminProductForm from "@/components/admin/AdminProductForm";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl font-medium">Productos</h1>
        <AdminProductForm categories={categories} />
      </div>

      <div className="bg-white border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-cream">
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Nombre</th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Categoría</th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Precio</th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Estado</th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-cream/50">
                  <td className="px-6 py-4 text-sm font-medium">
                    {p.category.emoji} {p.name}
                  </td>
                  <td className="px-6 py-4 text-sm">{p.category.name}</td>
                  <td className="px-6 py-4 text-sm">{formatPrice(p.price)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase ${statusColors[p.status]}`}>
                      {statusLabels[p.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <AdminProductActions product={p} categories={categories} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
