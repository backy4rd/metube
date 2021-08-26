import React from 'react';
import { Link } from 'react-router-dom';
import { VisibilityOutlined, Schedule } from '@material-ui/icons';

import { useVideo } from '@contexts/VideoContext';
import { secondToTime, timeDifference } from '@utils/time';
import { numberWithCommas } from '@utils/number';

import VideoThumbnail from '@components/VideoThumbnail';

import './VerticalVideo.css';

function VerticalVideo() {
  const video = useVideo();

  return (
    <Link className="VerticalVideo" to={`/watch/${video.id}`}>
      <VideoThumbnail className="VerticalVideo__Thumbnail">
        <div className="VerticalVideo__Thumbnail-Info">
          <VisibilityOutlined className="VerticalVideo__Thumbnail-Info-ViewIcon" />
          <div className="VerticalVideo__Thumbnail-Info-View">{numberWithCommas(video.views)}</div>
          <Schedule className="VerticalVideo__Thumbnail-Info-ClockIcon" />
          <div className="VerticalVideo__Thumbnail-Info-Duration">
            {secondToTime(video.duration)}
          </div>
        </div>
      </VideoThumbnail>

      <div className="VerticalVideo__Detail">
        <div className="VerticalVideo__Detail-UserIcon">
          <img src={video.uploadedBy.iconPath} alt="" />
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

export default VerticalVideo;
