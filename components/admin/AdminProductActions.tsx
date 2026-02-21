"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProduct, updateProduct } from "@/lib/actions/products";
import { X } from "lucide-react";
import ImageUpload from "./ImageUpload";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  status: string;
  featured: boolean;
  categoryId: string;
  image?: string | null;
  specs?: any;
}

interface Category {
  id: string;
  name: string;
  emoji: string | null;
}

interface Props {
  product: Product;
  categories: Category[];
}

export default function AdminProductActions({ product, categories }: Props) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(product.image || "");
  const router = useRouter();

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      formData.set("image", imageUrl);
      await updateProduct(product.id, formData);
      setIsEditOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating:", error);
      alert("Error al actualizar el producto");
    }
  }

  async function handleDelete() {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await deleteProduct(product.id);
        router.refresh();
      } catch (error) {
        console.error("Error deleting:", error);
        alert("Error al eliminar el producto");
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
              <h2 className="font-serif text-2xl">Editar Producto</h2>
              <button onClick={() => setIsEditOpen(false)} className="text-[var(--text-muted)] hover:text-text"><X size={20} /></button>
            </div>

            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Nombre *</label>
                <input name="name" required defaultValue={product.name} className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Categoría *</label>
                <select name="categoryId" required defaultValue={product.categoryId} className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary">
                  <option value="">Seleccionar...</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Precio (MXN)</label>
                  <input name="price" type="number" step="0.01" defaultValue={product.price || ""} className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Estado</label>
                  <select name="status" defaultValue={product.status} className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary">
                    <option value="DISPONIBLE">Disponible</option>
                    <option value="RESERVADO">Reservado</option>
                    <option value="VENDIDO">Vendido</option>
                    <option value="AGOTADO">Agotado</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <ImageUpload
                  label="Imagen del Producto"
                  onUpload={(url) => setImageUrl(url)}
                  currentUrl={imageUrl || null}
                />
                <input type="hidden" name="image" value={imageUrl} />
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Descripción</label>
                <textarea name="description" defaultValue={product.description || ""} className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary resize-y min-h-[100px]" />
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm">
                  <input name="featured" type="checkbox" defaultChecked={product.featured} value="true" className="rounded" />
                  Producto Destacado
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
