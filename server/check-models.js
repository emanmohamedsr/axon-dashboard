import "dotenv/config";

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if (!apiKey) {
  console.error("❌ Error: GOOGLE_GENERATIVE_AI_API_KEY is missing from .env");
  process.exit(1);
}

console.log("Checking available models with API Key...");

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    if (data.error) {
      console.error("❌ Google API Error:", data.error);
    } else {
      console.log("✅ Available Models for your Key:");
      const chatModels = data.models
        .filter(m => m.supportedGenerationMethods.includes("generateContent"))
        .map(m => m.name.replace("models/", ""));

      console.log(chatModels);
    }
  })
  .catch((err) => console.error("❌ Network Error:", err));