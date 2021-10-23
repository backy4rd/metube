import React from 'react';

import IVideo from '@interfaces/IVideo';
import ISkeleton, { isSkeleton } from '@interfaces/ISkeleton';

import HorizontalVideo from '@components/HorizontalVideo';

import './HorizontalVideos.css';

interface HorizontalVideosProps {
  videos: Array<IVideo | ISkeleton>;
  showWatchTimestamp?: boolean;
  showReactionTimestamp?: boolean;
  extend?: boolean;
  className?: string;
}

function HorizontalVideos({
  videos,
  showWatchTimestamp = false,
  showReactionTimestamp = false,
  extend = false,
  className = '',
}: HorizontalVideosProps) {
  return (
    <div className={'HorizontalVideos ' + className}>
      {videos.map((video) => (
        <HorizontalVideo
          key={isSkeleton(video) ? video.bone : video.id}
          video={video}
          showWatchTimestamp={showWatchTimestamp}
          showReactionTimestamp={showReactionTimestamp}
          extend={extend}
        />
      ))}
    </div>
  );
}

export default HorizontalVideos;
