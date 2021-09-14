import React from 'react';
import ReactPlayer from 'react-player';

import './Player.css';

interface PlayerProps {
  videoUrl: string;
}

function Player(props: PlayerProps) {
  return (
    <div className="Player__Container" style={{ backgroundColor: 'black' }}>
      <ReactPlayer
        className="Player"
        url={props.videoUrl}
        controls
        height="100%"
        width="100%"
      ></ReactPlayer>
    </div>
  );
}

export default Player;
