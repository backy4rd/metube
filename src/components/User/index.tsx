import React from 'react';
import { Link } from 'react-router-dom';

import IUser from '@interfaces/IUser';
import ISkeleton, { isSkeleton } from '@interfaces/ISkeleton';

import SubscribeButton from '@components/SubscribeButton';
import Avatar from '@components/Avatar';
import UserSkeleton from './UserSkeleton';

import './User.css';

interface UserProps {
  user: IUser | ISkeleton;
  SubscribeButtonReplacement?: React.ReactNode;
}

function User({ user, SubscribeButtonReplacement }: UserProps) {
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
      {SubscribeButtonReplacement ? (
        SubscribeButtonReplacement
      ) : (
        <SubscribeButton className="User-SubscribeButton" targetUser={user} />
      )}
    </div>
  );
}

export default User;
