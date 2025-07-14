const express = require('express');
const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const Document = require('../models/Document');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), async (req, res) => {
  const file = req.file;
  let text = '';

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    if (file.mimetype === 'application/pdf') {
      const dataBuffer = fs.readFileSync(file.path);
      const parsed = await pdfParse(dataBuffer);
      text = parsed.text;
    } else if (
      file.mimetype ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const result = await mammoth.extractRawText({ path: file.path });
      text = result.value;
    } else {
      return res.status(400).json({ message: 'Only PDF and DOCX supported' });
    }

    // Create a document entry
    const doc = new Document({
      title: file.originalname,
      content: text,
      translation: '',
      status: 'draft',
    });
    await doc.save();

    fs.unlinkSync(file.path); // cleanup

    res.json({ message: 'Document uploaded & saved', document: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'File processing failed' });
  }
});

module.exports = router;
