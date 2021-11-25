import useOutsideClick from '@hooks/useOutsiteClick';
import React, { useEffect, useRef, useState } from 'react';
import { Settings } from '@material-ui/icons';

import './PlayerSettings.css';

interface PlayerSettingsProps {
  player: HTMLVideoElement | null;
  style?: React.CSSProperties;
  className?: string;
}

function PlayerSettings({ player, style }: PlayerSettingsProps) {
  const [showSetting, setShowSetting] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const settingRef = useRef<HTMLDivElement>(null);

  useOutsideClick(settingRef, () => setShowSetting(false));

  useEffect(() => {
    if (!player) return;
    player.playbackRate = playbackRate;
  }, [player, playbackRate]);

  return (
    <div
      ref={settingRef}
      className={'PlayerSettings ' + (showSetting ? '' : 'hide')}
      style={style}
      onClick={() => setShowSetting(!showSetting)}
    >
      <Settings style={{ fontSize: 22 }} />

      <div className="PlayerSettings-Menu">
        {[0.5, 0.75, 1, 1.5, 2].map((pbr) => (
          <div
            key={pbr}
            className={playbackRate === pbr ? 'active' : undefined}
            onClick={() => setPlaybackRate(pbr)}
          >
            x{pbr}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayerSettings;
