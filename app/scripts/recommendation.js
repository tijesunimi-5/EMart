// const BACKEND_URL = "https://emart-apriori-algorithm.onrender.com";

// export async function getRecommendations(userItems) {
//   try {
//     console.log("Attempting to fetch rules from backend...");
//     const response = await fetch(`${BACKEND_URL}/api/rules`);

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(
//         `HTTP error! Status: ${response.status} - ${
//           errorText || response.statusText
//         }`
//       );
//     }

//     const data = await response.json();
//     console.log("Raw response data:", data);

//     let rules = [];
//     if (Array.isArray(data)) {
//       rules = data; // If response is an array
//     } else if (data && typeof data === "object") {
//       rules = [data]; // If response is a single object, wrap it in an array
//     } else {
//       console.warn("Unexpected response format:", data);
//       return [];
//     }

//     const recommendations = new Set();
//     for (const rule of rules) {
//       const antecedents = rule.antecedents || [];
//       const consequents = rule.consequents || [];
//       const confidence = rule.confidence || 0;

//       if (
//         confidence > 0.2 &&
//         antecedents.every((item) => userItems.includes(item))
//       ) {
//         consequents.forEach((item) => recommendations.add(item));
//       }
//     }

//     const recommendationArray = Array.from(recommendations).filter(
//       (item) => !userItems.includes(item)
//     );
//     console.log("Final generated recommendations:", recommendationArray);
//     return recommendationArray;
//   } catch (error) {
//     console.error("Error in getRecommendations:", error.message, error);
//     return [];
//   }
// }
const BACKEND_URL = "https://emart-apriori-algorithm.onrender.com";

export async function getRecommendations(userItems) {
  try {
    console.log("Attempting to fetch rules from backend...");
    // const response = await fetch(`${BACKEND_URL}/api/rules`);
    const response = await fetch(`http://127.0.0.1:8000/api/rules`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status} - ${
          errorText || response.statusText
        }`
      );
    }

    const data = await response.json();
    console.log("Raw response data:", data);

    let rules = [];
    if (Array.isArray(data)) {
      rules = data; // If response is an array
    } else if (data && typeof data === "object") {
      rules = [data]; // If response is a single object, wrap it in an array
    } else {
      console.warn("Unexpected response format:", data);
      return [];
    }

    const recommendations = new Set();
    for (const rule of rules) {
      const antecedents = rule.antecedents || [];
      const consequents = rule.consequents || [];
      const confidence = rule.confidence || 0;

      if (
        confidence > 0.2 &&
        antecedents.every((item) => userItems.includes(item))
      ) {
        consequents.forEach((item) => recommendations.add(item));
      }
    }

    const recommendationArray = Array.from(recommendations).filter(
      (item) => !userItems.includes(item)
    );
    console.log("Final generated recommendations:", recommendationArray);
    return recommendationArray;
  } catch (error) {
    console.error("Error in getRecommendations:", error.message, error);
    return [];
  }
}