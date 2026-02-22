import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    // Check token first
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    console.log("Upload attempt - Token exists:", !!token);
    
    if (!token) {
      return NextResponse.json(
        { error: "BLOB_READ_WRITE_TOKEN no está configurado" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No se proporcionó ningún archivo." },
        { status: 400 }
      );
    }

    console.log("File received:", file.name, file.type, file.size);

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

    const ext = file.name.split(".").pop() || "jpg";
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const filename = `ranch/${timestamp}-${randomStr}.${ext}`;

    console.log("Uploading to blob:", filename);

    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: false,
      token: token, // Explicitly pass token
    });

    console.log("Upload successful:", blob.url);

    return NextResponse.json({ url: blob.url });
  } catch (error: any) {
    console.error("Upload error details:", error);
    
    return NextResponse.json(
      { error: `Error: ${error.message || "Error desconocido"}` },
      { status: 500 }
    );
  }
}
