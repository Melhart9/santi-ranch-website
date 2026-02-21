"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

const sampleGalleryImages = [
  { id: "1", title: "Toro Angus", url: "/images/gallery/toro.jpg", category: "Animales", order: 1 },
  { id: "2", title: "Yegua Palomino", url: "/images/gallery/yegua.jpg", category: "Animales", order: 2 },
  { id: "3", title: "Productos de la huerta", url: "/images/gallery/huerta.jpg", category: "Productos", order: 3 },
];

export async function getGalleryImages(category?: string) {
  try {
    return await db.galleryImage.findMany({
      where: category ? { category } : undefined,
      orderBy: { order: "asc" },
    });
  } catch (error) {
    return category 
      ? sampleGalleryImages.filter(img => img.category === category)
      : sampleGalleryImages;
  }
}

export async function createGalleryImage(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const url = formData.get("url") as string;
    const category = formData.get("category") as string;
    const order = parseInt(formData.get("order") as string) || 0;

    await db.galleryImage.create({
      data: {
        title,
        url,
        category,
        order,
      },
    });
  } catch (error) {
    console.error("Error creating gallery image:", error);
    throw error;
  }
  revalidatePath("/admin/galeria");
  revalidatePath("/galeria");
}

export async function updateGalleryImage(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const url = formData.get("url") as string;
    const category = formData.get("category") as string;
    const order = parseInt(formData.get("order") as string) || 0;

    await db.galleryImage.update({
      where: { id },
      data: {
        title,
        url,
        category,
        order,
      },
    });
  } catch (error) {
    console.error("Error updating gallery image:", error);
    throw error;
  }
  revalidatePath("/admin/galeria");
  revalidatePath("/galeria");
}

export async function deleteGalleryImage(id: string) {
  try {
    await db.galleryImage.delete({ where: { id } });
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    throw error;
  }
  revalidatePath("/admin/galeria");
  revalidatePath("/galeria");
}
