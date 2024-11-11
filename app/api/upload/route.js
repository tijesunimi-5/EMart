import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  //this choose a path to save the image
  const imagePath = path.join(process.cwd(), "public", "uploads", file.name);

  //this saves file to local path
  fs.writeFileSync(imagePath, Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({ message: "Image uploaded sucessfully"})
}