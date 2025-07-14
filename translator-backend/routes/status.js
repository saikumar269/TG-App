const express = require('express');
const router = express.Router();
const Document = require('../models/Document');
const { protect, authorize } = require('../middleware/auth');

// PUT /api/status/:id → change document status
router.put('/:id', protect, async (req, res) => {
  const { status } = req.body;
  const allowedStatuses = ['draft', 'review', 'approved', 'published'];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const document = await Document.findById(req.params.id);
    if (!document) return res.status(404).json({ message: 'Document not found' });

    // Role-based control (optional, you can customize this)
    const role = req.user.role;
    if (status === 'review' && role !== 'translator') {
      return res.status(403).json({ message: 'Only translators can send for review' });
    }
    if (status === 'approved' && role !== 'reviewer' && role !== 'admin') {
      return res.status(403).json({ message: 'Only reviewers or admin can approve' });
    }
    if (status === 'published' && role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can publish' });
    }

    document.status = status;
    await document.save();

    res.json({ message: `Document marked as '${status}'`, document });
  } catch (err) {
    console.error('Status update failed:', err);
    res.status(500).json({ message: 'Status update failed' });
  }
});

module.exports = router;
