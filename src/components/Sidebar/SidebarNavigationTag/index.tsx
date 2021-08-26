import React from 'react';
import { NavLink } from 'react-router-dom';
import { SvgIconComponent } from '@material-ui/icons';

import './SidebarNavigationTag.css';

interface SidebarNavigationTagProps {
  to: string;
  Icon: SvgIconComponent;
  title: string;
}

function SidebarNavigationTag(props: SidebarNavigationTagProps) {
  return (
    <NavLink className="SidebarTag" to={props.to} exact activeClassName="active">
      <props.Icon className="SidebarTag-Icon" />
      <div className="SidebarTag-Title">{props.title}</div>
    </NavLink>
  );
}

export default SidebarNavigationTag;
