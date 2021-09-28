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
import PlaylistVideos from '@components/PlaylistVideos';

import './Watch.css';
import { useShowSidebar } from '@contexts/ShowSidebarContext';
import playlistApi from '@api/playlistApi';
import IPlaylist from '@interfaces/IPlaylist';
import { useMediaQuery } from 'react-responsive';

function Watch() {
  const [video, setVideo] = useState<IVideo | null | undefined>(undefined);
  const [playlist, setPlaylist] = useState<IPlaylist | null | undefined>(undefined);
  const { videoId, playlistId } = useParams<{ videoId: string; playlistId: string }>();

  const isWidthUnder900 = useMediaQuery({ maxWidth: 900 });
  const setLoading = useSetLoading();
  const [, setShowSidebar] = useShowSidebar();

  useEffect(() => {
    if (!playlistId) return;
    setShowSidebar(false);
    return () => {
      !isWidthUnder900 && setShowSidebar(true);
    };
  }, [isWidthUnder900, playlistId, setShowSidebar]);

  useEffect(() => {
    setLoading(true);
    videoApi
      .getVideo(videoId)
      .then(setVideo)
      .catch(() => setVideo(null))
      .finally(() => setLoading(false));
  }, [setLoading, videoId]);

  useEffect(() => {
    if (!playlistId) {
      setPlaylist(undefined);
      return;
    }
    setLoading(true);
    playlistApi
      .getPlaylist(+playlistId)
      .then(setPlaylist)
      .catch(() => setPlaylist(null))
      .finally(() => setLoading(false));
  }, [playlistId, setLoading]);

  if (video === undefined || (playlistId && playlist === undefined)) return null;
  if (video === null || (playlistId && playlist === null)) return <NotFound />;
  return (
    <VideoProvider video={video}>
      <div className="Watch">
        <div className={playlist ? 'Watch__PlaylistPlayer' : 'Watch__VideoPlayer'}>
          <Player className="Watch-Player" videoUrl={video.videoPath} />
          {playlist && <PlaylistVideos className="Watch-Playlist" playlist={playlist} />}
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
