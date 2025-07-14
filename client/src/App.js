import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Sidebar from './components/SideBar';
import Dashboard from './pages/Dashboard';
import Translator from './pages/Translator';
import UserProfile from './pages/UserProfile';
import DocumentLibrary from './pages/DocumentLibrary';
import Glossary from './pages/Glossary';
import CorrectionsLog from './pages/CorrectionsLog';
import ChatAssistant from './components/ChatAssistant';
import FloatingChat from './components/FloatingChat';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="main-content">
          <Sidebar />
          <div className="page-content">
            <Routes>

              {/* Dashboard - Admin only */}
              <Route
                path="/"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Translator - Translator only */}
              <Route
                path="/translator"
                element={
                  <ProtectedRoute allowedRoles={['translator','admin']}>
                    <Translator />
                  </ProtectedRoute>
                }
              />

              {/* Profile - All roles */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'translator', 'reviewer']}>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />

              {/* Document Library - All roles */}
              <Route
                path="/library"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'translator', 'reviewer']}>
                    <DocumentLibrary />
                  </ProtectedRoute>
                }
              />

              {/* Glossary - Admin only */}
              <Route
                path="/glossary"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Glossary />
                  </ProtectedRoute>
                }
              />

              {/* Corrections - Reviewer + Admin */}
              <Route
                path="/corrections"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'reviewer']}>
                    <CorrectionsLog />
                  </ProtectedRoute>
                }
              />

              {/* AI Assistant page (open if directly accessed) */}
              <Route path="/chat" element={<ChatAssistant />} />

              {/* Unauthorized Route */}
              <Route
                path="/unauthorized"
                element={
                  <h2 style={{ marginLeft: '220px', padding: '30px' }}>
                    🚫 Unauthorized Access
                  </h2>
                }
              />
            </Routes>

            {/* Global floating AI Chat button */}
            <FloatingChat />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
