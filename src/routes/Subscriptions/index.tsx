import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import IVideo from '@interfaces/IVideo';
import videoApi from '@api/videoApi';
import { isToday, isThisWeek } from '@utils/time';
import generateSkeletons from '@utils/generateSkeleton';
import { useSetLoading } from '@contexts/LoadingContext';

import VerticalVideos from '@components/VerticalVideos';

import './Subscriptions.css';

const step = 20;

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
        hasMore={videos.length % step === 0}
        loader={
          <div className="Subscriptions__VideoSection">
            <p></p>
            <VerticalVideos videos={generateSkeletons(6)} />
          </div>
        }
        scrollableTarget="Main"
      >
        <div>
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
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Subscriptions;
