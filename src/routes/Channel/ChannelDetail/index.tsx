import React, { useEffect, useState } from 'react';
import { Skeleton, TextareaAutosize } from '@mui/material';

import IUser, { IUserStatistic } from '@interfaces/IUser';
import userApi from '@api/userApi';
import { numberWithCommas } from '@utils/number';
import { usePushMessage } from '@contexts/MessageQueueContext';
import { useSetLoading } from '@contexts/LoadingContext';
import { useAuth } from '@contexts/AuthContext';

import EllipsisText from '@components/EllipsisText';

import './ChannelDetail.css';

interface ChannelDetailProps {
  user: IUser;
}

function ChannelDetail({ user }: ChannelDetailProps) {
  const [statistic, setStatistic] = useState<IUserStatistic | null>(null);
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState(user.description || '');

  const pushMessage = usePushMessage();
  const setLoading = useSetLoading();
  const { user: auth } = useAuth();

  useEffect(() => {
    setDescription(user.description || '');
  }, [editing, user]);

  useEffect(() => {
    userApi.getUserStatistic(user.username).then(setStatistic);
  }, [user]);

  async function handleUpdateInfo() {
    if (description === '') return;
    try {
      setLoading(true);
      await userApi.updateUser({ description: description });
      pushMessage('Đã cập nhật thông tin!');
      setEditing(false);
      user.description = description;
    } catch {
      pushMessage('Cập nhật thông tin không thành công!', 'error');
    } finally {
      setLoading(false);
    }
  }

  const owner = auth?.username === user.username;

  return (
    <div className="ChannelDetail">
      <div className="ChannelDetail__Left">
        {owner && (
          <div className="ChannelDetail__Left-Buttons">
            {editing ? (
              <>
                <div className="App-GreenButton CDLB-Button" onClick={handleUpdateInfo}>
                  Cập nhật
                </div>
                <div className="App-GreyButton CDLB-Button" onClick={() => setEditing(false)}>
                  Hủy
                </div>
              </>
            ) : (
              <div className="App-GreenButton CDLB-Button" onClick={() => setEditing(true)}>
                Chỉnh sửa
              </div>
            )}
          </div>
        )}
        {editing ? (
          <TextareaAutosize
            className="App-TextInput ChannelDetail__Left-Description"
            placeholder="Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <EllipsisText text={description} lines={1e5} ellipsis={<></>} />
        )}
      </div>
      <div className="ChannelDetail__Right">
        <div style={{ fontSize: 15, padding: '0 0 12px 0' }}>Tổng Quan:</div>
        <div className="ChannelDetail__Right-Item">
          Đã tham gia: {user.joinedAt.toLocaleString('vi').replace(',', '')}
        </div>
        {statistic ? (
          <div className="ChannelDetail__Right-Item">
            Tổng lượt xem: {numberWithCommas(statistic.totalViews)} lượt.
          </div>
        ) : (
          <Skeleton className="ChannelDetail__Right-Item" height="18px" />
        )}
        {statistic ? (
          <div className="ChannelDetail__Right-Item">
            Video đã đăng tải: {numberWithCommas(statistic.totalVideos)} video.
          </div>
        ) : (
          <Skeleton className="ChannelDetail__Right-Item" height="18px" />
        )}
        {statistic ? (
          <div className="ChannelDetail__Right-Item">
            Đã bình luận: {numberWithCommas(statistic.totalCommentLikes)} bình luận.
          </div>
        ) : (
          <Skeleton className="ChannelDetail__Right-Item" height="18px" />
        )}
        {statistic ? (
          <div className="ChannelDetail__Right-Item">
            Tổng lượt like:{' '}
            {numberWithCommas(statistic.totalVideoLikes + statistic.totalCommentLikes)} lượt.
          </div>
        ) : (
          <Skeleton className="ChannelDetail__Right-Item" height="18px" />
        )}
        {statistic ? (
          <div className="ChannelDetail__Right-Item">
            Tổng lượt dislike:{' '}
            {numberWithCommas(statistic.totalVideoDislikes + statistic.totalCommentDislikes)} lượt.
          </div>
        ) : (
          <Skeleton className="ChannelDetail__Right-Item" height="18px" />
        )}
        {statistic ? (
          <div className="ChannelDetail__Right-Item">
            Đã đăng ký: {numberWithCommas(statistic.totalSubscriptions)} kênh.
          </div>
        ) : (
          <Skeleton className="ChannelDetail__Right-Item" height="18px" />
        )}
        <div className="ChannelDetail__Right-Item">
          Subscribers: {numberWithCommas(user.totalSubscribers)} người.
        </div>
      </div>
    </div>
  );
}

export default ChannelDetail;
