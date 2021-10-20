import React from 'react';
import { PublicRounded, LockRounded } from '@material-ui/icons';
import { Link } from 'react-router-dom';

import { timeDifference } from '@utils/time';
import IVideo from '@interfaces/IVideo';
import ISkeleton, { isSkeleton } from '@interfaces/ISkeleton';
import IStream, { isStream } from '@interfaces/IStream';

import Avatar from '@components/Avatar';
import VideoThumbnail from '@components/VideoThumbnail';
import VerticalVideoSkeleton from './VerticalVideoSkeleton';

import './VerticalVideo.css';

interface VerticalVideoProps {
  video: IVideo | ISkeleton | IStream;
}

function VerticalVideo({ video }: VerticalVideoProps) {
  if (isSkeleton(video)) return <VerticalVideoSkeleton />;

  const owner = isStream(video) ? video.user : video.uploadedBy;

  return (
    <Link className="VerticalVideo" to={`/${isStream(video) ? 'live' : 'watch'}/${video.id}`}>
      <VideoThumbnail video={video} />

      <div className="VerticalVideo__Detail">
        <div className="VerticalVideo__Detail-UserIcon">
          <Avatar user={owner} size="40px" />
        </div>
        <div className="VerticalVideo__Detail-Info">
          <div className="VerticalVideo__Detail-Info__Title">
            <div className="VVDIT-Text App-Text2Line">
              {isStream(video) ? video.name : video.title}
            </div>
            {!isStream(video) && (
              <div className="VVDIT-Privacy">
                {video.privacy.name === 'public' ? <PublicRounded /> : <LockRounded />}
              </div>
            )}
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
