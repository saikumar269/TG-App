import React, { useState } from 'react';
import './Glossary.css';

const Glossary = () => {
  const [glossary, setGlossary] = useState([
    { english: "Constitution", telugu: "రాజ్యాంగం" },
    { english: "Law", telugu: "చట్టం" },
    { english: "Right to Information", telugu: "సమాచారం knowledge హక్కు" }
  ]);

  const handleUploadCSV = () => {
    alert("CSV upload feature triggered (mock).");
    // Here you can trigger file input and handle actual CSV parsing if needed
  };

  return (
    <div className="glossary-container">
    <h2 className="heading">Glossary Management</h2>
      <p className="description">Manage the custom legal glossary to improve translation accuracy</p>

    <div className='bordered-box'>
      <div className="upload-section">
        <h3 className='heading3'>Custom Glossary</h3>
        <button className="upload-btn" onClick={handleUploadCSV}>Upload CSV</button>
      </div>

      <table className="glossary-table">
        <thead>
          <tr>
            <th>English Term</th>
            <th>Telugu Term</th>
          </tr>
        </thead>
        <tbody>
          {glossary.map((term, index) => (
            <tr key={index}>
              <td>{term.english}</td>
              <td>{term.telugu}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Glossary;
