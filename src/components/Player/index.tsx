import React from 'react';
import ReactPlayer from 'react-player';
import { useHistory } from 'react-router-dom';

import IPlaylist from '@interfaces/IPlaylist';
import { useVideo } from '@contexts/VideoContext';
import { useNextVideo } from '@contexts/NextVideoContext';

import PlayerSkeleton from './PlayerSkeleton';

import './Player.css';

interface PlayerProps {
  playlist?: IPlaylist;
  className?: string;
}

function Player({ className, playlist }: PlayerProps) {
  const history = useHistory();
  const nextVideo = useNextVideo();
  const video = useVideo();

  function handleVideoEnded() {
    if (!nextVideo) return;
    const nextVideoUrl = `/watch/${nextVideo.id}` + (playlist ? `/playlist/${playlist.id}` : '');
    history.push(nextVideoUrl);
  }

  if (!video) return <PlayerSkeleton />;
  return (
    <div className={`PlayerWrapper ${className || ''}`}>
      <ReactPlayer
        className={`Player`}
        url={video.videoPath}
        controls
        onEnded={handleVideoEnded}
        width="100%"
        height="100%"
      ></ReactPlayer>
    </div>
  );
}

export default Player;
