import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

import IUser from '@interfaces/IUser';
import { useAuth } from '@contexts/AuthContext';

import './ChannelTabs.css';

interface ChannelTabsProps {
  user: IUser;
}

function ChannelTabs(props: ChannelTabsProps) {
  const { url } = useRouteMatch();
  const { user } = useAuth();

  return (
    <div className="ChannelTabs">
      <NavLink activeClassName="active" className="ChannelTabs-Tab" to={`${url}`} exact>
        VIDEOS
      </NavLink>
      <NavLink activeClassName="active" className="ChannelTabs-Tab" to={`${url}/playlist`}>
        DANH SÁCH PHÁT
      </NavLink>
      <NavLink activeClassName="active" className="ChannelTabs-Tab" to={`${url}/live`}>
        LIVESTREAM
      </NavLink>
      <NavLink activeClassName="active" className="ChannelTabs-Tab" to={`${url}/subscription`}>
        ĐÃ ĐĂNG KÝ
      </NavLink>
      <NavLink activeClassName="active" className="ChannelTabs-Tab" to={`${url}/subscriber`}>
        SUBSCIBERS
      </NavLink>
      <NavLink activeClassName="active" className="ChannelTabs-Tab" to={`${url}/about`}>
        THÔNG TIN
      </NavLink>
      {user && user.username === props.user.username && (
        <NavLink activeClassName="active" className="ChannelTabs-Tab" to={`${url}/devices`}>
          THIẾT BỊ
        </NavLink>
      )}
    </div>
  );
}

export default ChannelTabs;
