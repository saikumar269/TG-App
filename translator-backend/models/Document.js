const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: String,
  content: String,
  translation: String,
  category: String,
status: {
  type: String,
  enum: ['draft', 'review', 'approved', 'published'],
  default: 'draft'
},
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Document', documentSchema);
