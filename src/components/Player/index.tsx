import React from 'react';
import ReactPlayer from 'react-player';

import './Player.css';

interface PlayerProps {
  videoUrl: string;
  className?: string;
}

function Player({ className, videoUrl }: PlayerProps) {
  return (
    <div className={`PlayerWrapper ${className || ''}`}>
      <ReactPlayer
        className={`Player`}
        url={videoUrl}
        controls
        width="100%"
        height="100%"
      ></ReactPlayer>
    </div>
  );
}

export default Player;
