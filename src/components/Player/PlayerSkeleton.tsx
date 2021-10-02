import React from 'react';
import { Skeleton } from '@mui/material';

import './PlayerSkeleton.css';

function PlayerSkeleton({ className }: { className?: string }) {
  return (
    <div className={'PlayerSkeleton ' + className || ''}>
      <Skeleton
        className="PlayerSkeleton-Player"
        variant="rectangular"
        height="100%"
        width="100%"
      />
    </div>
  );
}

export default PlayerSkeleton;
