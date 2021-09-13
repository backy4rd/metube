import React from 'react';
import ReactPlayer from 'react-player';

import './Player.css';

interface PlayerProps {
  videoUrl: string;
}

function Player(props: PlayerProps) {
  return (
    <div className="Player">
      <ReactPlayer url={props.videoUrl} controls width="100%" height="400px"></ReactPlayer>
    </div>
  );
}

export default Player;
