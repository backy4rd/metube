import React, { useEffect, useRef, useState } from 'react';
import { Settings, Check } from '@material-ui/icons';

import useOutsideClick from '@hooks/useOutsiteClick';
import { useVideo } from '@contexts/VideoContext';
import { useSetVideoUrl, useVideoUrl } from '@contexts/VideoUrlContext';

import './PlayerSettings.css';

interface PlayerSettingsProps {
  player: HTMLVideoElement | null;
  style?: React.CSSProperties;
  className?: string;
}

function PlayerSettings({ player, style }: PlayerSettingsProps) {
  const [showSetting, setShowSetting] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const settingRef = useRef<HTMLDivElement>(null);

  const video = useVideo();
  const videoUrl = useVideoUrl();
  const setVideoUrl = useSetVideoUrl();

  useOutsideClick(settingRef, () => setShowSetting(false));

  useEffect(() => {
    if (!player) return;
    player.loop = isLoop;
  }, [player, isLoop]);

  const videoQualities = [
    {
      quality: '1080p',
      url: video?.video1080Path,
    },
    {
      quality: '720p',
      url: video?.video720Path,
    },
    {
      quality: '480p',
      url: video?.video480Path,
    },
    {
      quality: '360p',
      url: video?.video360Path,
    },
  ].filter((q) => q.url);

  return (
    <div
      ref={settingRef}
      className={'PlayerSettings ' + (showSetting ? '' : 'hide')}
      style={style}
      onClick={() => setShowSetting(!showSetting)}
    >
      <Settings style={{ fontSize: 22 }} />

      <div className="PlayerSettings-Menu">
        {videoQualities.map((q) => (
          <div
            key={q.quality}
            className={videoUrl === q.url ? 'active' : undefined}
            onClick={() => setVideoUrl(q.url as string)}
          >
            {q.quality}
          </div>
        ))}

        <div className="PlayerSettings-Menu-Loop" onClick={() => setIsLoop(!isLoop)}>
          <div>Vòng lặp</div>
          {isLoop && <Check style={{ width: 16, height: 16 }} />}
        </div>
      </div>
    </div>
  );
}

export default PlayerSettings;
