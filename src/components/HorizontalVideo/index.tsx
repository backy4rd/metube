import React from 'react';
import { Link } from 'react-router-dom';

import { useVideo } from '@contexts/VideoContext';
import { numberWithCommas } from '@utils/number';

import VideoThumbnail from '@components/VideoThumbnail';

import './HorizontalVideo.css';
import { timeDifference } from '@utils/time';
import Avatar from '@components/Avatar';

interface HorizontalVideoProps {
  showWatchTimestamp?: boolean;
  extend?: boolean;
}

function HorizontalVideo({ showWatchTimestamp = false, extend = false }: HorizontalVideoProps) {
  const video = useVideo();

  return (
    <Link to={`/watch/${video.id}`}>
      <div className="HorizontalVideo">
        <VideoThumbnail className="HorizontalVideo__Thumbnail" video={video} showViews={false} />
        <div className="HorizontalVideo__Info">
          <div className="HorizontalVideo__Info-Title">{video.title}</div>
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
          {extend && <pre className="HorizontalVideo__Info-Description">{video.description}</pre>}
        </div>
      </div>
    </Link>
  );
}

export default HorizontalVideo;
