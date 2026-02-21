"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { z } from "zod";

const InquirySchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(1, "El mensaje es requerido"),
});

export async function getInquiries() {
  return db.contactInquiry.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createInquiry(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const data = InquirySchema.parse(raw);
  await db.contactInquiry.create({ data });
  revalidatePath("/admin/consultas");
  return { success: true };
}

export async function updateInquiryStatus(id: string, status: string) {
  await db.contactInquiry.update({
    where: { id },
    data: { status: status as any },
  });
  revalidatePath("/admin/consultas");
}

export async function deleteInquiry(id: string) {
  await db.contactInquiry.delete({ where: { id } });
  revalidatePath("/admin/consultas");
}
