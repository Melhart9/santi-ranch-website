"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteInquiry } from "@/lib/actions/inquiries";
import { X, Eye, Trash2 } from "lucide-react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  notes: string | null;
  createdAt: Date;
}

export default function AdminInquiryActions({ inquiry }: { inquiry: Inquiry }) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (confirm("¿Estás seguro de eliminar esta consulta?")) {
      try {
        await deleteInquiry(inquiry.id);
        router.refresh();
      } catch (error) {
        console.error("Error deleting:", error);
        alert("Error al eliminar la consulta.");
      }
    }
  }

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={() => setIsDetailOpen(true)}
          className="px-3 py-1.5 rounded-md text-xs font-medium border border-border bg-white hover:border-primary hover:text-primary transition-all"
          title="Ver detalle"
        >
          <Eye size={14} />
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1.5 rounded-md text-xs font-medium border border-border bg-white hover:border-red-500 hover:text-red-500 transition-all"
          title="Eliminar"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {isDetailOpen && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-6" onClick={() => setIsDetailOpen(false)}>
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-2xl">Detalle de Consulta</h2>
              <button onClick={() => setIsDetailOpen(false)} className="text-[var(--text-muted)] hover:text-text"><X size={20} /></button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-1">Nombre</div>
                  <div className="text-sm font-medium">{inquiry.name}</div>
                </div>
                <div>
                  <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-1">Email</div>
                  <div className="text-sm font-medium">
                    <a href={`mailto:${inquiry.email}`} className="text-accent hover:underline">{inquiry.email}</a>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-1">Teléfono</div>
                  <div className="text-sm font-medium">{inquiry.phone || "No proporcionado"}</div>
                </div>
                <div>
                  <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-1">Fecha</div>
                  <div className="text-sm font-medium">{formatDate(inquiry.createdAt)}</div>
                </div>
              </div>

              <div>
                <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-1">Asunto</div>
                <div className="text-sm font-medium">{inquiry.subject || "Sin asunto"}</div>
              </div>

              <div>
                <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-1">Mensaje</div>
                <div className="text-sm bg-cream rounded-lg p-4 whitespace-pre-wrap leading-relaxed">{inquiry.message}</div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t border-border">
              <a
                href={`mailto:${inquiry.email}?subject=Re: ${inquiry.subject || "Consulta"}`}
                className="flex-1 py-3 bg-primary text-white rounded-lg text-sm font-semibold text-center hover:bg-primary-light transition-all"
              >
                Responder por Email
              </a>
              {inquiry.phone && (
                <a
                  href={`https://wa.me/${inquiry.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-green-600 text-white rounded-lg text-sm font-semibold text-center hover:bg-green-700 transition-all"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
