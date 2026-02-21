import { getGalleryImages } from "@/lib/actions/gallery";
import AdminGalleryForm from "@/components/admin/AdminGalleryForm";
import AdminGalleryActions from "@/components/admin/AdminGalleryActions";
import SafeImage from "@/components/admin/SafeImage";

export default async function AdminGalleryPage() {
  const images = await getGalleryImages();

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl font-medium">Galería</h1>
        <AdminGalleryForm />
      </div>

      {images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="bg-white border border-border rounded-xl overflow-hidden group">
              <div className="aspect-square bg-cream-warm relative overflow-hidden">
                <SafeImage
                  src={img.url}
                  alt={img.title || "Imagen de galería"}
                  fallback={
                    <div className="w-full h-full flex items-center justify-center text-4xl bg-cream-warm">📷</div>
                  }
                />
              </div>
              <div className="p-4">
                <div className="text-sm font-medium truncate mb-1">{img.title || "Sin título"}</div>
                <div className="text-xs text-[var(--text-muted)] mb-3">{img.category || "Sin categoría"}</div>
                <AdminGalleryActions image={img} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-border rounded-xl p-16 text-center">
          <div className="text-5xl mb-4">🖼️</div>
          <p className="text-[var(--text-muted)]">No hay imágenes en la galería. Agrega tu primera imagen.</p>
        </div>
      )}
    </>
  );
}
