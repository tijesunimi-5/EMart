import clientPromise from "../../../lib/mongodb";

export async function POST(req) {
  try {
    const { username, email, phone, password, bio } = await req.json();

    const client = await clientPromise;
    const db = client.db("userData");
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ success: false, message: "User already exists" }),
        { status: 409 }
      );
    }

    const result = await db
      .collection("users")
      .insertOne({ username, email, phone, password, bio });
    return new Response(JSON.stringify({ success: true, result }), {
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
