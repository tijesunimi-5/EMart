import clientPromise from '../../../lib/mongodb'

export async function POST(req) {
  try {
    const {username, email, phone, password} = await req.json();
    console.log("Received data:", {username, email, phone, password})

    const client = await clientPromise;
    const db = client.db('user-data');
    const collection = db.collection('users')

    const result = await collection.insertOne({username, email, phone, password});

    return new Response(JSON.stringify({ success: true, result}), {
      status: 200,
    })
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({success: false, error: error.message}),
      {status: 500}
    )
  }
}