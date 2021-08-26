import React from 'react';
import { NavLink } from 'react-router-dom';

import IUser from '@interfaces/IUser';

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
      <img className="SidebarUserTag-Icon" src={props.user.iconPath} alt="" />
      <div className="SidebarUserTag-Username">{props.user.username}</div>
    </NavLink>
  );
}

export default SidebarUserTag;
