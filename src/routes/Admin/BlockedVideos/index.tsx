import React, { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import adminApi from '@api/adminApi';
import IVideo from '@interfaces/IVideo';
import { useSetLoading } from '@contexts/LoadingContext';

import Sequence from '@utils/Sequence';
import HorizontalVideoSkeleton from '@components/HorizontalVideo/HorizontalVideoSkeleton';
import HorizontalVideo from '@components/HorizontalVideo';

import './BlockedVideos.css';
import { usePushMessage } from '@contexts/MessageQueueContext';

const step = 10;

function BlockedVideos() {
  const [videos, setVideos] = useState<Array<IVideo>>([]);
  const hasMore = useRef(true);

  const setLoading = useSetLoading();
  const pushMessage = usePushMessage();

  async function loadVideos() {
    const _videos = await adminApi.getBlockedVideos({ limit: step, offset: videos.length });
    if (_videos.length !== step) hasMore.current = false;
    setVideos([...videos, ..._videos]);
  }

  useEffect(() => {
    hasMore.current = true;
    setLoading(true);
    adminApi
      .getBlockedVideos({ limit: step, offset: 0 })
      .then((_videos) => {
        if (_videos.length !== step) hasMore.current = false;
        setVideos(_videos);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  const handleRemoveBlock = (video: IVideo) => async () => {
    try {
      setLoading(true);
      await adminApi.modifyVideo(video.id, 'unban');
      pushMessage('Đã gỡ chăn ' + video.title);
      setVideos((vs) => vs.filter((v) => v.id !== video.id));
    } catch {
      pushMessage('Gỡ chặn không thành công');
    } finally {
      setLoading(false);
    }
  };

  return (
    <InfiniteScroll
      className="BlockedVideos"
      dataLength={videos.length}
      next={loadVideos}
      hasMore={hasMore.current}
      loader={<Sequence Component={() => <HorizontalVideoSkeleton extend />} length={4} />}
      scrollableTarget="Main"
    >
      {videos.map((video) => (
        <div className="BlockedVideos__Item" key={video.id}>
          <HorizontalVideo className="BlockedVideos__Item-Video" video={video} extend />
          <div
            className="App-RedButton BlockedVideos__Item-RemoveBlockButton"
            onClick={handleRemoveBlock(video)}
          >
            GỠ CHẶN VIDEO
          </div>
        </div>
      ))}
    </InfiniteScroll>
  );
}

export default BlockedVideos;
