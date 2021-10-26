import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';

import IVideo from '@interfaces/IVideo';
import IPlaylist from '@interfaces/IPlaylist';
import videoApi from '@api/videoApi';
import playlistApi from '@api/playlistApi';
import { useSetLoading } from '@contexts/LoadingContext';
import { VideoProvider } from '@contexts/VideoContext';
import { useShowSidebar } from '@contexts/ShowSidebarContext';
import { NextVideoProvider } from '@contexts/NextVideoContext';

import Player from '@components/Player';
import RelateVideos from '@components/RelateVideos';
import WatchDetail from '@components/WatchDetail';
import Comments from '@components/Comments';
import NotFound from '@components/NotFound';
import PlaylistVideos from '@components/PlaylistVideos';

import './Watch.css';

function Watch() {
  const [video, setVideo] = useState<IVideo | null | undefined>(undefined);
  const [playlist, setPlaylist] = useState<IPlaylist | null | undefined>(undefined);
  const { videoId, playlistId } = useParams<{ videoId: string; playlistId: string }>();

  const isWidthUnder900 = useMediaQuery({ maxWidth: 900 });
  const setLoading = useSetLoading();
  const [, setShowSidebar] = useShowSidebar();

  useEffect(() => {
    return () => {
      document.title = 'ZooTube';
    };
  }, []);

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
      .then((_video) => {
        setVideo(_video);
        document.title = _video.title;
      })
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

  if (video === null || (playlistId && playlist === null)) return <NotFound />;
  return (
    <VideoProvider video={video}>
      <div className="Watch">
        <div className={playlistId ? 'Watch__PlaylistPlayer' : 'Watch__VideoPlayer'}>
          <NextVideoProvider>
            <Player className="Watch-Player" playlistId={playlistId} />
            {playlistId && <PlaylistVideos className="Watch-Playlist" playlist={playlist} />}
          </NextVideoProvider>
        </div>
        <div className="Watch__Orther">
          <div className="Watch__Orther__Left">
            <WatchDetail />
            <div className="Watch__Orther__Left-CommentTitle">
              {video?.totalComments || ''} Comments
            </div>
            <Comments />
          </div>
          <div className="Watch__Orther__Right">
            <div>Video có liên quan</div>
            <RelateVideos videoId={videoId} />
          </div>
        </div>
      </div>
    </VideoProvider>
  );
}

export default Watch;
