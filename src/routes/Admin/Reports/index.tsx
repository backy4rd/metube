import React, { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import adminApi from '@api/adminApi';
import IVideo from '@interfaces/IVideo';
import { useSetLoading } from '@contexts/LoadingContext';

import Sequence from '@utils/Sequence';
import HorizontalVideoSkeleton from '@components/HorizontalVideo/HorizontalVideoSkeleton';
import VerticalVideo from '@components/VerticalVideo';
import Report from './Report';

import './Reports.css';

const step = 10;

function Reports() {
  const [videos, setVideos] = useState<Array<IVideo>>([]);
  const hasMore = useRef(true);

  const setLoading = useSetLoading();

  async function loadVideos() {
    const _videos = await adminApi.getReportedVideos({ limit: step, offset: videos.length });
    if (_videos.length !== step) hasMore.current = false;
    setVideos([...videos, ..._videos]);
  }

  useEffect(() => {
    hasMore.current = true;
    setLoading(true);
    adminApi
      .getReportedVideos({ limit: step, offset: 0 })
      .then((_videos) => {
        if (_videos.length !== step) hasMore.current = false;
        setVideos(_videos);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  return (
    <InfiniteScroll
      className="Reports"
      dataLength={videos.length}
      next={loadVideos}
      hasMore={hasMore.current}
      loader={<Sequence Component={() => <HorizontalVideoSkeleton extend />} length={4} />}
      scrollableTarget="Main"
    >
      {videos.map((video) => (
        <div key={video.id} className="Reports__ItemWrapper">
          <div className="Reports__Item">
            <VerticalVideo
              key={video.id}
              className="Reports__Item-Video"
              video={video}
              animation={false}
            />
            <div className="Reports__Item-VideoReports">
              {video.reports.map((report) => (
                <Report key={report.id} report={report} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </InfiniteScroll>
  );
}

export default Reports;
