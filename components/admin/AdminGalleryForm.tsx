"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createGalleryImage } from "@/lib/actions/gallery";
import { Plus, X } from "lucide-react";
import ImageUpload from "./ImageUpload";

const GALLERY_CATEGORIES = [
  "Animales", "Productos", "Instalaciones", "Paisajes", "Equipo", "Eventos",
];

export default function AdminGalleryForm() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!imageUrl) {
      alert("Por favor sube una imagen primero.");
      return;
    }
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      formData.set("url", imageUrl);
      await createGalleryImage(formData);
      setOpen(false);
      setImageUrl("");
      router.refresh();
    } catch (error) {
      console.error("Error creating gallery image:", error);
      alert("Error al agregar la imagen.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClose() {
    setOpen(false);
    setImageUrl("");
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-primary-light transition-all"
      >
        <Plus size={16} /> Agregar Imagen
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-6" onClick={handleClose}>
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-2xl">Agregar Imagen</h2>
              <button onClick={handleClose} className="text-[var(--text-muted)] hover:text-text">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Título</label>
                <input
                  name="title"
                  className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
                  placeholder="Descripción de la imagen..."
                />
              </div>

              <div className="mb-4">
                <ImageUpload
                  label="Imagen *"
                  onUpload={(url) => setImageUrl(url)}
                  currentUrl={imageUrl || null}
                />
                <input type="hidden" name="url" value={imageUrl} />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Categoría</label>
                  <select
                    name="category"
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
                    defaultValue={0}
                    className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !imageUrl}
                className="w-full py-3 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Agregando..." : "Agregar Imagen"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
