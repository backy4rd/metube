import React, { useMemo } from 'react';
import { Skeleton } from '@mui/material';

import { randomPercentage } from '@utils/number';

import './HorizontalVideoSkeleton.css';

function HorizontalVideoSkeleton({ extend = false }: { extend?: boolean }) {
  const titleWidth = useMemo(() => randomPercentage(70, 100), []);
  const viewWidth = useMemo(() => randomPercentage(40, 70), []);
  const usernameWidth = useMemo(() => randomPercentage(20, 40), []);
  const description1Width = useMemo(() => randomPercentage(40, 90), []);
  const description2Width = useMemo(() => randomPercentage(40, 90), []);

  return (
    <div className="HorizontalVideoSkeleton">
      <div className="HorizontalVideoSkeleton-Left">
        <div className="HorizontalVideoSkeleton-ThumbnailWrapper">
          <Skeleton className="HorizontalVideoSkeleton-Thumbnail" variant="rectangular" />
        </div>
      </div>

      <div className="HorizontalVideoSkeleton-Right">
        <Skeleton width={titleWidth} height="28px" />
        <Skeleton width={viewWidth} height="16px" />
        <div className="HorizontalVideoSkeleton-User">
          {extend && (
            <Skeleton variant="circular" width={24} height={24} style={{ marginRight: 8 }} />
          )}
          <Skeleton width={usernameWidth} height="16px" />
        </div>
        {extend && <Skeleton width={description1Width} height="16px" />}
        {extend && <Skeleton width={description2Width} height="16px" />}
      </div>
    </div>
  );
}

export default HorizontalVideoSkeleton;
