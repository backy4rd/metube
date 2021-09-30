import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import userApi from '@api/userApi';
import { useSetLoading } from '@contexts/LoadingContext';
import IVideo from '@interfaces/IVideo';
import ISkeleton, { isSkeleton } from '@interfaces/ISkeleton';
import generateSkeletons from '@utils/generateSkeleton';

import VerticalVideos from '@components/VerticalVideos';

import './ChannelVideos.css';

const step = 20;

function ChannelVideos() {
  const [videos, setVideos] = useState<Array<IVideo | ISkeleton>>([]);
  const { username } = useParams<{ username: string }>();

  const setLoading = useSetLoading();

  useEffect(() => {
    setVideos(generateSkeletons(step));
    setLoading(true);
    userApi
      .getUserVideos(username, { limit: step, offset: 0 })
      .then(setVideos)
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [username]);

  async function loadVideos() {
    setVideos([...videos, ...generateSkeletons(step / 2)]);
    const _videos = await userApi.getUserVideos(username, { limit: step, offset: videos.length });
    setVideos([...videos, ..._videos]);
  }

  return (
    <div className="ChannelVideos">
      <InfiniteScroll
        dataLength={videos.filter((v) => !isSkeleton(v)).length}
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
