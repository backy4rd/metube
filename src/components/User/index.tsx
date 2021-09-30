import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@mui/material';

import IUser from '@interfaces/IUser';
import { randomPercentage } from '@utils/number';
import ISkeleton, { isSkeleton } from '@interfaces/ISkeleton';

import SubscribeButton from '@components/SubscribeButton';
import Avatar from '@components/Avatar';

import './User.css';

interface UserProps {
  user: IUser | ISkeleton;
}

function UserSkeleton() {
  const usernameWidth = useMemo(() => randomPercentage(30, 60), []);
  const fullnameWidth = useMemo(() => randomPercentage(30, 60), []);

  return (
    <div className="User">
      <Skeleton variant="circular" height="80px" width="80px" />
      <Skeleton width={usernameWidth} height="20px" />
      <Skeleton width={fullnameWidth} />
      <Skeleton width="50%" height="40px" />
    </div>
  );
}

function User({ user }: UserProps) {
  if (isSkeleton(user)) return <UserSkeleton />;

  return (
    <div className="User">
      <Link to={`/channel/${user.username}`}>
        <Avatar className="User-Avatar" user={user} size="80px" />
      </Link>
      <div className="User-Username">{user.username}</div>
      <div className="User-Fullname">
        ({user.firstName} {user.lastName})
      </div>
      <SubscribeButton className="User-SubscribeButton" targetUser={user} />
    </div>
  );
}

export default User;
