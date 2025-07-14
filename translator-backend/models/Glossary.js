const mongoose = require('mongoose');

const glossarySchema = new mongoose.Schema({
  english: String,
  telugu: String,
  source: {
    type: String,
    enum: ['manual', 'upload', 'generated'],
    default: 'manual'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Glossary', glossarySchema);
