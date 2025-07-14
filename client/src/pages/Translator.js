import React, { useState } from 'react';
import './Translator.css';

const Translator = () => {
  const [uploaded, setUploaded] = useState(false);
  const [url, setUrl] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleFetch = () => {
    if (url.trim()) {
      setUploaded(true);
    }
  };

  const handleSave = () => {
    alert('Draft saved!');
  };

  const handleSubmit = () => {
    alert('Submitted for review!');
  };

  const handleDownload = () => {
    alert('📥 Download PDF triggered!');
    // Later: This will call your backend API to generate and download the Telugu PDF
  };

  return (
    <div className="translator-wrapper">
      <h2 className="heading">Document Translator</h2>
      <p className="description">Overview of document translation activities and statistics</p>
      <hr className="dotted-line" />

      {!uploaded ? (
        <div className="uploadd-section">
          <h3>1. Choose Document Source</h3>
          <div className="upload-cards">
            <div className="card upload-card">
              <div className="card-icon">💻</div>
              <div className="card-label">Upload from Local</div>
            </div>
            <div className="card upload-card">
              <div className="card-icon">📁</div>
              <div className="card-label">Google Drive</div>
            </div>
            <div className="card upload-card">
              <div className="card-icon">☁️</div>
              <div className="card-label">Microsoft OneDrive</div>
            </div>
          </div>

          <div className="url-input-row">
            <input
              type="text"
              placeholder="Paste online document link..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button className="fetch-btn" onClick={handleFetch}>Fetch</button>
          </div>
        </div>
      ) : (
        <div className="translation-section">
          <h3>2. Translate & Refine</h3>
          <hr />
          <p className="filename-display">📄 Filename: demo-document.pdf</p>

          <div className="editor-grid">
            <div className="editor-pane">
              <h4>Original (English)</h4>
              <textarea
                readOnly
                value="This is a sample English legal text that needs to be translated accurately into Telugu."
              />
            </div>
            <div className="editor-pane">
              <h4>Translated (Telugu)</h4>
              <textarea
                value={translatedText}
                onChange={(e) => setTranslatedText(e.target.value)}
                placeholder="Type Telugu translation here..."
              />
              <button className="btn summarize">Summarize</button>
            </div>

            <div className="right-buttons">
              <button className="btn save" onClick={handleSave}>Save Draft</button>
              <button className="btn submit" onClick={handleSubmit}>Send for Review</button>
              <button className="btn download" onClick={handleDownload}>Download PDF</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Translator;
