"use client";

import { useState } from "react";
import { createInquiry } from "@/lib/actions/inquiries";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      await createInquiry(formData);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      alert("Error al enviar. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit}>
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Nombre</label>
          <input name="name" required className="w-full px-4 py-3.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:border-primary transition-colors" placeholder="Tu nombre completo" />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Email</label>
          <input name="email" type="email" required className="w-full px-4 py-3.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:border-primary transition-colors" placeholder="tu@email.com" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Teléfono</label>
          <input name="phone" className="w-full px-4 py-3.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:border-primary transition-colors" placeholder="+52 (___) ___-____" />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Asunto</label>
          <select name="subject" className="w-full px-4 py-3.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:border-primary transition-colors">
            <option>Consulta General</option>
            <option>Información de Productos</option>
            <option>Servicios de Reproducción</option>
            <option>Pedidos al Mayoreo</option>
            <option>Visitar el Rancho</option>
          </select>
        </div>
      </div>
      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Mensaje</label>
        <textarea name="message" required className="w-full px-4 py-3.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:border-primary transition-colors resize-y min-h-[140px]" placeholder="Cuéntanos cómo podemos ayudarte..." />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-primary text-white rounded-lg text-sm font-semibold tracking-wider hover:bg-primary-light transition-all disabled:opacity-50"
      >
        {loading ? "Enviando..." : "Enviar Mensaje"}
      </button>

      {submitted && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center mt-5">
          <h3 className="text-green-800 font-serif text-xl mb-1">¡Mensaje Enviado!</h3>
          <p className="text-green-700 text-sm">Te responderemos dentro de 24 horas.</p>
        </div>
      )}
    </form>
  );
}
