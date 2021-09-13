import React, { useState } from 'react';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

import { useAuth } from '@contexts/AuthContext';

import AuthButton from '@components/AuthButton';
import Avatar from '@components/Avatar';

import './UserSection.css';

function UserSection() {
  const { user, logout } = useAuth();
  const [isExpand, setIsExpand] = useState(false);

  if (user === undefined) return null;
  if (user === null) {
    return (
      <div className="UserSection">
        <AuthButton />
      </div>
    );
  }

  const fullName = `${user.firstName} ${user.lastName}`;
  const displayName = fullName.length > 18 ? user.lastName : fullName;

  return (
    <div
      className="UserSection"
      onMouseEnter={() => setIsExpand(true)}
      onMouseLeave={() => setIsExpand(false)}
    >
      <Avatar className="UserSection-UserIcon" user={user} onClick={logout} size="30px" />
      <div className="UserSection-Username">{displayName}</div>
      {isExpand ? (
        <ExpandLess className="UserSection-ExpandIcon" />
      ) : (
        <ExpandMore className="UserSection-ExpandIcon" />
      )}
    </div>
  );
}

export default UserSection;
