import React from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Dehaze, Search, RadioButtonChecked, CloudUpload } from '@material-ui/icons';

import { useShowSidebar } from '@contexts/ShowSidebarContext';

import UserSection from './UserSection';

import './Header.css';

function Header() {
  const [showSidebar, setShowSidebar] = useShowSidebar();
  const isWidthUnder700 = useMediaQuery({ maxWidth: 700 });

  return (
    <div className="Header">
      <div className="Header__LogoSection">
        <Dehaze
          className="HLS-SidebarToggle"
          style={{ marginRight: 10, cursor: 'pointer' }}
          onClick={() => setShowSidebar(!showSidebar)}
        />
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/favicon.png" alt="" height="32px" />
          <span className="Header__LogoSection-Title">wjbu.z</span>
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
        <div className="Header__UserSection-Button">{isWidthUnder700 && <Search />}</div>

        <div className="Header__UserSection-Button">
          <RadioButtonChecked />
          {!isWidthUnder700 && <div style={{ marginLeft: 2 }}>Go live</div>}
        </div>

        <div className="Header__UserSection-Button">
          <CloudUpload />
          {!isWidthUnder700 && <div style={{ marginLeft: 4 }}>Upload</div>}
        </div>

        <UserSection />
      </div>
    </div>
  );
}

export default Header;
