const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// Translator only route
router.post('/save-draft', protect, authorize('translator'), (req, res) => {
  res.json({ message: 'Draft saved by translator' });
});

// Reviewer only route
router.post('/review-doc', protect, authorize('reviewer'), (req, res) => {
  res.json({ message: 'Document reviewed by reviewer' });
});

// Admin only route
router.delete('/delete-user', protect, authorize('admin'), (req, res) => {
  res.json({ message: 'User deleted by admin' });
});

module.exports = router;
