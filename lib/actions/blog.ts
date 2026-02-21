"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function getBlogPosts(publishedOnly = false) {
  return db.blogPost.findMany({
    where: publishedOnly ? { published: true } : undefined,
    orderBy: { createdAt: "desc" },
  });
}

export async function getBlogPostBySlug(slug: string) {
  return db.blogPost.findUnique({ where: { slug } });
}

export async function createBlogPost(formData: FormData) {
  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const tag = formData.get("tag") as string;
  const readTime = formData.get("readTime") as string;
  const published = formData.get("published") === "true";
  const authorName = formData.get("authorName") as string;

  await db.blogPost.create({
    data: { title, slug: slugify(title), excerpt, content, tag, readTime, published, authorName },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function updateBlogPost(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const tag = formData.get("tag") as string;
  const readTime = formData.get("readTime") as string;
  const published = formData.get("published") === "true";

  await db.blogPost.update({
    where: { id },
    data: { title, slug: slugify(title), excerpt, content, tag, readTime, published },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function deleteBlogPost(id: string) {
  await db.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
