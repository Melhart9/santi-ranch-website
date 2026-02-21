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

// Sample data for build time when DB is not available
const sampleProducts = [
  {
    id: "1",
    name: "Toro Angus — El Capitán",
    slug: "toro-angus-el-capitan",
    description: "Toro Angus registrado de 3 años. Genética excepcional.",
    price: 90000,
    status: "DISPONIBLE",
    featured: true,
    image: null,
    specs: { Raza: "Angus Negro", Edad: "3 años", Peso: "545 kg" },
    category: { name: "Ganado", slug: "ganado", emoji: "🐄" },
    categoryId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2", 
    name: "Yegua Cuarto de Milla — Luna",
    slug: "yegua-cuarto-de-milla-luna",
    description: "Yegua cuarto de milla bien entrenada.",
    price: 170000,
    status: "DISPONIBLE",
    featured: true,
    image: null,
    specs: { Raza: "Cuarto de Milla", Edad: "5 años", Color: "Palomino" },
    category: { name: "Caballos", slug: "caballos", emoji: "🐎" },
    categoryId: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Caja de Tomate Heritage",
    slug: "tomate-heritage",
    description: "5 kg de tomates orgánicos.",
    price: 650,
    status: "DISPONIBLE",
    featured: true,
    image: null,
    specs: { Peso: "5 kg", Orgánico: "Sí" },
    category: { name: "Productos Orgánicos", slug: "organicos", emoji: "🌾" },
    categoryId: "3",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Miel de Flores Silvestres",
    slug: "miel-flores",
    description: "Miel pura, sin filtrar.",
    price: 480,
    status: "DISPONIBLE",
    featured: true,
    image: null,
    specs: { Volumen: "1 litro", Tipo: "Cruda" },
    category: { name: "Miel y Apicultura", slug: "miel", emoji: "🍯" },
    categoryId: "4",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function getProducts() {
  try {
    return await db.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    return sampleProducts;
  }
}

export async function getProductBySlug(slug: string) {
  try {
    return await db.product.findUnique({
      where: { slug },
      include: { category: true },
    });
  } catch (error) {
    return sampleProducts.find(p => p.slug === slug) || null;
  }
}

export async function getFeaturedProducts() {
  try {
    return await db.product.findMany({
      where: { featured: true },
      include: { category: true },
      take: 4,
    });
  } catch (error) {
    return sampleProducts.filter(p => p.featured);
  }
}

export async function createProduct(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") ? parseFloat(formData.get("price") as string) : null;
    const status = (formData.get("status") as string) || "DISPONIBLE";
    const featured = formData.get("featured") === "true";
    const categoryId = formData.get("categoryId") as string;
    const image = (formData.get("image") as string) || null;

    await db.product.create({
      data: {
        name,
        slug: slugify(name),
        description,
        price,
        status: status as any,
        featured,
        categoryId,
        image,
      },
    });
  } catch (error) {
    console.error("Error creating product:", error);
  }
  revalidatePath("/productos");
  revalidatePath("/admin/productos");
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") ? parseFloat(formData.get("price") as string) : null;
    const status = formData.get("status") as string;
    const featured = formData.get("featured") === "true";
    const categoryId = formData.get("categoryId") as string;
    const image = (formData.get("image") as string) || null;

    await db.product.update({
      where: { id },
      data: {
        name,
        slug: slugify(name),
        description,
        price,
        status: status as any,
        featured,
        categoryId,
        image,
      },
    });
  } catch (error) {
    console.error("Error updating product:", error);
  }
  revalidatePath("/productos");
  revalidatePath(`/productos/${id}`);
  revalidatePath("/admin/productos");
}

export async function deleteProduct(id: string) {
  try {
    await db.product.delete({ where: { id } });
  } catch (error) {
    console.error("Error deleting product:", error);
  }
  revalidatePath("/productos");
  revalidatePath("/admin/productos");
}
