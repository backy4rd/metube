import React from 'react';
import { Link } from 'react-router-dom';

import { timeDifference } from '@utils/time';
import IVideo from '@interfaces/IVideo';
import ISkeleton, { isSkeleton } from '@interfaces/ISkeleton';
import IStream, { isStream } from '@interfaces/IStream';

import Avatar from '@components/Avatar';
import VideoThumbnail from '@components/VideoThumbnail';
import PrivacyIcon from '@components/PrivacyIcon';
import VerticalVideoSkeleton from './VerticalVideoSkeleton';

import './VerticalVideo.css';

interface VerticalVideoProps {
  video: IVideo | ISkeleton | IStream;
}

function VerticalVideo({ video }: VerticalVideoProps) {
  if (isSkeleton(video)) return <VerticalVideoSkeleton />;

  const owner = isStream(video) ? video.user : video.uploadedBy;
  const status = !isStream(video) && (video.isBlocked ? 'blocked' : video.privacy.name);

  return (
    <Link className="VerticalVideo" to={`/${isStream(video) ? 'live' : 'watch'}/${video.id}`}>
      <VideoThumbnail video={video} />

      <div className="VerticalVideo__Detail">
        <div className="VerticalVideo__Detail-UserIcon">
          <Avatar user={owner} size="40px" />
        </div>
        <div className="VerticalVideo__Detail-Info">
          <div className="VerticalVideo__Detail-Info__Title">
            <div
              className="VVDIT-Text App-Text2Line"
              title={isStream(video) ? video.name : video.title}
            >
              {isStream(video) ? video.name : video.title}
            </div>
            {status && <PrivacyIcon className="VVDIT-Privacy" privacy={status} />}
          </div>
          <div className="VerticalVideo__Detail-Info-Username">
            {owner.username}
            {!isStream(video) && ' - ' + timeDifference(new Date(), video.uploadedAt)}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default React.memo(VerticalVideo);
