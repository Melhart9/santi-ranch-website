"use client";

import { useState } from "react";
import { createProduct } from "@/lib/actions/products";
import { Plus, X } from "lucide-react";

interface Props {
  categories: { id: string; name: string; emoji: string | null }[];
}

export default function AdminProductForm({ categories }: Props) {
  const [open, setOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    await createProduct(formData);
    setOpen(false);
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-primary-light transition-all">
        <Plus size={16} /> Agregar Producto
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-6" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-2xl">Nuevo Producto</h2>
              <button onClick={() => setOpen(false)} className="text-[var(--text-muted)] hover:text-text"><X size={20} /></button>
            </div>

            <form action={handleSubmit}>
              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Nombre *</label>
                <input name="name" required className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Categoría *</label>
                <select name="categoryId" required className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary">
                  <option value="">Seleccionar...</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Precio (MXN)</label>
                  <input name="price" type="number" step="0.01" className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Estado</label>
                  <select name="status" className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary">
                    <option value="DISPONIBLE">Disponible</option>
                    <option value="RESERVADO">Reservado</option>
                    <option value="VENDIDO">Vendido</option>
                    <option value="AGOTADO">Agotado</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Descripción</label>
                <textarea name="description" className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary resize-y min-h-[100px]" />
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm">
                  <input name="featured" type="hidden" value="false" />
                  <input name="featured" type="checkbox" value="true" className="rounded" />
                  Producto Destacado
                </label>
              </div>

              <button type="submit" className="w-full py-3 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-light transition-all">
                Crear Producto
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
