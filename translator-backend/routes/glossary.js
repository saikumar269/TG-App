const express = require('express');
const router = express.Router();
const Glossary = require('../models/Glossary');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

// Storage for uploads
const upload = multer({ dest: 'uploads/' });

// GET all glossary terms
router.get('/', async (req, res) => {
  const terms = await Glossary.find().sort({ english: 1 });
  res.json(terms);
});

// POST single glossary term
router.post('/', async (req, res) => {
  const term = new Glossary(req.body);
  await term.save();
  res.json({ message: 'Glossary term saved', term });
});

// POST glossary CSV upload
router.post('/upload', upload.single('file'), (req, res) => {
  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => {
      if (data.english && data.telugu) {
        results.push({
          english: data.english,
          telugu: data.telugu,
          source: 'upload'
        });
      }
    })
    .on('end', async () => {
      await Glossary.insertMany(results);
      fs.unlinkSync(req.file.path); // Clean temp file
      res.json({ message: 'Glossary uploaded', count: results.length });
    });
});


// GET with optional search query
router.get('/', async (req, res) => {
  const { q, source } = req.query;
  const query = {};

  if (q) {
    query.english = { $regex: q, $options: 'i' }; // case-insensitive search
  }

  if (source) {
    query.source = source;
  }

  const terms = await Glossary.find(query).sort({ english: 1 });
  res.json(terms);
});


module.exports = router;
