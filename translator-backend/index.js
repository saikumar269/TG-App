const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ Mongo error:', err));

// Routes
const documentRoutes = require('./routes/documents');
app.use('/api/documents', documentRoutes);

const versionRoutes = require('./routes/versions');
app.use('/api/versions', versionRoutes);

const correctionRoutes = require('./routes/corrections');
app.use('/api/corrections', correctionRoutes);

const glossaryRoutes = require('./routes/glossary');
app.use('/api/glossary', glossaryRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const testRoutes = require('./routes/protectedTest');
app.use('/api/test', testRoutes);

const uploadRoutes = require('./routes/upload');
app.use('/api/upload', uploadRoutes);

const summarizeRoute = require('./routes/summarize');
app.use('/api/summarize', summarizeRoute);

const downloadRoute = require('./routes/download');
app.use('/api/documents', downloadRoute);

const exportTelugu = require('./routes/exportTelugu');
app.use('/api', exportTelugu);

const exportHtmlPdf = require('./routes/exportTeluguHtmlPdf');
app.use('/api', exportHtmlPdf);

const translateRoute = require('./routes/translate');
app.use('/api', translateRoute);

const statusRoutes = require('./routes/status');
app.use('/api/status', statusRoutes);

const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
