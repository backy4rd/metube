import React from 'react';
import { Edit, Lock, Timeline, HelpOutline } from '@material-ui/icons';

import { useAuth } from '@contexts/AuthContext';

import Avatar from '@components/Avatar';
import UserPopupButton from './UserPopupButton';

import './UserPopup.css';

function UserPopup() {
  const { user, logout } = useAuth();

  if (!user) return null;
  return (
    <div className="UserPopup">
      <div className="UserPopup__Container">
        <Avatar className="UPC-Avatar" user={user} size="90px" />
        <div className="UPC-Name">{user.username}</div>
        <div className="UPC__Buttons">
          <div className="UPC__Buttons-Btn">
            <UserPopupButton Icon={Edit} text="Chỉnh Sửa" to={`/channel/${user.username}/edit`} />
          </div>
          <div className="UPC__Buttons-Btn">
            <UserPopupButton
              Icon={Timeline}
              text="Thống Kê"
              to={`/channel/${user.username}/analyst`}
            />
          </div>
          <div className="UPC__Buttons-Btn">
            <UserPopupButton Icon={Lock} text="Đổi Mật Khẩu" />
          </div>
          <div className="UPC__Buttons-Btn">
            <UserPopupButton Icon={HelpOutline} text="Trợ Giúp" to={`/help`} />
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
