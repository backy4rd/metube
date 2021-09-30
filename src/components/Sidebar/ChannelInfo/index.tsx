import React from 'react';
import { NavLink } from 'react-router-dom';
import { Skeleton } from '@mui/material';

import { useAuth } from '@contexts/AuthContext';

import Avatar from '@components/Avatar';
import SidebarGroup from '../SidebarGroup';

import './ChannelInfo.css';

function ChannelInfoSkeleton() {
  return (
    <SidebarGroup limit={1}>
      <div className="ChannelInfo" style={{ width: '100%' }}>
        <div className="ChannelInfo__Icon">
          <Skeleton variant="circular" height={32} width={32} />
        </div>
        <div className="ChannelInfo__Detail" style={{ width: '100%' }}>
          <Skeleton height={20} width="100%" />
          <Skeleton height={20} width="50%" />
        </div>
      </div>
    </SidebarGroup>
  );
}

function ChannelInfo() {
  const { user } = useAuth();

  if (user === null) return null;
  if (user === undefined) return <ChannelInfoSkeleton />;
  return (
    <SidebarGroup limit={1} showMoreNavigateTo={`/channel/${user.username}/about`}>
      <NavLink className="ChannelInfo" activeClassName="active" to={'/channel/' + user.username}>
        <div className="ChannelInfo__Icon">
          <Avatar user={user} size="32px" />
        </div>
        <div className="ChannelInfo__Detail">
          <div className="ChannelInfo__Detail-Username">{user.username}</div>
          <div className="ChannelInfo__Detail-Subscribers">
            {user.totalSubscribers} người đăng ký
          </div>
        </div>
      </NavLink>
    </SidebarGroup>
  );
}

export default ChannelInfo;
