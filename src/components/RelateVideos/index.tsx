import React, { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import IVideo from '@interfaces/IVideo';
import videoApi from '@api/videoApi';

import HorizontalVideo from '@components/HorizontalVideo';
import HorizontalVideoSkeleton from '@components/HorizontalVideo/HorizontalVideoSkeleton';
import Sequence from '@utils/Sequence';

import './RelateVideos.css';

interface RelateVideosProps {
  videoId: string;
}

const step = 10;

function RelateVideos({ videoId }: RelateVideosProps) {
  const [videos, setVideos] = useState<Array<IVideo>>([]);
  const hasMore = useRef(true);

  useEffect(() => {
    videoApi.getRelateVideos(videoId, { limit: step, offset: 0 }).then((_videos) => {
      hasMore.current = _videos.length === step;
      setVideos(_videos);
    });
  }, [videoId]);

  async function loadVideos() {
    const _videos = await videoApi.getRelateVideos(videoId, {
      offset: videos.length,
      limit: step,
    });
    hasMore.current = _videos.length === step;
    setVideos([...videos, ..._videos]);
  }

  return (
    <div className="RelateVideos">
      <InfiniteScroll
        dataLength={videos.length}
        next={loadVideos}
        hasMore={hasMore.current}
        loader={<Sequence Component={() => <HorizontalVideoSkeleton />} length={5} />}
        scrollableTarget="Main"
      >
        {videos.map((video) => (
          <HorizontalVideo key={video.id} video={video} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default RelateVideos;
