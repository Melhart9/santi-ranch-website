"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { z } from "zod";

const ProductSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  price: z.coerce.number().nullable().optional(),
  status: z.enum(["DISPONIBLE", "RESERVADO", "VENDIDO", "AGOTADO"]),
  featured: z.boolean().default(false),
  categoryId: z.string().min(1, "La categoría es requerida"),
  image: z.string().optional(),
  specs: z.any().optional(),
});

export async function getProducts() {
  return db.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductBySlug(slug: string) {
  return db.product.findUnique({
    where: { slug },
    include: { category: true },
  });
}

export async function getFeaturedProducts() {
  return db.product.findMany({
    where: { featured: true },
    include: { category: true },
    take: 4,
  });
}

export async function getProductsByCategory(categorySlug: string) {
  return db.product.findMany({
    where: { category: { slug: categorySlug } },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function createProduct(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const data = ProductSchema.parse({
    ...raw,
    featured: raw.featured === "true",
    price: raw.price ? Number(raw.price) : null,
  });

  const slug = slugify(data.name);

  await db.product.create({
    data: {
      ...data,
      slug,
      price: data.price ?? null,
    },
  });

  revalidatePath("/admin/productos");
  revalidatePath("/productos");
}

export async function updateProduct(id: string, formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const data = ProductSchema.parse({
    ...raw,
    featured: raw.featured === "true",
    price: raw.price ? Number(raw.price) : null,
  });

  await db.product.update({
    where: { id },
    data: {
      ...data,
      slug: slugify(data.name),
      price: data.price ?? null,
    },
  });

  revalidatePath("/admin/productos");
  revalidatePath("/productos");
}

export async function deleteProduct(id: string) {
  await db.product.delete({ where: { id } });
  revalidatePath("/admin/productos");
  revalidatePath("/productos");
}
