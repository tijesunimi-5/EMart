import { getRecommendations } from "./scripts/Recommendation";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { userItems } = req.body; // e.g., ['12', '1']
      const recommendations = await getRecommendations(userItems);
      res.status(200).json({ recommendations });
    } catch (error) {
      console.error("Error generating recommendations:", error);
      res.status(500).json({ error: "Failed to generate recommendations" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
