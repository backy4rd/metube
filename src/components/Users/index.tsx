import React from 'react';

import ISkeleton, { isSkeleton } from '@interfaces/ISkeleton';
import IUser from '@interfaces/IUser';

import './Users.css';
import User from '@components/User';

interface UsersProps {
  users: Array<IUser | ISkeleton>;
}

function Users({ users }: UsersProps) {
  return (
    <div className="Users App-UserGrid">
      {users.map((user) => (
        <User key={isSkeleton(user) ? user.bone : user.username} user={user} />
      ))}
    </div>
  );
}

export default Users;
