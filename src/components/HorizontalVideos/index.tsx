import React from 'react';

import IVideo from '@interfaces/IVideo';
import ISkeleton, { isSkeleton } from '@interfaces/ISkeleton';

import HorizontalVideo from '@components/HorizontalVideo';

import './HorizontalVideos.css';

interface HorizontalVideosProps {
  videos: Array<IVideo | ISkeleton>;
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
        <HorizontalVideo
          key={isSkeleton(video) ? video.bone : video.id}
          video={video}
          showWatchTimestamp={showWatchTimestamp}
          extend={extend}
        />
      ))}
    </div>
  );
}

export default HorizontalVideos;
