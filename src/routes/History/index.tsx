import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DeleteForever } from '@material-ui/icons';

import IVideo from '@interfaces/IVideo';
import ISkeleton, { isSkeleton } from '@interfaces/ISkeleton';
import { isToday, isYesterday } from '@utils/time';
import generateSkeletons from '@utils/generateSkeleton';
import historyApi from '@api/historyApi';
import { useSetLoading } from '@contexts/LoadingContext';
import { useShowConfirm } from '@contexts/ConfirmContext';
import { usePushMessage } from '@contexts/MessageQueueContext';

import HorizontalVideos from '@components/HorizontalVideos';

import './History.css';

const step = 10;

function History() {
  const [videos, setVideos] = useState<Array<IVideo | ISkeleton>>([]);

  const setLoading = useSetLoading();
  const { showConfirm } = useShowConfirm();
  const pushMessage = usePushMessage();

  async function loadVideos() {
    setVideos([...videos, ...generateSkeletons(step / 4)]);
    const _videos = await historyApi.getWatchedVideos({ limit: step, offset: videos.length });
    setVideos([...videos, ..._videos]);
  }

  useEffect(() => {
    setLoading(true);
    setVideos(generateSkeletons(step / 2));
    historyApi
      .getWatchedVideos({ limit: step, offset: 0 })
      .then(setVideos)
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  let todayVideos: Array<IVideo> = [];
  let yesterdayVideos: Array<IVideo> = [];
  let olderVideos: Array<IVideo | ISkeleton> = [];

  for (const video of videos) {
    if (!isSkeleton(video) && isToday(video.watchedAt)) {
      todayVideos.push(video);
      continue;
    }

    if (!isSkeleton(video) && isYesterday(video.watchedAt)) {
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
          <div
            onClick={() =>
              showConfirm('bạn có muốn xóa lịch sử xem không?', () =>
                historyApi
                  .clearWatchHistory()
                  .then(() => setVideos([]))
                  .catch(() => pushMessage('Xóa lịch sử xem không thành công!'))
              )
            }
          >
            XÓA LỊCH SỬ XEM
          </div>
        </div>
      </div>
      <div className="History__Videos">
        <InfiniteScroll
          dataLength={videos.filter((v) => !isSkeleton(v)).length}
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
