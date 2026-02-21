"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";

const sampleBlogPosts = [
  {
    id: "1",
    title: "Ganadería Sustentable en la Era Moderna",
    slug: "ganaderia-sustentable",
    excerpt: "Cómo estamos combinando métodos tradicionales con prácticas sustentables.",
    content: "Contenido del artículo...",
    tag: "Sustentabilidad",
    readTime: "5 min",
    published: true,
    image: null,
    createdAt: new Date("2025-12-15"),
    updatedAt: new Date("2025-12-15"),
    authorName: "Carlos Mendoza",
  },
  {
    id: "2",
    title: "Temporada de Pariciones: Qué Esperar",
    slug: "temporada-pariciones",
    excerpt: "Un vistazo detrás de escenas a nuestra preparación.",
    content: "Contenido del artículo...",
    tag: "Vida de Rancho",
    readTime: "4 min",
    published: true,
    image: null,
    createdAt: new Date("2025-11-28"),
    updatedAt: new Date("2025-11-28"),
    authorName: "María Fernández",
  },
];

export async function getBlogPosts(publishedOnly = false) {
  try {
    return await db.blogPost.findMany({
      where: publishedOnly ? { published: true } : undefined,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    return sampleBlogPosts;
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    return await db.blogPost.findUnique({ where: { slug } });
  } catch (error) {
    return sampleBlogPosts.find(p => p.slug === slug) || null;
  }
}

export async function createBlogPost(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const tag = formData.get("tag") as string;
    const readTime = formData.get("readTime") as string;
    const published = formData.get("published") === "true";
    const authorName = formData.get("authorName") as string;
    const image = formData.get("image") as string;

    await db.blogPost.create({
      data: {
        title,
        slug: slugify(title),
        excerpt,
        content,
        tag,
        readTime,
        published,
        authorName,
        image,
      },
    });
  } catch (error) {
    console.error("Error creating blog post:", error);
    throw error;
  }
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function updateBlogPost(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const tag = formData.get("tag") as string;
    const readTime = formData.get("readTime") as string;
    const published = formData.get("published") === "true";
    const authorName = formData.get("authorName") as string;
    const image = formData.get("image") as string;

    await db.blogPost.update({
      where: { id },
      data: {
        title,
        slug: slugify(title),
        excerpt,
        content,
        tag,
        readTime,
        published,
        authorName,
        image,
      },
    });
  } catch (error) {
    console.error("Error updating blog post:", error);
    throw error;
  }
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function deleteBlogPost(id: string) {
  try {
    await db.blogPost.delete({ where: { id } });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    throw error;
  }
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
