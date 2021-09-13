import React from 'react';

import IVideo from '@interfaces/IVideo';

import { VideoProvider } from '@contexts/VideoContext';
import HorizontalVideo from '@components/HorizontalVideo';

import './HorizontalVideos.css';

interface HorizontalVideosProps {
  videos: Array<IVideo>;
}

function HorizontalVideos(props: HorizontalVideosProps) {
  return (
    <div className="HorizontalVideos">
      {props.videos.map((video) => (
        <VideoProvider key={video.id} video={video}>
          <HorizontalVideo />
        </VideoProvider>
      ))}
    </div>
  );
}

export default HorizontalVideos;
