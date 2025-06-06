import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from "uuid";

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://tijesunimiidowu16:M7UN0QTHvX6P5ktw@cluster0.x5257.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function migrateUsers() {
  try {
    await client.connect();
    const dbEcommerce = client.db("ecommerce");
    const dbUserData = client.db("registeredUsers");

    const usersUserData = await dbUserData
      .collection("users")
      .find({})
      .toArray();
    console.log(`Found ${usersUserData.length} users in userData`);

    const migratedUsers = usersUserData.map((user) => ({
      ...user,
      userId: user.userId || uuidv4(),
      visits: user.visits || 0,
      totalSpent: user.totalSpent || 0,
      avgTimeSpent: user.avgTimeSpent || 0,
      pagesViewed: user.pagesViewed || 0,
      cartAdditions: user.cartAdditions || 0,
      purchases: user.purchases || [],
      dailyLogs: user.dailyLogs || [],
      segmentLabel: user.segmentLabel || "casual",
    }));

    await dbEcommerce
      .collection("users")
      .insertMany(migratedUsers, { ordered: false });
    console.log(`Migrated ${migratedUsers.length} users to ecommerce`);

    // Optional: Remove from userData (comment out if you want to keep a backup)
    // await dbUserData.collection("users").deleteMany({});
    // console.log('Cleared userData.users');
  } catch (error) {
    console.error("Migration error:", error.message);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

migrateUsers();
