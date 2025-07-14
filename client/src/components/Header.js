import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <header className="app-header">
      <div className="user-panel" onClick={() => setDropdownOpen(!dropdownOpen)}>
        <img
          className="avatar"
          src="https://ui-avatars.com/api/?name=T+User&background=007bff&color=fff"
          alt="User"
        />
        {dropdownOpen && (
          <div className="user-dropdown">
            <div onClick={goToProfile}>👤 Profile</div>
            <div onClick={handleLogout}>🔓 Logout</div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
