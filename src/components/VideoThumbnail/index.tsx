import React, { useRef, useState } from 'react';
import { Schedule, VisibilityOutlined } from '@material-ui/icons';

import { numberWithCommas } from '@utils/number';
import { secondToTime, timeDifference } from '@utils/time';
import IStream, { isStream } from '@interfaces/IStream';
import IVideo from '@interfaces/IVideo';
import videoApi from '@api/videoApi';

import './VideoThumbnail.css';

interface VideoThumbnailProps {
  className?: string;
  showViews?: boolean;
  video: IVideo | IStream;
}

const notFoundThumbnail =
  'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1024x576.png';

const liveStreamDefaultThumbnail =
  'https://images.squarespace-cdn.com/content/v1/57212d3745bf2127150d4b8a/1570563472015-8UPKGIKQC5WQN573A7AT/livestream-logo.jpg';

function VideoThumbnail({ video, className, showViews = true }: VideoThumbnailProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (!video.thumbnailPath) {
    if (isStream(video)) {
      video.thumbnailPath = liveStreamDefaultThumbnail;
    } else {
      video.thumbnailPath = notFoundThumbnail;
    }
  }

  async function togglePreview(show: boolean) {
    if (show) {
      if (preview || timer.current) return;
      timer.current = setTimeout(async () => {
        const _video = await videoApi.getVideo(video.id);
        setPreview(_video.videoPath);
      }, 2000);
    } else {
      setPreview(null);
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    }
  }

  return (
    <div
      className={'VideoThumbnail ' + className}
      style={{ backgroundImage: `url(${video.thumbnailPath})` }}
      onMouseEnter={() => togglePreview(true)}
      onMouseLeave={() => togglePreview(false)}
    >
      <div className="VideoThumbnail__Wrapper">
        {preview ? (
          <video
            className="VideoThumbnail__Wrapper-Image"
            src={preview}
            onCanPlay={(e) => e.currentTarget.play()}
            loop
            muted
          ></video>
        ) : (
          <img
            className="VideoThumbnail__Wrapper-Image"
            key={video.thumbnailPath}
            src={video.thumbnailPath}
            alt=""
          />
        )}
        <div className="VideoThumbnail__Wrapper-Overlay"></div>
      </div>

      {!isStream(video) ? (
        <div className="VideoThumbnail-Info">
          {showViews && (
            <>
              <VisibilityOutlined className="VideoThumbnail-Info-ViewIcon" />
              <div className="VideoThumbnail-Info-View">{numberWithCommas(video.views || 0)}</div>
            </>
          )}
          <Schedule className="VideoThumbnail-Info-ClockIcon" />
          <div className="VideoThumbnail-Info-Duration">{secondToTime(video.duration || 0)}</div>
        </div>
      ) : (
        <div
          className="VideoThumbnail-Info"
          style={{
            backgroundColor: video.isStreaming ? 'var(--main-red-1)' : '#575757',
            padding: '2px 6px',
            borderRadius: '2px',
          }}
        >
          {video.isStreaming
            ? 'LIVE'
            : 'OFFLINE' +
              (video.lastStreamedAt ? ' ' + timeDifference(new Date(), video.lastStreamedAt) : '')}
        </div>
      )}
    </div>
  );
}

export default VideoThumbnail;
