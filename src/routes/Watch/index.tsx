import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import IVideo from '@interfaces/IVideo';
import videoApi from '@api/videoApi';
import { useSetLoading } from '@contexts/LoadingContext';
import { VideoProvider } from '@contexts/VideoContext';

import Player from '@components/Player';
import RelateVideos from '@components/RelateVideos';
import WatchDetail from '@components/WatchDetail';
import Comments from '@components/Comments';
import NotFound from '@components/NotFound';

import './Watch.css';

function Watch() {
  const [video, setVideo] = useState<IVideo | null | undefined>(undefined);
  const { id: videoId } = useParams<{ id: string }>();
  const setLoading = useSetLoading();

  useEffect(() => {
    setLoading(true);
    videoApi
      .getVideo(videoId)
      .then(setVideo)
      .catch(() => setVideo(null))
      .finally(() => setLoading(false));
  }, [setLoading, videoId]);

  if (video === undefined) return null;
  if (video === null) return <NotFound />;
  return (
    <VideoProvider video={video}>
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
    </VideoProvider>
  );
}

export default Watch;
