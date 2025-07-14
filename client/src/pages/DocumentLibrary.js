import React, { useState } from 'react';
import './DocumentLibrary.css';
import VersionHistoryModal from '../components/VersionHistoryModal';

const DocumentLibrary = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');

  const documents = [
    { id: 1, title: 'Land Reform Policy', status: 'Approved', category: 'Legal', date: '2024-06-10' },
    { id: 2, title: 'Water Conservation Act', status: 'In Review', category: 'Environment', date: '2024-06-20' },
    { id: 3, title: 'Education Draft Bill', status: 'Draft', category: 'Education', date: '2024-06-25' }
  ];

  const handleOpenHistory = (fileName) => {
    setSelectedFileName(fileName);
    setModalOpen(true);
  };

  return (
    <div className="library-container">
      <h2 className="heading">Document Library</h2>
      <p className="description">Search, filter, and manage all uploaded documents</p>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map(doc => (
            <tr key={doc.id}>
              <td>{doc.title}</td>
              <td>
                <span className={`status ${doc.status.toLowerCase().replace(' ', '-')}`}>{doc.status}</span>
              </td>
              <td>{doc.category}</td>
              <td>{doc.date}</td>
              <td>
                <button className="btn-sm">Open</button>
                <button className="btn-sm" onClick={() => handleOpenHistory(doc.title)}>History</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <VersionHistoryModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        fileName={selectedFileName}
      />
    </div>
  );
};

export default DocumentLibrary;
