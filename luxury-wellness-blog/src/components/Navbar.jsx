import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, User, Search } from 'lucide-react';

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">A Better You</Link>
      
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/blog">The Journal</Link>
        <Link to="#about">About</Link>
        <Link to="#community">Community</Link>
        
        <button 
          onClick={toggleDarkMode} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-obsidian)', display: 'flex', alignItems: 'center' }}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-obsidian)', display: 'flex', alignItems: 'center' }}>
          <Search size={20} />
        </button>
        
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-obsidian)', display: 'flex', alignItems: 'center' }}>
          <User size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
