const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');
const { htmlToText } = require('html-to-text');

// Absolute path to font
const teluguFontPath = path.join(__dirname, '../fonts/NotoSansTelugu-Regular.ttf');

router.post('/export-telugu-pdf', async (req, res) => {
  try {
    const { teluguHtml, fileName } = req.body;

    if (!teluguHtml || !fileName) {
      return res.status(400).json({ message: 'teluguHtml and fileName are required' });
    }

    const teluguText = htmlToText(teluguHtml, {
      wordwrap: 130,
      ignoreHref: true,
      ignoreImage: true
    });

    // Check if font exists BEFORE sending headers
    const fontExists = fs.existsSync(teluguFontPath);
    if (!fontExists) {
      return res.status(500).json({ message: 'Telugu font not found. Please place it in /fonts folder.' });
    }

    // Prepare response before writing PDF
    const safeFileName = fileName.replace(/ /g, '_') + '_telugu.pdf';
    res.setHeader('Content-Disposition', `attachment; filename="${safeFileName}"`);
    res.setHeader('Content-Type', 'application/pdf');

    // Create PDF and stream it
    const pdf = new PDFDocument({ margin: 50 });
    pdf.pipe(res);

    // Register font before using
    pdf.registerFont('TeluguFont', teluguFontPath);
    pdf.font('TeluguFont').fontSize(16);

    // Title
    pdf.fontSize(20).font('TeluguFont').text('తెలంగాణ అనువాద పత్రం', { align: 'center' });
    pdf.moveDown(2);

    // Content
    pdf.fontSize(14).text(teluguText || 'తెలుగు విషయము అందుబాటులో లేదు.', {
      lineGap: 6
    });

    // Safely end PDF
    pdf.end();
  } catch (err) {
    console.error('❌ Telugu PDF export error:', err);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Failed to generate Telugu PDF' });
    }
  }
});

module.exports = router;
