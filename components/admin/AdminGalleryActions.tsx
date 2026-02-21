"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateGalleryImage, deleteGalleryImage } from "@/lib/actions/gallery";
import { X } from "lucide-react";
import ImageUpload from "./ImageUpload";

const GALLERY_CATEGORIES = [
  "Animales", "Productos", "Instalaciones", "Paisajes", "Equipo", "Eventos",
];

interface GalleryImage {
  id: string;
  title: string | null;
  url: string;
  category: string | null;
  order: number;
}

export default function AdminGalleryActions({ image }: { image: GalleryImage }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(image.url);
  const router = useRouter();

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!imageUrl) {
      alert("La imagen es requerida.");
      return;
    }
    try {
      const formData = new FormData(e.currentTarget);
      formData.set("url", imageUrl);
      await updateGalleryImage(image.id, formData);
      setIsEditOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating:", error);
      alert("Error al actualizar la imagen.");
    }
  }

  async function handleDelete() {
    if (confirm("¿Estás seguro de eliminar esta imagen?")) {
      try {
        await deleteGalleryImage(image.id);
        router.refresh();
      } catch (error) {
        console.error("Error deleting:", error);
        alert("Error al eliminar la imagen.");
      }
    }
  }

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={() => setIsEditOpen(true)}
          className="px-3 py-1.5 rounded-md text-xs font-medium border border-border bg-white hover:border-primary hover:text-primary transition-all"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1.5 rounded-md text-xs font-medium border border-border bg-white hover:border-red-500 hover:text-red-500 transition-all"
        >
          Eliminar
        </button>
      </div>

      {isEditOpen && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-6" onClick={() => setIsEditOpen(false)}>
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-2xl">Editar Imagen</h2>
              <button onClick={() => setIsEditOpen(false)} className="text-[var(--text-muted)] hover:text-text"><X size={20} /></button>
            </div>

            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Título</label>
                <input
                  name="title"
                  defaultValue={image.title || ""}
                  className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="mb-4">
                <ImageUpload
                  label="Imagen"
                  onUpload={(url) => setImageUrl(url)}
                  currentUrl={imageUrl}
                />
                <input type="hidden" name="url" value={imageUrl} />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Categoría</label>
                  <select
                    name="category"
                    defaultValue={image.category || ""}
                    className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="">Sin categoría</option>
                    {GALLERY_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Orden</label>
                  <input
                    name="order"
                    type="number"
                    min="0"
                    defaultValue={image.order}
                    className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <button type="submit" className="w-full py-3 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-light transition-all">
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
