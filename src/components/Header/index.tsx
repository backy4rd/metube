import React, { useEffect, useState } from 'react';
import qs from 'query-string';
import { Link, useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Dehaze, Search, RadioButtonChecked, CloudUpload } from '@material-ui/icons';

import { useShowSidebar } from '@contexts/ShowSidebarContext';
import { useAuth } from '@contexts/AuthContext';
import useQuery from '@hooks/useQuery';

import UserSection from './UserSection';

import './Header.css';

function Header() {
  const queryParams = useQuery();
  const [query, setQuery] = useState(queryParams.q || '');

  const [showSidebar, setShowSidebar] = useShowSidebar();
  const isWidthUnder700 = useMediaQuery({ maxWidth: 700 });

  const history = useHistory();
  const { user } = useAuth();

  useEffect(() => {
    setQuery(queryParams.q || '');
  }, [queryParams.q]);

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

      <form
        className="Header__SearchSection"
        onSubmit={(e) => {
          e.preventDefault();
          const _query = { ...queryParams, q: query };
          history.push('/search?' + qs.stringify(_query));
        }}
      >
        <input
          className="Header__SearchSection-SearchBox"
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder="Search video/channel"
        />
        <label>
          <input type="submit" hidden />
          <Search className="Header__SearchSection-SearchIcon" />
        </label>
      </form>

      <div className="Header__UserSection">
        <div className="Header__UserSection-Button">{isWidthUnder700 && <Search />}</div>

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
      </div>
    </div>
  );
}

export default Header;
