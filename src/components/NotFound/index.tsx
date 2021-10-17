import React from 'react';
import { ErrorOutline, SvgIconComponent } from '@material-ui/icons';

import './NotFound.css';

interface NotFoundProps {
  text?: string;
  Icon?: SvgIconComponent;
  style?: React.CSSProperties;
  horizontal?: boolean;
}

function NotFound({
  text = 'Không tìm thấy dữ liệu tương ứng!',
  Icon = ErrorOutline,
  style,
  horizontal = false,
}: NotFoundProps) {
  return (
    <div className="NotFound" style={style}>
      <div className={`NotFound-Center ${horizontal && 'horizontal'}`}>
        <Icon className="NotFound-Center-Icon" />
        <div className="NotFound-Center-Text">{text}</div>
      </div>
    </div>
  );
}

export default NotFound;
