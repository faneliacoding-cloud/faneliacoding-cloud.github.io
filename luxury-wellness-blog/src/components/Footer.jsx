import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-col">
          <Link to="/" className="footer-logo">A Better You</Link>
          <p style={{ color: 'rgba(253, 251, 247, 0.7)', maxWidth: '300px' }}>
            A luxury sanctuary for women seeking healing, love, purpose, softness, and God. Join thousands of women growing spiritually, emotionally, and personally.
          </p>
        </div>
        
        <div className="footer-col">
          <h5>Explore</h5>
          <ul className="footer-links">
            <li><Link to="/blog">The Journal</Link></li>
            <li><Link to="#about">About Our Founder</Link></li>
            <li><Link to="#community">Community</Link></li>
            <li><Link to="#testimonials">Stories of Healing</Link></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h5>Connect</h5>
          <ul className="footer-links">
            <li><a href="#instagram">Instagram</a></li>
            <li><a href="#pinterest">Pinterest</a></li>
            <li><a href="#tiktok">TikTok</a></li>
            <li><a href="#youtube">YouTube</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} A Better You. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
