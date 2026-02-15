// server/check-models.js
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    console.log("Checking available models...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
    // We strictly just want to ping the API, but the SDK doesn't have a simple 'list' method exposed easily in all versions.
    // So we will try a raw fetch to the models endpoint.
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
    const data = await response.json();

    if (data.models) {
        console.log("\n✅ SUCCESS! Here are the models you can use:");
        console.log("---------------------------------------------");
        data.models.forEach(m => {
            // Only show generateContent models
            if (m.supportedGenerationMethods.includes("generateContent")) {
                console.log(`Model Name: "${m.name.replace('models/', '')}"`);
            }
        });
        console.log("---------------------------------------------\n");
        console.log("👉 Copy one of the names above into your server.js file!");
    } else {
        console.error("❌ No models found. Check your API Key permissions.");
        console.log(data);
    }

  } catch (error) {
    console.error("❌ Error fetching models:", error);
  }
}

listModels();