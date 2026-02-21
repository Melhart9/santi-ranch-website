import { getCategories } from "@/lib/actions/categories";
import AdminCategoryForm from "@/components/admin/AdminCategoryForm";
import AdminCategoryActions from "@/components/admin/AdminCategoryActions";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl font-medium">Categorías</h1>
        <AdminCategoryForm />
      </div>

      <div className="bg-white border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-cream">
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Icono</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Nombre</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Slug</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Productos</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Orden</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-b border-border last:border-0 hover:bg-cream/50">
                <td className="px-6 py-4 text-2xl">{c.emoji}</td>
                <td className="px-6 py-4 text-sm font-medium">{c.name}</td>
                <td className="px-6 py-4 text-sm text-[var(--text-muted)]">{c.slug}</td>
                <td className="px-6 py-4 text-sm">{(c as any)._count?.products || 0}</td>
                <td className="px-6 py-4 text-sm text-[var(--text-muted)]">{c.order}</td>
                <td className="px-6 py-4">
                  <AdminCategoryActions category={c} />
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr><td colSpan={6} className="px-6 py-10 text-center text-[var(--text-muted)]">No hay categorías. Crea tu primera categoría.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
