"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function getGalleryImages(category?: string) {
  return db.galleryImage.findMany({
    where: category ? { category } : undefined,
    orderBy: { order: "asc" },
  });
}

export async function createGalleryImage(formData: FormData) {
  const title = formData.get("title") as string;
  const url = formData.get("url") as string;
  const category = formData.get("category") as string;

  await db.galleryImage.create({ data: { title, url, category } });
  revalidatePath("/admin/galeria");
  revalidatePath("/galeria");
}

export async function deleteGalleryImage(id: string) {
  await db.galleryImage.delete({ where: { id } });
  revalidatePath("/admin/galeria");
  revalidatePath("/galeria");
}
