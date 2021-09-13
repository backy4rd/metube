import React from 'react';

import { useVideo } from '@contexts/VideoContext';

import VideoThumbnail from '@components/VideoThumbnail';

import './HorizontalVideo.css';

function HorizontalVideo() {
  const video = useVideo();

  return (
    <div className="HorizontalVideo">
      <VideoThumbnail></VideoThumbnail>
      {video.title}
    </div>
  );
}

export default HorizontalVideo;
