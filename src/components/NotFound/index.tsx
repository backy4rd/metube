import React from 'react';
import { ErrorOutline, SvgIconComponent } from '@material-ui/icons';

import './NotFound.css';

interface NotFoundProps {
  text?: string;
  Icon?: SvgIconComponent;
  style?: React.CSSProperties;
}

function NotFound({
  text = 'Không tìm thấy dữ liệu tương ứng!',
  Icon = ErrorOutline,
  style,
}: NotFoundProps) {
  return (
    <div className="NotFound" style={style}>
      <div className="NotFound-Center">
        <Icon className="NotFound-Center-Icon" />
        <div className="NotFound-Center-Text">{text}</div>
      </div>
    </div>
  );
}

export default NotFound;
