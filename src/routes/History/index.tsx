import React, { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DeleteForever } from '@material-ui/icons';

import IVideo from '@interfaces/IVideo';
import { isToday, isYesterday } from '@utils/time';
import generateSkeletons from '@utils/generateSkeleton';
import historyApi from '@api/historyApi';
import { useSetLoading } from '@contexts/LoadingContext';
import { useShowConfirm } from '@contexts/ConfirmContext';
import { usePushMessage } from '@contexts/MessageQueueContext';

import HorizontalVideos from '@components/HorizontalVideos';
import NotFound from '@components/NotFound';

import './History.css';

const step = 10;

function History() {
  const [videos, setVideos] = useState<Array<IVideo>>([]);
  const hasMore = useRef(true);

  const setLoading = useSetLoading();
  const pushMessage = usePushMessage();
  const { showConfirm } = useShowConfirm();

  async function loadVideos() {
    const _videos = await historyApi.getWatchedVideos({ limit: step, offset: videos.length });
    if (_videos.length !== step) hasMore.current = false;
    setVideos([...videos, ..._videos]);
  }

  useEffect(() => {
    hasMore.current = true;
    setLoading(true);
    historyApi
      .getWatchedVideos({ limit: step, offset: 0 })
      .then((_videos) => {
        if (_videos.length !== step) hasMore.current = false;
        setVideos(_videos);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  let todayVideos: Array<IVideo> = [];
  let yesterdayVideos: Array<IVideo> = [];
  let olderVideos: Array<IVideo> = [];

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
          <div
            onClick={() =>
              showConfirm('bạn có muốn xóa lịch sử xem không?', () =>
                historyApi
                  .clearWatchHistory()
                  .then(() => setVideos([]))
                  .catch(() => pushMessage('Xóa lịch sử xem không thành công!', 'error'))
              )
            }
          >
            XÓA LỊCH SỬ XEM
          </div>
        </div>
      </div>
      <div className="History__Videos">
        <InfiniteScroll
          scrollableTarget="Main"
          dataLength={videos.length}
          next={loadVideos}
          hasMore={hasMore.current}
          loader={
            <div className="History__VideoSection">
              <p></p>
              <HorizontalVideos videos={generateSkeletons(4)} extend />
            </div>
          }
          endMessage={<NotFound text="Không còn video để hiển thị" />}
        >
          <div>
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
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default History;
