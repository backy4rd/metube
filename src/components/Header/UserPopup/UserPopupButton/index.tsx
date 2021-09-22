import React from 'react';
import { Link } from 'react-router-dom';

import { SvgIconComponent } from '@material-ui/icons';

import './UserPopupButton.css';

interface UserPopupButtonProps {
  Icon: SvgIconComponent;
  text: string;
  to?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

function UserPopupButton(props: UserPopupButtonProps) {
  const components = (
    <>
      <props.Icon className="UserPopupButton-Icon" />
      <div className="UserPopupButton-Text">{props.text}</div>
    </>
  );

  return props.to ? (
    <Link className="UserPopupButton" to={props.to}>
      {components}
    </Link>
  ) : (
    <div className="UserPopupButton" onClick={props.onClick}>
      {components}
    </div>
  );
}

export default UserPopupButton;
