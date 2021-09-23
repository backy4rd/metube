import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DeleteForever } from '@material-ui/icons';

import IVideo from '@interfaces/IVideo';
import { isToday, isYesterday } from '@utils/time';
import historyApi from '@api/historyApi';
import { useSetLoading } from '@contexts/LoadingContext';

import HorizontalVideos from '@components/HorizontalVideos';

import './History.css';

const step = 10;

function History() {
  const [videos, setVideos] = useState<IVideo[]>([]);

  const setLoading = useSetLoading();

  async function loadVideos() {
    const _videos = await historyApi.getWatchedVideos({ limit: step, offset: videos.length });
    setVideos([...videos, ..._videos]);
  }

  useEffect(() => {
    setLoading(true);
    historyApi
      .getWatchedVideos({ limit: step, offset: 0 })
      .then(setVideos)
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  let todayVideos = [];
  let yesterdayVideos = [];
  let olderVideos = [];

  for (const video of videos) {
    if (isToday(video.watchedAt)) {
      todayVideos.push(video);
      continue;
    }

    if (isYesterday(video.watchedAt)) {
      yesterdayVideos.push(video);
      continue;
    }

    olderVideos.push(video);
  }

  return (
    <div className="History">
      <div className="History__Function">
        <div className="HF__Button">
          <DeleteForever />
          <div>XÓA LỊCH SỬ XEM</div>
        </div>
      </div>
      <div className="History__Videos">
        <InfiniteScroll
          dataLength={videos.length}
          next={loadVideos}
          hasMore={true}
          loader={<></>}
          scrollableTarget="Main"
        >
          {todayVideos.length !== 0 && (
            <div className="History__VideoSection">
              <p>Hôm nay</p>
              <HorizontalVideos videos={todayVideos} showWatchTimestamp extend />
            </div>
          )}

          {yesterdayVideos.length !== 0 && (
            <div className="History__VideoSection">
              <p>Hôm qua</p>
              <HorizontalVideos videos={yesterdayVideos} showWatchTimestamp extend />
            </div>
          )}

          <div className="History__VideoSection">
            {(todayVideos.length !== 0 || yesterdayVideos.length !== 0) &&
              olderVideos.length !== 0 && <p>Lâu hơn</p>}
            <HorizontalVideos videos={olderVideos} showWatchTimestamp extend />
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default History;
