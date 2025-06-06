import axios from "axios";
import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://tijesunimiidowu16:M7UN0QTHvX6P5ktw@cluster0.x5257.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

// Fetch products
async function fetchProducts() {
  let storedProducts = [];
  try {
    const { getAllProducts } = await import('../data/product.js');
    storedProducts = getAllProducts();
    console.log('Fetched products from local data:', storedProducts);
  } catch (error) {
    console.warn(
      "Failed to import getAllProducts, using fallback data:",
      error.message
    );
    return;
  }

  if (!Array.isArray(storedProducts) || storedProducts.length === 0) {
    console.warn("No valid products found, using fallback data.");
    return;
  }

  return storedProducts;
}

async function ClientData() {
  try {
    await client.connect();
    const db = client.db("ecommerce");

    // Clear existing dummy data, but preserve actual registered users
    await db.collection("users").deleteMany({ email: { $regex: '^user[0-9]+@gmail.com$' } });
    await db.collection("transactions").deleteMany({});
    const deleteResult = await db.collection("products").deleteMany({});
    console.log("Deleted products:", deleteResult.deletedCount);

    // Fetch products
    const products = await fetchProducts();
    if (products.length === 0) {
      console.error("No products available.");
      return;
    }
    console.log("Products to insert:", products);
    const insertResult = await db
      .collection("products")
      .insertMany(products, { ordered: false });
    console.log("MongoDB insert result:", insertResult);
    console.log(
      "Inserted products:",
      products.map((p) => p.title)
    );

    // Check existing users to avoid duplicating dummy users
    const existingUsers = await db.collection("users").find({}).toArray();
    const existingUserIds = new Set(existingUsers.map(user => user.userId));

    // Simulate users for k-means clustering (50 registered, 50 non-registered)
    const customers = Array.from({ length: 100 }, (_, i) => {
      const userId = `user${i + 1}`;
      if (existingUserIds.has(userId)) return null;

      // Simulate dailyLogs (1-3 days of activity)
      const dailyLogs = Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, dayIndex) => {
        const pages = ['home', 'products', 'cart', 'checkout'];
        const pageViews = {};
        const randomPageCount = Math.floor(Math.random() * 3) + 1; // 1-3 pages visited
        for (let p = 0; p < randomPageCount; p++) {
          const page = pages[Math.floor(Math.random() * pages.length)];
          pageViews[page] = {
            visits: 1,
            timeEntered: ["12:00:00"],
            timeLeft: ["12:01:00"],
            totalTimeSpent: Math.floor(Math.random() * 300) // 0-300 seconds
          };
        }

        // Simulate cart additions (0-2 products)
        const productsAdded = Array.from({ length: Math.floor(Math.random() * 3) }, () => {
          const product = products[Math.floor(Math.random() * products.length)];
          return {
            productId: product.id,
            name: product.title,
            price: product.price
          };
        });

        return {
          dateOfView: `2025-06-0${dayIndex + 1}`,
          pageViews,
          productsAdded
        };
      });

      return {
        userId,
        email: i < 50 ? `user${i + 1}@gmail.com` : '', // First 50 registered, next 50 non-registered
        visits: Math.floor(Math.random() * 20) + 1,
        totalSpent: 0,
        avgTimeSpent: Math.floor(Math.random() * 300),
        pagesViewed: dailyLogs.reduce((sum, log) => sum + Object.keys(log.pageViews).length, 0),
        cartAdditions: dailyLogs.reduce((sum, log) => sum + log.productsAdded.length, 0),
        purchases: [],
        dailyLogs,
        segmentLabel: 'casual'
      };
    }).filter(user => user !== null);

    // Simulate transactions for Apriori (1-3 items per transaction)
    const transaction = Array.from({ length: 200 }, (_, i) => {
      const userId = `user${Math.floor(Math.random() * 100) + 1}`;
      const numItems = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3 items
      const items = Array.from({ length: numItems }, () => {
        const product = products[Math.floor(Math.random() * products.length)];
        return {
          productId: product.id,
          name: product.title,
          price: product.price
        };
      });
      const total = items.reduce((sum, item) => sum + item.price, 0);
      return {
        transactionId: `tx${i + 1}`,
        userId,
        items,
        total,
        timestamp: new Date(),
      };
    });

    // Insert data
    if (customers.length > 0) {
      await db.collection("users").insertMany(customers);
      console.log(`Inserted ${customers.length} dummy users`);
    }
    await db.collection("transactions").insertMany(transaction);

    // Update customers with transaction IDs and totalSpent
    for (const tx of transaction) {
      await db
        .collection("users")
        .updateOne(
          { userId: tx.userId },
          { $push: { purchases: tx.transactionId } }
        );
      await db.collection("users").updateOne(
        { userId: tx.userId },
        { $inc: { totalSpent: tx.total } }
      );
    }

    // Log registered users
    const registeredUsers = await db.collection("users").find({ email: { $ne: '' } }).toArray();
    console.log(`Found ${registeredUsers.length} registered users after dummy data generation:`);
    console.log(registeredUsers.map(user => ({ userId: user.userId, email: user.email })));

    console.log("Data generation complete!");
  } catch (error) {
    console.error("Error generating client data: ", error.message);
  } finally {
    await client.close();
  }
}

ClientData();
