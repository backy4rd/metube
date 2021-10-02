import React, { useMemo } from 'react';
import { Skeleton } from '@mui/material';

import { randomPercentage } from '@utils/number';

function UserSkeleton() {
  const usernameWidth = useMemo(() => randomPercentage(30, 60), []);
  const fullnameWidth = useMemo(() => randomPercentage(30, 60), []);

  return (
    <div className="User">
      <Skeleton variant="circular" height="80px" width="80px" />
      <Skeleton width={usernameWidth} height="20px" />
      <Skeleton width={fullnameWidth} />
      <Skeleton width="50%" height="40px" />
    </div>
  );
}

export default UserSkeleton;
