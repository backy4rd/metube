import React from 'react';
import { Skeleton } from '@mui/material';

import WatchDetailSkeleton from '@components/WatchDetail/WatchDetailSkeleton';

import './WatchSkeleton.css';

function WatchSkeleton() {
  return (
    <div className="WatchSkeleton">
      <div className="WatchSkeleton-PlayerWrapper">
        <Skeleton
          className="WatchSkeleton-Player"
          variant="rectangular"
          height="100%"
          width="100%"
        />
      </div>
      <div className="WatchSkeleton-Other">
        <WatchDetailSkeleton />
      </div>
    </div>
  );
}

export default WatchSkeleton;
