import { getInquiries } from "@/lib/actions/inquiries";
import { formatDate, statusLabels, statusColors } from "@/lib/utils";
import InquiryStatusSelect from "@/components/admin/InquiryStatusSelect";

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries();

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl font-medium">Consultas</h1>
        <div className="text-sm text-[var(--text-muted)]">{inquiries.length} total</div>
      </div>

      <div className="bg-white border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-cream">
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Nombre</th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Email</th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Asunto</th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Fecha</th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <tr key={inq.id} className="border-b border-border last:border-0 hover:bg-cream/50">
                  <td className="px-6 py-4 text-sm font-medium">{inq.name}</td>
                  <td className="px-6 py-4 text-sm text-[var(--text-muted)]">{inq.email}</td>
                  <td className="px-6 py-4 text-sm">{inq.subject}</td>
                  <td className="px-6 py-4 text-sm text-[var(--text-muted)]">{formatDate(inq.createdAt)}</td>
                  <td className="px-6 py-4">
                    <InquiryStatusSelect id={inq.id} currentStatus={inq.status} />
                  </td>
                </tr>
              ))}
              {inquiries.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-[var(--text-muted)]">No hay consultas.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
