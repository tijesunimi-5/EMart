import { MongoClient, ObjectId } from "mongodb"; // Import ObjectId to handle userId conversion

const uri = process.env.MONGODB_URI; // Your MongoDB URI
const client = new MongoClient(uri);

export const POST = async (req, res) => {
  const { image } = await req.json(); // Get base64 image data from request
  console.log("Received image:", image);

  if (!image) {
    return res.status(400).json({ error: "Image data is required" });
  }

  try {
    await client.connect();
    console.log("MongoDB connected");

    const db = client.db("userData");
    const usersCollection = db.collection("users");

    // Assuming `userId` is available and the user is logged in
    const userId = req.headers["user-id"]; // This should be passed with the request

    // Check if userId is present
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Convert userId to ObjectId format (MongoDB uses ObjectId for _id)
    const userObjectId = new ObjectId(userId);

    // Fetch user from database
    const user = await usersCollection.findOne({ _id: userObjectId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's profile with the base64 image
    await usersCollection.updateOne(
      { _id: userObjectId },
      { $set: { image: image } } // Store the base64 image
    );

    // Return the image URL (base64 data) in the response
    res.status(200).json({ imageUrl: image });
  } catch (error) {
    console.error("Error uploading image:", error);
    console.error("Stack Trace:", error.stack);
    res.status(500).json({ error: "Failed to upload image" });
  } finally {
    await client.close();
  }
};
