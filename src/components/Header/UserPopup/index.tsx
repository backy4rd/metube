import React from 'react';
import { InfoOutlined, Lock, Timeline, Devices } from '@mui/icons-material';

import { useAuth } from '@contexts/AuthContext';
import { useSetShowAuthForm } from '@contexts/ShowAuthFormContext';

import Avatar from '@components/Avatar';
import UserPopupButton from './UserPopupButton';

import './UserPopup.css';

function UserPopup() {
  const { user, logout } = useAuth();

  const setShowAuthForm = useSetShowAuthForm();

  if (!user) return null;
  return (
    <div className="UserPopup">
      <div className="UserPopup__Container">
        <Avatar className="UPC-Avatar" user={user} size="90px" />
        <div className="UPC-Name">{user.username}</div>
        <div className="UPC__Buttons">
          <div className="UPC__Buttons-Btn">
            <UserPopupButton
              Icon={InfoOutlined}
              text="Kênh của tôi"
              to={`/channel/${user.username}`}
            />
          </div>
          <div className="UPC__Buttons-Btn">
            <UserPopupButton
              Icon={Timeline}
              text="Thống Kê"
              to={`/channel/${user.username}/about`}
            />
          </div>
          <div className="UPC__Buttons-Btn">
            <UserPopupButton
              Icon={Lock}
              text="Đổi Mật Khẩu"
              onClick={() => setShowAuthForm('RESET_PASSWORD')}
            />
          </div>
          <div className="UPC__Buttons-Btn">
            <UserPopupButton
              Icon={Devices}
              text="Thiết bị"
              to={`/channel/${user.username}/devices`}
            />
          </div>
        </div>
      </div>
      <div className="UserPopup-Logout" onClick={logout}>
        Đăng Xuất
      </div>
    </div>
  );
}

export default UserPopup;
