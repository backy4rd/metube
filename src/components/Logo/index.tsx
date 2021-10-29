import React from 'react';
import { Link } from 'react-router-dom';

import './Logo.css';

function Logo() {
  return (
    <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
      <img src="/favicon.png" alt="" height="32px" style={{ top: -4, position: 'relative' }} />
      <span className="Header__LogoSection-Title">Zoo</span>
    </Link>
  );
}

export default Logo;
