import React from 'react';
import { Skeleton } from '@mui/material';
import { ExpandMore } from '@material-ui/icons';

import { useAuth } from '@contexts/AuthContext';

import AuthButton from '@components/AuthButton';
import Avatar from '@components/Avatar';
import Popup from '@components/Popup';
import UserPopup from '../UserPopup';

import './UserSection.css';

function UserSectionSkeleton() {
  return (
    <div className="UserSection" style={{ width: 120 }}>
      <Skeleton
        variant="circular"
        height="32px"
        width="32px"
        style={{ marginRight: 4, backgroundColor: 'var(--main-dark-3)' }}
      />
      <Skeleton width="88px" height="32px" style={{ backgroundColor: 'var(--main-dark-3)' }} />
    </div>
  );
}

function UserSection() {
  const { user } = useAuth();

  if (user === undefined) return <UserSectionSkeleton />;
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
    <div className="UserSection" id="UserSection">
      <Avatar className="UserSection-UserIcon" user={user} size="30px" />
      <div className="UserSection-Username">{displayName}</div>
      <ExpandMore className="UserSection-ExpandIcon" />

      <Popup target="UserSection">
        <UserPopup />
      </Popup>
    </div>
  );
}

export default UserSection;
