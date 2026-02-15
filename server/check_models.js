const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

console.log("🕵️‍♀️ Scanning for available AI models...");

// Use built-in fetch (Node 18+)
fetch(url)
  .then(response => response.json())
  .then(data => {
    if (data.error) {
        console.error("❌ API Error:", data.error.message);
    } else {
        console.log("✅ ACCESS GRANTED! Here are your available models:");
        console.log("------------------------------------------------");
        // Filter for models that support "generateContent"
        const validModels = data.models.filter(m => m.supportedGenerationMethods.includes("generateContent"));
        validModels.forEach(m => {
            console.log(`👉 Name: ${m.name.replace("models/", "")}`);
        });
        console.log("------------------------------------------------");
        console.log("Pick one of the names above for your index.js file!");
    }
  })
  .catch(err => console.error("❌ Network Error:", err));