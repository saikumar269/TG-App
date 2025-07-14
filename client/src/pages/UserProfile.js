import React, { useEffect, useState } from 'react';
import './UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {user.name || '—'}</p>
        <p><strong>Email:</strong> {user.email || '—'}</p>
        <p><strong>Role:</strong> {user.role || '—'}</p>
      </div>
      <button className="logout-btn" onClick={() => {
        localStorage.clear();
        window.location.href = '/login';
      }}>
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
