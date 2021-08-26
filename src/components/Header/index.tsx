import React from 'react';
import { Link } from 'react-router-dom';
import { Dehaze, FeaturedVideoOutlined, Search } from '@material-ui/icons';

import { useShowSidebar } from '@contexts/ShowSidebarContext';

import UserSection from './UserSection';

import './Header.css';

function Header() {
  const [showSidebar, setShowSidebar] = useShowSidebar();

  return (
    <div className="Header">
      <div className="Header__LogoSection">
        <Dehaze
          style={{ marginRight: 14, cursor: 'pointer' }}
          onClick={() => setShowSidebar(!showSidebar)}
        />
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <FeaturedVideoOutlined className="Header__LogoSection-Logo" />
          <span className="Header__LogoSection-Title">Index.html</span>
        </Link>
      </div>
      <div className="Header__SearchSection">
        <input
          className="Header__SearchSection-SearchBox"
          type="text"
          placeholder="Search video/channel"
        />
        <Search className="Header__SearchSection-SearchIcon" />
      </div>
      <div className="Header__UserSection">
        <UserSection />
      </div>
    </div>
  );
}

export default Header;
