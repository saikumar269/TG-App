import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';


const Sidebar = () => {
  return (
    <aside className="sidebar">
      
      <img
        className="sidebar-logo"
        src="/icons/ts-logo.png"
        alt="TS Logo"
      />
      <h2 className="sidebar-title">Telangana Translator</h2>
      <p className="sidebar-description">Telangana Law Department</p>
      <hr/>
      <ul className="sidebar-menu">
        <li><Link to="/">📊 Dashboard</Link></li>
        <li><Link to="/translator">📝 Translator</Link></li>
        <li><Link to="/library">📂 Library</Link></li>
        <li><Link to="/glossary">📘 Glossary</Link></li>
        <li><Link to="/corrections">🔁 Corrections</Link></li>
        <li><Link to="/chat">🤖 Chat Assistant</Link></li>
      </ul>
      
    </aside>
  );
};

export default Sidebar;
