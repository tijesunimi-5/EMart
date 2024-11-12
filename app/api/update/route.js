import clientPromise from "../../../lib/mongodb";

export async function POST(req) {
  try {
    const { email, newBio, newName, newPassword } = await req.json();

    const client = await clientPromise;
    const db = client.db("user-data");
    const collection = db.collection("users");

    //Verify user by email
    const user = await collection.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }

    //Prepare update fields dynamically
    const updateFields = {};
    if (newBio) updateFields.bio = newBio;
    if (newName) updateFields.username = newName;
    if (newPassword) updateFields.password = newPassword;

    const result = await collection.updateOne(
      { email },
      { $set: updateFields }
    );

    return new Response(
      JSON.stringify(
        { success: true, message: "user updated successfully", result },
        { status: 200 }
      )
    );
  } catch (error) {
    console.error("Update error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500 }
    );
  }
}
