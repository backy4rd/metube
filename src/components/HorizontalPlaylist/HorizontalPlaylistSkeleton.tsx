import React from 'react';
import { Skeleton } from '@mui/material';

import './HorizontalPlaylistSkeleton.css';

function HorizontalPlaylistSkeleton() {
  return (
    <div className="HorizontalPlaylistSkeleton">
      <Skeleton variant="rectangular" width="60px" height="60px" />
      <div className="HorizontalPlaylistSkeleton__Right">
        <Skeleton width="70%" height="28px" />
        <Skeleton width="30%" height="18px" />
        <Skeleton width="90%" height="18px" />
        <Skeleton width="60%" height="18px" />
      </div>
    </div>
  );
}

export default HorizontalPlaylistSkeleton;
