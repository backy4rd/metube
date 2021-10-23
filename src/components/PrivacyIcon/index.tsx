import React from 'react';
import { Tooltip } from '@material-ui/core';
import { PublicRounded, LockRounded, Block } from '@material-ui/icons';

import './PrivacyIcon.css';

interface PrivacyIconProps {
  privacy: 'public' | 'private' | 'blocked';
  className?: string;
  style?: React.CSSProperties;
}

function PrivacyIcon({ privacy, className, style }: PrivacyIconProps) {
  return (
    <div className={`PrivacyIcon ${className || ''}`} style={style}>
      {privacy === 'public' ? (
        <Tooltip title="Công khai">
          <PublicRounded />
        </Tooltip>
      ) : privacy === 'private' ? (
        <Tooltip title="Riêng tư">
          <LockRounded />
        </Tooltip>
      ) : (
        <Tooltip title="Đã bị chặn">
          <Block />
        </Tooltip>
      )}
    </div>
  );
}

export default PrivacyIcon;
