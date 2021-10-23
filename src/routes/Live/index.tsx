import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import streamApi from '@api/streamApi';
import IStream from '@interfaces/IStream';
import { useSetLoading } from '@contexts/LoadingContext';

import LiveChat from '@components/LiveChat';
import StreamPlayer from '@components/StreamPlayer';
import UserInfo from '@components/WatchDetail/UserInfo';

import './Live.css';
import EllipsisText from '@components/EllipsisText';

function Live() {
  const [stream, setStream] = useState<IStream | null>(null);
  const [viewers, setViewers] = useState(-1);
  const { streamId } = useParams<{ streamId: string }>();

  const setLoading = useSetLoading();

  useEffect(() => {
    setLoading(true);
    streamApi
      .getStream(streamId)
      .then(setStream)
      .finally(() => setLoading(false));
  }, [setLoading, streamId]);

  return (
    <div className="Live">
      <div className="Live-Main">
        <StreamPlayer stream={stream} />
        <div className="LiveDetail">
          <div className="WatchDetail__Info">
            <div className="WatchDetail__Info__Title WDIT-Text">{stream?.name}</div>
            {stream && (
              <div className="WatchDetail__Info-UploadedAt">
                {viewers} người đang xem -{' '}
                {stream.lastStreamedAt
                  ? 'Lần cuối live ' + stream.lastStreamedAt.toLocaleString('vi').replace(',', '')
                  : 'Chưa từng live trước đây'}
              </div>
            )}
          </div>

          {stream && <UserInfo user={stream.user} />}

          <div className="WatchDetail__Description">
            <EllipsisText
              text={stream?.description || ''}
              lines={5}
              ellipsis={<div className="SidebarGroup-Toggle">show more »</div>}
            />
          </div>
        </div>
      </div>
      <LiveChat
        className="Live-LiveChat"
        streamId={streamId}
        handleLiveCountChange={(liveCount) => setViewers(liveCount)}
      />
    </div>
  );
}

export default Live;
