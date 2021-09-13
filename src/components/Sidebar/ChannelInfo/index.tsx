import React from 'react';
import { NavLink } from 'react-router-dom';

import { useAuth } from '@contexts/AuthContext';

import Avatar from '@components/Avatar';

import './ChannelInfo.css';

function ChannelInfo() {
  const { user } = useAuth();

  if (!user) return null;
  return (
    <NavLink className="ChannelInfo" activeClassName="active" to={'/channel/' + user.username}>
      <div className="ChannelInfo__Icon">
        <Avatar user={user} size="32px" />
      </div>
      <div className="ChannelInfo__Detail">
        <div className="ChannelInfo__Detail-Username">{user.username}</div>
        <div className="ChannelInfo__Detail-Subscribers">{user.totalSubscribers} người đăng ký</div>
      </div>
    </NavLink>
  );
}

export default ChannelInfo;
