"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function getCategories() {
  return db.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { order: "asc" },
  });
}

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const emoji = formData.get("emoji") as string;

  await db.category.create({
    data: {
      name,
      slug: slugify(name),
      description,
      emoji,
    },
  });

  revalidatePath("/admin/categorias");
  revalidatePath("/productos");
}

export async function updateCategory(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const emoji = formData.get("emoji") as string;

  await db.category.update({
    where: { id },
    data: {
      name,
      slug: slugify(name),
      description,
      emoji,
    },
  });

  revalidatePath("/admin/categorias");
  revalidatePath("/productos");
}

export async function deleteCategory(id: string) {
  await db.category.delete({ where: { id } });
  revalidatePath("/admin/categorias");
  revalidatePath("/productos");
}
