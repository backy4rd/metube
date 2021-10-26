import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { TextareaAutosize } from '@material-ui/core';

import IVideo from '@interfaces/IVideo';
import ICategory from '@interfaces/ICategory';
import videoApi from '@api/videoApi';
import { useAuth } from '@contexts/AuthContext';
import { useVideo } from '@contexts/VideoContext';
import { useSetLoading } from '@contexts/LoadingContext';
import { usePushMessage } from '@contexts/MessageQueueContext';

import EllipsisText from '@components/EllipsisText';
import Categories from '@components/Categories';
import WatchStatistic from '@components/WatchStatistic';
import ActionPopup from '@components/WatchStatistic/ActionPopup';
import PrivacyIcon from '@components/PrivacyIcon';
import CategoriesSelector from '@components/CategorySelector';
import WatchDetailSkeleton from './WatchDetailSkeleton';
import UserInfo from './UserInfo';

import './WatchDetail.css';

function WatchDetailBody({ video }: { video: IVideo }) {
  const [title, setTitle] = useState(video.title);
  const [categories, setCategories] = useState<Array<ICategory>>(video.categories);
  const [description, setDescription] = useState<string>(video.description || '');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [privacy, setPrivacy] = useState<'public' | 'private'>(video.privacy.name);
  const [editing, setEditing] = useState(false);

  const { user } = useAuth();
  const setLoading = useSetLoading();
  const pushMessage = usePushMessage();

  useEffect(() => {
    setTitle(video.title);
    setDescription(video.description || '');
    setCategories(video.categories);
    setThumbnail(null);
    setEditing(false);
  }, [video]);

  function handleDiscardEditing() {
    setTitle(video.title);
    setDescription(video.description || '');
    setCategories(video.categories);
    setThumbnail(null);
    setEditing(false);
  }

  async function handleSaveChange() {
    try {
      setLoading(true);
      if (title.trim() === '') throw new Error();
      await videoApi.updateVideo(video.id, {
        title: title.trim(),
        description: description,
        categories: categories.map((c) => c.category).join(','),
        thumbnail: thumbnail || undefined,
        privacy: privacy,
      });
      video.title = title.trim();
      video.description = description;
      video.categories = categories;
      video.privacy.name = privacy;
      setEditing(false);
      pushMessage('Cập nhật Video thành công!');
    } catch {
      pushMessage('Cập nhật Video không thành công!', 'error');
    } finally {
      setLoading(false);
    }
  }

  function processPath(category: ICategory): string {
    const query = {
      category: category.category,
    };
    return '/?' + queryString.stringify(query);
  }

  const uploadedAt = video.uploadedAt.toLocaleString('vi').replace(',', '');
  const isOwner = user && user.username === video.uploadedBy.username;

  return (
    <div className="WatchDetail">
      <div className="WatchDetail__Info">
        <div className="WatchDetail__Info__Title">
          {editing ? (
            <>
              <input
                type="text"
                className="App-TextInput WDIT-Text"
                placeholder="Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <select
                className="App-TextInput"
                style={{ marginLeft: 4 }}
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value as 'private' | 'public')}
              >
                <option value="public">Công khai</option>
                <option value="private">Riêng tư</option>
              </select>
            </>
          ) : (
            <>
              <div className="WDIT-Text">{video.title}</div>
              {video.isBlocked ? (
                <div style={{ color: 'var(--main-red-1)', fontStyle: 'italic' }}>ĐÃ BỊ CHẶN</div>
              ) : (
                <PrivacyIcon privacy={privacy} style={{ marginLeft: 4 }} />
              )}
            </>
          )}
        </div>
        <div className="WatchDetail__Info-UploadedAt">Đã đăng vào {uploadedAt}</div>
      </div>

      <UserInfo user={video.uploadedBy} />

      <div className="WatchDetail__StatisticAndAction">
        <WatchStatistic video={video} />

        <div className="WDSAA__Actions">
          {isOwner &&
            (editing ? (
              <>
                <div className="WDSAA__Actions-Item App-GreenButton" onClick={handleSaveChange}>
                  Lưu Thay Đổi
                </div>
                <div className="WDSAA__Actions-Item App-GreyButton" onClick={handleDiscardEditing}>
                  Hủy
                </div>
              </>
            ) : (
              <div className="WDSAA__Actions-Item App-GreenButton" onClick={() => setEditing(true)}>
                Chỉnh Sửa Video
              </div>
            ))}

          <ActionPopup target="WDSAA-Actions" />
        </div>
      </div>

      {editing && (
        <div className="WatchDetail-ThumbnailUpload">
          <label className="App-GreenButton">
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            />
            <div style={{ cursor: 'pointer' }}>
              {thumbnail ? thumbnail.name.slice(0, 30) : 'Đổi Thumbnail...'}
            </div>
          </label>
          {thumbnail && (
            <div className="App-GreyButton" onClick={() => setThumbnail(null)}>
              Bỏ
            </div>
          )}
        </div>
      )}

      <div className="WatchDetail__Description">
        {editing ? (
          <TextareaAutosize
            className="App-TextInput"
            placeholder="Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <EllipsisText
            text={video.description || ''}
            lines={5}
            ellipsis={<div className="SidebarGroup-Toggle">show more »</div>}
          />
        )}
      </div>
      <div className="WatchDetail__Categories">
        {editing ? (
          <CategoriesSelector categories={categories} setCategories={setCategories} />
        ) : (
          <Categories categories={video.categories} processPath={processPath} />
        )}
      </div>
    </div>
  );
}

function WatchDetail() {
  const video = useVideo();

  if (video === null) return null;
  if (video === undefined) return <WatchDetailSkeleton />;
  return <WatchDetailBody video={video} />;
}

export default WatchDetail;
