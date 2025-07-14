import React from 'react';
import './CorrectionsLog.css';

const CorrectionsLog = () => {
  const corrections = [
    {
      original: "Right to education is a fundamental right.",
      ai: "విద్య హక్కు ఒక ప్రాథమిక హక్కు.",
      corrected: "విద్య పొందే హక్కు ఒక మౌలిక హక్కు."
    },
    {
      original: "Citizens shall have the right to freedom of speech.",
      ai: "పౌరులకు వాక్స్వాతంత్ర్యం హక్కు ఉంటుంది.",
      corrected: "పౌరులు అభివ్యక్తి స్వాతంత్ర్యం పొందుతారు."
    },
  ];

  return (
    <div className="corrections-container">
      <h2 className='heading'>Correction Log (Feedback Tool)</h2>
      <p className='description'>Review of human corrections made to AI translations to improve the model.</p>
      <hr className="dotted-line" />

      <table className="corrections-table">
        <thead>
          <tr>
            <th>Original (English)</th>
            <th>AI Translation (Telugu)</th>
            <th>Human Correction (Telugu)</th>
          </tr>
        </thead>
        <tbody>
          {corrections.map((row, idx) => (
            <tr key={idx}>
              <td>{row.original}</td>
              <td>{row.ai}</td>
              <td>{row.corrected}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CorrectionsLog;
