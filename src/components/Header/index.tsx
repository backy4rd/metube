import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Tooltip } from '@mui/material';
import {
  Dehaze,
  Search,
  RadioButtonChecked,
  CloudUpload,
  Close,
  DarkMode,
  LightMode,
} from '@mui/icons-material';

import { useShowSidebar } from '@contexts/ShowSidebarContext';
import { useAuth } from '@contexts/AuthContext';
import { useTheme } from '@contexts/ThemeContext';

import UserSection from './UserSection';
import SearchBar from './SearchBar';
import Logo from '@components/Logo';

import './Header.css';

function Header() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showSidebar, setShowSidebar] = useShowSidebar();
  const isWidthUnder700 = useMediaQuery({ maxWidth: 700 });

  const { user } = useAuth();
  const [theme, setTheme] = useTheme();

  return (
    <div className="Header">
      <div className="Header__LogoSection">
        <Dehaze
          className="HLS-SidebarToggle"
          style={{ marginRight: 10, cursor: 'pointer' }}
          onClick={() => setShowSidebar(!showSidebar)}
        />
        <Logo />
      </div>

      <div className="Header__SearchSection">
        <SearchBar className="Header__SearchSection-SearchBar" />
      </div>

      <div className="Header__UserSection">
        <div className="Header__UserSection-Button">
          {isWidthUnder700 && <Search onClick={() => setShowSearchBar(true)} />}
        </div>

        {user && (
          <Link className="Header__UserSection-Button" to={`/channel/${user.username}/live`}>
            <RadioButtonChecked />
            {!isWidthUnder700 && <div style={{ marginLeft: 2 }}>Go live</div>}
          </Link>
        )}

        <Link className="Header__UserSection-Button" to={'/upload'}>
          <CloudUpload />
          {!isWidthUnder700 && <div style={{ marginLeft: 4 }}>Upload</div>}
        </Link>

        <UserSection />

        <Tooltip title={theme === 'dark' ? 'Nền tối' : 'Nền sáng'}>
          <div
            className="Header__UserSection-Button"
            style={{ marginLeft: 4, marginRight: 0 }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <DarkMode /> : <LightMode />}
          </div>
        </Tooltip>
      </div>

      {showSearchBar && (
        <div className="Header__FixedSearch">
          <SearchBar className="Header__FixedSearch-SearchBar" autoFocus />
          <div className="Header__FixedSearch-Close" onClick={() => setShowSearchBar(false)}>
            <Close />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
