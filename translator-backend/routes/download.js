const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const Document = require('../models/Document');
const path = require('path');
const fs = require('fs');

// Define path to Telugu font
const teluguFontPath = path.join(__dirname, '../fonts/NotoSansTelugu-Regular.ttf');

router.get('/:id/download', async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Document not found' });

    const pdf = new PDFDocument({ margin: 50 });

    const fileName = `${doc.title.replace(/ /g, '_')}_translated.pdf`;
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/pdf');
    pdf.pipe(res);

    // ======= PDF CONTENT START =======

    // Title
    pdf.fontSize(20).font('Helvetica-Bold').text('Telangana Translator - Document Report', {
      align: 'center'
    });
    pdf.moveDown(1.5);

    // File Info
    pdf.fontSize(14).font('Helvetica-Bold').text('📄 Filename: ', { continued: true });
    pdf.font('Helvetica').text(doc.title || 'N/A');

    pdf.font('Helvetica-Bold').text('📌 Status: ', { continued: true });
    pdf.font('Helvetica').text(doc.status || 'draft');
    pdf.moveDown();

    // English Section
    pdf.fontSize(16).font('Helvetica-Bold').text('Original (English)', { underline: true });
    pdf.moveDown(0.5);
    pdf.font('Helvetica').fontSize(12).text(doc.content || 'No English content available.');
    pdf.moveDown(1.5);

    // Telugu Section
    pdf.fontSize(16).font('Helvetica-Bold').text('Translated (Telugu)', { underline: true });
    pdf.moveDown(0.5);

    if (fs.existsSync(teluguFontPath)) {
      // Register and apply Telugu Unicode font
      pdf.registerFont('TeluguFont', teluguFontPath);
      pdf.font('TeluguFont').fontSize(12).text(
        doc.translation || 'No Telugu translation available.',
        { lineGap: 4 }
      );
    } else {
      pdf.font('Helvetica-Oblique').fontSize(12).text('⚠ Telugu font not found in /fonts folder.');
    }

    // ======= PDF CONTENT END =======

    pdf.end();
  } catch (err) {
    console.error('❌ PDF generation error:', err);
    res.status(500).json({ message: 'Failed to generate PDF' });
  }
});

module.exports = router;
