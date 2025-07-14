const express = require('express');
const router = express.Router();
const Correction = require('../models/Correction');

// GET all corrections
router.get('/', async (req, res) => {
  const corrections = await Correction.find().sort({ timestamp: -1 });
  res.json(corrections);
});

// POST a new correction
router.post('/', async (req, res) => {
  const correction = new Correction(req.body);
  await correction.save();
  res.json({ message: 'Correction logged', correction });
});

module.exports = router;
