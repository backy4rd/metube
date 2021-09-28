import React from 'react';
import ReactPlayer from 'react-player';

import './Player.css';

interface PlayerProps {
  videoUrl: string;
  className?: string;
}

function Player({ className, videoUrl }: PlayerProps) {
  return (
    <div className={`Player__Container ${className || ''}`} style={{ backgroundColor: 'black' }}>
      <ReactPlayer
        className="Player"
        url={videoUrl}
        controls
        height="100%"
        width="100%"
      ></ReactPlayer>
    </div>
  );
}

export default Player;
