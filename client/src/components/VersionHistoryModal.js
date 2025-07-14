import React from 'react';
import './VersionHistoryModal.css';

const VersionHistoryModal = ({ isOpen, onClose, fileName = 'Untitled Document' }) => {
  const history = [
    { version: 1, user: 'translator1', timestamp: '2024-06-01 10:00 AM', action: 'Uploaded' },
    { version: 2, user: 'translator1', timestamp: '2024-06-01 11:00 AM', action: 'Edited' },
    { version: 3, user: 'reviewer1', timestamp: '2024-06-02 09:30 AM', action: 'Approved' }
  ];

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <div>
            <h3>Version History</h3>
            <p className="filename">📄 {fileName}</p>
          </div>
          <button onClick={onClose}>✖</button>
        </div>

        <table className="version-table">
          <thead>
            <tr>
              <th>Version</th>
              <th>User</th>
              <th>Timestamp</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {history.map((row, idx) => (
              <tr key={idx}>
                <td>{row.version}</td>
                <td>{row.user}</td>
                <td>{row.timestamp}</td>
                <td>{row.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VersionHistoryModal;
