import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import IVideo from '@interfaces/IVideo';
import videoApi from '@api/videoApi';

import HorizontalVideos from '@components/HorizontalVideos';

import './RelateVideos.css';

interface RelateVideosProps {
  video: IVideo;
}

const step = 10;

function RelateVideos(props: RelateVideosProps) {
  const [videos, setVideos] = useState<Array<IVideo>>([]);

  useEffect(() => {
    videoApi.getRelateVideos(props.video.id, { limit: step, offset: 0 }).then(setVideos);
  }, [props.video.id]);

  async function loadVideos() {
    const _videos = await videoApi.getRelateVideos(props.video.id, {
      offset: videos.length,
      limit: step,
    });
    setVideos([...videos, ..._videos]);
  }

  return (
    <div className="RelateVideos">
      <InfiniteScroll
        dataLength={videos.length}
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
