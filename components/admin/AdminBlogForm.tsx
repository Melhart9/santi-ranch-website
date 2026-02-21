"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBlogPost } from "@/lib/actions/blog";
import { Plus, X } from "lucide-react";
import ImageUpload from "./ImageUpload";

export default function AdminBlogForm() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      formData.set("image", imageUrl);
      if (!formData.has("published")) {
        formData.set("published", "false");
      }
      await createBlogPost(formData);
      setOpen(false);
      setImageUrl("");
      router.refresh();
    } catch (error) {
      console.error("Error creating blog post:", error);
      alert("Error al crear el artículo.");
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
        <Plus size={16} /> Nuevo Artículo
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-6" onClick={handleClose}>
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-2xl">Nuevo Artículo</h2>
              <button onClick={handleClose} className="text-[var(--text-muted)] hover:text-text">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Título *</label>
                <input name="title" required className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" placeholder="Título del artículo..." />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Etiqueta</label>
                  <input name="tag" className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" placeholder="Ej: Sustentabilidad..." />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Tiempo de Lectura</label>
                  <input name="readTime" className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" placeholder="Ej: 5 min" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Autor</label>
                <input name="authorName" className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" placeholder="Nombre del autor..." />
              </div>

              <div className="mb-4">
                <ImageUpload
                  label="Imagen de Portada"
                  onUpload={(url) => setImageUrl(url)}
                  currentUrl={imageUrl || null}
                />
                <input type="hidden" name="image" value={imageUrl} />
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Extracto</label>
                <textarea name="excerpt" className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary resize-y min-h-[80px]" placeholder="Resumen breve del artículo..." />
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Contenido *</label>
                <textarea name="content" required className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary resize-y min-h-[200px] font-mono" placeholder="Escribe el contenido del artículo aquí..." />
                <p className="text-xs text-[var(--text-muted)] mt-1">Usa doble salto de línea para separar párrafos.</p>
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input name="published" type="checkbox" value="true" className="rounded w-4 h-4" />
                  <span>Publicar inmediatamente</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creando..." : "Crear Artículo"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
