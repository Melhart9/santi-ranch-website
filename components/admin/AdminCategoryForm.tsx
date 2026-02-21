"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory } from "@/lib/actions/categories";
import { Plus, X } from "lucide-react";

const EMOJI_OPTIONS = [
  "🐄", "🐎", "🐐", "🐑", "🐖", "🐓", "🌾", "🌽", "🍅", "🫑",
  "🍯", "🥛", "🧀", "🥚", "🌿", "🌻", "🌳", "🏔️", "🚜", "📦",
  "🐂", "🐃", "🐏", "🦃", "🐇", "🐝", "🌶️", "🥑", "🍊", "🍋",
];

export default function AdminCategoryForm() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("📦");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      formData.set("emoji", selectedEmoji);
      await createCategory(formData);
      setOpen(false);
      setSelectedEmoji("📦");
      router.refresh();
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Error al crear la categoría.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-primary-light transition-all"
      >
        <Plus size={16} /> Agregar Categoría
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-6" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-2xl">Nueva Categoría</h2>
              <button onClick={() => setOpen(false)} className="text-[var(--text-muted)] hover:text-text">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Nombre *</label>
                <input
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
                  placeholder="Ej: Ganado, Caballos, Lácteos..."
                />
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Descripción</label>
                <textarea
                  name="description"
                  className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary resize-y min-h-[80px]"
                  placeholder="Breve descripción de la categoría..."
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
                <input type="hidden" name="emoji" value={selectedEmoji} />
              </div>

              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Orden</label>
                <input
                  name="order"
                  type="number"
                  min="0"
                  defaultValue={0}
                  className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creando..." : "Crear Categoría"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
