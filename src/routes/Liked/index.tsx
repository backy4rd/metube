import React, { useEffect, useRef, useState } from 'react';

import { useSetLoading } from '@contexts/LoadingContext';
import IVideo from '@interfaces/IVideo';
import videoApi from '@api/videoApi';

import HorizontalVideo from '@components/HorizontalVideo';

import './Liked.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import HorizontalVideoSkeleton from '@components/HorizontalVideo/HorizontalVideoSkeleton';
import Sequence from '@utils/Sequence';

const step = 10;

function Liked() {
  const [videos, setVideos] = useState<Array<IVideo>>([]);
  const hasMore = useRef(true);

  const setLoading = useSetLoading();

  useEffect(() => {
    setLoading(true);
    videoApi
      .getLikedVideos()
      .then(setVideos)
      .finally(() => setLoading(false));
  }, [setLoading]);

  useEffect(() => {
    hasMore.current = true;
    setLoading(true);
    videoApi
      .getLikedVideos({ limit: step, offset: 0 })
      .then((_videos) => {
        if (_videos.length < step) hasMore.current = false;
        setVideos(_videos);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  async function loadVideos() {
    const _videos = await videoApi.getLikedVideos({ limit: step, offset: videos.length });
    if (_videos.length < step) hasMore.current = false;
    setVideos([...videos, ..._videos]);
  }

  return (
    <div className="Liked">
      <p style={{ fontSize: '15px' }}>Video đã thích: </p>
      <InfiniteScroll
        dataLength={videos.length}
        next={loadVideos}
        hasMore={hasMore.current}
        loader={<Sequence Component={() => <HorizontalVideoSkeleton extend />} length={4} />}
        scrollableTarget="Main"
      >
        {videos.map((video) => (
          <HorizontalVideo key={video.id} video={video} extend showReactionTimestamp />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Liked;
