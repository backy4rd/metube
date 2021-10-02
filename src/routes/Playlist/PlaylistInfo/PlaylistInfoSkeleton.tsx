import React from 'react';
import { Skeleton } from '@mui/material';

import UserSkeleton from '@components/User/UserSkeleton';

import './PlaylistInfoSkeleton.css';

function PlaylistInfoSkeleton({ className }: { className?: string }) {
  return (
    <div className={`PlaylistInfoSkeleton ${className || ''}`}>
      <Skeleton height="16px" width="200px" />
      <Skeleton height="16px" width="120px" />
      <UserSkeleton />
      <div className="PlaylistInfoSkeleton-Inputs">
        <Skeleton height="16px" width="120px" />
        <Skeleton
          className="PlaylistInfoSkeleton-Input"
          variant="rectangular"
          height="30px"
          width="100%"
        />
        <Skeleton height="16px" width="120px" />
        <Skeleton
          className="PlaylistInfoSkeleton-Input"
          variant="rectangular"
          height="100px"
          width="100%"
        />
      </div>
    </div>
  );
}

export default PlaylistInfoSkeleton;
