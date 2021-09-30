import React from 'react';

import IVideo from '@interfaces/IVideo';
import ISkeleton, { isSkeleton } from '@interfaces/ISkeleton';

import VerticalVideo from '@components/VerticalVideo';

import './VerticalVideos.css';

interface VerticalVideosProps {
  videos: Array<IVideo | ISkeleton>;
}

function VerticalVideos(props: VerticalVideosProps) {
  return (
    <div className="VerticalVideos">
      {props.videos.map((video) => (
        <VerticalVideo key={isSkeleton(video) ? video.bone : video.id} video={video} />
      ))}
    </div>
  );
}

export default VerticalVideos;
