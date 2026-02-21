"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";

const sampleCategories = [
  { id: "1", name: "Ganado", slug: "ganado", description: "Ganado de registro", emoji: "🐄", order: 1, _count: { products: 12 } },
  { id: "2", name: "Caballos", slug: "caballos", description: "Caballos de trabajo", emoji: "🐎", order: 2, _count: { products: 8 } },
  { id: "3", name: "Productos Orgánicos", slug: "organicos", description: "Productos de la huerta", emoji: "🌾", order: 3, _count: { products: 15 } },
];

export async function getCategories() {
  try {
    return await db.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { order: "asc" },
    });
  } catch (error) {
    return sampleCategories;
  }
}

export async function createCategory(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const emoji = formData.get("emoji") as string;
    const order = parseInt(formData.get("order") as string) || 0;

    await db.category.create({
      data: {
        name,
        slug: slugify(name),
        description,
        emoji,
        order,
      },
    });
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
  revalidatePath("/admin/categorias");
  revalidatePath("/productos");
}

export async function updateCategory(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const emoji = formData.get("emoji") as string;
    const order = parseInt(formData.get("order") as string) || 0;

    await db.category.update({
      where: { id },
      data: {
        name,
        slug: slugify(name),
        description,
        emoji,
        order,
      },
    });
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
  revalidatePath("/admin/categorias");
  revalidatePath("/productos");
}

export async function deleteCategory(id: string) {
  try {
    await db.category.delete({ where: { id } });
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
  revalidatePath("/admin/categorias");
  revalidatePath("/productos");
}
