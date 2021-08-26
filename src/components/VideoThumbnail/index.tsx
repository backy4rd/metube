import React from 'react';

import { useVideo } from '@contexts/VideoContext';

import './VideoThumbnail.css';

interface VideoThumbnailProps {
  className?: string;
  children?: React.ReactNode;
}

function VideoThumbnail(props: VideoThumbnailProps) {
  const video = useVideo();

  return (
    <div className={props.className}>
      <div className="VideoThumbnail" style={{ backgroundImage: `url(${video.thumbnailPath})` }}>
        <div className="VideoThumbnail__Wrapper">
          <img key={video.thumbnailPath} src={video.thumbnailPath} alt="" />
          <div></div>
        </div>
      </div>
      {props.children}
    </div>
  );
}

export default VideoThumbnail;
