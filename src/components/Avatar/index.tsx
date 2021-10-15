import React, { useEffect, useState } from 'react';
import ReactAvatar from 'react-avatar';
import { FileUpload } from '@mui/icons-material';

import IUser from '@interfaces/IUser';
import { usePushMessage } from '@contexts/MessageQueueContext';
import userApi from '@api/userApi';
import { useSetLoading } from '@contexts/LoadingContext';

import './Avatar.css';

interface AvatarProps {
  user: IUser;
  className?: string;
  size?: string;
  onClick?: () => void;
  edit?: boolean;
}

function Avatar({ user, className, onClick, size = '32px', edit = false }: AvatarProps) {
  const [avatar, setAvatar] = useState<File | null | string>(user.avatarPath || user.iconPath);
  const pushMessage = usePushMessage();
  const setLoading = useSetLoading();

  useEffect(() => {
    setAvatar(user.avatarPath || user.iconPath);
  }, [user]);

  async function handleChangeAvatar() {
    if (!(avatar instanceof File)) return;
    try {
      setLoading(true);
      await userApi.updateAvatar(avatar);
      pushMessage('Đã cập nhật ảnh đại diện!');
      window.location.reload();
    } catch {
      pushMessage('Cập nhật ảnh đại diện thất bại!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={'Avatar ' + (className || '')}
      onClick={onClick}
      style={{ height: size, width: size }}
    >
      {!avatar ? (
        <ReactAvatar
          name={user.firstName + ' ' + user.lastName}
          size={size}
          round
          textSizeRatio={3}
        />
      ) : (
        <img
          src={avatar instanceof File ? URL.createObjectURL(avatar) : avatar}
          alt=""
          height={size}
          width={size}
        />
      )}

      {edit && (
        <div className="Avatar-Uploader">
          {!(avatar instanceof File) ? (
            <label style={{ cursor: 'pointer' }}>
              <input
                type="file"
                hidden
                accept="image/png,image/jpg,image/jpeg"
                onChange={(e) => {
                  setAvatar(e.target.files?.[0] || null);
                  pushMessage('Trỏ vào hình đại diện để xác nhận cập nhật!');
                }}
              />
              <FileUpload style={{ fontSize: size }} />
            </label>
          ) : (
            <div className="Avatar-Uploader__Buttons">
              <div className="App-GreenButton" onClick={handleChangeAvatar}>
                Lưu
              </div>
              <div
                className="App-GreyButton"
                onClick={() => setAvatar(user.avatarPath || user.iconPath)}
              >
                Hủy
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Avatar;
