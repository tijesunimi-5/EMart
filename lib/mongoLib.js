import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://tijesunimiidowu16:M7UN0QTHvX6P5ktw@cluster0.x5257.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

let cachedDb = null;

export async function connectToDatabase() {
  if (cachedDb) return { db: cachedDb, client };

  await client.connect();
  const db = client.db("ecommerce");
  cachedDb = db;
  return { db, client };
}
