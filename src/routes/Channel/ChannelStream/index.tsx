import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TextareaAutosize } from '@material-ui/core';

import IStream from '@interfaces/IStream';
import generateSkeletons from '@utils/generateSkeleton';
import userApi from '@api/userApi';
import mediaApi from '@api/mediaApi';
import { useAuth } from '@contexts/AuthContext';
import { usePushMessage } from '@contexts/MessageQueueContext';
import { useSetLoading } from '@contexts/LoadingContext';

import VerticalVideo from '@components/VerticalVideo';

import './ChannelStream.css';

function ChannelStream() {
  const [stream, setStream] = useState<IStream | null>(null);
  const [streamName, setStreamName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<File | string | null>(null);
  const { username } = useParams<{ username: string }>();

  const { user } = useAuth();
  const pushMessage = usePushMessage();
  const setLoading = useSetLoading();

  useEffect(() => {
    if (user === undefined) return;
    userApi.getUserStream(user?.username === username ? 'me' : username).then(setStream);
  }, [username, user]);

  useEffect(() => {
    if (!stream) return;
    setStreamName(stream.name);
    setDescription(stream.description || '');
    setThumbnail(stream.thumbnailPath);
  }, [stream]);

  function handleStreamKeyInputClick(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    const self = e.target as HTMLInputElement;
    self.select();
    self.setSelectionRange(0, 100);
    navigator.clipboard.writeText(self.value);
    pushMessage('Đã sao chép Stream Key vào clipboard!', 'info');
  }

  async function handleRenewStreamKeyClick(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    try {
      setLoading(true);
      const _stream = await userApi.updateStream({ renew_key: '1' });
      setStream({ ...stream, ..._stream });
      pushMessage('Đã tạo mới Stream Key!');
    } catch {
      pushMessage('Tạo mới Stream Key không thành công!', 'error');
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateStreamName() {
    if (!stream || stream.name === streamName) return;
    if (!streamName) {
      pushMessage('Tên Livestream không hợp lệ', 'warning');
      setStreamName(stream.name);
      return;
    }
    try {
      setLoading(true);
      const _stream = await userApi.updateStream({ name: streamName });
      setStream({ ...stream, ..._stream });
      pushMessage('Đã cập nhật Livestream!');
    } catch (e) {
      pushMessage('Cập nhật Livestream không thành công!', 'error');
      setStreamName(stream.name);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateDescription() {
    if (!stream || (stream.description || '') === description) return;
    if (!description) {
      pushMessage('Mô tả Livestream không hợp lệ', 'warning');
      setDescription(stream.description || '');
      return;
    }
    try {
      setLoading(true);
      const _stream = await userApi.updateStream({ description: description });
      setStream({ ...stream, ..._stream });
      pushMessage('Đã cập nhật Livestream!');
    } catch {
      pushMessage('Cập nhật Livestream không thành công!', 'error');
      setDescription(stream.description || '');
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateThumbnail() {
    if (!stream) return;
    if (!(thumbnail instanceof File)) return;
    try {
      setLoading(true);
      const { photo } = await mediaApi.postPhoto(thumbnail);
      const _stream = await userApi.updateStream({ thumbnail: photo });
      setStream({ ...stream, ..._stream });
      pushMessage('Đã cập nhật Livestream!');
    } catch {
      pushMessage('Cập nhật Livestream không thành công!', 'error');
      setThumbnail(stream.thumbnailPath);
    } finally {
      setLoading(false);
    }
  }

  const owner = stream && user && stream.user.username === user.username;
  const streamWithThumbnailState = stream && {
    ...stream,
    thumbnailPath: thumbnail instanceof File ? URL.createObjectURL(thumbnail) : thumbnail,
  };
  return (
    <div className="ChannelStream">
      <div className="ChannelStream__Live">
        <VerticalVideo video={streamWithThumbnailState || generateSkeletons(1)[0]} />

        {owner && (
          <div className="ChannelStream__Live__Buttons">
            {!(thumbnail instanceof File) ? (
              <label>
                <input
                  hidden
                  type="file"
                  accept="image/png,image/jpg,image/jpeg"
                  onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                />
                <div className="App-GreenButton CSLB-Button">Đổi Livestream thumbnail...</div>
              </label>
            ) : (
              <>
                <div className="App-GreenButton CSLB-Button" onClick={handleUpdateThumbnail}>
                  Cập nhật
                </div>
                <div
                  className="App-GreyButton CSLB-Button"
                  onClick={() => setThumbnail(stream.thumbnailPath)}
                >
                  Hủy
                </div>
              </>
            )}
          </div>
        )}
      </div>
      {owner && (
        <div className="ChannelStream__Info">
          <div className="ChannelStream__Info-Label">Tên Livestream:</div>
          <input
            className="App-TextInput"
            type="text"
            placeholder="Stream title"
            value={streamName}
            onChange={(e) => setStreamName(e.target.value)}
            onBlur={handleUpdateStreamName}
          />
          <div className="ChannelStream__Info-Label">
            RTMP Server (hãy dùng phần mềm Livestream tới url này cùng với Stream Key):
          </div>
          <input
            className="App-TextInput"
            type="text"
            placeholder="Stream title"
            value={process.env.REACT_APP_RTMP_URL}
            readOnly
          />
          <div className="ChannelStream__Info-Label">Stream key:</div>
          <div className="ChannelStream__Info__Key">
            <input
              className="App-TextInput"
              type="text"
              value={stream.id + '?key=' + stream.streamKey}
              onClick={handleStreamKeyInputClick}
              style={{ cursor: 'pointer' }}
              readOnly
            />
            <div className="App-GreenButton" onClick={handleRenewStreamKeyClick}>
              Tạo Key Mới
            </div>
          </div>
          <div className="ChannelStream__Info-Label">Mô tả Livestream:</div>
          <TextareaAutosize
            className="App-TextInput"
            placeholder="Description"
            minRows={4}
            maxRows={12}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={handleUpdateDescription}
          />
        </div>
      )}
    </div>
  );
}

export default ChannelStream;
