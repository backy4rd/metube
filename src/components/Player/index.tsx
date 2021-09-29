import React from 'react';
import ReactPlayer from 'react-player';
import { useHistory } from 'react-router-dom';

import { useNextVideo } from '@contexts/NextVideoContext';
import IPlaylist from '@interfaces/IPlaylist';

import './Player.css';

interface PlayerProps {
  videoUrl: string;
  playlist?: IPlaylist;
  className?: string;
}

function Player({ className, videoUrl, playlist }: PlayerProps) {
  const history = useHistory();
  const nextVideo = useNextVideo();

  function handleVideoEnded() {
    if (!nextVideo) return;
    const nextVideoUrl = `/watch/${nextVideo.id}` + (playlist ? `/playlist/${playlist.id}` : '');
    history.push(nextVideoUrl);
  }

  return (
    <div className={`PlayerWrapper ${className || ''}`}>
      <ReactPlayer
        className={`Player`}
        url={videoUrl}
        controls
        onEnded={handleVideoEnded}
        width="100%"
        height="100%"
      ></ReactPlayer>
    </div>
  );
}

export default Player;
