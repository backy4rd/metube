import React from 'react';
import { Skeleton } from '@mui/material';

import './StreamPlayerSkeleton.css';

function StreamPlayerSkeleton() {
  return (
    <div className="StreamPlayerSkeleton">
      <Skeleton
        className="StreamPlayerSkeleton-Player"
        variant="rectangular"
        height="100%"
        width="100%"
      />
    </div>
  );
}

export default StreamPlayerSkeleton;
