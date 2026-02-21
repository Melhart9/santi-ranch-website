"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateCategory, deleteCategory } from "@/lib/actions/categories";
import { X } from "lucide-react";

const EMOJI_OPTIONS = [
  "🐄", "🐎", "🐐", "🐑", "🐖", "🐓", "🌾", "🌽", "🍅", "🫑",
  "🍯", "🥛", "🧀", "🥚", "🌿", "🌻", "🌳", "🏔️", "🚜", "📦",
  "🐂", "🐃", "🐏", "🦃", "🐇", "🐝", "🌶️", "🥑", "🍊", "🍋",
];

interface Category {
  id: string;
  name: string;
  description: string | null;
  emoji: string | null;
  order: number;
}

export default function AdminCategoryActions({ category }: { category: Category }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(category.emoji || "📦");
  const router = useRouter();

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      formData.set("emoji", selectedEmoji);
      await updateCategory(category.id, formData);
      setIsEditOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating:", error);
      alert("Error al actualizar la categoría.");
    }
  }

  async function handleDelete() {
    if (confirm("¿Estás seguro de eliminar esta categoría? Los productos asociados podrían quedar sin categoría.")) {
      try {
        await deleteCategory(category.id);
        router.refresh();
      } catch (error) {
        console.error("Error deleting:", error);
        alert("Error al eliminar. Asegúrate de que no haya productos en esta categoría.");
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
              <h2 className="font-serif text-2xl">Editar Categoría</h2>
              <button onClick={() => setIsEditOpen(false)} className="text-[var(--text-muted)] hover:text-text"><X size={20} /></button>
            </div>

            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Nombre *</label>
                <input
                  name="name"
                  required
                  defaultValue={category.name}
                  className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Descripción</label>
                <textarea
                  name="description"
                  defaultValue={category.description || ""}
                  className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary resize-y min-h-[80px]"
                />
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Icono</label>
                <div className="grid grid-cols-10 gap-1 p-3 border border-border rounded-lg bg-cream/50">
                  {EMOJI_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`w-9 h-9 text-xl rounded-md flex items-center justify-center transition-all ${
                        selectedEmoji === emoji
                          ? "bg-primary text-white scale-110 shadow-md"
                          : "hover:bg-cream-warm"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Orden</label>
                <input
                  name="order"
                  type="number"
                  min="0"
                  defaultValue={category.order}
                  className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
                />
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
