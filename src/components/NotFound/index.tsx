import React from 'react';
import { DescriptionOutlined, SvgIconComponent } from '@material-ui/icons';

import './NotFound.css';

interface NotFoundProps {
  text?: string;
  Icon?: SvgIconComponent;
}

function NotFound({
  text = 'Không tìm thấy dữ liệu tương ứng!',
  Icon = DescriptionOutlined,
}: NotFoundProps) {
  return (
    <div className="NotFound">
      <div className="NotFound-Center">
        <Icon className="NotFound-Center-Icon" />
        <div className="NotFound-Center-Text">{text}</div>
      </div>
    </div>
  );
}

export default NotFound;
