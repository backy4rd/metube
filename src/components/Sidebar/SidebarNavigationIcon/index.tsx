import React from 'react';
import { NavLink } from 'react-router-dom';
import { SvgIconComponent } from '@mui/icons-material';

import './SidebarNavigationIcon.css';

interface SidebarNavigationIconProps {
  to: string;
  Icon: SvgIconComponent;
  title: string;
  exact?: boolean;
}

function SidebarNavigationIcon({ to, Icon, title, exact = true }: SidebarNavigationIconProps) {
  return (
    <NavLink className="SidebarNavigationIcon" to={to} exact={exact} activeClassName="active">
      <Icon className="SidebarNavigationIcon-Icon" />
      <div className="SidebarNavigationIcon-Title">{title}</div>
    </NavLink>
  );
}

export default SidebarNavigationIcon;
