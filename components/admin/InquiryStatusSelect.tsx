"use client";

import { updateInquiryStatus } from "@/lib/actions/inquiries";
import { statusLabels, statusColors } from "@/lib/utils";

const STATUSES = ["NUEVO", "EN_PROCESO", "RESPONDIDO", "CERRADO"];

export default function InquiryStatusSelect({ id, currentStatus }: { id: string; currentStatus: string }) {
  return (
    <select
      value={currentStatus}
      onChange={async (e) => {
        await updateInquiryStatus(id, e.target.value);
      }}
      className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase border-0 cursor-pointer ${statusColors[currentStatus] || "bg-gray-100"}`}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>{statusLabels[s]}</option>
      ))}
    </select>
  );
}
