import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import userApi from '@api/userApi';
import { useSetLoading } from '@contexts/LoadingContext';
import IVideo from '@interfaces/IVideo';

import VerticalVideo from '@components/VerticalVideo';
import VerticalVideoSkeleton from '@components/VerticalVideo/VerticalVideoSkeleton';
import Sequence from '@utils/Sequence';

import './ChannelVideos.css';

const step = 20;

function ChannelVideos() {
  const [videos, setVideos] = useState<Array<IVideo>>([]);
  const { username } = useParams<{ username: string }>();

  const setLoading = useSetLoading();

  useEffect(() => {
    setLoading(true);
    userApi
      .getUserVideos(username, { limit: step, offset: 0 })
      .then(setVideos)
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [username]);

  async function loadVideos() {
    const _videos = await userApi.getUserVideos(username, { limit: step, offset: videos.length });
    setVideos([...videos, ..._videos]);
  }

  return (
    <div className="ChannelVideos">
      <InfiniteScroll
        className="App-VerticalVideoGrid"
        dataLength={videos.length}
        next={loadVideos}
        hasMore={videos.length % step === 0}
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
