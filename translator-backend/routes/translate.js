const express = require('express');
const router = express.Router();
const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post('/translate', async (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ message: 'Text is required' });

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro-preview-03-25:generateContent',
      {
        contents: [
          {
            parts: [
              {
                text: `Translate the following English text into formal Telugu:\n\n${text}`
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY
        }
      }
    );

    const output = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No translation returned.';
    res.json({ translation: output });
  } catch (err) {
    console.error('Gemini Translation Error:', err.response?.data || err.message);
    res.status(500).json({ message: 'Gemini translation failed' });
  }
});

module.exports = router;
