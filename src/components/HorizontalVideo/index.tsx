import React from 'react';
import { Link } from 'react-router-dom';

import { useVideo } from '@contexts/VideoContext';
import { numberWithCommas } from '@utils/number';

import VideoThumbnail from '@components/VideoThumbnail';

import './HorizontalVideo.css';

function HorizontalVideo() {
  const video = useVideo();

  return (
    <Link to={`/watch/${video.id}`}>
      <div className="HorizontalVideo">
        <VideoThumbnail className="HorizontalVideo__Thumbnail" showViews={false} />
        <div className="HorizontalVideo__Info">
          <div className="HorizontalVideo__Info-Title">{video.title}</div>
          <div className="HorizontalVideo__Info-Views">
            {numberWithCommas(video.views)} lượt xem
          </div>
          <div className="HorizontalVideo__Info-Author">{video.uploadedBy.username}</div>
        </div>
      </div>
    </Link>
  );
}

export default HorizontalVideo;
