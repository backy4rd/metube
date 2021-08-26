import React from 'react';

import IVideo from '@interfaces/IVideo';

import { VideoProvider } from '@contexts/VideoContext';
import VerticalVideo from '@components/VerticalVideo';

import './VerticalVideos.css';

interface VerticalVideosProps {
  videos: Array<IVideo>;
}

function VerticalVideos(props: VerticalVideosProps) {
  return (
    <div className="VerticalVideos">
      {props.videos.map((video) => (
        <VideoProvider key={video.id} video={video}>
          <VerticalVideo />
        </VideoProvider>
      ))}
    </div>
  );
}

export default VerticalVideos;
