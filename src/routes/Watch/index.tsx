import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import IVideo from '@interfaces/IVideo';
import videoApi from '@api/videoApi';
import { useSetLoading } from '@contexts/LoadingContext';

import Player from '@components/Player';
import RelateVideos from '@components/RelateVideos';
import WatchDetail from '@components/WatchDetail';
import Comments from '@components/Comments';

import './Watch.css';

function Watch() {
  const [video, setVideo] = useState<IVideo | null>(null);
  const { id: videoId } = useParams<{ id: string }>();
  const setLoading = useSetLoading();

  useEffect(() => {
    setLoading(true);
    videoApi
      .getVideo(videoId)
      .then(setVideo)
      .finally(() => setLoading(false));
  }, [setLoading, videoId]);

  if (!video) return null;

  return (
    <div className="Watch">
      <div className="Watch__Player">
        <Player videoUrl={video.videoPath} />
      </div>
      <div className="Watch__Orther">
        <div className="Watch__Orther__Left">
          <WatchDetail video={video} />
          <div className="Watch__Orther__Left-CommentTitle">{video.totalComments} Comments</div>
          <Comments video={video} />
        </div>
        <div className="Watch__Orther__Right">
          <div>Video có liên quan</div>
          <RelateVideos video={video} />
        </div>
      </div>
    </div>
  );
}

export default Watch;