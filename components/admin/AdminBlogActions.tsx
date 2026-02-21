"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateBlogPost, deleteBlogPost } from "@/lib/actions/blog";
import { X } from "lucide-react";
import ImageUpload from "./ImageUpload";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  tag: string | null;
  readTime: string | null;
  published: boolean;
  authorName: string | null;
  image: string | null;
}

export default function AdminBlogActions({ post }: { post: BlogPost }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(post.image || "");
  const router = useRouter();

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      formData.set("image", imageUrl);
      if (!formData.has("published")) {
        formData.set("published", "false");
      }
      await updateBlogPost(post.id, formData);
      setIsEditOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating:", error);
      alert("Error al actualizar el artículo.");
    }
  }

  async function handleDelete() {
    if (confirm("¿Estás seguro de eliminar este artículo?")) {
      try {
        await deleteBlogPost(post.id);
        router.refresh();
      } catch (error) {
        console.error("Error deleting:", error);
        alert("Error al eliminar el artículo.");
      }
    }
  }

  async function handleTogglePublish() {
    try {
      const formData = new FormData();
      formData.set("title", post.title);
      formData.set("excerpt", post.excerpt || "");
      formData.set("content", post.content || "");
      formData.set("tag", post.tag || "");
      formData.set("readTime", post.readTime || "");
      formData.set("authorName", post.authorName || "");
      formData.set("image", post.image || "");
      formData.set("published", post.published ? "false" : "true");
      await updateBlogPost(post.id, formData);
      router.refresh();
    } catch (error) {
      console.error("Error toggling publish:", error);
    }
  }

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={handleTogglePublish}
          className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
            post.published
              ? "border-yellow-300 bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
              : "border-green-300 bg-green-50 text-green-700 hover:bg-green-100"
          }`}
        >
          {post.published ? "Ocultar" : "Publicar"}
        </button>
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
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-2xl">Editar Artículo</h2>
              <button onClick={() => setIsEditOpen(false)} className="text-[var(--text-muted)] hover:text-text"><X size={20} /></button>
            </div>

            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Título *</label>
                <input name="title" required defaultValue={post.title} className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Etiqueta</label>
                  <input name="tag" defaultValue={post.tag || ""} className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Tiempo de Lectura</label>
                  <input name="readTime" defaultValue={post.readTime || ""} className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Autor</label>
                <input name="authorName" defaultValue={post.authorName || ""} className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
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
                <textarea name="excerpt" defaultValue={post.excerpt || ""} className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary resize-y min-h-[80px]" />
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Contenido</label>
                <textarea name="content" defaultValue={post.content || ""} className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary resize-y min-h-[200px] font-mono" />
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input name="published" type="checkbox" defaultChecked={post.published} value="true" className="rounded w-4 h-4" />
                  <span>Publicado</span>
                </label>
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
