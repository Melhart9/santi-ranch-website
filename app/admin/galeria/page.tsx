import { getGalleryImages, deleteGalleryImage } from "@/lib/actions/gallery";
import AdminDeleteButton from "@/components/admin/AdminDeleteButton";

export default async function AdminGalleryPage() {
  const images = await getGalleryImages();

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl font-medium">Galería</h1>
      </div>

      <div className="bg-white border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-cream">
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Título</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Categoría</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">URL</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {images.map((img) => (
              <tr key={img.id} className="border-b border-border last:border-0 hover:bg-cream/50">
                <td className="px-6 py-4 text-sm font-medium">{img.title || "Sin título"}</td>
                <td className="px-6 py-4 text-sm">{img.category}</td>
                <td className="px-6 py-4 text-sm text-[var(--text-muted)] truncate max-w-[200px]">{img.url}</td>
                <td className="px-6 py-4">
                  <AdminDeleteButton id={img.id} action={deleteGalleryImage} label="imagen" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
