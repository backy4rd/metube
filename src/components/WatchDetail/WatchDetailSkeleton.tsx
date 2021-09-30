import React, { useMemo } from 'react';
import { Skeleton } from '@mui/material';

import { randomPercentage } from '@utils/number';

import './WatchDetailSkeleton.css';

function WatchDetailSkeleton() {
  const titleWidth = useMemo(() => randomPercentage(60, 100), []);
  const description1Width = useMemo(() => randomPercentage(10, 80), []);
  const description2Width = useMemo(() => randomPercentage(10, 80), []);
  const description3Width = useMemo(() => randomPercentage(10, 80), []);

  return (
    <div className="WatchDetailSkeleton">
      <div>
        <Skeleton width={titleWidth} height="34px" />
        <Skeleton width="120px" height="16px" />
      </div>
      <div className="WDK-User">
        <Skeleton variant="circular" height="32px" width="32px" style={{ marginRight: 4 }} />
        <Skeleton width="100px" height="16px" />
      </div>
      <div>
        <Skeleton width="200px" height="40px" />
      </div>
      <div className="WDK-Description">
        <Skeleton height="16px" width={description1Width} style={{ marginBottom: 4 }} />
        <Skeleton height="16px" width={description2Width} style={{ marginBottom: 4 }} />
        <Skeleton height="16px" width={description3Width} style={{ marginBottom: 4 }} />
      </div>
      <div className="WDK-Categories">
        <Skeleton height="36px" width="80px" />
        <Skeleton height="36px" width="80px" />
        <Skeleton height="36px" width="80px" />
      </div>
    </div>
  );
}

export default WatchDetailSkeleton;
