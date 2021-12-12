import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { TextareaAutosize } from '@material-ui/core';
import ProgressBar from '@ramonak/react-progress-bar';

import { usePushMessage } from '@contexts/MessageQueueContext';
import mediaApi from '@api/mediaApi';
import videoApi from '@api/videoApi';
import ICategory from '@interfaces/ICategory';
import useForceUpdate from '@hooks/useForceUpdate';
import CategoriesSelector from '@components/CategorySelector';

import './UploadHandler.css';

type Props = {
  videoFile: File;
  setVideoFile: React.Dispatch<React.SetStateAction<File | null>>;
};

function UploadHandler({ videoFile, setVideoFile }: Props) {
  const [progress, setProgress] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [privacy, setPrivacy] = useState<'public' | 'private'>('public');
  const [title, setTitle] = useState(videoFile.name);
  const [video, setVideo] = useState<string | null>(null);
  const [isClickUpload, setIsClickUpload] = useState(false);

  const forceUpdate = useForceUpdate();
  const pushMessage = usePushMessage();

  const cancelUpload = useRef<null | (() => void)>(null);
  const blobUrl = useRef(URL.createObjectURL(videoFile));
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    const _video = videoRef.current;

    function handleVideoCanplay(e: Event) {
      forceUpdate();
      if (videoRef.current) {
        videoRef.current.currentTime = videoRef.current.duration / 2;
      }
    }

    _video.addEventListener('canplay', handleVideoCanplay, { once: true });
    return () => _video.removeEventListener('canplay', handleVideoCanplay);
    // eslint-disable-next-line
  }, [videoFile]);

  useEffect(() => {
    cancelUpload.current = mediaApi.postVideo(videoFile, {
      onUploadProgress: (pg) => {
        setProgress(~~((pg.loaded / pg.total) * 100));
      },
      onUploadComplete: (res) => {
        setVideo(res.video);
        cancelUpload.current = null;
      },
      onUploadError: (e) => {
        if (axios.isCancel(e)) {
          pushMessage('Đã hủy đăng tải video!', 'info');
        } else {
          pushMessage('Tải lện video thất bại!', 'error');
        }
        cancelUpload.current = null;
      },
    });

    return () => {
      if (cancelUpload.current) cancelUpload.current();
    };
  }, [pushMessage, videoFile]);

  useEffect(() => {
    if (video && isClickUpload) {
      videoApi
        .postVideo({
          video: video,
          thumbnail_timestamp: videoRef.current?.currentTime,
          title,
          description,
          categories ,
        })
        .then(() => {
          pushMessage('Đăng tải video thành công!');
          setVideoFile(null);
        })
        .catch(() => {
          pushMessage('Đăng tải video thất bại!', 'error');
          setIsClickUpload(false);
        });
    }
    // eslint-disable-next-line
  }, [video, isClickUpload]);

  function handleCancelClick() {
    if (cancelUpload.current !== null) {
      cancelUpload.current();
    }
    setVideoFile(null);
  }

  return (
    <div className="uploadHandler">
      <ProgressBar
        completed={progress}
        bgColor="var(--main-red-1)"
        baseBgColor="var(--main-grey-1)"
        borderRadius="3px"
        margin="0 0 12px 0"
        labelColor="#ffffff"
        transitionDuration="0"
      />
      <div className="container">
        <div className="videoArea">
          <span>
            <i>* Tua video để chọn thumbnail</i>
          </span>
          <video ref={videoRef} src={blobUrl.current} controls></video>
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
            <CategoriesSelector categories={categories} setCategories={setCategories} />
          </div>

          <div className="buttons">
            <div className="App-GreenButton" onClick={() => setIsClickUpload(true)}>
              {isClickUpload ? 'Đang chờ tải lên...' : 'Đăng tải'}
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
