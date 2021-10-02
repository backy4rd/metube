import React, { useMemo } from 'react';
import { Skeleton } from '@mui/material';

import { randomPercentage } from '@utils/number';

function PlaylistVideoSkeleton() {
  const titleWidth = useMemo(() => randomPercentage(40, 100), []);
  const usernameWidth = useMemo(() => randomPercentage(30, 70), []);

  return (
    <div className="PlaylistVideoWrapper">
      <div className="PlaylistVideo-Number"></div>
      <div className="PlaylistVideo">
        <div className="PlaylistVideo-Thumbnail">
          <div style={{ position: 'relative', paddingTop: '56.25%', width: '100%' }}>
            <Skeleton
              variant="rectangular"
              style={{ position: 'absolute', top: 0, left: 0 }}
              width="100%"
              height="100%"
            />
          </div>
        </div>
        <div className="PlaylistVideo__Detail">
          <div className="PlaylistVideo__Detail-Title App-Text2Line">
            <Skeleton height="20px" width={titleWidth} />
          </div>
          <div className="PlaylistVideo__Detail-Username">
            <Skeleton height="16px" width={usernameWidth} />
          </div>
        </div>
      </div>
      <div className="PlaylistVideo-Remove"></div>
    </div>
  );
}

export default PlaylistVideoSkeleton;
