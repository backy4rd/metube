import React from 'react';
import { Link } from 'react-router-dom';

import IVideo from '@interfaces/IVideo';
import ISkeleton, { isSkeleton } from '@interfaces/ISkeleton';
import { numberWithCommas } from '@utils/number';
import { timeDifference } from '@utils/time';

import VideoThumbnail from '@components/VideoThumbnail';
import Avatar from '@components/Avatar';
import HorizontalVideoSkeleton from './HorizontalVideoSkeleton';

import './HorizontalVideo.css';

interface HorizontalVideoProps {
  video: IVideo | ISkeleton;
  showWatchTimestamp?: boolean;
  extend?: boolean;
}

function HorizontalVideo({
  video,
  showWatchTimestamp = false,
  extend = false,
}: HorizontalVideoProps) {
  if (isSkeleton(video)) return <HorizontalVideoSkeleton extend={extend} />;
  return (
    <Link to={`/watch/${video.id}`}>
      <div className="HorizontalVideo">
        <VideoThumbnail className="HorizontalVideo__Thumbnail" video={video} showViews={false} />
        <div className="HorizontalVideo__Info">
          <div className="HorizontalVideo__Info-Title App-Text2Line">{video.title}</div>
          {showWatchTimestamp && (
            <div className="HorizontalVideo__Info-WatchedTimestamp">
              Đã xem {timeDifference(new Date(), video.watchedAt)}
            </div>
          )}
          <div className="HorizontalVideo__Info-Views">
            {numberWithCommas(video.views)} lượt xem
            {extend ? ` - ${timeDifference(new Date(), video.uploadedAt)}` : ''}
          </div>
          <div className="HorizontalVideo__Info-Author" style={{ marginTop: extend ? 8 : 0 }}>
            {extend && <Avatar className="HVIA-Avatar" user={video.uploadedBy} size="24px" />}
            <div className="HVIA-Name">{video.uploadedBy.username}</div>
          </div>
          {extend && (
            <pre className="HorizontalVideo__Info-Description App-Text3Line">
              {video.description}
            </pre>
          )}
        </div>
      </div>
    </Link>
  );
}

export default HorizontalVideo;
