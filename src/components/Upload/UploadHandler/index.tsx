import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { TextareaAutosize } from '@material-ui/core';
import ProgressBar from '@ramonak/react-progress-bar';

import { usePushMessage } from '@contexts/MessageQueueContext';
import categoryApi from '@api/categoryApi';
import videoApi from '@api/videoApi';
import ICategory from '@interfaces/ICategory';
import useForceUpdate from '@hooks/useForceUpdate';

import Categories from '@components/Categories';

import './UploadHandler.css';

type Props = {
  videoFile: File;
  setVideoFile: React.Dispatch<React.SetStateAction<File | null>>;
};

function UploadHandler({ videoFile, setVideoFile }: Props) {
  const [allCategories, setAllCategories] = useState<ICategory[]>([]);
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [progress, setProgress] = useState<number | null>(null);
  const [privacy, setPrivacy] = useState<'public' | 'private'>('public');
  const [title, setTitle] = useState(videoFile.name);

  const forceUpdate = useForceUpdate();
  const pushMessage = usePushMessage();

  const cancelUpload = useRef<null | (() => void)>(null);
  const blobUrl = useRef(URL.createObjectURL(videoFile));
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!video.current) return;
    const _video = video.current;

    _video.addEventListener('canplay', forceUpdate, { once: true });
    return () => _video.removeEventListener('canplay', forceUpdate);
    // eslint-disable-next-line
  }, [videoFile]);

  useEffect(() => {
    categoryApi.getCategories().then(setAllCategories);
  }, []);

  function handleSelectCategory(e: React.ChangeEvent<HTMLSelectElement>) {
    const category = allCategories.find((c) => c.category === e.target.value) as ICategory;
    if (categories.find((c) => c === category)) return;
    setCategories([category, ...categories]);
  }

  function handleRemoveCategory(category: ICategory) {
    setCategories(categories.filter((c) => c !== category));
  }

  function handleCancelClick() {
    // File is not uploading, go back to choose another file
    if (cancelUpload.current === null) {
      setVideoFile(null);
      // file is uploading, cancel the upload progress
    } else {
      cancelUpload.current();
    }
  }

  function handleUploadClick() {
    if (cancelUpload.current !== null) return;

    cancelUpload.current = videoApi.postVideo(
      {
        video: videoFile,
        thumbnailTimestamp: video.current?.currentTime,
        title,
        description,
        categories,
      },
      {
        onUploadProgress: (pg) => {
          setProgress(~~((pg.loaded / pg.total) * 100));
        },
        onUploadComplete: () => {
          pushMessage('Đăng tải video thành công, video sẽ xuất hiện sớm nhất có thể!');
          cancelUpload.current = null;
          setProgress(null);
          setVideoFile(null);
        },
        onUploadError: (e) => {
          if (axios.isCancel(e)) {
            pushMessage('Đã hủy đăng tải video!', 'info');
          } else {
            pushMessage('Đăng tải video thất bại!', 'error');
          }
          cancelUpload.current = null;
          setProgress(null);
        },
      }
    );
  }

  return (
    <div className="uploadHandler">
      {progress !== null && (
        <ProgressBar
          completed={progress}
          bgColor="var(--main-red-1)"
          baseBgColor="var(--main-grey-1)"
          borderRadius="3px"
          margin="0 0 12px 0"
          labelColor="#ffffff"
          transitionDuration="0"
        />
      )}
      <div className="container">
        <div className="videoArea">
          <span>
            <i>* Tua video để chọn thumbnail</i>
          </span>
          <video ref={video} src={blobUrl.current} controls></video>
        </div>
        <div className="inputArea">
          <div className="inputs">
            <div className="inputs-label">Tiêu đề:</div>
            <input
              className="App-TextInput"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className="inputs-label">Chế độ:</div>
            <select
              className="App-TextInput"
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value as 'private' | 'public')}
            >
              <option value="public">Công khai</option>
              <option value="private">Riêng tư</option>
            </select>

            <div className="inputs-label">Mô tả:</div>
            <TextareaAutosize
              className="App-TextInput"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="inputs-label">Chủ đề:</div>
            <select className="App-TextInput" value="blank" onChange={handleSelectCategory}>
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
          </div>

          <div className="buttons">
            <div className="App-GreenButton" onClick={handleUploadClick}>
              Đăng tải
            </div>
            <div className="App-GreyButton" onClick={handleCancelClick}>
              Hủy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadHandler;
