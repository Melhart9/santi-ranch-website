import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    console.log("Token exists:", !!token);
    
    const { blobs } = await list();
    
    return NextResponse.json({ 
      success: true, 
      tokenExists: !!token,
      blobCount: blobs.length 
    });
  } catch (error: any) {
    console.error("Blob test error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      tokenExists: !!process.env.BLOB_READ_WRITE_TOKEN
    }, { status: 500 });
  }
}
