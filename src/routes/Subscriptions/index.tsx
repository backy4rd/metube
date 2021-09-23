import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import IVideo from '@interfaces/IVideo';
import { isToday, isThisWeek } from '@utils/time';

import VerticalVideos from '@components/VerticalVideos';

import './Subscriptions.css';
import videoApi from '@api/videoApi';
import { useSetLoading } from '@contexts/LoadingContext';

const step = 30;

function Subscriptions() {
  const [videos, setVideos] = useState<IVideo[]>([]);

  const setLoading = useSetLoading();

  useEffect(() => {
    setLoading(true);
    videoApi
      .getSubscriptionVideos({ limit: step, offset: 0 })
      .then(setVideos)
      .finally(() => setLoading(false));
    //eslint-disable-next-line
  }, []);

  async function loadVideos() {
    const _videos = await videoApi.getSubscriptionVideos({ limit: step, offset: videos.length });
    setVideos([...videos, ..._videos]);
  }

  let todayVideos = [];
  let thisWeekVideos = [];
  let olderVideos = [];

  for (const video of videos) {
    if (isToday(video.uploadedAt)) {
      todayVideos.push(video);
      continue;
    }

    if (isThisWeek(video.uploadedAt)) {
      thisWeekVideos.push(video);
      continue;
    }

    olderVideos.push(video);
  }

  return (
    <div className="Subscription">
      <InfiniteScroll
        dataLength={videos.length}
        next={loadVideos}
        hasMore={true}
        loader={<></>}
        scrollableTarget="Main"
      >
        {todayVideos.length !== 0 && (
          <div className="Subscriptions__VideoSection">
            <p>Hôm nay</p>
            <VerticalVideos videos={todayVideos} />
          </div>
        )}

        {thisWeekVideos.length !== 0 && (
          <div className="Subscriptions__VideoSection">
            <p>Tuần này</p>
            <VerticalVideos videos={thisWeekVideos} />
          </div>
        )}

        <div className="Subscriptions__VideoSection">
          {(todayVideos.length !== 0 || thisWeekVideos.length !== 0) &&
            olderVideos.length !== 0 && <p>Cũ hơn</p>}
          <VerticalVideos videos={olderVideos} />
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Subscriptions;
