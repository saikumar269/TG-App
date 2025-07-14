const mongoose = require('mongoose');

const correctionSchema = new mongoose.Schema({
  originalText: String,
  aiTranslation: String,
  humanCorrection: String,
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  },
  correctedBy: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Correction', correctionSchema);
