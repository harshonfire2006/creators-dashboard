require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

// --- MIDDLEWARE ---
app.use(cors({
  origin: [
    'http://localhost:5173',                      // For local testing
    'https://creators-dashboard-xi.vercel.app'    // <--- Your LIVE Vercel Domain
  ],
  credentials: true
}));
app.use(bodyParser.json());

// --- 1. GEMINI AI INTEGRATION ---
// Initialize Gemini (Make sure GEMINI_API_KEY is in your .env)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/ai/generate', async (req, res) => {
    const { prompt, mode } = req.body; 

    try {
        // Use the explicit version number
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        let systemPrompt = "";
        if (mode === 'rewrite') systemPrompt = "Rewrite the following social media post to be more engaging, viral, and professional. Keep the meaning the same but upgrade the tone: ";
        if (mode === 'translate') systemPrompt = "Translate the following social media post to the requested language. Keep the tone natural and authentic to that language: ";
        if (mode === 'ideas') systemPrompt = "Generate 3 creative social media post ideas based on this topic: ";

        const result = await model.generateContent(systemPrompt + prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ success: true, result: text });
    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ error: "AI Processing Failed. Check server logs." });
    }
});

// --- 2. LINKEDIN INTEGRATION ---
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:5000/auth/linkedin/callback';

// Login Route
app.get('/auth/linkedin', (req, res) => {
    const scope = 'w_member_social r_liteprofile'; 
    const state = 'random_security_string'; 
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${state}&scope=${scope}`;
    res.redirect(authUrl);
});

// Callback Route
app.get('/auth/linkedin/callback', async (req, res) => {
    const { code } = req.query;
    if (!code) return res.status(400).send('No code returned from LinkedIn');

    try {
        const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
            params: {
                grant_type: 'authorization_code',
                code,
                redirect_uri: REDIRECT_URI,
                client_id: LINKEDIN_CLIENT_ID,
                client_secret: LINKEDIN_CLIENT_SECRET,
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const accessToken = tokenResponse.data.access_token;

        const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        const userUrn = `urn:li:person:${profileResponse.data.id}`;
        
        // Redirect back to React with the token
        res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/compose?token=${accessToken}&urn=${userUrn}`);

    } catch (error) {
        console.error('LinkedIn Auth Error:', error.response?.data || error.message);
        res.status(500).send('Authentication Failed');
    }
});

// Post Route
app.post('/api/linkedin/post', async (req, res) => {
    const { text, accessToken, userUrn } = req.body;

    if (!text || !accessToken || !userUrn) {
        return res.status(400).json({ error: 'Missing required fields (Token/URN/Text)' });
    }

    try {
        const body = {
            author: userUrn,
            lifecycleState: 'PUBLISHED',
            specificContent: {
                'com.linkedin.ugc.ShareContent': {
                    shareCommentary: { text: text },
                    shareMediaCategory: 'NONE'
                }
            },
            visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' }
        };

        const response = await axios.post('https://api.linkedin.com/v2/ugcPosts', body, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'X-Restli-Protocol-Version': '2.0.0',
            }
        });

        res.json({ success: true, data: response.data });

    } catch (error) {
        console.error('Posting Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to post to LinkedIn' });
    }
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));