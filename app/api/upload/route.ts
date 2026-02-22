import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No se proporcionó ningún archivo." },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Tipo de archivo no permitido. Usa JPG, PNG, WebP o GIF." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "El archivo es muy grande. Máximo 5MB." },
        { status: 400 }
      );
    }

    // Generate unique filename
    const ext = file.name.split(".").pop() || "jpg";
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const filename = `ranch/${timestamp}-${randomStr}.${ext}`;

    // Upload to Vercel Blob - for private stores we need to use signed URLs
    // But for now, try without access parameter
    const blob = await put(filename, file, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return NextResponse.json({ url: blob.url });
  } catch (error: any) {
    console.error("Upload error:", error);
    
    // Check if it's the private store error
    if (error?.message?.includes("private store")) {
      return NextResponse.json(
        { error: "El almacenamiento está configurado como privado. Cambia a público en Vercel Dashboard > Storage > Settings" },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || "Error al subir la imagen." },
      { status: 500 }
    );
  }
}
