const express = require('express');
const router = express.Router();
const Version = require('../models/Version');

// GET all versions for a document
router.get('/:documentId', async (req, res) => {
  const versions = await Version.find({ documentId: req.params.documentId }).sort({ version: -1 });
  res.json(versions);
});

// POST a new version log
router.post('/', async (req, res) => {
  const { documentId, version, user, action } = req.body;

  const newVersion = new Version({
    documentId,
    version,
    user,
    action
  });

  await newVersion.save();
  res.json({ message: 'Version saved', version: newVersion });
});

module.exports = router;
