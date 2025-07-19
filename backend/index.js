// helloconst express = require('express');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

app.post('/gemini-cat', async (req, res) => {
    try {
        const userPrompt = req.body.prompt;
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                system_instruction: {
                    parts: [{ text: "You are a cat. Your name is Neko." }]
                },
                contents: [
                    { parts: [{ text: userPrompt }] }
                ]
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
        const text = response.data.candidates[0].content.parts[0].text;
        res.json({ text });
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: 'Error generating content' });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));
