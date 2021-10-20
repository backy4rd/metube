import React, { useEffect, useState, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import {
  PauseRounded,
  PlayArrowRounded,
  PlayArrow,
  Fullscreen,
  VolumeUpRounded,
  VolumeOffRounded,
} from '@material-ui/icons';
import { Slider } from '@material-ui/core';
import { Stack } from '@mui/material';

import { secondToTime } from '@utils/time';

import ProgressBar from './ProgressBar';

import './PlayerControl.css';

interface PlayerControlProps {
  target: string;
  handleFullscreenClick?: () => any;
  className?: string;
  isLive?: boolean;
}

const assumeLiveDurationOffset = 20;

function PlayerControl({
  target,
  className,
  handleFullscreenClick,
  isLive = false,
}: PlayerControlProps) {
  const [player, setPlayer] = useState<HTMLVideoElement | null>(
    document.querySelector(target) as HTMLVideoElement
  );
  const [showControl, setShowControl] = useState(true);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const [timeline, setTimeline] = useState('');
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const showControlTimeout = useRef<ReturnType<typeof setTimeout>>(NaN as any);

  useEffect(() => {
    const lookingForPlayer = setInterval(() => {
      const p = document.querySelector(target);
      if (p) {
        setPlayer(p as HTMLVideoElement);
        clearInterval(lookingForPlayer);
      }
    }, 10);
    return () => {
      clearInterval(lookingForPlayer);
    };
  }, [target]);

  useEffect(() => {
    if (!player) return;

    player.addEventListener(
      'canplay',
      () => {
        setPlaying(true);
        showControlTimeout.current = setTimeout(() => setShowControl(false), 2000);
      },
      { once: true }
    );
    player.addEventListener('timeupdate', () => {
      const { duration, currentTime } = player;
      if (duration - currentTime < assumeLiveDurationOffset && isLive) setProgress(100);
      else setProgress((currentTime / duration) * 100);
    });
    player.addEventListener('playing', () => setPlaying(true));
    player.addEventListener('pause', () => setPlaying(false));
    player.addEventListener('playing', () => setLoading(false));
    player.addEventListener('waiting', () => setLoading(true));
    player.addEventListener('canplay', () => setLoading(false));
  }, [isLive, player]);

  useEffect(() => {
    if (!player) return;
    const { duration, currentTime } = player;
    if (isLive) {
      if (Number.isNaN(duration)) {
        setTimeline('Offline');
      } else if (duration - currentTime < assumeLiveDurationOffset) {
        setTimeline('🔴 LIVE');
      } else {
        setTimeline('-' + secondToTime(duration - currentTime));
      }
    } else {
      if (Number.isNaN(duration)) {
        setTimeline(secondToTime(0) + ' / ' + secondToTime(0));
      } else {
        setTimeline(secondToTime(currentTime) + ' / ' + secondToTime(duration));
      }
    }
  }, [isLive, player, progress]);

  useEffect(() => {
    if (!player) return;
    if (playing) player.play().catch(() => setPlaying(false));
    else player.pause();
  }, [player, playing]);

  useEffect(() => {
    if (!player) return;
    setIsMuted(volume === 0);
    player.volume = volume / 100;
  }, [player, volume]);

  useEffect(() => {
    if (!player) return;
    player.muted = isMuted;
  }, [player, isMuted]);

  function handleMouseMoveInShadingScreen(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!Number.isNaN(showControlTimeout.current)) clearTimeout(showControlTimeout.current);
    setShowControl(true);
    showControlTimeout.current = setTimeout(() => {
      if (Number.isNaN(showControlTimeout.current)) return;
      setShowControl(false);
      showControlTimeout.current = NaN as any;
    }, 3000);
  }

  return (
    <div
      className={`PlayerControl ${className || ''}`}
      onMouseLeave={() => setShowControl(false)}
      onDoubleClick={handleFullscreenClick}
    >
      <div
        className={`PlayerControl__ShadingScreen ${!playing || loading ? 'active' : ''}`}
        onClick={() => !isMobile && setPlaying(!playing)}
        onMouseMove={handleMouseMoveInShadingScreen}
      >
        {!playing && !loading && <PlayArrow onClick={() => setPlaying(true)} />}
        {loading && <div className="PCSS-Loading"></div>}
      </div>
      <div
        className={`PlayerControl__ControlArea ${showControl ? 'show' : 'hide'}`}
        onMouseMove={() => {
          setShowControl(true);
          if (!Number.isNaN(showControlTimeout.current)) clearTimeout(showControlTimeout.current);
          showControlTimeout.current = NaN as any;
        }}
      >
        <ProgressBar
          className="PCCA-ProgressBar"
          progress={progress}
          onChange={(pg) => {
            if (!player) return;
            player.currentTime = player.duration * (pg / 100);
            // to avoid waiting video to load
            setProgress((player.currentTime / player.duration) * 100);
          }}
        />

        <div className="PCCA__Main">
          {playing ? (
            <PauseRounded onClick={() => setPlaying(false)} />
          ) : (
            <PlayArrowRounded onClick={() => setPlaying(true)} />
          )}
          <Stack spacing={2} direction="row" width="120px" alignItems="center">
            {isMuted ? (
              <VolumeOffRounded onClick={() => setIsMuted(false)} />
            ) : (
              <VolumeUpRounded onClick={() => setIsMuted(true)} />
            )}
            <Slider
              className="PCCA__Main-VolumeSlider"
              defaultValue={100}
              step={1}
              value={volume}
              onChange={(e, v) => setVolume(+v)}
            />
          </Stack>

          <div className="PCCAM-Timeline" style={{ marginLeft: 4 }}>
            {timeline}
          </div>
          <Fullscreen
            style={{ marginLeft: 'auto', marginRight: 0 }}
            onClick={handleFullscreenClick}
          />
        </div>
      </div>
    </div>
  );
}

export default PlayerControl;
