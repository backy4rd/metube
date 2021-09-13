import React from 'react';
import { NavLink } from 'react-router-dom';

import IUser from '@interfaces/IUser';

import Avatar from '@components/Avatar';

import './SidebarUserTag.css';

interface SidebarUserTagProps {
  user: IUser;
}

function SidebarUserTag(props: SidebarUserTagProps) {
  return (
    <NavLink
      className="SidebarUserTag"
      activeClassName="active"
      to={`/channel/${props.user.username}`}
    >
      <Avatar className="SidebarUserTag-Icon" user={props.user} size="32px" />
      <div className="SidebarUserTag-Username">{props.user.username}</div>
    </NavLink>
  );
}

export default SidebarUserTag;
