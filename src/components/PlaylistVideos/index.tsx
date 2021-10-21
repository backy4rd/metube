import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation } from 'react-router-dom';
import { Skeleton } from '@mui/material';

import IVideo from '@interfaces/IVideo';
import IPlaylist from '@interfaces/IPlaylist';
import playlistApi from '@api/playlistApi';
import { useShowConfirm } from '@contexts/ConfirmContext';
import { usePushMessage } from '@contexts/MessageQueueContext';
import { useSetLoading } from '@contexts/LoadingContext';
import { useSetNextVideo } from '@contexts/NextVideoContext';

import PlaylistVideo from './PlaylistVideo';
import PlaylistVideosSkeleton from './PlaylistVideo/PlaylistVideoSkeleton';

import './PlaylistVideos.css';
import Sequence from '@utils/Sequence';

interface PlaylistVideosProps {
  playlist: IPlaylist | null | undefined;
  showAddedDate?: boolean;
  className?: string;
}

const step = 10;

function PlaylistVideos({ playlist, className, showAddedDate = false }: PlaylistVideosProps) {
  const [videos, setVideos] = useState<Array<IVideo>>([]);

  const { showConfirm } = useShowConfirm();
  const pushMessage = usePushMessage();
  const setLoading = useSetLoading();
  const { pathname } = useLocation();
  const setNextVideo = useSetNextVideo();

  useEffect(() => {
    if (!playlist) return;
    setLoading(true);
    setVideos([]);
    playlistApi
      .getPlaylistVideos(playlist.id, { offset: 0, limit: step })
      .then(setVideos)
      .finally(() => setLoading(false));
  }, [playlist, setLoading]);

  useEffect(() => {
    if (!playlist) return;
    const playingVideoIndex = videos.findIndex(
      (v) => `/watch/${v.id}/playlist/${playlist.id}` === pathname
    );

    if (playingVideoIndex === -1) {
      setNextVideo(videos[0] || null);
    } else if (playingVideoIndex + 1 < videos.length) {
      setNextVideo(videos[playingVideoIndex + 1]);
    }
  }, [pathname, playlist, setNextVideo, videos]);

  function handleRemovePlaylistVideo(video: IVideo) {
    if (!playlist) return;
    showConfirm(`Bạn có muốn xóa Video ${video.title} khỏi Playlist <${playlist.name}>`, () =>
      playlistApi
        .removeVideoFromPlaylist(playlist.id, video.id)
        .then(() => {
          setVideos(videos.filter((v) => v.id !== video.id));
          pushMessage('Đã xóa Video khỏi Playlist');
        })
        .catch(() => pushMessage('Xóa Video khỏi Playlist không thành công', 'error'))
    );
  }

  async function loadPlaylistVideos() {
    if (!playlist) return;
    const _videos = await playlistApi.getPlaylistVideos(playlist.id, {
      limit: step,
      offset: videos.length,
    });
    setVideos([...videos, ..._videos]);
  }

  return (
    <div className={`PlaylistVideos ${className || ''}`}>
      <div className="PlaylistVideos__Header">
        <div className="PVH-Name App-Text1Line">
          {playlist ? playlist.name : <Skeleton height="18px" width="50%" />}
        </div>
        <div className="PVH-TotalVideos">
          {playlist ? `${playlist.totalVideos} videos` : <Skeleton height="18px" width="30%" />}
        </div>
      </div>
      <div id="playlistVideos__Container">
        {playlist ? (
          <InfiniteScroll
            dataLength={videos.length}
            next={loadPlaylistVideos}
            hasMore={videos.length % step === 0}
            loader={<Sequence Component={PlaylistVideosSkeleton} length={5} />}
            scrollableTarget="playlistVideos__Container"
          >
            {videos.map((video, i) => (
              <PlaylistVideo
                key={video.id}
                video={video}
                playlist={playlist}
                number={i + 1}
                showAddedDate={showAddedDate}
                handleRemovePlaylistVideo={handleRemovePlaylistVideo}
              />
            ))}
          </InfiniteScroll>
        ) : (
          <Skeleton
            id="PlaylistVideosBodySkeleton"
            variant="rectangular"
            animation="wave"
            height="100%"
            width="100%"
          />
        )}
      </div>
    </div>
  );
}

export default PlaylistVideos;
