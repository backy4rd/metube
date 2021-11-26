import useOutsideClick from '@hooks/useOutsiteClick';
import React, { useEffect, useRef, useState } from 'react';
import { Settings, Check } from '@material-ui/icons';

import './PlayerSettings.css';

interface PlayerSettingsProps {
  player: HTMLVideoElement | null;
  style?: React.CSSProperties;
  className?: string;
}

function PlayerSettings({ player, style }: PlayerSettingsProps) {
  const [showSetting, setShowSetting] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLoop, setIsLoop] = useState(false);
  const settingRef = useRef<HTMLDivElement>(null);

  useOutsideClick(settingRef, () => setShowSetting(false));

  useEffect(() => {
    if (!player) return;
    player.playbackRate = playbackRate;
  }, [player, playbackRate]);

  useEffect(() => {
    if (!player) return;
    player.loop = isLoop;
  }, [player, isLoop]);

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

        <div className="PlayerSettings-Menu-Loop" onClick={() => setIsLoop(!isLoop)}>
          <div>Vòng lặp</div>
          {isLoop && <Check style={{ width: 16, height: 16 }} />}
        </div>
      </div>
    </div>
  );
}

export default PlayerSettings;
