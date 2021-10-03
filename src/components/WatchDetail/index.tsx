import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { TextareaAutosize } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

import IVideo from '@interfaces/IVideo';
import ICategory from '@interfaces/ICategory';
import videoApi from '@api/videoApi';
import { useAuth } from '@contexts/AuthContext';
import { useVideo } from '@contexts/VideoContext';
import { useSetLoading } from '@contexts/LoadingContext';
import { usePushMessage } from '@contexts/MessageQueueContext';
import { useCategories } from '@contexts/CategoriesContext';

import Avatar from '@components/Avatar';
import SubscribeButton from '@components/SubscribeButton';
import EllipsisText from '@components/EllipsisText';
import Categories from '@components/Categories';
import WatchStatistic from '@components/WatchStatistic';
import ActionPopup from '@components/WatchStatistic/ActionPopup';
import WatchDetailSkeleton from './WatchDetailSkeleton';

import './WatchDetail.css';

function WatchDetailBody({ video }: { video: IVideo }) {
  const [title, setTitle] = useState(video.title);
  const [categories, setCategories] = useState<Array<ICategory>>(video.categories);
  const [description, setDescription] = useState<string>(video.description || '');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [editing, setEditing] = useState(false);

  const { user } = useAuth();
  const setLoading = useSetLoading();
  const pushMessage = usePushMessage();
  const allCategories = useCategories();

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

  function handleSelectCategory(e: React.ChangeEvent<HTMLSelectElement>) {
    const category = allCategories.find((c) => c.category === e.target.value) as ICategory;
    if (categories.find((c) => c.id === category.id)) return;
    setCategories([category, ...categories]);
  }

  function handleRemoveCategory(category: ICategory) {
    setCategories(categories.filter((c) => c !== category));
  }

  async function handleSaveChange() {
    try {
      setLoading(true);
      if (title === '') throw new Error();
      await videoApi.updateVideo(video.id, {
        title: title,
        description: description,
        categories: categories.map((c) => c.category).join(','),
        thumbnail: thumbnail || undefined,
      });
      video.title = title;
      video.description = description;
      video.categories = categories;
      setEditing(false);
      pushMessage('Cập nhật Video thành công!');
    } catch {
      pushMessage('Cập nhật Video không thành công!');
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

  const uploadedAt = video.uploadedAt.toString();
  const isOwner = user && user.username === video.uploadedBy.username;

  return (
    <div className="WatchDetail">
      <div className="WatchDetail__Info">
        {editing ? (
          <input
            type="text"
            className="App-TextInput WatchDetail__Info-Title"
            placeholder="Description"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        ) : (
          <div className="WatchDetail__Info-Title">{video.title}</div>
        )}
        <div className="WatchDetail__Info-UploadedAt">
          {uploadedAt.slice(0, uploadedAt.indexOf(' GMT'))}
        </div>
      </div>

      <div className="WatchDetail__User" style={{ display: 'flex' }}>
        <Link className="WatchDetail__User__Left" to={`/channel/${video.uploadedBy.username}`}>
          <Avatar user={video.uploadedBy} className="WatchDetail__User__Left-Avatar" />
          <div className="WatchDetail__User__Left-Username">
            {video.uploadedBy.username} ({video.uploadedBy.firstName} {video.uploadedBy.lastName})
          </div>
        </Link>
        <SubscribeButton targetUser={video.uploadedBy} />
      </div>

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

          <div id="WDSAA-Actions" className="WDSAA__Actions-Item">
            <MoreVert />
            <ActionPopup target="WDSAA-Actions" />
          </div>
        </div>
      </div>

      {editing && (
        <div className="WatchDetail-ThumbnailUpload">
          <label className=" App-GreenButton">
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
            placeholder="Description"
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
          <>
            <select
              className="App-TextInput WDC-Select"
              value="blank"
              onChange={handleSelectCategory}
            >
              <option disabled value="blank">
                -- Chọn chủ đề cho video --
              </option>
              {allCategories.map((category) => (
                <option key={category.id} value={category.category}>
                  {category.category}
                </option>
              ))}
            </select>
            <Categories categories={categories} handleRemoveCategory={handleRemoveCategory} />
          </>
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
