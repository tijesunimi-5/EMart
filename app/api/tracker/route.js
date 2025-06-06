import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://tijesunimiidowu16:M7UN0QTHvX6P5ktw@cluster0.x5257.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
let cachedClient = null;
let cachedDb = null;

async function connectToDb() {
  if (cachedDb) return cachedDb;
  try {
    console.log(
      "Attempting to connect to MongoDB with URI:",
      uri.replace(/:([^@]+)@/, ":<password>@")
    );
    cachedClient = await MongoClient.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
      retryWrites: true,
    });
    cachedDb = cachedClient.db("ecommerce");
    console.log("Connected to MongoDB");
    return cachedDb;
  } catch (error) {
    console.error("Database connection failed:", error.message, error.stack);
    throw new Error(`Database connection failed: ${error.message}`);
  }
}

async function withRetry(operation, maxRetries = 3, delayMs = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxRetries || !error.message.includes("connection"))
        throw error;
      console.warn(`Retry ${attempt}/${maxRetries} failed: ${error.message}`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}

function assignSegmentLabel(user) {
  const totalTime = user.dailyLogs.reduce(
    (sum, log) =>
      sum +
      Object.values(log.pageViews).reduce(
        (s, p) => s + (p.totalTimeSpent || 0),
        0
      ),
    0
  );
  const totalVisits = user.visits || 0;
  const totalSpent = user.totalSpent || 0;
  const cartAdditions = user.cartAdditions || 0;
  const purchases = user.purchases?.length || 0;

  if (totalSpent > 100000 || purchases >= 3) return "high-value";
  if (totalVisits > 10 || totalTime > 300 || cartAdditions > 2)
    return "engaged";
  return "casual";
}

export async function POST(request) {
  let type, userId, page, timeEntered, timeLeft, duration, product; // Declare variables outside try
  try {
    const body = await request.json();
    ({ type, userId, page, timeEntered, timeLeft, duration, product } =
      body || {});

    if (!userId || !type || !page) {
      return NextResponse.json(
        { status: "error", message: "userId, type, and page are required" },
        { status: 400 }
      );
    }

    console.log(
      `Received ${type} for user ${userId} on page ${page} at ${new Date().toISOString()}`
    );

    const db = await connectToDb();
    const users = db.collection("users");

    await withRetry(() =>
      users.updateOne(
        { userId },
        {
          $setOnInsert: {
            userId,
            email: "",
            visits: 0,
            totalSpent: 0,
            avgTimeSpent: 0,
            pagesViewed: 0,
            cartAdditions: 0,
            purchases: [],
            dailyLogs: [],
            segmentLabel: "casual",
          },
        },
        { upsert: true }
      )
    );

    const today = new Date().toISOString().split("T")[0];

    const user = await users.findOne({ userId });
    if (!user.dailyLogs.find((log) => log.dateOfView === today)) {
      await withRetry(() =>
        users.updateOne(
          { userId },
          {
            $push: {
              dailyLogs: {
                $each: [
                  { dateOfView: today, pageViews: {}, productsAdded: [] },
                ],
                $position: 0,
              },
            },
          }
        )
      );
    }

    const pageExists = user.dailyLogs.find((log) => log.dateOfView === today)
      ?.pageViews[page];
    if (!pageExists) {
      await withRetry(() =>
        users.updateOne(
          { userId, "dailyLogs.dateOfView": today },
          {
            $set: {
              [`dailyLogs.$.pageViews.${page}`]: {
                visits: 0,
                timeEntered: [],
                timeLeft: [],
                totalTimeSpent: 0,
              },
            },
          }
        )
      );
    }

    let updateQuery = {};
    if (type === "page_enter") {
      updateQuery = {
        $inc: { visits: 1, pagesViewed: 1 },
        $inc: { [`dailyLogs.$.pageViews.${page}.visits`]: 1 },
        $push: { [`dailyLogs.$.pageViews.${page}.timeEntered`]: timeEntered },
      };
      console.log(
        `User ${userId} entered page "${page}" on ${today} at ${timeEntered}`
      );
    } else if (type === "page_exit") {
      const timeSpent =
        typeof duration === "number" ? Math.max(0, duration) : 0;
      updateQuery = {
        $inc: { avgTimeSpent: timeSpent },
        $push: { [`dailyLogs.$.pageViews.${page}.timeLeft`]: timeLeft },
        $inc: { [`dailyLogs.$.pageViews.${page}.totalTimeSpent`]: timeSpent },
      };
      console.log(
        `User ${userId} left page "${page}" on ${today} at ${timeLeft} after ${timeSpent}s`
      );
    } else if (type === "add_to_cart" && product) {
      updateQuery = {
        $inc: { cartAdditions: 1 },
        $push: { "dailyLogs.$.productsAdded": product },
      };
      console.log(`User ${userId} added product "${product.name}" on ${today}`);
    }

    if (Object.keys(updateQuery).length > 0) {
      await withRetry(() =>
        users.updateOne({ userId, "dailyLogs.dateOfView": today }, updateQuery)
      );

      const updatedUser = await users.findOne({ userId });
      const totalTime = updatedUser.dailyLogs.reduce(
        (sum, log) =>
          sum +
          Object.values(log.pageViews).reduce(
            (s, p) => s + (p.totalTimeSpent || 0),
            0
          ),
        0
      );
      const totalVisits = updatedUser.visits;
      const newLabel = assignSegmentLabel(updatedUser);

      await withRetry(() =>
        users.updateOne(
          { userId },
          {
            $set: {
              avgTimeSpent:
                totalVisits > 0 ? Math.round(totalTime / totalVisits) : 0,
              segmentLabel: newLabel,
            },
          }
        )
      );
    }

    const finalUser = await users.findOne({ userId });
    const todayLog = finalUser.dailyLogs.find(
      (log) => log.dateOfView === today
    ) || { pageViews: {}, productsAdded: [] };
    console.log(`--- User ${userId} Summary for ${today} ---`);
    console.log(`User ID: ${userId}, Segment: ${finalUser.segmentLabel}`);
    console.log(`Registered: ${finalUser.email ? "Yes" : "No"}`);
    for (const pageName in todayLog.pageViews) {
      const { visits, timeEntered, timeLeft, totalTimeSpent } =
        todayLog.pageViews[pageName];
      console.log(
        `Page "${pageName}": ${visits} visits, Total Time: ${totalTimeSpent}s`
      );
      console.log(`  Entered: ${timeEntered.join(", ")}`);
      console.log(`  Left: ${timeLeft.join(", ")}`);
    }
    console.log(
      `Products Added: ${
        todayLog.productsAdded.map((p) => p.name).join(", ") || "None"
      }`
    );
    console.log("-------------------");

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error(
      `Error in /api/tracker (${type || "unknown"}):`,
      error.message,
      error.stack
    );
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
