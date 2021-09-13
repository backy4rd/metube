import React from 'react';
import ReactAvatar from 'react-avatar';

import IUser from '@interfaces/IUser';

import './Avatar.css';

interface AvatarProps {
  user: IUser;
  className?: string;
  size?: string;
  onClick?: () => void;
}

function Avatar({ user, className, onClick, size = '32px' }: AvatarProps) {
  return (
    <div
      className={'Avatar ' + (className || '')}
      onClick={onClick}
      style={{ height: size, width: size }}
    >
      {user.iconPath === null ? (
        <ReactAvatar name={user.firstName + ' ' + user.lastName} size={size} round />
      ) : (
        <img src={user.iconPath} alt="" height={size} width={size} />
      )}
    </div>
  );
}

export default Avatar;
