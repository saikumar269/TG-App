const express = require('express');
const router = express.Router();
const Document = require('../models/Document');
const extractTerms = require('../utils/extractTerms');
const Glossary = require('../models/Glossary');

// GET all documents
router.get('/', async (req, res) => {
  const docs = await Document.find();
  res.json(docs);
});

// GET single document
router.get('/:id', async (req, res) => {
  const doc = await Document.findById(req.params.id);
  res.json(doc);
});

// POST new document
router.post('/', async (req, res) => {
  const newDoc = new Document(req.body);
  await newDoc.save();
  res.json({ message: 'Document created', document: newDoc });
});

// PUT update document (translation or status)
router.put('/:id', async (req, res) => {
  const updated = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ message: 'Updated', document: updated });
});

// POST new document with auto-extracted terms
// This endpoint will create a document and automatically extract terms from the content
router.post('/', async (req, res) => {
  const newDoc = new Document(req.body);
  await newDoc.save();

  // ✨ Auto-extract terms from English content
  const terms = extractTerms(req.body.content);
  const glossaryEntries = terms.map(word => ({
    english: word,
    telugu: '', // To be filled manually later
    source: 'generated'
  }));

  // Avoid duplicates
  for (let entry of glossaryEntries) {
    const exists = await Glossary.findOne({ english: entry.english });
    if (!exists) {
      await Glossary.create(entry);
    }
  }

  res.json({ message: 'Document created', document: newDoc });
});


module.exports = router;
