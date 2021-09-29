import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation } from 'react-router-dom';

import IVideo from '@interfaces/IVideo';
import IPlaylist from '@interfaces/IPlaylist';
import playlistApi from '@api/playlistApi';
import { useShowConfirm } from '@contexts/ConfirmContext';
import { usePushMessage } from '@contexts/MessageQueueContext';
import { useSetLoading } from '@contexts/LoadingContext';
import { useSetNextVideo } from '@contexts/NextVideoContext';

import PlaylistVideo from './PlaylistVideo';

import './PlaylistVideos.css';

interface PlaylistVideosProps {
  playlist: IPlaylist;
  className?: string;
}

const step = 10;

function PlaylistVideos({ playlist, className }: PlaylistVideosProps) {
  const [videos, setVideos] = useState<Array<IVideo>>([]);

  const { showConfirm } = useShowConfirm();
  const pushMessage = usePushMessage();
  const setLoading = useSetLoading();
  const { pathname } = useLocation();
  const setNextVideo = useSetNextVideo();

  useEffect(() => {
    setLoading(true);
    playlistApi
      .getPlaylistVideos(playlist.id, { offset: 0, limit: step })
      .then(setVideos)
      .finally(() => setLoading(false));
  }, [playlist.id, setLoading]);

  useEffect(() => {
    const playingVideoIndex = videos.findIndex(
      (v) => `/watch/${v.id}/playlist/${playlist.id}` === pathname
    );

    if (playingVideoIndex === -1) {
      setNextVideo(videos[0] || null);
    } else if (playingVideoIndex + 1 < videos.length) {
      setNextVideo(videos[playingVideoIndex + 1]);
    }
  }, [pathname, playlist.id, setNextVideo, videos]);

  function handleRemovePlaylistVideo(video: IVideo) {
    if (playlist === null) return;
    showConfirm(`Bạn có muốn xóa Video ${video.title} khỏi Playlist <${playlist.name}>`, () =>
      playlistApi
        .removeVideoFromPlaylist(playlist.id, video.id)
        .then(() => {
          setVideos(videos.filter((v) => v.id !== video.id));
          pushMessage('Đã xóa Video khỏi Playlist');
        })
        .catch(() => pushMessage('Xóa Video khỏi Playlist không thành công'))
    );
  }

  async function loadPlaylistVideos() {
    const _videos = await playlistApi.getPlaylistVideos(playlist.id, {
      limit: step,
      offset: videos.length,
    });
    setVideos([...videos, ..._videos]);
  }

  if (playlist === null) return null;
  return (
    <div className={`PlaylistVideos ${className || ''}`}>
      <div className="PlaylistVideos__Header">
        <div className="PVH-Name App-Text1Line">{playlist.name}</div>
        <div className="PVH-TotalVideos">{playlist.totalVideos} videos</div>
      </div>
      <div id="playlistVideos__Container">
        <InfiniteScroll
          dataLength={videos.length}
          next={loadPlaylistVideos}
          hasMore={true}
          loader={null}
          scrollableTarget="playlistVideos__Container"
        >
          {videos.map((video, i) => (
            <PlaylistVideo
              key={video.id}
              video={video}
              playlist={playlist}
              number={i + 1}
              handleRemovePlaylistVideo={handleRemovePlaylistVideo}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default PlaylistVideos;
