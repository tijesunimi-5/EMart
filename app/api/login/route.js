import { MongoClient } from "mongodb";
import {setUser} from '../../../components/userContext'

// MongoDB connection URI
const uri = process.env.MONGODB_URI;
let client;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db("user-data"); // Replace 'data' with your database name if different
}

// Function to find a user by email
async function findUserByEmail(email) {
  const db = await connectToDatabase();
  const collection = db.collection("users"); // Replace 'users' with your collection name

  // Search for user in MongoDB
  const user = await collection.findOne({ email });
  return user;
  
}

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email and password are required",
        }),
        { status: 400 }
      );
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }

    // Compare password (hashing should be done for real-world applications)
    if (user.password !== password) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid credentials" }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Login successful", user }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500 }
    );
  }
}
