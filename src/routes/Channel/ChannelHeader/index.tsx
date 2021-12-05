import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import IUser from '@interfaces/IUser';
import { numberWithCommas } from '@utils/number';
import Avatar from '@components/Avatar';
import { useAuth } from '@contexts/AuthContext';
import SubscribeButton from '@components/SubscribeButton';
import { useSetLoading } from '@contexts/LoadingContext';
import { usePushMessage } from '@contexts/MessageQueueContext';
import { useShowConfirm } from '@contexts/ConfirmContext';
import userApi from '@api/userApi';
import adminApi from '@api/adminApi';
import mediaApi from '@api/mediaApi';

import './ChannelHeader.css';

interface ChannelHeaderProps {
  user: IUser;
}

const defaultBanner =
  'https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v1016-b-01e-ksh6q0x4.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=7aebfd284fa04554a075332af142cdca';

function ChannelHeader({ user }: ChannelHeaderProps) {
  const [banner, setBanner] = useState<File | string | null>(user.bannerPath);
  const [firstName, setFirstName] = useState<string>(user.firstName);
  const [lastName, setLastName] = useState<string>(user.lastName);
  const { user: auth } = useAuth();
  const pushMessage = usePushMessage();
  const setLoading = useSetLoading();
  const { showConfirm } = useShowConfirm();
  const history = useHistory();

  useEffect(() => {
    setBanner(user.bannerPath);
    setFirstName(user.firstName);
    setLastName(user.lastName);
  }, [user]);

  function handleCancelChange() {
    setBanner(user.bannerPath);
    setFirstName(user.firstName);
    setLastName(user.lastName);
  }

  async function handleUpdate() {
    if (firstName === '' || lastName === '') return pushMessage('Tên không hợp lệ!', 'warning');
    try {
      setLoading(true);
      let photo;
      if (banner instanceof File) {
        photo = (await mediaApi.postPhoto(banner)).photo;
      }
      const payload = {
        banner: photo,
        first_name: firstName !== user.firstName ? firstName : undefined,
        last_name: lastName !== user.lastName ? lastName : undefined,
      };
      await userApi.updateUser(payload);
      pushMessage('Đã cập nhật thông tin!');
      window.location.reload();
    } catch {
      pushMessage('Cập nhật không thành công');
    } finally {
      setLoading(false);
    }
  }

  async function handleBlockUser() {
    if (auth?.role !== 'admin') return;
    try {
      setLoading(true);
      await adminApi.modifyUser(user.username, 'ban');
      pushMessage('Đã chặn ' + user.username);
      history.goBack();
    } catch {
      pushMessage('Chặn kênh không thành công!');
    } finally {
      setLoading(false);
    }
  }

  const owner = auth?.username === user.username;
  const bannerUrl = banner instanceof File ? URL.createObjectURL(banner) : banner || defaultBanner;
  const isShowSave =
    banner instanceof File || firstName !== user.firstName || lastName !== user.lastName;
  const isShowUploadBanner = owner && !(banner instanceof File);
  return (
    <div
      className="ChannelHeader"
      style={{
        backgroundImage: `linear-gradient(to right, #0009, #0007, #0000, #0000), url("${bannerUrl}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Avatar className="ChannelHeader-Avatar" user={user} size="96px" edit={owner} />
      <div className="ChannelHeader__Info">
        <div className="CHI__Name">
          <div className="CHI__Name-Username">{user.username}</div>
          <div className="CHI__Name-Fullname">
            {owner ? (
              <>
                (
                <input
                  className="App-TextInput"
                  type="text"
                  placeholder="Họ"
                  value={firstName}
                  size={firstName.length + 2}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  className="App-TextInput"
                  type="text"
                  placeholder="Tên"
                  value={lastName}
                  size={lastName.length + 2}
                  onChange={(e) => setLastName(e.target.value)}
                />
                )
              </>
            ) : (
              `(${user.firstName} ${user.lastName})`
            )}
          </div>
        </div>
        <div className="CHI-Subscribers">
          {numberWithCommas(user.totalSubscribers)} người đăng ký
        </div>
        {owner ? (
          <div className="CHI__Buttons">
            {isShowSave && (
              <>
                <div className="App-GreyButton CHI__Buttons-Cancel" onClick={handleCancelChange}>
                  Hủy
                </div>
                <div className="App-GreenButton CHI__Buttons-Save" onClick={handleUpdate}>
                  Cập nhật
                </div>
              </>
            )}
          </div>
        ) : (
          <SubscribeButton className="CHI-SubscribeButton" targetUser={user} />
        )}
      </div>

      {isShowUploadBanner ? (
        <label>
          <input
            type="file"
            accept="image/png,image/jpg,image/jpeg"
            hidden
            onChange={(e) => setBanner(e.target.files?.[0] || null)}
          />
          <div className="App-GreenButton CHI__Buttons-UploadBanner">Tải Lên Banner...</div>
        </label>
      ) : (
        auth?.role === 'admin' && (
          <div
            className="App-RedButton CHI__Buttons-UploadBanner"
            onClick={() =>
              showConfirm(
                'Tất cả các video, playlist và bình luận có liên quan tới người này sẽ bị ẩn, bạn có muốn chặn người dùng này?',
                handleBlockUser
              )
            }
          >
            Chặn kênh này
          </div>
        )
      )}
    </div>
  );
}

export default ChannelHeader;
