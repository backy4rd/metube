import React, { useRef } from 'react';
import ReactPlayer from 'react-player';
import { useHistory } from 'react-router-dom';
import screenfull, { Screenfull } from 'screenfull';

import { useVideo } from '@contexts/VideoContext';
import { useNextVideo } from '@contexts/NextVideoContext';

import PlayerSkeleton from './PlayerSkeleton';
import PlayerControl from '@components/PlayerControl';

import './Player.css';

interface PlayerProps {
  playlistId?: string;
  className?: string;
}

function Player({ className, playlistId }: PlayerProps) {
  const history = useHistory();
  const nextVideo = useNextVideo();
  const video = useVideo();
  const containerRef = useRef<HTMLDivElement>(null);

  function handleVideoEnded() {
    if (!nextVideo) return;
    const nextVideoUrl = `/watch/${nextVideo.id}` + (playlistId ? `/playlist/${playlistId}` : '');
    history.push(nextVideoUrl);
  }

  if (!video) return <PlayerSkeleton className={className} />;
  return (
    <div ref={containerRef} className={`PlayerWrapper ${className || ''}`}>
      <ReactPlayer
        className="Player"
        id="Player"
        url={video.videoPath}
        onEnded={handleVideoEnded}
        width="100%"
        height="100%"
      ></ReactPlayer>

      <PlayerControl
        key={video.videoPath}
        className="StreamPlayerControl"
        target="#Player video"
        isLive={false}
        handleFullscreenClick={() =>
          (screenfull as Screenfull).toggle(containerRef.current as Element)
        }
      />
    </div>
  );
}

export default Player;
