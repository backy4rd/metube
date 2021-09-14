import React from 'react';
import { Link } from 'react-router-dom';

import { useVideo } from '@contexts/VideoContext';
import { timeDifference } from '@utils/time';

import Avatar from '@components/Avatar';
import VideoThumbnail from '@components/VideoThumbnail';

import './VerticalVideo.css';

function VerticalVideo() {
  const video = useVideo();

  return (
    <Link className="VerticalVideo" to={`/watch/${video.id}`}>
      <VideoThumbnail />

      <div className="VerticalVideo__Detail">
        <div className="VerticalVideo__Detail-UserIcon">
          <Avatar user={video.uploadedBy} size="40px" />
        </div>
        <div className="VerticalVideo__Detail-Info">
          <div className="VerticalVideo__Detail-Info-Title">{video.title}</div>
          <div className="VerticalVideo__Detail-Info-Username">
            {video.uploadedBy.username} - {timeDifference(new Date(), new Date(video.uploadedAt))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default React.memo(VerticalVideo);
