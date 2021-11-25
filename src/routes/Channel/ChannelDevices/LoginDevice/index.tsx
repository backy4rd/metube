import React from 'react';
import { FaChrome, FaFirefox, FaOpera, FaSafari, FaQuestionCircle } from 'react-icons/fa';
import { Tooltip } from '@mui/material';

import ILoginLog from '@interfaces/ILoginLog';
import { timeDifference } from '@utils/time';

import './LoginDevice.css';

interface LoginDeviceProps {
  device: ILoginLog;
  className?: string;
  handleRemoveDeviceClick?: (device: ILoginLog) => void;
}

function LoginDevice({
  device,
  className = '',
  handleRemoveDeviceClick = () => {},
}: LoginDeviceProps) {
  return (
    <div className={'LoginDevice ' + className}>
      <div className="LoginDevice__Left">
        {device.browser === 'Chrome' ? (
          <Tooltip title="Chrome">
            <FaChrome />
          </Tooltip>
        ) : device.browser === 'Firefox' ? (
          <Tooltip title="Firefox">
            <FaFirefox />
          </Tooltip>
        ) : device.browser === 'Safari' ? (
          <Tooltip title="Safari">
            <FaSafari />
          </Tooltip>
        ) : device.browser === 'Opera' ? (
          <Tooltip title="Opera">
            <FaOpera />
          </Tooltip>
        ) : (
          <Tooltip title="Không xác định">
            <FaQuestionCircle />
          </Tooltip>
        )}
      </div>
      <div className="LoginDevice__Center">
        <div className="LoginDevice__Specifications">
          <div>{device.os}</div>
          {device.device && <div>-</div>}
          {device.device && <div>{device.device}</div>}
          {device.cpu && <div>({device.cpu})</div>}
        </div>
        <div className="LoginDevice__Timestamps">
          <div>Đăng nhập {timeDifference(new Date(), device.loggedInAt)}</div>
          {device.loggedOutAt !== null && <div>(Đã đăng xuất)</div>}
        </div>
      </div>
      <div className="LoginDevice__Right">
        <div
          className="App-RedButton LoginDevice-LogoutButton"
          onClick={() => handleRemoveDeviceClick(device)}
        >
          Xóa thiết bị
        </div>
      </div>
    </div>
  );
}

export default LoginDevice;
