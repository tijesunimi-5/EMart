import clientPromise from "../../../lib/mongodb";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  try {
    const { username, email, phone, password, bio } = await req.json();

    const client = await clientPromise;
    const db = client.db("registeredUsers"); // Changed to ecommerce database
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ success: false, message: "User already exists" }),
        { status: 409 }
      );
    }

    const userId = uuidv4(); // Generate unique userId for tracking
    const result = await db.collection("users").insertOne({
      userId,
      username,
      email,
      phone,
      password, // Note: In production, hash this with bcrypt
      bio,
      visits: 0,
      totalSpent: 0,
      avgTimeSpent: 0,
      pagesViewed: 0,
      cartAdditions: 0,
      purchases: [],
      dailyLogs: [], // For tracking compatibility
      segmentLabel: 'casual' // Initial label
    });
    return new Response(JSON.stringify({ success: true, userId, result }), {
      status: 200,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
