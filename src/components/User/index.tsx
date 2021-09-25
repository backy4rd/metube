import React from 'react';
import { Link } from 'react-router-dom';

import IUser from '@interfaces/IUser';

import SubscribeButton from '@components/SubscribeButton';
import Avatar from '@components/Avatar';

import './User.css';

interface UserProps {
  user: IUser;
}

function User({ user }: UserProps) {
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
