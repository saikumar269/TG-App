const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');
const Document = require('../models/Document');
const Version = require('../models/Version');

// Middleware: admin only
const adminOnly = [protect, authorize('admin')];

// 📊 GET /api/admin/summary
router.get('/summary', adminOnly, async (req, res) => {
  try {
    const totalDocs = await Document.countDocuments();
    const draft = await Document.countDocuments({ status: 'draft' });
    const review = await Document.countDocuments({ status: 'review' });
    const approved = await Document.countDocuments({ status: 'approved' });
    const published = await Document.countDocuments({ status: 'published' });
    const totalUsers = await User.countDocuments();

    res.json({
      documents: { total: totalDocs, draft, review, approved, published },
      totalUsers
    });
  } catch (err) {
    console.error('Admin summary error:', err);
    res.status(500).json({ message: 'Failed to load admin summary' });
  }
});

// 👥 GET /api/admin/users
router.get('/users', adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error('User fetch error:', err);
    res.status(500).json({ message: 'Failed to load users' });
  }
});

// 🔁 GET /api/admin/logs
router.get('/logs', adminOnly, async (req, res) => {
  try {
    const logs = await Version.find().sort({ timestamp: -1 }).limit(100);
    res.json(logs);
  } catch (err) {
    console.error('Logs fetch error:', err);
    res.status(500).json({ message: 'Failed to load version history' });
  }
});

module.exports = router;
