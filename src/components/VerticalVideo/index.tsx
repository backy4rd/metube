import React from 'react';
import { Link } from 'react-router-dom';

import { timeDifference } from '@utils/time';
import IVideo from '@interfaces/IVideo';
import ISkeleton, { isSkeleton } from '@interfaces/ISkeleton';

import Avatar from '@components/Avatar';
import VideoThumbnail from '@components/VideoThumbnail';
import VerticalVideoSkeleton from './VerticalVideoSkeleton';

import './VerticalVideo.css';

interface VerticalVideoProps {
  video: IVideo | ISkeleton;
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
