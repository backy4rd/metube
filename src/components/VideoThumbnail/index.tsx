import React from 'react';
import { Schedule, VisibilityOutlined } from '@material-ui/icons';

import { useVideo } from '@contexts/VideoContext';
import { numberWithCommas } from '@utils/number';
import { secondToTime } from '@utils/time';

import './VideoThumbnail.css';

interface VideoThumbnailProps {
  className?: string;
  showViews?: boolean;
}

function VideoThumbnail({ className, showViews = true }: VideoThumbnailProps) {
  const video = useVideo();

  return (
    <div
      className={'VideoThumbnail ' + className}
      style={{ backgroundImage: `url(${video.thumbnailPath})` }}
    >
      <div className="VideoThumbnail__Wrapper">
        <img key={video.thumbnailPath} src={video.thumbnailPath} alt="" />
        <div></div>
      </div>

      <div className="VideoThumbnail-Info">
        {showViews && (
          <>
            <VisibilityOutlined className="VideoThumbnail-Info-ViewIcon" />
            <div className="VideoThumbnail-Info-View">{numberWithCommas(video.views)}</div>
          </>
        )}
        <Schedule className="VideoThumbnail-Info-ClockIcon" />
        <div className="VideoThumbnail-Info-Duration">{secondToTime(video.duration)}</div>
      </div>
    </div>
  );
}

export default VideoThumbnail;
