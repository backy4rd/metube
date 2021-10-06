import React from 'react';
import { Link } from 'react-router-dom';

import IUser from '@interfaces/IUser';

import Avatar from '@components/Avatar';
import SubscribeButton from '@components/SubscribeButton';

import './UserInfo.css';

interface UserInfoProps {
  user: IUser;
}

function UserInfo({ user }: UserInfoProps) {
  return (
    <div className="UserInfo">
      <Link className="UserInfo__Left" to={`/channel/${user.username}`}>
        <Avatar user={user} className="UserInfo__Left-Avatar" />
        <div className="UserInfo__Left-Username">
          {user.username} ({user.firstName} {user.lastName})
        </div>
      </Link>
      <SubscribeButton targetUser={user} />
    </div>
  );
}

export default UserInfo;
