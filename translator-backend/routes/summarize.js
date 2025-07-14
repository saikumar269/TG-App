const express = require('express');
const router = express.Router();

// Simple summarization mock logic
function basicSummarize(text) {
  if (!text) return '';
  const lines = text.split('.').slice(0, 2);
  return lines.join('. ') + '.';
}

// POST /api/summarize
router.post('/', async (req, res) => {
  const { text } = req.body;

  if (!text || text.length < 10) {
    return res.status(400).json({ message: 'Text too short to summarize' });
  }

  // MOCK summary (replace this with AI later)
  const summary = basicSummarize(text);

  res.json({ summary });
});

module.exports = router;
