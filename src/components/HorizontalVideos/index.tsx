import React from 'react';

import IVideo from '@interfaces/IVideo';

import { VideoProvider } from '@contexts/VideoContext';
import HorizontalVideo from '@components/HorizontalVideo';

import './HorizontalVideos.css';

interface HorizontalVideosProps {
  videos: Array<IVideo>;
  showWatchTimestamp?: boolean;
  extend?: boolean;
}

function HorizontalVideos({
  videos,
  showWatchTimestamp = false,
  extend = false,
}: HorizontalVideosProps) {
  return (
    <div className="HorizontalVideos">
      {videos.map((video) => (
        <VideoProvider key={video.id} video={video}>
          <HorizontalVideo showWatchTimestamp={showWatchTimestamp} extend={extend} />
        </VideoProvider>
      ))}
    </div>
  );
}

export default HorizontalVideos;
