import React, { useEffect, useLayoutEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useHistory } from 'react-router-dom';
import screenfull, { Screenfull } from 'screenfull';

import { useVideo } from '@contexts/VideoContext';
import { useNextVideo } from '@contexts/NextVideoContext';
import { useSetVideoUrl, useVideoUrl, VideoUrlProvider } from '@contexts/VideoUrlContext';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const videoUrl = useVideoUrl();
  const timeRef = useRef(0);
  const setVideoUrl = useSetVideoUrl();
  const video = useVideo();

  useEffect(() => {
    if (!video) return;
    setVideoUrl(
      video.video1080Path ||
        video.video720Path ||
        video.video480Path ||
        (video.video360Path as string)
    );
    timeRef.current = 0;
  }, [setVideoUrl, video]);

  useEffect(() => {
    const ve = document.querySelector('#Player video') as HTMLVideoElement | undefined;
    ve?.addEventListener('canplay', () => (ve.currentTime = timeRef.current), { once: true });
  }, [videoUrl]);

  function handleVideoEnded() {
    if (!nextVideo) return;
    const nextVideoUrl = `/watch/${nextVideo.id}` + (playlistId ? `/playlist/${playlistId}` : '');
    history.push(nextVideoUrl);
  }

  return (
    <div ref={containerRef} className={`PlayerWrapper ${className || ''}`}>
      <ReactPlayer
        className="Player"
        id="Player"
        url={videoUrl}
        onEnded={handleVideoEnded}
        width="100%"
        height="100%"
      ></ReactPlayer>

      <PlayerControl
        key={videoUrl}
        className="StreamPlayerControl"
        target="#Player video"
        isLive={false}
        timeRef={timeRef}
        handleFullscreenClick={() =>
          (screenfull as Screenfull).toggle(containerRef.current as Element)
        }
      />
    </div>
  );
}

function PlayerWrapper(props: PlayerProps) {
  const video = useVideo();

  if (!video) return <PlayerSkeleton className={props.className} />;
  return (
    <VideoUrlProvider
      videoUrl={
        video.video1080Path ||
        video.video720Path ||
        video.video480Path ||
        (video.video360Path as string)
      }
    >
      <Player {...props} />
    </VideoUrlProvider>
  );
}

export default PlayerWrapper;
