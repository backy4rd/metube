import { Skeleton } from '@mui/material';

function VerticalVideoSkeleton() {
  return (
    <div>
      <div style={{ position: 'relative', paddingTop: '56.25%', width: '100%' }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      </div>
      <div style={{ display: 'flex', padding: 16 }}>
        <Skeleton variant="circular" width={40} height={40} style={{ marginRight: 16 }} />
        <div style={{ flexGrow: 1 }}>
          <Skeleton height={30} />
          <Skeleton width="60%" />
        </div>
      </div>
    </div>
  );
}

export default VerticalVideoSkeleton;
