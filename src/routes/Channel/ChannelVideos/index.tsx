import userApi from '@api/userApi';
import VerticalVideos from '@components/VerticalVideos';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useSetLoading } from '@contexts/LoadingContext';
import IVideo from '@interfaces/IVideo';

import './ChannelVideos.css';

interface ChannelVideosProps {
  username: string;
}

const step = 20;

function ChannelVideos({ username }: ChannelVideosProps) {
  const [videos, setVideos] = useState<Array<IVideo>>([]);

  const setLoading = useSetLoading();

  useEffect(() => {
    setVideos([]);
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
        dataLength={videos.length}
        next={loadVideos}
        hasMore={true}
        loader={null}
        scrollableTarget="Main"
      >
        <VerticalVideos videos={videos} />
      </InfiniteScroll>
    </div>
  );
}

export default ChannelVideos;
