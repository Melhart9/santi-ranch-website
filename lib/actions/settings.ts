"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function getSiteSettings() {
  let settings = await db.siteSettings.findUnique({ where: { id: "default" } });
  if (!settings) {
    settings = await db.siteSettings.create({
      data: { id: "default", siteName: "Dos Arroyos Ranch" },
    });
  }
  return settings;
}

export async function updateSiteSettings(formData: FormData) {
  const data = {
    siteName: formData.get("siteName") as string,
    description: formData.get("description") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    address: formData.get("address") as string,
    mapsUrl: formData.get("mapsUrl") as string,
    primaryColor: formData.get("primaryColor") as string,
    accentColor: formData.get("accentColor") as string,
    facebook: formData.get("facebook") as string,
    instagram: formData.get("instagram") as string,
    youtube: formData.get("youtube") as string,
  };

  await db.siteSettings.upsert({
    where: { id: "default" },
    update: data,
    create: { id: "default", ...data },
  });

  revalidatePath("/admin/configuracion");
  revalidatePath("/");
}
