import React from 'react';
import { NavLink } from 'react-router-dom';
import { SvgIconComponent } from '@mui/icons-material';

import './SidebarNavigationTag.css';

interface SidebarNavigationTagProps {
  to: string;
  Icon: SvgIconComponent;
  title: string;
  exact?: boolean;
}

function SidebarNavigationTag({ to, Icon, title, exact = true }: SidebarNavigationTagProps) {
  return (
    <NavLink className="SidebarTag" to={to} exact={exact} activeClassName="active">
      <Icon className="SidebarTag-Icon" />
      <div className="SidebarTag-Title">{title}</div>
    </NavLink>
  );
}

export default SidebarNavigationTag;
