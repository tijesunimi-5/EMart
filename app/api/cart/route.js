import { MongoClient } from "mongodb";

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://tijesunimiidowu16:M7UN0QTHvX6P5ktw@cluster0.x5257.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

export async function POST(req) {
  try {
    const { userId, productId } = await req.json();
    console.log("Adding to cart - userId:", userId, "productId:", productId); // Debug
    if (!userId || !productId) {
      return new Response(
        JSON.stringify({ error: "userId and productId are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await client.connect();
    const db = client.db("ecommerce");
    const transactions = db.collection("transactions");
    const products = db.collection("products");

    const product = await products.findOne(
      { id: productId },
      { projection: { _id: 0, id: 1, title: 1, price: 1 } }
    );
    if (!product) {
      console.log(`Product ${productId} not found`); // Debug
      return new Response(
        JSON.stringify({ error: `Product ${productId} not found` }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const newTransaction = {
      transactionId: `tx${Date.now()}`,
      userId,
      items: [{ productId, name: product.title, price: product.price }],
      total: product.price,
      timestamp: new Date(),
    };
    const result = await transactions.insertOne(newTransaction);
    console.log("Inserted transaction:", result.insertedId); // Debug

    return new Response(JSON.stringify({ message: "Item added to cart" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    return new Response(
      JSON.stringify({
        error: "Failed to add to cart",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    await client.close();
  }
}
