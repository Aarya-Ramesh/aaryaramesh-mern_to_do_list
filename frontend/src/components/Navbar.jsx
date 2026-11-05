import React from 'react';

const Navbar = ({ isOnline }) => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="brand">
          <div className="brand-logo">✓</div>
          <div>
            <h1 className="brand-title">TaskFlow</h1>
            <p className="brand-subtitle">MERN Stack Task Management System</p>
          </div>
        </div>
        <div className="nav-badges">
          <span className="stack-badge">MongoDB</span>
          <span className="stack-badge">Express</span>
          <span className="stack-badge">React</span>
          <span className="stack-badge">Node.js</span>
          <span className="status-pill">
            <span className="status-dot"></span>
            {isOnline ? 'MongoDB Live' : 'Active'}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
