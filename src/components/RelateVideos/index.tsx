import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import IVideo from '@interfaces/IVideo';
import ISkeleton, { isSkeleton } from '@interfaces/ISkeleton';
import videoApi from '@api/videoApi';
import generateSkeletons from '@utils/generateSkeleton';

import HorizontalVideos from '@components/HorizontalVideos';

import './RelateVideos.css';

interface RelateVideosProps {
  videoId: string;
}

const step = 10;

function RelateVideos({ videoId }: RelateVideosProps) {
  const [videos, setVideos] = useState<Array<IVideo | ISkeleton>>([]);

  useEffect(() => {
    setVideos(generateSkeletons(step / 2));
    videoApi.getRelateVideos(videoId, { limit: step, offset: 0 }).then(setVideos);
  }, [videoId]);

  async function loadVideos() {
    setVideos([...videos, ...generateSkeletons(step / 4)]);
    const _videos = await videoApi.getRelateVideos(videoId, {
      offset: videos.length,
      limit: step,
    });
    setVideos([...videos, ..._videos]);
  }

  return (
    <div className="RelateVideos">
      <InfiniteScroll
        dataLength={videos.filter((v) => !isSkeleton(v)).length}
        next={loadVideos}
        hasMore={true}
        loader={null}
        scrollableTarget="Main"
      >
        <HorizontalVideos videos={videos} />
      </InfiniteScroll>
    </div>
  );
}

export default RelateVideos;
