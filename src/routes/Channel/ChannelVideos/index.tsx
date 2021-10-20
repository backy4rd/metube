import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import userApi from '@api/userApi';
import { useSetLoading } from '@contexts/LoadingContext';
import { useAuth } from '@contexts/AuthContext';
import IVideo from '@interfaces/IVideo';

import VerticalVideo from '@components/VerticalVideo';
import VerticalVideoSkeleton from '@components/VerticalVideo/VerticalVideoSkeleton';
import Sequence from '@utils/Sequence';

import './ChannelVideos.css';

const step = 20;

function ChannelVideos() {
  const [videos, setVideos] = useState<Array<IVideo>>([]);
  const { username } = useParams<{ username: string }>();
  const hasMore = useRef(true);

  const { user } = useAuth();
  const setLoading = useSetLoading();

  useEffect(() => {
    if (user === undefined) return;
    hasMore.current = true;
    setLoading(true);
    userApi
      .getUserVideos(user?.username === username ? 'me' : username, { limit: step, offset: 0 })
      .then((_videos) => {
        if (_videos.length < step) hasMore.current = false;
        setVideos(_videos);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [username, user]);

  async function loadVideos() {
    const _videos = await userApi.getUserVideos(username, { limit: step, offset: videos.length });
    if (_videos.length < step) hasMore.current = false;
    setVideos([...videos, ..._videos]);
  }

  return (
    <div className="ChannelVideos">
      <InfiniteScroll
        className="App-VerticalVideoGrid"
        dataLength={videos.length}
        next={loadVideos}
        hasMore={hasMore.current}
        loader={<Sequence Component={VerticalVideoSkeleton} length={8} />}
        scrollableTarget="Main"
      >
        {videos.map((video) => (
          <VerticalVideo key={video.id} video={video} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default ChannelVideos;
