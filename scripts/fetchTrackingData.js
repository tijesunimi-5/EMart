import { MongoClient } from 'mongodb';
import fs from 'fs/promises';

const uri = process.env.MONGODB_URI || 'mongodb+srv://tijesunimiidowu16:M7UN0QTHvX6P5ktw@cluster0.x5257.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

async function fetchTrackingData() {
  try {
    await client.connect();
    const dbEcommerce = client.db("ecommerce");

    // Fetch users and transactions
    console.log('Fetching users from ecommerce...');
    const users = await dbEcommerce.collection("users").find({}).toArray();
    console.log(`Fetched ${users.length} users from ecommerce`);

    console.log('Fetching transactions...');
    const transactions = await dbEcommerce.collection("transactions").find({}).toArray();
    console.log(`Fetched ${transactions.length} transactions`);

    // Log users missing dailyLogs
    const usersMissingDailyLogs = users.filter(user => !user.dailyLogs).map(user => user.userId);
    if (usersMissingDailyLogs.length > 0) {
      console.log(`Users missing dailyLogs in ecommerce: ${usersMissingDailyLogs.join(', ')}`);
    }

    // Log registered users
    const registeredUsers = users.filter(user => !!user.email).map(user => ({
      userId: user.userId,
      email: user.email,
      hasDailyLogs: !!user.dailyLogs,
      hasTransactions: transactions.some(tx => tx.userId === user.userId)
    }));
    console.log(`Found ${registeredUsers.length} registered users in ecommerce:`);
    console.log(JSON.stringify(registeredUsers, null, 2));

    // Format for K-means
    const kmeansData = users.map(user => {
      const userTransactions = transactions.filter(tx => tx.userId === user.userId);
      return {
        userId: user.userId,
        isRegistered: !!user.email,
        visits: user.visits,
        avgTimeSpent: user.avgTimeSpent,
        pagesViewed: user.pagesViewed,
        cartAdditions: user.cartAdditions,
        totalSpent: user.totalSpent,
        purchaseCount: userTransactions.length,
        uniquePages: (user.dailyLogs || []).reduce((sum, log) => sum + Object.keys(log.pageViews || {}).length, 0),
        segmentLabel: user.segmentLabel || 'casual'
      };
    });

    console.log('K-means Data Sample:', JSON.stringify(kmeansData.slice(0, 2), null, 2));
    await fs.writeFile('kmeans_data.json', JSON.stringify(kmeansData, null, 2));
    console.log('Saved kmeans_data.json');

    // Format for Apriori (transaction-level)
    const aprioriData = transactions.map(tx => ({
      transactionId: tx.transactionId,
      userId: tx.userId,
      isRegistered: !!users.find(u => u.userId === tx.userId)?.email,
      products: tx.items.map(item => item.productId),
      date: tx.timestamp.toISOString().split('T')[0],
      segmentLabel: users.find(u => u.userId === tx.userId)?.segmentLabel || 'casual'
    }));

    console.log('Apriori Data Sample:', JSON.stringify(aprioriData.slice(0, 5), null, 2));
    await fs.writeFile('apriori_data_transactions.json', JSON.stringify(aprioriData, null, 2));
    console.log('Saved apriori_data_transactions.json');

    return { kmeansData, aprioriData };
  } catch (error) {
    console.error('Error fetching tracking data:', error.message);
    return { kmeansData: [], aprioriData: [] };
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

fetchTrackingData();
