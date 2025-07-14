const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');

router.post('/export-telugu-html-pdf', async (req, res) => {
  try {
    const { teluguHtml, fileName } = req.body;

    if (!teluguHtml || !fileName) {
      return res.status(400).json({ message: 'teluguHtml and fileName are required' });
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox']
    });

    const page = await browser.newPage();

    // Set content with embedded Telugu-friendly styling
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: 'Noto Sans Telugu', sans-serif;
            line-height: 1.8;
            font-size: 16px;
            padding: 40px;
          }
        </style>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu&display=swap" rel="stylesheet">
      </head>
      <body>
        ${teluguHtml}
      </body>
      </html>
    `);

    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    const safeName = fileName.replace(/ /g, '_') + '_telugu.pdf';

    res.setHeader('Content-Disposition', `attachment; filename="${safeName}"`);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } catch (err) {
    console.error('❌ Puppeteer PDF error:', err);
    res.status(500).json({ message: 'Failed to generate Telugu PDF using Puppeteer' });
  }
});

module.exports = router;
