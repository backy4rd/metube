import React from 'react';
import { Skeleton } from '@mui/material';

import './PlayerSkeleton.css';

function PlayerSkeleton() {
  return (
    <div className="PlayerSkeleton">
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
