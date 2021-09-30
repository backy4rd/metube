import React from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@mui/material';

import { timeDifference } from '@utils/time';
import IVideo from '@interfaces/IVideo';
import ISkeleton, { isSkeleton } from '@interfaces/ISkeleton';

import Avatar from '@components/Avatar';
import VideoThumbnail from '@components/VideoThumbnail';

import './VerticalVideo.css';

interface VerticalVideoProps {
  video: IVideo | ISkeleton;
}

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

function VerticalVideo({ video }: VerticalVideoProps) {
  if (isSkeleton(video)) return <VerticalVideoSkeleton />;

  return (
    <Link className="VerticalVideo" to={`/watch/${video.id}`}>
      <VideoThumbnail video={video} />

      <div className="VerticalVideo__Detail">
        <div className="VerticalVideo__Detail-UserIcon">
          <Avatar user={video.uploadedBy} size="40px" />
        </div>
        <div className="VerticalVideo__Detail-Info">
          <div className="VerticalVideo__Detail-Info-Title">{video.title}</div>
          <div className="VerticalVideo__Detail-Info-Username">
            {video.uploadedBy.username} - {timeDifference(new Date(), video.uploadedAt)}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default React.memo(VerticalVideo);
