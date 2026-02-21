import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hash } from "bcryptjs";

export const runtime = "nodejs";

export async function GET() {
  try {
    const hashedPassword = await hash("admin123", 12);
    
    const user = await db.user.upsert({
      where: { email: "admin@terraverde.mx" },
      update: { password: hashedPassword },
      create: {
        email: "admin@terraverde.mx",
        name: "Administrador",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: "Admin user created/updated",
      email: user.email 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: String(error) 
    }, { status: 500 });
  }
}
