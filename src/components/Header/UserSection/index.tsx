import React, { useState } from 'react';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

import { useAuth } from '@contexts/AuthContext';

import AuthButton from '@components/AuthButton';

import './UserSection.css';

function UserSection() {
  const { user, logout } = useAuth();
  const [isExpand, setIsExpand] = useState(false);

  if (user === null) {
    return (
      <div className="UserSection">
        <AuthButton />
      </div>
    );
  }

  return (
    <div
      className="UserSection"
      onMouseEnter={() => setIsExpand(true)}
      onMouseLeave={() => setIsExpand(false)}
    >
      <img
        className="UserSection-UserIcon"
        src={user.iconPath}
        alt="Logout"
        title="Logout"
        onClick={logout}
      />
      <div className="UserSection-Username">
        {user.firstName} {user.lastName}
      </div>
      {isExpand ? (
        <ExpandLess className="UserSection-ExpandIcon" />
      ) : (
        <ExpandMore className="UserSection-ExpandIcon" />
      )}
    </div>
  );
}

export default UserSection;
