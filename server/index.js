const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, platform, vibe, mode } = req.body; 
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    let systemInstruction = "";

    switch (mode) {
        // --- NEW: AI REPLY MODE ---
        case 'reply':
        systemInstruction = `
        ROLE: Social Media Community Manager for a Tech Brand.
        TASK: Write a reply to the specific user comment below.
        TONE: ${vibe} (Options: Professional, Friendly, Witty, Empathetic).
        CONSTRAINT: Keep it under 280 characters. Do not include hashtags unless necessary.
        CONTEXT: The user is commenting on a post about AI tools.
        
        INPUT COMMENT: "${prompt}"
        `;
        break;

        case 'script':
            systemInstruction = `ROLE: Scriptwriter. TASK: Viral video script (60s). TONE: ${vibe}.`;
            break;
        case 'image':
            systemInstruction = `ROLE: Prompt Engineer. TASK: 3 Midjourney prompts.`;
            break;
        case 'hashtags':
            systemInstruction = `ROLE: SEO Specialist. TASK: High volume hashtags.`;
            break;
        case 'thread':
            systemInstruction = `ROLE: Ghostwriter. TASK: Twitter thread repurposing.`;
            break;
        case 'enhance':
            systemInstruction = `ROLE: Editor. TASK: Improve this prompt for an LLM.`;
            break;
        default:
            systemInstruction = `ROLE: Social Manager. PLATFORM: ${platform}. VIBE: ${vibe}.`;
            case 'translate':
            systemInstruction = `
            ROLE: Expert Translator.
            TASK: Translate the following social media post into ${vibe} (Target Language).
            CONSTRAINT: Keep all emojis, hashtags, and formatting exactly the same. Do not translate proper nouns like "Dino AI".
            INPUT TEXT: "${prompt}"
            `;
            break;
    }

    const result = await model.generateContent(systemInstruction + `\n\nUSER INPUT: "${prompt}"`);
    const response = await result.response;
    const text = response.text();

    res.json({ result: text });

  } catch (error) {
    console.error("❌ ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));