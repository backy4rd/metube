import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import streamApi from '@api/streamApi';
import IStream from '@interfaces/IStream';
import { useSetLoading } from '@contexts/LoadingContext';

import LiveChat from '@components/LiveChat';
import StreamPlayer from '@components/StreamPlayer';
import UserInfo from '@components/WatchDetail/UserInfo';

import './Live.css';

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
      <div className="Live-Player">
        <StreamPlayer stream={stream} />
        <div className="Live-Info">
          <h2>{stream?.name}</h2>
          <div>{viewers} người đang xem</div>
          {stream && <UserInfo user={stream.user} />}
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
