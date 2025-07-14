const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
    required: true
  },
  version: Number,
  user: String, // or ObjectId if we add users later
  timestamp: {
    type: Date,
    default: Date.now
  },
  action: {
    type: String,
    enum: ['Uploaded', 'Edited', 'Reviewed', 'Approved'],
    required: true
  }
});

module.exports = mongoose.model('Version', versionSchema);
