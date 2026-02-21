import { db } from "@/lib/db";
import { formatDate, statusLabels, statusColors } from "@/lib/utils";
import Link from "next/link";

export default async function AdminDashboard() {
  const [productCount, categoryCount, inquiryCount, postCount, recentInquiries] = await Promise.all([
    db.product.count(),
    db.category.count(),
    db.contactInquiry.count(),
    db.blogPost.count(),
    db.contactInquiry.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
  ]);

  const stats = [
    { label: "Total Productos", value: productCount, change: "Activos" },
    { label: "Categorías", value: categoryCount, change: "Todas activas" },
    { label: "Consultas", value: inquiryCount, change: "Pendientes" },
    { label: "Blog Posts", value: postCount, change: "Publicados" },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl font-medium">Panel Principal</h1>
        <div className="text-sm text-[var(--text-muted)]">Bienvenido de vuelta</div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-border rounded-xl p-6">
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-2">{s.label}</div>
            <div className="font-serif text-4xl font-medium text-primary">{s.value}</div>
            <div className="text-xs text-green-600 font-medium mt-1">{s.change}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-border rounded-xl overflow-hidden">
        <div className="flex justify-between items-center px-6 py-5 border-b border-border">
          <span className="font-semibold">Consultas Recientes</span>
          <Link href="/admin/consultas" className="text-sm font-semibold text-accent hover:text-primary transition-colors">
            Ver Todas →
          </Link>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-cream">
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Nombre</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Asunto</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Fecha</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {recentInquiries.map((inq) => (
              <tr key={inq.id} className="border-b border-border last:border-0 hover:bg-cream/50">
                <td className="px-6 py-4 text-sm font-medium">{inq.name}</td>
                <td className="px-6 py-4 text-sm">{inq.subject}</td>
                <td className="px-6 py-4 text-sm text-[var(--text-muted)]">{formatDate(inq.createdAt)}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${statusColors[inq.status] || ""}`}>
                    {statusLabels[inq.status] || inq.status}
                  </span>
                </td>
              </tr>
            ))}
            {recentInquiries.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-10 text-center text-[var(--text-muted)]">No hay consultas aún.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
