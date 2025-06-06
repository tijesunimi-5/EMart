import { getRecommendations } from "../../scripts/recommendation.js";
import { MongoClient } from "mongodb";

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://tijesunimiidowu16:M7UN0QTHvX6P5ktw@cluster0.x5257.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function getProductNames(productIds) {
  try {
    console.log("Fetching product names for IDs:", productIds);
    await client.connect();
    const db = client.db("ecommerce");
    const products = await db
      .collection("products")
      .find(
        { id: { $in: productIds } },
        {
          projection: {
            _id: 0,
            id: 1,
            title: 1,
            image: 1,
            price: 1,
            description: 1,
            spec: 1,
          },
        }
      )
      .toArray();
    console.log("Found products:", products);
    return products;
  } catch (error) {
    console.error("Error fetching product names:", error.message);
    throw new Error(`MongoDB error: ${error.message}`);
  } finally {
    await client.close();
  }
}

export async function POST(req) {
  try {
    const { userItems } = await req.json();
    console.log("Received userItems:", userItems);
    if (!Array.isArray(userItems)) {
      return new Response(
        JSON.stringify({ error: "userItems must be an array" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const recommendations = await getRecommendations(userItems);
    console.log("Generated recommendations:", recommendations);
    const productDetails = await getProductNames(recommendations);
    return new Response(JSON.stringify({ recommendations: productDetails }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating recommendations:", error.message);
    return new Response(
      JSON.stringify({
        error: "Failed to generate recommendations",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
