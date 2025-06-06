import fs from "fs/promises";
import path from "path";

const RULES_FILE_PATH = path.join(
  "C:/Users/Admin/OneDrive/Desktop/Model/tensorflow/ipynb/challenges/Real_World_projects",
  "apriori_rules.json"
);
const BACKEND_URL = "https://emart-apriori-algorithm.onrender.com";

// export async function getRecommendations(userItems) {
//   try {
//     console.log("Reading rules file from:", RULES_FILE_PATH);
//     console.log("Reading rules from backend at:", BACKEND_URL);
//     // const rulesData = await fs.readFile(RULES_FILE_PATH, "utf-8");
//     const rulesData = await fetch(`${BACKEND_URL}/rules`)
//     console.log("Raw rules data:", rulesData);

//     const rules = JSON.parse(rulesData);
//     console.log("Parsed rules:", rules);

//     if (!Array.isArray(rules)) {
//       throw new Error("Rules file is not an array");
//     }

//     const recommendations = new Set();
//     for (const rule of rules) {
//       const antecedents = rule.antecedents || [];
//       const consequents = rule.consequents || [];
//       const confidence = rule.confidence || 0;

//       if (
//         confidence > 0.2 && // Lowered to match new min_confidence
//         antecedents.every((item) => userItems.includes(item))
//       ) {
//         consequents.forEach((item) => recommendations.add(item));
//       }
//     }

//     const recommendationArray = Array.from(recommendations).filter(
//       (item) => !userItems.includes(item)
//     );
//     console.log("Final recommendations:", recommendationArray);
//     return recommendationArray;
//   } catch (error) {
//     console.error("Error in getRecommendations:", error.message);
//     throw new Error(`Failed to generate recommendations: ${error.message}`);
//   }
// }
export async function getRecommendations(userItems) {
  try {
    console.log("Attempting to fetch rules from backend...");
    // Make an HTTP GET request to your FastAPI endpoint
    const response = await fetch(`${BACKEND_URL}/api/rules`);

    // Check if the network request was successful (status code 200-299)
    if (!response.ok) {
      // If not, throw an error with the status
      throw new Error(
        `HTTP error! Status: ${response.status} - ${response.statusText}`
      );
    }

    // Parse the JSON response body into a JavaScript object/array
    const rules = await response.json();
    console.log("Successfully fetched rules:", rules);

    // Basic validation to ensure the fetched data is an array
    if (!Array.isArray(rules)) {
      throw new Error(
        "Rules received from backend are not in the expected array format."
      );
    }

    const recommendations = new Set(); // Use a Set to store unique recommendations

    // Iterate through each rule to find applicable recommendations
    for (const rule of rules) {
      // Safely access antecedents, consequents, and confidence, providing defaults
      const antecedents = rule.antecedents || [];
      const consequents = rule.consequents || [];
      const confidence = rule.confidence || 0;

      // Check if the rule's antecedents are all present in the user's items
      // and if the confidence meets your threshold
      if (
        confidence > 0.2 && // This threshold matches your backend's min_confidence
        antecedents.every((item) => userItems.includes(item))
      ) {
        // Add all consequent items to the recommendations set
        consequents.forEach((item) => recommendations.add(item));
      }
    }

    // Convert the Set to an Array and filter out items already in the user's cart
    const recommendationArray = Array.from(recommendations).filter(
      (item) => !userItems.includes(item)
    );
    console.log("Final generated recommendations:", recommendationArray);
    return recommendationArray;
  } catch (error) {
    // Catch and log any errors during the fetch or processing
    console.error("Error in getRecommendations:", error.message);
    // Re-throw a more user-friendly error
    throw new Error(`Failed to generate recommendations: ${error.message}`);
  }
}
