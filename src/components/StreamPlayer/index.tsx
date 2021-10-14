import React, { useEffect, useRef } from 'react';
import Hls, { HlsConfig } from 'hls.js';
import screenfull, { Screenfull } from 'screenfull';

import IStream from '@interfaces/IStream';

import StreamPlayerSkeleton from './StreamPlayerSkeleton';
import PlayerControl from '@components/PlayerControl';

import './StreamPlayer.css';

interface StreamPlayerProps {
  stream: IStream | null;
  className?: string;
}

const playerConfig: Partial<HlsConfig> = {
  liveSyncDurationCount: 1,
};

function StreamPlayer({ stream, className }: StreamPlayerProps) {
  const playerRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stream || !playerRef.current) return;
    const liveUrl = `${process.env.REACT_APP_LIVE_URL}/${stream?.id}/index.m3u8`;
    const hls = new Hls(playerConfig);
    hls.loadSource(liveUrl);
    hls.attachMedia(playerRef.current);
    hls.on(Hls.Events.ERROR, (event, data) => {
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            if (data.details === 'manifestLoadError') {
              setTimeout(() => hls.loadSource(liveUrl), 5000);
            }
            break;

          default:
            hls.destroy();
        }
      }
    });

    return () => hls.destroy();
  }, [stream]);

  if (!stream) return <StreamPlayerSkeleton />;
  return (
    <div ref={containerRef} className={`StreamPlayerWrapper ${className || ''}`}>
      <video
        ref={playerRef}
        id="StreamPlayer"
        className="StreamPlayer"
        muted
        width="100%"
        height="100%"
      ></video>
      <PlayerControl
        target="#StreamPlayer"
        className="StreamPlayerControl"
        isLive={true}
        handleFullscreenClick={() =>
          (screenfull as Screenfull).toggle(containerRef.current as Element)
        }
      />
    </div>
  );
}

export default StreamPlayer;
