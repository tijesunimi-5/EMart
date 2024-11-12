import { NextResponse } from "next/server";
import {v2 as cloudinary} from "cloudinary";
import { connectToDatabase } from "../../../lib/mongodb";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  const userId = req.headers.get("user-id");

  if (!userId) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  try {
    const uploadResponse = await cloudinary.v2.uploader.upload(file.stream(), {
      resource_type: "auto",
      folder: "user_profiles",
    });

    const imageUrl = uploadResponse.secure_url;

    const { db } = await connectToDatabase();
    await db
      .collection("users")
      .updateOne({ _id: userId }, { $set: { image: imageUrl } });

    return NextResponse.json({
      message: "Image uploaded successfully",
      imageUrl,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image to Cloudinary" },
      { status: 500 }
    );
  }
}
